import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, ScanLine, XCircle } from "lucide-react";
import type { AppState, Redemption } from "@/components/almara/types";
import { getPainel, resgatarPremio, type Supermercado } from "@/lib/almara-backend.functions";

export const Route = createFileRoute("/balcao-supermercado")({
  head: () => ({
    meta: [
      { title: "Balcão do Parceiro — Almara" },
      {
        name: "description",
        content:
          "Painel dos funcionários das lojas parceiras para validar vales Almara e dar baixa no stock de material escolar.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Balcão do Parceiro — Almara" },
      { property: "og:description", content: "Validação de vales Almara nas lojas parceiras." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Balcao,
});

type Result = { ok: boolean; message: string; detail: string } | null;

function readState(): AppState | null {
  try {
    const raw = localStorage.getItem("almara:state");
    return raw ? (JSON.parse(raw) as AppState) : null;
  } catch {
    return null;
  }
}

function markUsed(code: string) {
  const s = readState();
  if (!s) return;
  const next = {
    ...s,
    redemptions: (s.redemptions ?? []).map((r: Redemption) =>
      r.code === code ? { ...r, used: true } : r,
    ),
  };
  localStorage.setItem("almara:state", JSON.stringify(next));
}

function Balcao() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [lojas, setLojas] = useState<Supermercado[]>([]);
  const [lojaId, setLojaId] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useServerFn(getPainel);
  const resgatar = useServerFn(resgatarPremio);

  useEffect(() => {
    void (async () => {
      const d = await load();
      setLojas(d.lojas as Supermercado[]);
      if (d.lojas[0]) setLojaId(d.lojas[0].id);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verify = async () => {
    const raw = input.trim().toUpperCase();
    const code = raw.includes("|") ? (raw.split("|")[1] ?? raw) : raw;
    const s = readState();
    const found = s?.redemptions?.find((r) => r.code === code);
    if (!found) {
      setResult({ ok: false, message: "Código Inválido", detail: "Este vale não existe neste aparelho." });
      return;
    }
    if (found.used) {
      setResult({ ok: false, message: "Já Utilizado", detail: `${found.prizeName} já foi entregue.` });
      return;
    }
    if (new Date(found.expiresAt).getTime() < Date.now()) {
      setResult({ ok: false, message: "Código Expirado", detail: "O prazo do vale terminou." });
      return;
    }

    setBusy(true);
    try {
      const r = await resgatar({ data: { codigo: code, supermercadoId: lojaId } });
      if (!r.ok) {
        setResult({ ok: false, message: "Sem Stock", detail: r.motivo });
        return;
      }
      markUsed(found.code);
      setResult({
        ok: true,
        message: "Código Válido",
        detail: `Entregar: ${found.prizeName} · restam ${r.restante} un. · ${r.custoKz} Kz debitados do crédito da loja.`,
      });
    } catch (e) {
      setResult({
        ok: false,
        message: "Erro de Ligação",
        detail: e instanceof Error ? e.message : "Tente novamente.",
      });
    } finally {
      setBusy(false);
    }
  };

  if (result) {
    return (
      <div
        className={`grid min-h-screen place-items-center px-6 text-center ${result.ok ? "bg-emerald-600" : "bg-red-600"}`}
      >
        <div>
          {result.ok ? (
            <CheckCircle2 className="mx-auto h-24 w-24 text-white" />
          ) : (
            <XCircle className="mx-auto h-24 w-24 text-white" />
          )}
          <h1 className="mt-6 font-display text-4xl font-extrabold text-white">
            {result.ok ? "🟢" : "🔴"} {result.message}
          </h1>
          <p className="mt-3 text-lg font-bold text-white/90">
            {result.ok ? "Entregar Material" : "Não entregar"}
          </p>
          <p className="mt-1 text-sm font-semibold text-white/80">{result.detail}</p>
          <button
            onClick={() => {
              setResult(null);
              setInput("");
            }}
            className="btn-press mt-10 rounded-2xl bg-white px-8 py-4 font-display text-base font-extrabold text-foreground"
          >
            Verificar outro código
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-md bg-background px-6 py-14">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
        <ScanLine className="h-7 w-7" />
      </div>
      <h1 className="mt-5 font-display text-3xl font-extrabold text-foreground">Balcão do Parceiro</h1>
      <p className="mt-2 text-sm font-semibold text-muted-foreground">
        Escolha a filial, depois digite ou leia o código do QR Code do estudante (ex.: ALM-KERO-BRONZE-98231).
      </p>

      <select
        value={lojaId}
        onChange={(e) => setLojaId(e.target.value)}
        className="mt-6 w-full rounded-2xl border-2 border-border bg-card px-4 py-3 font-display text-base font-extrabold text-foreground outline-none focus:border-primary"
      >
        {lojas.map((l) => (
          <option key={l.id} value={l.id}>
            {l.nome_rede} · {l.filial_local}
          </option>
        ))}
      </select>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !busy && void verify()}
        placeholder="ALM-KERO-BRONZE-00000"
        className="mt-4 w-full rounded-2xl border-2 border-border bg-card px-4 py-4 font-display text-lg font-extrabold uppercase tracking-wider text-foreground outline-none focus:border-primary"
      />
      <button
        onClick={() => void verify()}
        disabled={!input.trim() || !lojaId || busy}
        className="btn-press mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-display text-base font-extrabold text-primary-foreground disabled:opacity-50"
      >
        {busy && <Loader2 className="h-5 w-5 animate-spin" />}
        Verificar
      </button>
    </main>
  );
}
