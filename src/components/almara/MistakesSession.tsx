import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookMarked, Check, AlertTriangle, RotateCcw } from "lucide-react";
import type { MistakeEntry, QuizQuestion } from "./types";

type Item = { entry: MistakeEntry; q: QuizQuestion };

export function MistakesSession({
  mistakes,
  onBack,
  onCorrect,
  resolveQuestion,
}: {
  mistakes: MistakeEntry[];
  onBack: () => void;
  onCorrect: (entry: MistakeEntry) => void;
  resolveQuestion: (m: MistakeEntry) => QuizQuestion | null;
}) {
  // Resolve once per session so removing entries doesn't reshuffle indexes.
  const items = useMemo<Item[]>(() => {
    return mistakes
      .map((m) => {
        const q = resolveQuestion(m);
        return q ? { entry: m, q } : null;
      })
      .filter((x): x is Item => x !== null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [fixed, setFixed] = useState(0);

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-brand-soft text-primary">
          <BookMarked className="h-10 w-10" />
        </div>
        <h2 className="mt-6 font-display text-2xl font-extrabold text-foreground">
          Caderno vazio!
        </h2>
        <p className="mt-2 max-w-xs text-sm font-semibold text-muted-foreground">
          Ainda não erraste nenhuma pergunta — ou já dominaste todas. Continua a estudar 🚀
        </p>
        <button
          onClick={onBack}
          className="card-3d btn-press mt-8 rounded-2xl bg-primary px-6 py-3 font-display text-sm font-extrabold uppercase text-primary-foreground"
        >
          Voltar
        </button>
      </div>
    );
  }

  if (i >= items.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[color-mix(in_oklab,var(--success)_18%,var(--background))] via-background to-background px-6 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-[var(--success)] text-white shadow-xl">
          <Check className="h-10 w-10" />
        </div>
        <h2 className="mt-6 font-display text-2xl font-extrabold text-foreground">
          Sessão terminada!
        </h2>
        <p className="mt-2 max-w-xs text-sm font-semibold text-muted-foreground">
          Recuperaste {fixed} de {items.length} pergunta{items.length === 1 ? "" : "s"}.
        </p>
        <button
          onClick={onBack}
          className="card-3d btn-press mt-8 flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-display text-sm font-extrabold uppercase text-primary-foreground"
        >
          Voltar ao painel <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const current = items[i];
  const q = current.q;
  const isCorrect = selected !== null && selected === q.answerIndex;
  const progress = ((i + (checked ? 1 : 0)) / items.length) * 100;

  const handleCheck = () => {
    if (selected === null) return;
    setChecked(true);
    if (isCorrect) {
      onCorrect(current.entry);
      setFixed((f) => f + 1);
    }
  };

  const handleNext = () => {
    setI((v) => v + 1);
    setSelected(null);
    setChecked(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background pb-40">
      <div className="sticky top-0 z-30 flex items-center gap-3 bg-background/90 px-4 py-3 backdrop-blur">
        <button
          onClick={onBack}
          className="btn-press grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-full bg-brand-soft px-3 py-1.5 font-display text-xs font-extrabold text-primary">
          <BookMarked className="h-4 w-4" /> Revisão
        </div>
      </div>

      <div className="mx-auto w-full max-w-md px-5 pt-8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Pergunta {i + 1} de {items.length}
        </p>
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
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-current font-display text-sm font-extrabold">
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
                  {isCorrect ? "Boa! Sai do caderno." : "Fica no caderno para tentares outra vez."}
                </p>
                <p className="truncate text-sm font-semibold text-muted-foreground">{q.explain}</p>
              </div>
              <button
                onClick={handleNext}
                className={`card-3d btn-press flex shrink-0 items-center gap-1 rounded-2xl px-5 py-3 font-display text-sm font-extrabold uppercase text-white ${
                  isCorrect ? "bg-[var(--success)]" : "bg-destructive"
                }`}
              >
                {i + 1 >= items.length ? "Terminar" : "Continuar"}
                {i + 1 >= items.length ? <RotateCcw className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
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
    </div>
  );
}