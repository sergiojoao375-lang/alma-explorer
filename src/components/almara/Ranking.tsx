import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Flame, Gift, MapPin, RefreshCw, Trophy } from "lucide-react";
import { getRankingDiario } from "@/lib/almara-backend.functions";

type Premiado = {
  nome_aluno: string;
  classe: string | null;
  premio_nome: string;
  tier: string;
  nome_loja: string;
  criado_em: string;
};

type TopAluno = { nome: string; classe: string | null; xp_dia: number };

const MEDALHAS = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

/** Tempo que falta para o ranking reiniciar (00:00 local). */
function faltaParaMeiaNoite(): string {
  const agora = new Date();
  const meiaNoite = new Date(agora);
  meiaNoite.setHours(24, 0, 0, 0);
  const ms = meiaNoite.getTime() - agora.getTime();
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return `${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}`;
}

export function Ranking({ onBack }: { onBack: () => void }) {
  const carregar = useServerFn(getRankingDiario);
  const [premiados, setPremiados] = useState<Premiado[]>([]);
  const [top, setTop] = useState<TopAluno[]>([]);
  const [estado, setEstado] = useState<"a-carregar" | "pronto" | "erro">("a-carregar");
  const [reset, setReset] = useState(() => faltaParaMeiaNoite());

  const buscar = async () => {
    setEstado("a-carregar");
    try {
      const r = await carregar();
      setPremiados(r.premiados as Premiado[]);
      setTop(r.topPontos as TopAluno[]);
      setEstado("pronto");
    } catch {
      setEstado("erro");
    }
  };

  useEffect(() => {
    void buscar();
    const t = setInterval(() => setReset(faltaParaMeiaNoite()), 30_000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur">
        <button
          onClick={onBack}
          className="btn-press grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-lg font-extrabold text-foreground">Ranking do Dia</h1>
        <button
          onClick={() => void buscar()}
          className="btn-press ml-auto grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground"
          aria-label="Actualizar"
        >
          <RefreshCw className={`h-4 w-4 ${estado === "a-carregar" ? "animate-spin" : ""}`} />
        </button>
      </header>

      <div className="px-5 pt-5">
        <p className="rounded-2xl bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground">
          O ranking reinicia todos os dias às <strong>00:00</strong> — faltam{" "}
          <strong>{reset}</strong> para a próxima ronda.
        </p>
      </div>

      {/* Top 5 pontos do dia */}
      <section className="mt-5 px-5">
        <h2 className="flex items-center gap-2 font-display text-xl font-extrabold text-foreground">
          <Flame className="h-5 w-5 text-primary" /> Top 5 de hoje
        </h2>
        <div className="mt-3 space-y-2">
          {top.length === 0 && estado !== "a-carregar" && (
            <p className="rounded-2xl border-2 border-dashed border-border p-4 text-center text-sm font-semibold text-muted-foreground">
              Ainda ninguém pontuou hoje. Sê o primeiro a estudar! 🚀
            </p>
          )}
          {top.map((a, i) => (
            <div
              key={`${a.nome}-${i}`}
              className={`card-3d flex items-center gap-3 rounded-2xl border-2 p-4 ${
                i === 0 ? "border-amber-400 bg-amber-50" : "border-border bg-card"
              }`}
            >
              <span className="text-2xl">{MEDALHAS[i] ?? "•"}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-extrabold text-foreground">{a.nome}</p>
                <p className="text-[11px] font-semibold text-muted-foreground">
                  {a.classe ? `${a.classe} classe` : "Classe não indicada"}
                </p>
              </div>
              <span className="font-display text-base font-extrabold text-primary">
                {a.xp_dia} XP
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Prémios ganhos hoje */}
      <section className="mt-7 px-5">
        <h2 className="flex items-center gap-2 font-display text-xl font-extrabold text-foreground">
          <Gift className="h-5 w-5 text-emerald-600" /> Prémios ganhos hoje
        </h2>
        <div className="mt-3 space-y-2">
          {premiados.length === 0 && estado !== "a-carregar" && (
            <p className="rounded-2xl border-2 border-dashed border-border p-4 text-center text-sm font-semibold text-muted-foreground">
              Nenhum prémio resgatado hoje. Podes ser tu o primeiro! 🎁
            </p>
          )}
          {premiados.map((p, i) => (
            <div key={i} className="card-3d flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                <Trophy className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-extrabold text-foreground">
                  {p.nome_aluno}
                </p>
                <p className="truncate text-[11px] font-semibold text-muted-foreground">
                  {p.premio_nome} · {p.classe ? `${p.classe} classe` : "—"}
                </p>
                <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] font-bold text-emerald-700">
                  <MapPin className="h-3 w-3" /> {p.nome_loja}
                </p>
              </div>
              <span className="shrink-0 text-[11px] font-bold text-muted-foreground">
                {new Date(p.criado_em).toLocaleTimeString("pt-PT", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>
      </section>

      {estado === "erro" && (
        <p className="mt-6 px-5 text-center text-sm font-semibold text-destructive">
          Sem ligação à internet — o ranking precisa de rede para actualizar.
        </p>
      )}
    </div>
  );
}
