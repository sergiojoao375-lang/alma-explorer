import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  AlertTriangle,
  Banknote,
  Building2,
  Coins,
  FileDown,
  GraduationCap,
  KeyRound,
  Loader2,
  Lock,
  Megaphone,
  Package,
  PiggyBank,
  Plus,
  RefreshCw,
  Search,
  ShieldOff,
  Store,
  Trophy,
  Users,
  X,
} from "lucide-react";
import {
  alterarPin,
  alternarFilial,
  alternarPatrocinador,
  adicionarItemStock,
  atualizarStock,
  criarFilial,
  definirItemPremio,
  criarPatrocinador,
  doacaoLocal,
  getPainel,
  injectarCredito,
  registarPatrocinio,
  type ContaCentral,
  type Metricas,
  type Patrocinador,
  type PremioConfig,
  type StockItem,
  type Supermercado,
  type Transacao,
} from "@/lib/almara-backend.functions";
import { ITENS_DISPONIVEIS, NOME_ITEM, TIERS, type ItemPremio } from "@/lib/almara-premios";
import { gerarRelatorioImpacto } from "@/lib/relatorio-pdf";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel Administrador — Almara" },
      {
        name: "description",
        content:
          "Painel master Almara: campanhas patrocinadas, fundo escolar, gestão de filiais, stock e métricas de impacto escolar.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Painel Administrador — Almara" },
      { property: "og:description", content: "Publicidade, parceiros, stock e impacto escolar do Almara." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Admin,
});

const kz = (n: number) =>
  `${new Intl.NumberFormat("pt-AO", { maximumFractionDigits: 0 }).format(n)} Kz`;

const DISCIPLINAS = [
  { id: "mat", nome: "Matemática" },
  { id: "por", nome: "Língua Portuguesa" },
  { id: "his", nome: "História" },
  { id: "fis", nome: "Física" },
  { id: "geo", nome: "Geografia" },
];

type Painel = {
  premios: PremioConfig[];
  lojas: Supermercado[];
  stock: StockItem[];
  conta: ContaCentral | null;
  transacoes: Transacao[];
  patrocinadores: Patrocinador[];
  metricas: Metricas;
};

function Admin() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [painel, setPainel] = useState<Painel | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useServerFn(getPainel);

  const refresh = async () => {
    const d = await load();
    setPainel(d as Painel);
  };

  useEffect(() => {
    if (authed) void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  const run = async (fn: () => Promise<unknown>, okText: string) => {
    setBusy(true);
    setMsg(null);
    try {
      await fn();
      await refresh();
      setMsg({ ok: true, text: okText });
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Operação falhou" });
    } finally {
      setBusy(false);
    }
  };

  if (!authed) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-100 px-6">
        <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-extrabold text-slate-900">
            Painel Administrador
          </h1>
          <p className="mt-1 text-sm text-slate-500">Acesso restrito à equipa Almara.</p>
          <input
            type="password"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && pinInput.trim()) {
                setPin(pinInput.trim());
                setAuthed(true);
              }
            }}
            placeholder="PIN de administrador"
            className="mt-6 w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-slate-900"
          />
          <button
            onClick={() => {
              setPin(pinInput.trim());
              setAuthed(true);
            }}
            disabled={!pinInput.trim()}
            className="mt-4 w-full rounded-xl bg-slate-900 py-3 font-semibold text-white disabled:opacity-40"
          >
            Entrar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-slate-900">Almara · Painel Master</h1>
            <p className="text-sm text-slate-500">
              Publicidade, parceiros, stock e impacto escolar em Angola.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <PinChanger pin={pin} onDone={(novo) => setPin(novo)} setMsg={setMsg} />
            <button
              onClick={() => void refresh()}
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" /> Actualizar
            </button>
          </div>
        </header>

        {msg && (
          <div
            className={`mt-5 rounded-xl px-4 py-3 text-sm font-semibold ${
              msg.ok ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
            }`}
          >
            {msg.text}
          </div>
        )}

        {!painel ? (
          <div className="mt-16 flex items-center justify-center gap-3 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" /> A carregar dados...
          </div>
        ) : (
          <Conteudo painel={painel} pin={pin} busy={busy} run={run} />
        )}
      </div>
    </main>
  );
}

