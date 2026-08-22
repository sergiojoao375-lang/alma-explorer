import { useEffect, useMemo, useState } from "react";
import { X, Check, AlertTriangle, ArrowRight, Heart, Trophy, RotateCcw, Home } from "lucide-react";
import { getQuestions } from "./data";
import { confetes, somAcerto, somErro, somVitoria } from "@/lib/feedback";
import type { Difficulty, QuizQuestion } from "./types";

const INITIAL_LIVES = 5;

export function Quiz({
  subjectId,
  topicId,
  difficulty,
  onExit,
  onComplete,
  onWrong,
  reward,
  extraQuestions,
}: {
  subjectId: string;
  topicId: number;
  difficulty: Difficulty;
  onExit: () => void;
  onComplete: (correct: number, total: number, finished: boolean) => void;
  onWrong?: (question: QuizQuestion) => void;
  reward?: {
    coinsEarned: number;
    streakIncreased: boolean;
    newStreak: number;
  } | null;
  extraQuestions?: QuizQuestion[];
}) {
  const questions = useMemo(() => {
    const base = [...getQuestions(subjectId, topicId, difficulty)];
    // Perguntas patrocinadas entram numa posição aleatória da lição.
    for (const sponsored of extraQuestions ?? []) {
      const pos = Math.floor(Math.random() * (base.length + 1));
      base.splice(pos, 0, sponsored);
    }
    return base;
  }, [subjectId, topicId, difficulty, extraQuestions]);
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [showExit, setShowExit] = useState(false);
  const [phase, setPhase] = useState<"playing" | "gameover" | "done">("playing");

  const q = questions[i];
  const isCorrect = selected !== null && selected === q.answerIndex;
  const answered = i + (checked ? 1 : 0);
  const progress = (answered / questions.length) * 100;

  const handleCheck = () => {
    if (selected === null) return;
    setChecked(true);
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      somAcerto();
    } else {
      setLives((l) => Math.max(0, l - 1));
      somErro();
      onWrong?.(q);
    }
  };

  const handleNext = () => {
    const finalCorrect = correctCount;
    const outOfLives = !isCorrect && lives - 1 <= 0;
    if (outOfLives) {
      setPhase("gameover");
      return;
    }
    if (i + 1 >= questions.length) {
      setPhase("done");
      return;
    }
    setI(i + 1);
    setSelected(null);
    setChecked(false);
    void finalCorrect;
  };

  const restart = () => {
    setI(0);
    setSelected(null);
    setChecked(false);
    setCorrectCount(0);
    setLives(INITIAL_LIVES);
    setPhase("playing");
  };

  if (phase === "gameover") {
    return (
      <GameOver
        correct={correctCount}
        total={questions.length}
        onRetry={restart}
        onExit={() => onComplete(correctCount, questions.length, false)}
      />
    );
  }

  if (phase === "done") {
    return (
      <LessonComplete
        correct={correctCount}
        total={questions.length}
        lives={lives}
        reward={reward ?? null}
        onContinue={() => onComplete(correctCount, questions.length, true)}
      />
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background pb-40">
      <div className="sticky top-0 z-30 flex items-center gap-3 bg-background/90 px-4 py-3 backdrop-blur">
        <button
          onClick={() => setShowExit(true)}
          className="btn-press grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground"
          aria-label="Sair"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-[var(--success)] transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--life)_14%,transparent)] px-3 py-1.5 font-display text-sm font-extrabold text-[var(--life)]">
          <Heart className="h-4 w-4 fill-current" />
          {lives}
        </div>
      </div>

      <div className="mx-auto w-full max-w-md px-5 pt-8">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Pergunta {i + 1} de {questions.length}
          </p>
          <span className="rounded-full bg-brand-soft px-3 py-1 font-display text-[10px] font-extrabold uppercase tracking-wider text-primary">
            {difficulty}
          </span>
        </div>
        <h2 key={i} className="animate-fade-in mt-2 font-display text-2xl font-extrabold leading-snug text-foreground">
          {q.question}
        </h2>

        <div key={`opts-${i}`} className="animate-fade-in mt-6 flex flex-col gap-3">
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
                    ? "border-[var(--success)] bg-[color-mix(in_oklab,var(--success)_12%,var(--card))] text-foreground"
                    : isWrong
                      ? "border-destructive bg-[color-mix(in_oklab,var(--destructive)_10%,var(--card))] text-foreground"
                      : isSel
                        ? "border-primary bg-brand-soft text-foreground"
                        : "border-border text-foreground"
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 font-display text-sm font-extrabold ${
                    isSel || isRight || isWrong ? "border-current" : "border-border text-muted-foreground"
                  }`}
                >
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
                <p className="font-display text-lg font-extrabold text-foreground">
                  {isCorrect ? "Boa! Correcto." : "Quase lá!"}
                </p>
                <p className="truncate text-sm font-semibold text-muted-foreground">{q.explain}</p>
              </div>
              <button
                onClick={handleNext}
                className={`card-3d btn-press flex shrink-0 items-center gap-1 rounded-2xl px-5 py-3 font-display text-sm font-extrabold uppercase text-white ${
                  isCorrect ? "bg-[var(--success)]" : "bg-destructive"
                }`}
              >
                {i + 1 >= questions.length ? "Terminar" : "Continuar"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="border-t border-border bg-background/95 px-5 py-4 backdrop-blur">
            <button
              disabled={selected === null}
              onClick={handleCheck}
              className={`card-3d btn-press mx-auto flex w-full max-w-md items-center justify-center rounded-2xl px-6 py-4 font-display text-base font-extrabold uppercase tracking-wide transition ${
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

      {showExit && (
        <ExitConfirm
          onCancel={() => setShowExit(false)}
          onConfirm={() => {
            setShowExit(false);
            onExit();
          }}
        />
      )}
    </div>
  );
}

