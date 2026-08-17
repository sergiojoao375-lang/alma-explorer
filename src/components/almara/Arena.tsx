import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Coins,
  Swords,
  Trophy,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { SUBJECTS, isSubjectAvailable, getDuelQuestions } from "./data";
import type { Grade, QuizQuestion } from "./types";

const BETS = [10, 20, 50];
const BOT_ACCURACY = 0.7;

const OPPONENTS = [
  "Kiala — Luanda",
  "Nzinga — Benguela",
  "Mateus — Huíla",
  "Adilson — Huambo",
  "Lueji — Malanje",
  "Domingas — Cabinda",
  "Nvula — Uíge",
  "Teresa — Namibe",
  "Kudi — Bié",
  "Joaquim — Cuanza Sul",
];

type Phase = "setup" | "searching" | "duel" | "result";

export function Arena({
  playerName,
  grade,
  coins,
  onBack,
  onSettle,
}: {
  playerName: string;
  grade: Grade;
  coins: number;
  onBack: () => void;
  /** delta de moedas: −aposta na derrota/empate parcial, +aposta na vitória */
  onSettle: (delta: number) => void;
}) {
  const subjects = useMemo(() => SUBJECTS.filter((s) => isSubjectAvailable(s, grade)), [grade]);
  const [phase, setPhase] = useState<Phase>("setup");
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? "mat");
  const [bet, setBet] = useState(20);
  const [opponent, setOpponent] = useState(OPPONENTS[0]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [myScore, setMyScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [botGotIt, setBotGotIt] = useState(false);

  // Animação "Procurando oponente..." — troca de nomes e arranca ao fim de 3s.
  useEffect(() => {
    if (phase !== "searching") return;
    const spin = setInterval(() => {
      setOpponent(OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)]);
    }, 400);
    const go = setTimeout(() => {
      clearInterval(spin);
      setQuestions(getDuelQuestions(subjectId, grade, 5));
      setPhase("duel");
    }, 3000);
    return () => {
      clearInterval(spin);
      clearTimeout(go);
    };
  }, [phase, subjectId, grade]);

  const subject = SUBJECTS.find((s) => s.id === subjectId) ?? SUBJECTS[0];
  const q = questions[i];
  const isCorrect = q ? selected === q.answerIndex : false;
  const canBet = coins >= bet;

  const startSearch = () => {
    if (!canBet) return;
    onSettle(-bet); // aposta fica retida
    setPhase("searching");
  };

  const handleCheck = () => {
    if (selected === null || !q) return;
    const botHit = Math.random() < BOT_ACCURACY;
    setBotGotIt(botHit);
    if (botHit) setBotScore((s) => s + 1);
    if (selected === q.answerIndex) setMyScore((s) => s + 1);
    setChecked(true);
  };

  const handleNext = () => {
    if (i + 1 >= questions.length) {
      setPhase("result");
      return;
    }
    setI(i + 1);
    setSelected(null);
    setChecked(false);
  };

  if (phase === "setup") {
    return (
      <div className="min-h-screen bg-background pb-10">
        <ArenaHeader coins={coins} onBack={onBack} />
        <div className="px-5 pt-5">
          <div className="card-3d relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 p-5 text-white">
            <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
            <Swords className="h-8 w-8" />
            <h1 className="mt-2 font-display text-2xl font-extrabold">Arena de Duelos</h1>
            <p className="text-sm font-semibold text-white/85">
              5 perguntas, um oponente, moedas em jogo. Ganha e leva o dobro!
            </p>
          </div>

          <h2 className="mt-6 font-display text-sm font-extrabold uppercase tracking-widest text-muted-foreground">
            Disciplina
          </h2>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {subjects.map((s) => (
              <button
                key={s.id}
                onClick={() => setSubjectId(s.id)}
                className={`card-3d btn-press rounded-2xl border-2 p-3 text-left ${
                  subjectId === s.id ? "border-primary bg-brand-soft" : "border-border bg-card"
                }`}
              >
                <span className="text-xl">{s.emoji}</span>
                <p className="mt-1 truncate font-display text-sm font-extrabold text-foreground">
                  {s.name}
                </p>
              </button>
            ))}
          </div>

          <h2 className="mt-6 font-display text-sm font-extrabold uppercase tracking-widest text-muted-foreground">
            Aposta
          </h2>
          <div className="mt-2 flex gap-3">
            {BETS.map((b) => (
              <button
                key={b}
                onClick={() => setBet(b)}
                className={`card-3d btn-press flex flex-1 items-center justify-center gap-1 rounded-2xl border-2 py-3 font-display text-sm font-extrabold ${
                  bet === b
                    ? "border-amber-500 bg-amber-100 text-amber-700"
                    : "border-border bg-card text-foreground"
                }`}
              >
                <Coins className="h-4 w-4" /> {b}
              </button>
            ))}
          </div>

          <button
            disabled={!canBet}
            onClick={startSearch}
            className={`card-3d btn-press mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-display text-base font-extrabold uppercase ${
              canBet ? "bg-primary text-primary-foreground" : "cursor-not-allowed bg-muted text-muted-foreground"
            }`}
          >
            <Swords className="h-5 w-5" />
            {canBet ? "Procurar oponente" : "Moedas insuficientes"}
          </button>
        </div>
      </div>
    );
  }

  if (phase === "searching") {
    return (
      <div className="animate-fade-in flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-brand-soft text-primary">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
        <h2 className="mt-6 font-display text-2xl font-extrabold text-foreground">
          A procurar oponente...
        </h2>
        <p className="animate-pulse-soft mt-3 rounded-full bg-card px-5 py-2 font-display text-sm font-extrabold text-foreground shadow">
          {opponent}
        </p>
        <p className="mt-4 text-xs font-semibold text-muted-foreground">
          {subject.emoji} {subject.name} · aposta de {bet} moedas
        </p>
      </div>
    );
  }

  if (phase === "result") {
    const won = myScore > botScore;
    const draw = myScore === botScore;
    return (
      <DuelResult
        won={won}
        draw={draw}
        myScore={myScore}
        botScore={botScore}
        bet={bet}
        opponent={opponent}
        onDone={() => {
          // Vitória: recebe a aposta de volta + o mesmo valor (dobro). Empate: devolve a aposta.
          if (won) onSettle(bet * 2);
          else if (draw) onSettle(bet);
          onBack();
        }}
      />
    );
  }

  if (!q) return null;

  return (
    <div className="relative flex min-h-screen flex-col bg-background pb-40">
      <div className="sticky top-0 z-30 bg-background/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Fighter name={playerName || "Tu"} score={myScore} side="left" />
          <div className="shrink-0 text-center">
            <Swords className="mx-auto h-5 w-5 text-primary" />
            <p className="font-display text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              {i + 1}/{questions.length}
            </p>
          </div>
          <Fighter name={opponent} score={botScore} side="right" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-md px-5 pt-6">
        <h2 key={i} className="animate-fade-in font-display text-2xl font-extrabold leading-snug text-foreground">
          {q.question}
        </h2>
        <div key={`o-${i}`} className="animate-fade-in mt-6 flex flex-col gap-3">
          {q.options.map((opt, idx) => {
            const isSel = selected === idx;
            const isRight = checked && idx === q.answerIndex;
            const isWrong = checked && isSel && idx !== q.answerIndex;
            return (
              <button
                key={idx}
                disabled={checked}
                onClick={() => setSelected(idx)}
                className={`card-3d btn-press flex items-center gap-3 rounded-2xl border-2 bg-card px-4 py-4 text-left font-semibold transition ${
                  isRight
                    ? "border-[var(--success)] bg-[color-mix(in_oklab,var(--success)_12%,var(--card))]"
                    : isWrong
                      ? "border-destructive bg-[color-mix(in_oklab,var(--destructive)_10%,var(--card))]"
                      : isSel
                        ? "border-primary bg-brand-soft"
                        : "border-border"
                } text-foreground`}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-border font-display text-sm font-extrabold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="min-w-0 flex-1">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40">
        {checked ? (
          <div
            className={`animate-slide-up border-t-2 px-5 py-5 ${
              isCorrect
                ? "border-[var(--success)] bg-[color-mix(in_oklab,var(--success)_12%,var(--background))]"
                : "border-destructive bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))]"
            }`}
          >
            <div className="mx-auto flex max-w-md items-center gap-3">
              <div
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${
                  isCorrect ? "bg-[var(--success)] text-white" : "bg-destructive text-destructive-foreground"
                }`}
              >
                {isCorrect ? <Check className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-extrabold text-foreground">
                  {isCorrect ? "Acertaste!" : "Erraste."}{" "}
                  {botGotIt ? "O oponente também acertou." : "O oponente falhou!"}
                </p>
                <p className="truncate text-xs font-semibold text-muted-foreground">{q.explain}</p>
              </div>
              <button
                onClick={handleNext}
                className={`card-3d btn-press flex shrink-0 items-center gap-1 rounded-2xl px-5 py-3 font-display text-sm font-extrabold uppercase text-white ${
                  isCorrect ? "bg-[var(--success)]" : "bg-destructive"
                }`}
              >
                {i + 1 >= questions.length ? "Resultado" : "Continuar"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="border-t border-border bg-background/95 px-5 py-4 backdrop-blur">
            <button
              disabled={selected === null}
              onClick={handleCheck}
              className={`card-3d btn-press mx-auto flex w-full max-w-md items-center justify-center rounded-2xl px-6 py-4 font-display text-base font-extrabold uppercase tracking-wide ${
                selected === null
                  ? "cursor-not-allowed bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              Verificar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ArenaHeader({ coins, onBack }: { coins: number; onBack: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur">
      <button
        onClick={onBack}
        className="btn-press grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground"
        aria-label="Voltar"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="font-display text-lg font-extrabold text-foreground">Arena</h1>
      <div className="ml-auto flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 font-display text-sm font-extrabold text-amber-700">
        <Coins className="h-4 w-4" /> {coins}
      </div>
    </header>
  );
}

function Fighter({ name, score, side }: { name: string; score: number; side: "left" | "right" }) {
  const initials = name.replace(/[^\p{L} ]/gu, "").trim().slice(0, 2).toUpperCase();
  return (
    <div className={`flex min-w-0 flex-1 items-center gap-2 ${side === "right" ? "flex-row-reverse text-right" : ""}`}>
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl font-display text-sm font-extrabold ${
          side === "left" ? "bg-primary text-primary-foreground" : "bg-violet-500 text-white"
        }`}
      >
        {initials || "?"}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-bold text-muted-foreground">{name}</p>
        <p className="font-display text-lg font-extrabold leading-none text-foreground">{score}</p>
      </div>
    </div>
  );
}

function DuelResult({
  won,
  draw,
  myScore,
  botScore,
  bet,
  opponent,
  onDone,
}: {
  won: boolean;
  draw: boolean;
  myScore: number;
  botScore: number;
  bet: number;
  opponent: string;
  onDone: () => void;
}) {
  return (
    <div
      className={`animate-fade-in flex min-h-screen flex-col items-center justify-center px-6 ${
        won
          ? "bg-gradient-to-b from-[color-mix(in_oklab,var(--success)_18%,var(--background))] via-background to-background"
          : "bg-gradient-to-b from-[color-mix(in_oklab,var(--primary)_14%,var(--background))] via-background to-background"
      }`}
    >
      <div
        className={`grid h-24 w-24 place-items-center rounded-full text-white shadow-xl ${
          won ? "bg-[var(--success)] animate-pulse-soft" : "bg-primary"
        }`}
      >
        {won ? <Trophy className="h-12 w-12" /> : <Swords className="h-12 w-12" />}
      </div>
      <h2 className="mt-6 font-display text-3xl font-extrabold text-foreground">
        {won ? "Vitória! 🏆" : draw ? "Empate!" : "Derrota"}
      </h2>
      <p className="mt-2 max-w-xs text-center text-sm font-semibold text-muted-foreground">
        {won
          ? `Bateste ${opponent}! Ganhaste ${bet * 2} moedas — o dobro da tua aposta.`
          : draw
            ? "Ficou igual! A tua aposta foi devolvida. Treina no Caderno de Erros e volta mais forte."
            : "Desta vez não deu. Revê as perguntas no Caderno de Erros e desafia outro estudante!"}
      </p>

      <div className="mt-6 flex items-center gap-4 rounded-3xl bg-card px-6 py-4 shadow">
        <div className="text-center">
          <p className="font-display text-3xl font-extrabold text-primary">{myScore}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Tu</p>
        </div>
        <span className="font-display text-xl font-extrabold text-muted-foreground">×</span>
        <div className="text-center">
          <p className="font-display text-3xl font-extrabold text-violet-600">{botScore}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Oponente</p>
        </div>
      </div>

      <button
        onClick={onDone}
        className="card-3d btn-press mt-8 flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-display text-base font-extrabold uppercase text-primary-foreground"
      >
        Voltar ao painel
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}