function PinChanger({
  pin,
  onDone,
  setMsg,
}: {
  pin: string;
  onDone: (novo: string) => void;
  setMsg: (m: { ok: boolean; text: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [novo, setNovo] = useState("");
  const [busy, setBusy] = useState(false);
  const mudar = useServerFn(alterarPin);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
      >
        <KeyRound className="h-4 w-4" /> Alterar PIN do Administrador
      </button>
      {open && (
        <Modal title="🔑 Alterar PIN do Administrador" onClose={() => setOpen(false)}>
          <p className="text-sm text-slate-500">
            O novo PIN é guardado encriptado (SHA-256) e passa a valer imediatamente.
          </p>
          <input
            type="password"
            value={novo}
            onChange={(e) => setNovo(e.target.value)}
            placeholder="Novo PIN (mínimo 4 caracteres)"
            className="mt-4 w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-slate-900"
          />
          <button
            disabled={busy || novo.trim().length < 4}
            onClick={async () => {
              setBusy(true);
              try {
                await mudar({ data: { pin, novoPin: novo.trim() } });
                onDone(novo.trim());
                setMsg({ ok: true, text: "PIN de administrador actualizado com sucesso." });
                setOpen(false);
                setNovo("");
              } catch (e) {
                setMsg({ ok: false, text: e instanceof Error ? e.message : "Não foi possível alterar o PIN" });
              } finally {
                setBusy(false);
              }
            }}
            className="mt-4 w-full rounded-xl bg-slate-900 py-3 font-semibold text-white disabled:opacity-40"
          >
            Guardar novo PIN
          </button>
        </Modal>
      )}
    </>
  );
}

function Conteudo({
  painel,
  pin,
  busy,
  run,
}: {
  painel: Painel;
  pin: string;
  busy: boolean;
  run: (fn: () => Promise<unknown>, okText: string) => Promise<void>;
}) {
  const { lojas, stock, conta, transacoes, patrocinadores, metricas, premios } = painel;

  const inject = useServerFn(injectarCredito);
  const sponsor = useServerFn(registarPatrocinio);
  const local = useServerFn(doacaoLocal);
  const novaMarca = useServerFn(criarPatrocinador);
  const toggleMarca = useServerFn(alternarPatrocinador);
  const novaFilial = useServerFn(criarFilial);
  const mudarStock = useServerFn(atualizarStock);
  const mudarPremio = useServerFn(definirItemPremio);
  const novoItemStock = useServerFn(adicionarItemStock);
  const toggleFilial = useServerFn(alternarFilial);

  const maxCredito = useMemo(
    () => Math.max(1, ...lojas.map((l) => Number(l.credito_troco_acumulado))),
    [lojas],
  );
  const stockDaLoja = (id: string) => stock.filter((s) => s.supermercado_id === id);
  const critico = (id: string) => stockDaLoja(id).some((s) => s.quantidade_disponivel < 5);

  const [patrocinio, setPatrocinio] = useState("500000");
  const [origem, setOrigem] = useState("Sonangol");
  const [injectValor, setInjectValor] = useState<Record<string, string>>({});
  const [localValor, setLocalValor] = useState<Record<string, string>>({});
  const [busca, setBusca] = useState("");
  const [novaFilialOpen, setNovaFilialOpen] = useState(false);
  const [stockLoja, setStockLoja] = useState<Supermercado | null>(null);
  const [novoItem, setNovoItem] = useState<{ tipo: ItemPremio; qtd: string; valor: string }>({
    tipo: "Lapis_de_Cor",
    qtd: "10",
    valor: "1000",
  });

  const itemDoTier = (tier: string) =>
    premios.find((p) => p.tier === tier)?.tipo_item ?? "Kit_Bronze";

  const exportarPdf = () => {
    const porItem = new Map<string, number>();
    for (const s of stock) {
      porItem.set(s.tipo_item, (porItem.get(s.tipo_item) ?? 0) + Number(s.quantidade_disponivel));
    }
    gerarRelatorioImpacto({
      totalAlunos: metricas.totalAlunos,
      mediaLicoes: metricas.mediaLicoes,
      totalLicoes: metricas.totalLicoes,
      totalXp: metricas.totalXp,
      porClasse: metricas.porClasse,
      faturamentoMarcas: metricas.faturamentoMarcas,
      retencaoSoftware: Number(conta?.retencao_lucro_software_10 ?? 0),
      fundoDisponivel: Number(conta?.saldo_disponivel_distribuicao ?? 0),
      totalArrecadado: Number(conta?.saldo_total_arrecadado ?? 0),
      lojasActivas: lojas.filter((l) => l.ativo !== false).length,
      totalStock: stock.reduce((a, s) => a + Number(s.quantidade_disponivel), 0),
      stockPorItem: [...porItem.entries()]
        .map(([item, quantidade]) => ({ item, quantidade }))
        .sort((a, b) => b.quantidade - a.quantidade),
      marcasActivas: patrocinadores.filter((p) => p.ativo).map((p) => p.nome_marca),
    });
  };

  // Formulário de marca patrocinadora
  const [marca, setMarca] = useState({
    nome: "",
    disciplina: "por",
    valor: "",
    ativo: true,
    pergunta: "",
    opcoes: ["", "", "", ""],
    resposta: 0,
    explicacao: "",
  });

  // Formulário de nova filial
  const [filial, setFilial] = useState({ rede: "", local: "", saldo: "0", email: "" });

  const lojasFiltradas = lojas.filter((l) => {
    const q = busca.trim().toLowerCase();
    if (!q) return true;
    return (
      l.nome_rede.toLowerCase().includes(q) ||
      l.filial_local.toLowerCase().includes(q) ||
      (l.utilizador_gerente ?? "").toLowerCase().includes(q)
    );
  });

  const opcoesPreenchidas = marca.opcoes.every((o) => o.trim().length > 0);

  return (
    <>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Kpi
          icon={<Coins className="h-5 w-5" />}
          label="Faturamento do Software (15%)"
          value={kz(Number(conta?.retencao_lucro_software_10 ?? 0))}
          tone="bg-slate-900 text-white"
        />
        <Kpi
          icon={<PiggyBank className="h-5 w-5" />}
          label="Fundo Escolar Disponível"
          value={kz(Number(conta?.saldo_disponivel_distribuicao ?? 0))}
          tone="bg-emerald-600 text-white"
        />
        <Kpi
          icon={<Store className="h-5 w-5" />}
          label="Total de Lojas Activas"
          value={String(lojas.filter((l) => l.ativo !== false).length)}
          tone="bg-orange-500 text-white"
        />
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-slate-900">
              <FileDown className="h-5 w-5" /> Relatório de Impacto
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Documento corporativo com métricas de alunos, gráficos por classe, stock e
              transparência financeira (85% distribuição / 15% software).
            </p>
          </div>
          <button
            onClick={exportarPdf}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
          >
            <FileDown className="h-4 w-4" /> Exportar Relatório de Impacto (PDF)
          </button>
        </div>
      </section>

      {/* ---------- ROTATIVIDADE DE PRÉMIOS ---------- */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-slate-900">
          <Trophy className="h-5 w-5" /> 🎁 Rotatividade dos Prémios
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Define que material físico corresponde a cada categoria. A alteração aparece de imediato
          no app dos alunos e passa a ser o item descontado no balcão.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div key={tier} className="rounded-xl border-2 border-slate-200 p-4">
              <p className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-900">
                Kit {tier.toLowerCase()}
              </p>
              <select
                value={itemDoTier(tier)}
                disabled={busy}
                onChange={(e) => {
                  const tipoItem = e.target.value as ItemPremio;
                  void run(
                    () =>
                      mudarPremio({
                        data: {
                          pin,
                          tier,
                          tipoItem,
                          nomeVisivel: NOME_ITEM[tipoItem] ?? tipoItem.replace(/_/g, " "),
                        },
                      }),
                    `Kit ${tier.toLowerCase()} passa a dar: ${NOME_ITEM[tipoItem] ?? tipoItem}.`,
                  );
                }}
                className="mt-3 w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
              >
                {ITENS_DISPONIVEIS.map((it) => (
                  <option key={it} value={it}>
                    {NOME_ITEM[it] ?? it.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-slate-400">
                Visível para o aluno: {premios.find((p) => p.tier === tier)?.nome_visivel ?? "—"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CAMPANHAS E PATROCINADORES ---------- */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-slate-900">
          <Megaphone className="h-5 w-5" /> 📢 Campanhas e Patrocinadores Activos
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Marcas activas injectam automaticamente uma pergunta temática no quiz da disciplina alvo.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {patrocinadores.length === 0 && (
            <p className="text-sm text-slate-400">Ainda sem campanhas registadas.</p>
          )}
          {patrocinadores.map((p) => (
            <article
              key={p.id}
              className={`rounded-xl border p-4 ${
                p.ativo ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-base font-extrabold text-slate-900">{p.nome_marca}</h3>
                  <p className="text-xs font-semibold text-slate-500">
                    {DISCIPLINAS.find((d) => d.id === p.disciplina_alvo)?.nome ?? p.disciplina_alvo} ·{" "}
                    {kz(Number(p.valor_patrocinio))}
                  </p>
                </div>
                <button
                  disabled={busy}
                  onClick={() =>
                    run(
                      () => toggleMarca({ data: { pin, id: p.id, ativo: !p.ativo } }),
                      `Campanha ${p.nome_marca} ${p.ativo ? "desactivada" : "activada"}.`,
                    )
                  }
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    p.ativo ? "bg-emerald-600 text-white" : "bg-slate-300 text-slate-700"
                  }`}
                >
                  {p.ativo ? "Activo" : "Inactivo"}
                </button>
              </div>
              {p.pergunta && <p className="mt-3 text-xs text-slate-600">“{p.pergunta}”</p>}
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-xl border-2 border-dashed border-slate-200 p-4">
          <h3 className="font-display text-sm font-extrabold text-slate-700">Cadastrar nova marca</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-4">
            <input
              value={marca.nome}
              onChange={(e) => setMarca({ ...marca, nome: e.target.value })}
              placeholder="Nome da marca (ex: BIC)"
              className="rounded-xl border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
            />
            <select
              value={marca.disciplina}
              onChange={(e) => setMarca({ ...marca, disciplina: e.target.value })}
              className="rounded-xl border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
            >
              {DISCIPLINAS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nome}
                </option>
              ))}
            </select>
            <input
              value={marca.valor}
              onChange={(e) => setMarca({ ...marca, valor: e.target.value.replace(/\D/g, "") })}
              placeholder="Valor do patrocínio (Kz)"
              className="rounded-xl border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
            />
            <select
              value={marca.ativo ? "1" : "0"}
              onChange={(e) => setMarca({ ...marca, ativo: e.target.value === "1" })}
              className="rounded-xl border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
            >
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>

          <input
            value={marca.pergunta}
            onChange={(e) => setMarca({ ...marca, pergunta: e.target.value })}
            placeholder="Pergunta patrocinada (opcional) — ex: Na frase 'Escrevi com a minha esferográfica BIC', qual é o verbo?"
            className="mt-3 w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
          />
          <div className="mt-3 grid gap-3 md:grid-cols-4">
            {marca.opcoes.map((o, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="resposta-marca"
                  checked={marca.resposta === idx}
                  onChange={() => setMarca({ ...marca, resposta: idx })}
                  title="Resposta correcta"
                />
                <input
                  value={o}
                  onChange={(e) => {
                    const opcoes = [...marca.opcoes];
                    opcoes[idx] = e.target.value;
                    setMarca({ ...marca, opcoes });
                  }}
                  placeholder={`Opção ${idx + 1}`}
                  className="w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
                />
              </div>
            ))}
          </div>
          <input
            value={marca.explicacao}
            onChange={(e) => setMarca({ ...marca, explicacao: e.target.value })}
            placeholder="Explicação mostrada ao aluno (opcional)"
            className="mt-3 w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
          />
          <button
            disabled={busy || !marca.nome.trim()}
            onClick={() =>
              run(async () => {
                const temPergunta = marca.pergunta.trim().length > 0 && opcoesPreenchidas;
                await novaMarca({
                  data: {
                    pin,
                    nomeMarca: marca.nome.trim(),
                    disciplinaAlvo: marca.disciplina,
                    valor: Number(marca.valor || 0),
                    ativo: marca.ativo,
                    ...(temPergunta
                      ? {
                          pergunta: marca.pergunta.trim(),
                          opcoes: marca.opcoes.map((o) => o.trim()),
                          respostaIndex: marca.resposta,
                          explicacao: marca.explicacao.trim() || undefined,
                        }
                      : {}),
                  },
                });
                setMarca({
                  nome: "",
                  disciplina: "por",
                  valor: "",
                  ativo: true,
                  pergunta: "",
                  opcoes: ["", "", "", ""],
                  resposta: 0,
                  explicacao: "",
                });
              }, "Marca patrocinadora cadastrada.")
            }
            className="mt-4 rounded-xl bg-slate-900 px-5 py-2 text-sm font-bold text-white disabled:opacity-40"
          >
            Cadastrar marca
          </button>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-slate-900">
          <Banknote className="h-5 w-5" /> Registar Grande Patrocínio
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          15% ficam como retenção do software e 85% entram no fundo escolar de distribuição.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <input
            value={origem}
            onChange={(e) => setOrigem(e.target.value)}
            placeholder="Empresa patrocinadora"
            className="min-w-48 flex-1 rounded-xl border-2 border-slate-200 px-4 py-2 outline-none focus:border-slate-900"
          />
          <input
            value={patrocinio}
            onChange={(e) => setPatrocinio(e.target.value.replace(/\D/g, ""))}
            placeholder="Valor em Kz"
            className="w-40 rounded-xl border-2 border-slate-200 px-4 py-2 outline-none focus:border-slate-900"
          />
          <button
            disabled={busy || !Number(patrocinio) || !origem.trim()}
            onClick={() =>
              run(
                () => sponsor({ data: { pin, origem: origem.trim(), valor: Number(patrocinio) } }),
                "Patrocínio registado: 15% retidos, 85% para o fundo escolar.",
              )
            }
            className="rounded-xl bg-slate-900 px-5 py-2 font-semibold text-white disabled:opacity-40"
          >
            Registar
          </button>
        </div>
      </section>

      {/* ---------- PARCEIROS ---------- */}
      <section className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-extrabold text-slate-900">Parceiros em Angola</h2>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Pesquisar por rede ou bairro..."
                className="w-56 bg-transparent text-sm outline-none"
              />
            </div>
            <button
              onClick={() => setNovaFilialOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white"
            >
              <Plus className="h-4 w-4" /> ➕ Cadastrar Nova Filial
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {lojasFiltradas.length === 0 && (
            <p className="text-sm text-slate-400">Nenhuma filial corresponde à pesquisa.</p>
          )}
          {lojasFiltradas.map((l) => {
            const alerta = critico(l.id);
            const suspensa = l.ativo === false;
            return (
              <article
                key={l.id}
                className={`rounded-2xl border bg-white p-5 ${
                  suspensa
                    ? "border-slate-300 opacity-70"
                    : alerta
                      ? "animate-pulse border-red-400 ring-2 ring-red-300"
                      : "border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="flex items-center gap-2 font-display text-lg font-extrabold text-slate-900">
                      <Building2 className="h-5 w-5 text-slate-400" />
                      {l.nome_rede} · {l.filial_local}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400">
                      Gerente: {l.utilizador_gerente ?? "—"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {suspensa && (
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-white">
                        Filial suspensa
                      </span>
                    )}
                    {alerta && !suspensa && (
                      <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                        <AlertTriangle className="h-3.5 w-3.5" /> Stock crítico
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-2xl font-extrabold text-slate-900">
                  {kz(Number(l.credito_troco_acumulado))}
                </p>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{
                      width: `${Math.max(3, (Number(l.credito_troco_acumulado) / maxCredito) * 100)}%`,
                    }}
                  />
                </div>

                <ul className="mt-4 space-y-1.5">
                  {stockDaLoja(l.id).map((s) => (
                    <li key={s.id} className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-600">{s.tipo_item.replace(/_/g, " ")}</span>
                      <span
                        className={`rounded-lg px-2 py-0.5 text-xs font-bold ${
                          s.quantidade_disponivel < 5
                            ? "bg-red-100 text-red-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {s.quantidade_disponivel} un.
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setStockLoja(l)}
                    className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700"
                  >
                    <Package className="h-4 w-4" /> ✏️ Gerir Stock
                  </button>
                  <button
                    disabled={busy}
                    onClick={() =>
                      run(
                        () => toggleFilial({ data: { pin, supermercadoId: l.id, ativo: suspensa } }),
                        suspensa
                          ? `${l.nome_rede} ${l.filial_local} reactivada.`
                          : `${l.nome_rede} ${l.filial_local} suspensa — balcão bloqueado.`,
                      )
                    }
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white disabled:opacity-40 ${
                      suspensa ? "bg-emerald-600" : "bg-red-600"
                    }`}
                  >
                    <ShieldOff className="h-4 w-4" /> {suspensa ? "Reactivar Filial" : "🔒 Suspender Filial"}
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <input
                    value={injectValor[l.id] ?? ""}
                    onChange={(e) =>
                      setInjectValor((v) => ({ ...v, [l.id]: e.target.value.replace(/\D/g, "") }))
                    }
                    placeholder="Kz do fundo"
                    className="w-32 rounded-xl border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
                  />
                  <button
                    disabled={busy || !Number(injectValor[l.id])}
                    onClick={() =>
                      run(
                        () =>
                          inject({ data: { pin, supermercadoId: l.id, valor: Number(injectValor[l.id]) } }),
                        "Crédito injectado com sucesso.",
                      )
                    }
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-40"
                  >
                    Injectar Crédito do Fundo Central
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  <input
                    value={localValor[l.id] ?? ""}
                    onChange={(e) =>
                      setLocalValor((v) => ({ ...v, [l.id]: e.target.value.replace(/\D/g, "") }))
                    }
                    placeholder="Troco na caixa"
                    className="w-32 rounded-xl border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
                  />
                  <button
                    disabled={busy || !Number(localValor[l.id])}
                    onClick={() =>
                      run(
                        () =>
                          local({
                            data: {
                              supermercadoId: l.id,
                              valor: Number(localValor[l.id]),
                              tipo: "Troco_Caixa",
                              origem: `Clientes ${l.filial_local}`,
                            },
                          }),
                        "Doação local somada ao crédito da loja.",
                      )
                    }
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-40"
                  >
                    Doação Troco de Caixa
                  </button>
                  <button
                    disabled={busy || !Number(localValor[l.id])}
                    onClick={() =>
                      run(
                        () =>
                          local({
                            data: {
                              supermercadoId: l.id,
                              valor: Number(localValor[l.id]),
                              tipo: "Express_Local",
                              origem: `Express ${l.filial_local}`,
                            },
                          }),
                        "Doação local somada ao crédito da loja.",
                      )
                    }
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-40"
                  >
                    Express Local
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ---------- MÉTRICAS DE IMPACTO ---------- */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-display text-lg font-extrabold text-slate-900">Métricas de Impacto Escolar</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Kpi
            icon={<Users className="h-5 w-5" />}
            label="Total de Alunos Cadastrados"
            value={String(metricas.totalAlunos)}
            tone="bg-sky-600 text-white"
          />
          <Kpi
            icon={<GraduationCap className="h-5 w-5" />}
            label="Média de Lições Concluídas"
            value={metricas.mediaLicoes.toFixed(1)}
            tone="bg-violet-600 text-white"
          />
          <Kpi
            icon={<Megaphone className="h-5 w-5" />}
            label="Faturamento das Marcas Patrocinadoras"
            value={kz(metricas.faturamentoMarcas)}
            tone="bg-amber-500 text-white"
          />
        </div>
        <div className="mt-5 space-y-2">
          {patrocinadores
            .filter((p) => p.ativo)
            .map((p) => {
              const max = Math.max(1, ...patrocinadores.map((x) => Number(x.valor_patrocinio)));
              return (
                <div key={p.id}>
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>{p.nome_marca}</span>
                    <span>{kz(Number(p.valor_patrocinio))}</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{ width: `${Math.max(3, (Number(p.valor_patrocinio) / max) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-display text-lg font-extrabold text-slate-900">Últimas transações</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="py-2">Tipo</th>
                <th>Origem</th>
                <th className="text-right">Valor</th>
                <th className="text-right">Data</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-400">
                    Ainda sem movimentos registados.
                  </td>
                </tr>
              )}
              {transacoes.map((t) => (
                <tr key={t.id} className="border-t border-slate-100">
                  <td className="py-2 font-semibold text-slate-700">{t.tipo_doacao.replace(/_/g, " ")}</td>
                  <td className="text-slate-500">{t.origem_doador}</td>
                  <td className="text-right font-bold text-slate-900">{kz(Number(t.valor_kwanza))}</td>
                  <td className="text-right text-slate-400">
                    {new Date(t.data_registo).toLocaleDateString("pt-PT")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {novaFilialOpen && (
        <Modal title="➕ Cadastrar Nova Filial" onClose={() => setNovaFilialOpen(false)}>
          <div className="grid gap-3">
            <input
              value={filial.rede}
              onChange={(e) => setFilial({ ...filial, rede: e.target.value })}
              placeholder="Nome da rede (ex: Shoprite)"
              className="rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
            <input
              value={filial.local}
              onChange={(e) => setFilial({ ...filial, local: e.target.value })}
              placeholder="Filial / bairro (ex: Viana)"
              className="rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
            <input
              value={filial.saldo}
              onChange={(e) => setFilial({ ...filial, saldo: e.target.value.replace(/\D/g, "") })}
              placeholder="Saldo inicial em Kz (padrão 0)"
              className="rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
            <input
              value={filial.email}
              onChange={(e) => setFilial({ ...filial, email: e.target.value })}
              placeholder="Email do gerente"
              className="rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
            <button
              disabled={busy || !filial.rede.trim() || !filial.local.trim()}
              onClick={() =>
                run(async () => {
                  await novaFilial({
                    data: {
                      pin,
                      nomeRede: filial.rede.trim(),
                      filialLocal: filial.local.trim(),
                      saldoInicial: Number(filial.saldo || 0),
                      emailGerente: filial.email.trim(),
                    },
                  });
                  setFilial({ rede: "", local: "", saldo: "0", email: "" });
                  setNovaFilialOpen(false);
                }, "Nova filial cadastrada com stock inicial a zero.")
              }
              className="rounded-xl bg-emerald-600 py-3 font-bold text-white disabled:opacity-40"
            >
              Guardar filial
            </button>
          </div>
        </Modal>
      )}

      {stockLoja && (
        <Modal
          title={`✏️ Gerir Stock · ${stockLoja.nome_rede} ${stockLoja.filial_local}`}
          onClose={() => setStockLoja(null)}
        >
          <div className="grid gap-3">
            {stockDaLoja(stockLoja.id).map((s) => (
              <StockRow
                key={s.id}
                item={s}
                busy={busy}
                onSave={(q) =>
                  run(
                    () => mudarStock({ data: { pin, stockId: s.id, quantidade: q } }),
                    `Stock de ${s.tipo_item.replace(/_/g, " ")} actualizado para ${q} un.`,
                  )
                }
              />
            ))}
            {stockDaLoja(stockLoja.id).length === 0 && (
              <p className="text-sm text-slate-400">Esta filial ainda não tem prémios configurados.</p>
            )}

            <div className="rounded-xl border-2 border-dashed border-slate-300 p-4">
              <p className="font-display text-sm font-extrabold text-slate-900">
                ➕ Adicionar novo tipo de material
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <select
                  value={novoItem.tipo}
                  onChange={(e) => setNovoItem({ ...novoItem, tipo: e.target.value as ItemPremio })}
                  className="rounded-xl border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
                >
                  {ITENS_DISPONIVEIS.map((it) => (
                    <option key={it} value={it}>
                      {NOME_ITEM[it] ?? it.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
                <input
                  value={novoItem.qtd}
                  onChange={(e) => setNovoItem({ ...novoItem, qtd: e.target.value.replace(/\D/g, "") })}
                  placeholder="Quantidade"
                  className="rounded-xl border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
                />
                <input
                  value={novoItem.valor}
                  onChange={(e) => setNovoItem({ ...novoItem, valor: e.target.value.replace(/\D/g, "") })}
                  placeholder="Valor comercial (Kz)"
                  className="rounded-xl border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
                />
              </div>
              <button
                disabled={busy}
                onClick={() =>
                  run(
                    () =>
                      novoItemStock({
                        data: {
                          pin,
                          supermercadoId: stockLoja.id,
                          tipoItem: novoItem.tipo,
                          quantidade: Number(novoItem.qtd || 0),
                          valorComercialKz: Number(novoItem.valor || 0),
                        },
                      }),
                    `${NOME_ITEM[novoItem.tipo] ?? novoItem.tipo} disponível nesta filial.`,
                  )
                }
                className="mt-3 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-40"
              >
                Adicionar ao stock
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function StockRow({
  item,
  busy,
  onSave,
}: {
  item: StockItem;
  busy: boolean;
  onSave: (quantidade: number) => void;
}) {
  const [q, setQ] = useState(String(item.quantidade_disponivel));
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
      <div>
        <p className="font-display text-sm font-extrabold text-slate-900">
          {item.tipo_item.replace(/_/g, " ")}
        </p>
        <p className="text-xs text-slate-500">
          {item.quantidade_disponivel} un. em stock ·{" "}
          {item.quantidade_disponivel < 5 ? "⚠️ crítico" : "✅ saudável"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value.replace(/\D/g, ""))}
          className="w-20 rounded-xl border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
        />
        <button
          disabled={busy || q === ""}
          onClick={() => onSave(Number(q))}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white disabled:opacity-40"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 px-4 py-8">
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-lg font-extrabold text-slate-900">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

function Kpi({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className={`rounded-2xl p-5 ${tone}`}>
      <div className="flex items-center gap-2 text-sm font-semibold opacity-90">
        {icon}
        {label}
      </div>
      <p className="mt-3 font-display text-3xl font-extrabold">{value}</p>
    </div>
  );
}