import { useEffect, useMemo, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  Gift,
  Lock,
  MapPin,
  PartyPopper,
  ShieldCheck,
  Store,
  Timer,
  Trophy,
  X,
} from "lucide-react";
import { getMixedQuestions } from "./data";
import {
  getLojasParceiras,
  getPremiosConfig,
  registarResgate,
} from "@/lib/almara-backend.functions";
import { confetes, somAcerto, somErro, somVitoria } from "@/lib/feedback";
import {
  PRIZES,
  SEGUNDOS_POR_PERGUNTA,
  formatarCooldown,
  generateRedemption,
  getDeviceId,
  isPrizeUnlocked,
  prizeProgressLabel,
  qrPayload,
  registarTentativa,
  tempoRestanteCooldown,
  type Prize,
} from "./prizes";
import type { AppState, QuizQuestion, Redemption } from "./types";

type Loja = { id: string; nome_rede: string; filial_local: string };

const nomeCompletoLoja = (l: Loja) => `${l.nome_rede} — ${l.filial_local}`;

export function Prizes({
  state,
  onBack,
  onRedeem,
}: {
  state: AppState;
  onBack: () => void;
  onRedeem: (r: Redemption) => void;
}) {
  const [challenge, setChallenge] = useState<Prize | null>(null);
  const [escolherLoja, setEscolherLoja] = useState<Prize | null>(null);
  const [ticket, setTicket] = useState<Redemption | null>(null);
  const [itens, setItens] = useState<Record<string, string>>({});
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [agora, setAgora] = useState(() => Date.now());
  const carregarConfig = useServerFn(getPremiosConfig);
  const carregarLojas = useServerFn(getLojasParceiras);
  const guardarResgate = useServerFn(registarResgate);

  // Item físico atribuído a cada categoria esta semana (definido pelo administrador).
  useEffect(() => {
    void (async () => {
      try {
        const config = await carregarConfig();
        const mapa: Record<string, string> = {};
        for (const c of config) mapa[c.tier] = c.nome_visivel;
        setItens(mapa);
      } catch {
        // offline-first: mostra o item padrão
      }
      try {
        setLojas((await carregarLojas()) as Loja[]);
      } catch {
        // sem lista de filiais o aluno vê apenas a marca patrocinadora
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Actualiza os contadores da trava de 4 horas.
  useEffect(() => {
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  /** Filiais da rede que patrocina este prémio (ex.: Kero Kilamba, Kero Viana). */
  const filiaisDoPatrocinador = (p: Prize) => {
    const alvo = p.sponsor.toLowerCase();
    const proprias = lojas.filter((l) => l.nome_rede.toLowerCase().includes(alvo));
    return proprias.length > 0 ? proprias : lojas;
  };

  const concluirResgate = (prize: Prize, loja: Loja | null) => {
    const r = generateRedemption(
      prize,
      loja ? { id: loja.id, nome: nomeCompletoLoja(loja) } : undefined,
    );
    onRedeem(r);
    setTicket(r);
    setEscolherLoja(null);
    setChallenge(null);
    confetes(true);
    somVitoria();
    void guardarResgate({
      data: {
        deviceId: getDeviceId().padEnd(6, "0"),
        nomeAluno: state.name || "Estudante Almara",
        classe: state.grade,
        premioNome: prize.name,
        tier: prize.tier,
        supermercadoId: loja?.id ?? null,
        nomeLoja: loja ? nomeCompletoLoja(loja) : `${prize.sponsor} — filial a indicar`,
        codigo: r.code,
      },
    }).catch(() => undefined);
  };

  if (ticket) {
    return <TicketScreen ticket={ticket} onBack={() => { setTicket(null); setChallenge(null); }} />;
  }

  if (escolherLoja) {
    const opcoes = filiaisDoPatrocinador(escolherLoja);
    return (
      <div className="min-h-screen bg-background pb-12">
        <header className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => { setEscolherLoja(null); setChallenge(null); setAgora(Date.now()); }}
            className="btn-press grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-lg font-extrabold text-foreground">Escolhe a filial</h1>
        </header>
        <div className="px-5">
          <p className="text-sm font-semibold text-muted-foreground">
            Onde queres levantar o teu <strong>{escolherLoja.name}</strong>? O vale só é válido na
            filial que escolheres.
          </p>
          <div className="mt-4 space-y-3">
            {opcoes.map((l) => (
              <button
                key={l.id}
                onClick={() => concluirResgate(escolherLoja, l)}
                className="card-3d btn-press flex w-full items-center gap-3 rounded-2xl border-2 border-border bg-card p-4 text-left"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Store className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-extrabold text-foreground">{l.nome_rede}</p>
                  <p className="flex items-center gap-1 truncate text-[11px] font-semibold text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {l.filial_local}
                  </p>
                </div>
              </button>
            ))}
            {opcoes.length === 0 && (
              <button
                onClick={() => concluirResgate(escolherLoja, null)}
                className="btn-press w-full rounded-2xl bg-primary py-3 font-display text-sm font-extrabold text-primary-foreground"
              >
                Gerar vale sem filial definida
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (challenge) {
    return (
      <FinalChallenge
        prize={challenge}
        state={state}
        onCancel={() => { setAgora(Date.now()); setChallenge(null); }}
        onPass={(prize) => setEscolherLoja(prize)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur">
        <button onClick={onBack} className="btn-press grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground" aria-label="Voltar">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-lg font-extrabold text-foreground">Missões Solidárias</h1>
        <Gift className="ml-auto h-5 w-5 text-primary" />
      </header>

      <div className="px-5 pt-5">
        <p className="text-sm font-semibold text-muted-foreground">
          Estuda, cumpre a missão e levanta material escolar real nos supermercados parceiros. 🎁
        </p>
        <p className="mt-2 rounded-2xl bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground">
          Nas provas de prémio tens <strong>{SEGUNDOS_POR_PERGUNTA} segundos</strong> por pergunta e só
          podes tentar <strong>uma vez a cada 4 horas</strong>.
        </p>
      </div>

      <div className="mt-4 space-y-4 px-5">
        {PRIZES.map((p) => {
          const unlocked = isPrizeUnlocked(p, state);
          const already = state.redemptions?.find((r) => r.prizeId === p.id);
          const restante = already ? 0 : tempoRestanteCooldown(p.id);
          const emEspera = restante > 0;
          const filiais = filiaisDoPatrocinador(p);
          void agora; // força recálculo a cada segundo
          return (
            <div
              key={p.id}
              className={`card-3d relative overflow-hidden rounded-3xl p-5 ${unlocked ? p.bg : "bg-muted"}`}
            >
              <div className="flex items-center gap-3">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${unlocked ? "bg-white/20 text-white" : "bg-background text-muted-foreground"}`}>
                  {unlocked ? <Trophy className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`font-display text-xl font-extrabold ${unlocked ? "text-white" : "text-muted-foreground"}`}>{p.name}</p>
                  <p className={`truncate text-sm font-semibold ${unlocked ? "text-white/85" : "text-muted-foreground"}`}>
                    {itens[p.code] ?? p.items}
                  </p>
                </div>
              </div>
              <p className={`mt-3 text-[11px] font-bold uppercase tracking-wider ${unlocked ? "text-white/80" : "text-muted-foreground"}`}>
                Patrocinado por {p.sponsor} · {p.requirement} · prova de {p.perguntas} perguntas
              </p>

              {/* Filiais concretas onde este prémio pode ser levantado. */}
              <div
                className={`mt-2 rounded-2xl px-3 py-2 text-[11px] font-semibold ${
                  unlocked ? "bg-white/15 text-white/90" : "bg-background/60 text-muted-foreground"
                }`}
              >
                <span className="flex items-center gap-1 font-bold uppercase tracking-wider">
                  <MapPin className="h-3 w-3" /> Levantamento em
                </span>
                <span className="mt-0.5 block">
                  {filiais.length > 0
                    ? filiais.map((l) => `${l.nome_rede} ${l.filial_local}`).join(" · ")
                    : "Filiais parceiras a confirmar"}
                </span>
              </div>

              <p className={`mt-2 text-xs font-semibold ${unlocked ? "text-white/85" : "text-muted-foreground"}`}>
                {prizeProgressLabel(p, state)}
              </p>

              {already ? (
                <button
                  onClick={() => setTicket(already)}
                  className="btn-press mt-4 w-full rounded-2xl bg-white py-3 font-display text-sm font-extrabold text-foreground"
                >
                  Ver o meu QR Code
                </button>
              ) : (
                <button
                  disabled={!unlocked || emEspera}
                  onClick={() => setChallenge(p)}
                  className={`btn-press mt-4 w-full rounded-2xl py-3 font-display text-sm font-extrabold ${
                    unlocked && !emEspera ? "bg-white text-foreground" : "cursor-not-allowed bg-background/70 text-muted-foreground"
                  }`}
                >
                  {emEspera
                    ? `Próxima tentativa disponível em ${formatarCooldown(restante)}`
                    : unlocked
                      ? "Resgatar Desafio do Patrocinador"
                      : "Bloqueado"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FinalChallenge({
  prize,
  state,
  onCancel,
  onPass,
}: {
  prize: Prize;
  state: AppState;
  onCancel: () => void;
  onPass: (p: Prize) => void;
}) {
  const [questions] = useState<QuizQuestion[]>(() =>
    getMixedQuestions(state.grade ?? "6ª", prize.perguntas),
  );
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [expirou, setExpirou] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [restante, setRestante] = useState(SEGUNDOS_POR_PERGUNTA);
  const registado = useRef(false);

  const q = questions[i];
  const pct = useMemo(
    () => Math.round((correct / questions.length) * 100),
    [correct, questions.length],
  );

  // Cronómetro regressivo de 20 segundos por pergunta.
  useEffect(() => {
    if (done || picked !== null || expirou) return;
    setRestante(SEGUNDOS_POR_PERGUNTA);
    const inicio = Date.now();
    const t = setInterval(() => {
      const passados = Math.floor((Date.now() - inicio) / 1000);
      const falta = SEGUNDOS_POR_PERGUNTA - passados;
      setRestante(falta);
      if (falta <= 0) {
        clearInterval(t);
        setExpirou(true); // tempo esgotado → pergunta conta como errada
        somErro();
      }
    }, 250);
    return () => clearInterval(t);
  }, [i, done, picked, expirou]);

  const avancar = () => {
    if (i + 1 >= questions.length) setDone(true);
    else {
      setI(i + 1);
      setPicked(null);
      setExpirou(false);
    }
  };

  if (done) {
    const passed = pct > 80;
    // Falhou → arranca a trava de 4 horas para este prémio.
    if (!passed && !registado.current) {
      registado.current = true;
      registarTentativa(prize.id);
    }
    return (
      <div className="min-h-screen bg-background px-6 py-16 text-center">
        <div className={`mx-auto grid h-24 w-24 place-items-center rounded-full ${passed ? "bg-emerald-100 text-emerald-600" : "bg-muted text-muted-foreground"}`}>
          {passed ? <PartyPopper className="h-12 w-12" /> : <X className="h-12 w-12" />}
        </div>
        <h2 className="mt-5 font-display text-2xl font-extrabold text-foreground">
          {passed ? "Parabéns, conseguiste!" : "Quase lá!"}
        </h2>
        <p className="mt-2 text-sm font-semibold text-muted-foreground">
          Acertaste {correct} de {questions.length} ({pct}%).{" "}
          {passed
            ? "O teu prémio está desbloqueado."
            : "Precisas de mais de 80% para resgatar. Podes tentar de novo daqui a 4 horas."}
        </p>
        <button
          onClick={() => (passed ? onPass(prize) : onCancel())}
          className="btn-press mt-8 w-full rounded-2xl bg-primary py-4 font-display text-base font-extrabold text-primary-foreground"
        >
          {passed ? "Escolher filial e gerar QR Code" : "Voltar aos prémios"}
        </button>
      </div>
    );
  }

  const revelar = picked !== null || expirou;
  const urgente = restante <= 5;

  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="flex items-center gap-3 px-4 py-3">
        <button onClick={onCancel} className="btn-press grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground" aria-label="Sair">
          <X className="h-5 w-5" />
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((i + (revelar ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>
        <span className="font-display text-sm font-extrabold text-muted-foreground">{i + 1}/{questions.length}</span>
      </header>

      {/* Cronómetro regressivo de 20 segundos */}
      <div className="px-5">
        <div className="flex items-center gap-3">
          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-display text-sm font-extrabold ${
              urgente && !revelar ? "bg-destructive text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            <Timer className="h-4 w-4" /> {Math.max(0, restante)}s
          </span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all duration-300 ${urgente ? "bg-destructive" : "bg-emerald-500"}`}
              style={{ width: `${(Math.max(0, restante) / SEGUNDOS_POR_PERGUNTA) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="px-5 pt-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Prova final · {prize.name}</p>
        <h2 className="mt-2 font-display text-xl font-extrabold text-foreground">{q.question}</h2>
        <div className="mt-5 space-y-3">
          {q.options.map((opt, idx) => {
            const isPicked = picked === idx;
            const isRight = idx === q.answerIndex;
            return (
              <button
                key={idx}
                disabled={revelar}
                onClick={() => {
                  setPicked(idx);
                  if (isRight) {
                    setCorrect((c) => c + 1);
                    somAcerto();
                  } else {
                    somErro();
                  }
                }}
                className={`btn-press w-full rounded-2xl border-2 p-4 text-left font-semibold ${
                  revelar && isRight
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                    : isPicked
                      ? "border-destructive bg-[color-mix(in_oklab,var(--destructive)_10%,transparent)] text-destructive"
                      : "border-border bg-card text-foreground"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {revelar && (
          <div className="animate-fade-in mt-5 rounded-2xl border-2 border-border bg-card p-4">
            {expirou && picked === null && (
              <p className="mb-2 font-display text-sm font-extrabold text-destructive">
                ⏰ Tempo esgotado — esta pergunta conta como errada.
              </p>
            )}
            <p className="text-sm font-semibold text-muted-foreground">{q.explain}</p>
            <button
              onClick={avancar}
              className="btn-press mt-4 w-full rounded-2xl bg-primary py-3 font-display text-sm font-extrabold text-primary-foreground"
            >
              {i + 1 >= questions.length ? "Ver resultado" : "Continuar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TicketScreen({ ticket, onBack }: { ticket: Redemption; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="flex items-center gap-3 px-4 py-3">
        <button onClick={onBack} className="btn-press grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground" aria-label="Voltar">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-lg font-extrabold text-foreground">O teu vale</h1>
      </header>

      <div className="px-5">
        <div className="card-3d rounded-3xl border-2 border-border bg-card p-6 text-center">
          <ShieldCheck className="mx-auto h-8 w-8 text-emerald-600" />
          <p className="mt-2 font-display text-xl font-extrabold text-foreground">{ticket.prizeName}</p>
          {ticket.lojaNome && (
            <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 font-display text-xs font-extrabold text-emerald-800">
              <MapPin className="h-3 w-3" /> {ticket.lojaNome}
            </p>
          )}
          <p className="mt-2 text-sm font-semibold text-muted-foreground">
            Mostra este código no balcão da filial indicada.
          </p>
          <div className="mx-auto mt-5 w-fit rounded-2xl bg-white p-4">
            <QRCodeSVG value={qrPayload(ticket)} size={196} level="M" />
          </div>
          <p className="mt-4 font-display text-lg font-extrabold tracking-wider text-foreground">{ticket.code}</p>
          <p className="mt-1 text-xs font-semibold text-muted-foreground">
            Válido até {new Date(ticket.expiresAt).toLocaleDateString("pt-PT")} · {ticket.used ? "JÁ UTILIZADO" : "Por utilizar"}
          </p>
        </div>
        <p className="mt-4 text-center text-xs font-semibold text-muted-foreground">
          Cada código é único ao teu aparelho e só pode ser usado uma vez.
        </p>
      </div>
    </div>
  );
}