function ExitConfirm({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up w-full max-w-sm rounded-3xl bg-card p-6 shadow-2xl"
      >
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--destructive)_14%,transparent)] text-destructive">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display text-xl font-extrabold text-foreground">
          Desejas mesmo desistir?
        </h3>
        <p className="mt-2 text-sm font-semibold text-muted-foreground">
          Vais perder o teu progresso nesta lição.
        </p>
        <div className="mt-5 flex gap-3">
          <button
            onClick={onCancel}
            className="card-3d btn-press flex-1 rounded-2xl border-2 border-border bg-card px-4 py-3 font-display text-sm font-extrabold uppercase text-foreground"
          >
            Continuar
          </button>
          <button
            onClick={onConfirm}
            className="card-3d btn-press flex-1 rounded-2xl bg-destructive px-4 py-3 font-display text-sm font-extrabold uppercase text-destructive-foreground"
          >
            Desistir
          </button>
        </div>
      </div>
    </div>
  );
}

function GameOver({
  correct,
  total,
  onRetry,
  onExit,
}: {
  correct: number;
  total: number;
  onRetry: () => void;
  onExit: () => void;
}) {
  return (
    <div className="animate-fade-in relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[color-mix(in_oklab,var(--destructive)_18%,var(--background))] via-background to-background px-6">
      <div className="grid h-24 w-24 place-items-center rounded-full bg-destructive text-destructive-foreground shadow-xl">
        <Heart className="h-12 w-12" />
      </div>
      <h2 className="mt-6 font-display text-3xl font-extrabold text-foreground">Fim de jogo</h2>
      <p className="mt-2 max-w-xs text-center text-sm font-semibold text-muted-foreground">
        Ficaste sem corações! Não faz mal — cada erro é um passo para aprender. Tenta novamente!
      </p>
      <div className="mt-6 rounded-2xl bg-card px-5 py-3 font-display text-sm font-extrabold text-foreground shadow">
        Acertaste {correct} de {total}
      </div>
      <div className="mt-8 flex w-full max-w-sm flex-col gap-3">
        <button
          onClick={onRetry}
          className="card-3d btn-press flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-display text-base font-extrabold uppercase text-primary-foreground"
        >
          <RotateCcw className="h-5 w-5" />
          Tentar novamente
        </button>
        <button
          onClick={onExit}
          className="btn-press flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-display text-sm font-extrabold uppercase text-muted-foreground"
        >
          <Home className="h-4 w-4" />
          Voltar à trilha
        </button>
      </div>
    </div>
  );
}

function LessonComplete({
  correct,
  total,
  lives,
  reward,
  onContinue,
}: {
  correct: number;
  total: number;
  lives: number;
  reward: {
    coinsEarned: number;
    streakIncreased: boolean;
    newStreak: number;
  } | null;
  onContinue: () => void;
}) {
  const xp = correct * 10;
  // Festa de fim de lição: confetes + fanfarra.
  useEffect(() => {
    confetes(correct === total);
    somVitoria();
  }, [correct, total]);
  return (
    <div className="animate-fade-in relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[color-mix(in_oklab,var(--success)_18%,var(--background))] via-background to-background px-6">
      <div className="grid h-24 w-24 place-items-center rounded-full bg-[var(--success)] text-white shadow-xl">
        <Trophy className="h-12 w-12" />
      </div>
      <h2 className="mt-6 font-display text-3xl font-extrabold text-foreground">Lição concluída!</h2>
      <p className="mt-2 max-w-xs text-center text-sm font-semibold text-muted-foreground">
        Boa! Continuas com a ofensiva activa. Continua assim, {correct === total ? "sem erros!" : "cada dia melhor!"}
      </p>

      {reward && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="animate-pulse-soft rounded-full bg-[color-mix(in_oklab,var(--streak)_18%,transparent)] px-4 py-2 font-display text-sm font-extrabold text-[var(--streak)]">
            🔥 Ofensiva de {reward.newStreak} dia{reward.newStreak === 1 ? "" : "s"}
            {reward.streakIncreased ? " — novo recorde!" : " mantida!"}
          </span>
          <span className="rounded-full bg-amber-100 px-4 py-2 font-display text-sm font-extrabold text-amber-700">
            +{reward.coinsEarned} moedas
          </span>
        </div>
      )}

      <div className="mt-6 grid w-full max-w-sm grid-cols-3 gap-3">
        <Stat label="Acertos" value={`${correct}/${total}`} tone="success" />
        <Stat label="XP" value={`+${xp}`} tone="brand" />
        <Stat label="Vidas" value={`${lives}`} tone="life" />
      </div>

      <button
        onClick={onContinue}
        className="card-3d btn-press mt-8 flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-[var(--success)] px-6 py-4 font-display text-base font-extrabold uppercase text-white"
      >
        Continuar
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "success" | "brand" | "life" }) {
  const cls =
    tone === "success"
      ? "text-[var(--success)] bg-[color-mix(in_oklab,var(--success)_14%,transparent)]"
      : tone === "brand"
        ? "text-primary bg-brand-soft"
        : "text-[var(--life)] bg-[color-mix(in_oklab,var(--life)_14%,transparent)]";
  return (
    <div className={`rounded-2xl px-3 py-3 text-center ${cls}`}>
      <p className="font-display text-lg font-extrabold">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{label}</p>
    </div>
  );
}