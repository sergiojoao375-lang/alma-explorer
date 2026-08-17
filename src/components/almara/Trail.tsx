import { ArrowLeft, Lock, Check, Star, X, Play } from "lucide-react";
import { useState } from "react";
import { topicsForGrade } from "./data";
import type { Subject, Difficulty, Grade, Topic } from "./types";

export function Trail({
  subject,
  grade,
  onBack,
  onStart,
}: {
  subject: Subject;
  grade: Grade;
  onBack: () => void;
  onStart: (topicId: number, difficulty: Difficulty) => void;
}) {
  const [openTopic, setOpenTopic] = useState<Topic | null>(null);
  const [diff, setDiff] = useState<Difficulty>("Básico");
  const topics = topicsForGrade(subject, grade);

  return (
    <div className={`relative min-h-screen ${subject.bg}`}>
      <header className="sticky top-0 z-30 flex items-center gap-3 bg-black/10 px-4 py-3 backdrop-blur">
        <button
          onClick={onBack}
          className="btn-press grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-bold uppercase tracking-widest text-white/80">Trilha</p>
          <p className="truncate font-display text-lg font-extrabold text-white">{subject.name}</p>
        </div>
        <div className="rounded-full bg-white/20 px-3 py-1 font-display text-sm font-extrabold text-white">
          {subject.progress}%
        </div>
      </header>

      <div className="relative mx-auto max-w-md px-6 pb-32 pt-8">
        <ol className="relative flex flex-col items-center gap-3">
          {topics.length === 0 && (
            <li className="mt-10 rounded-2xl bg-white/20 px-5 py-4 text-center font-semibold text-white">
              Nenhum tópico disponível para a {grade} nesta disciplina ainda.
            </li>
          )}
          {topics.map((t, i) => {
            const shifts = ["translate-x-0", "translate-x-14", "translate-x-8", "-translate-x-10"];
            const hasBank = !!t.questions && Object.values(t.questions).some((a) => a && a.length > 0);
            return (
              <li key={t.id} className={`w-full ${shifts[i % 4]}`}>
                <TrailNode
                  topic={t}
                  index={i}
                  onClick={() => {
                    if (t.unlocked && hasBank) {
                      setOpenTopic(t);
                      setDiff("Básico");
                    }
                  }}
                  soon={!hasBank}
                />
              </li>
            );
          })}
        </ol>
      </div>

      {openTopic && (
        <div
          className="fixed inset-0 z-40 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          onClick={() => setOpenTopic(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-slide-up w-full max-w-sm rounded-3xl bg-card p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Tópico {openTopic.id}
                </p>
                <h3 className="truncate font-display text-xl font-extrabold text-foreground">
                  {openTopic.title}
                </h3>
              </div>
              <button
                onClick={() => setOpenTopic(null)}
                className="btn-press grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-3 text-sm font-semibold text-muted-foreground">
              Escolhe a dificuldade da lição.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {(["Básico", "Intermédio", "Avançado"] as Difficulty[]).map((d) => {
                const active = diff === d;
                return (
                  <button
                    key={d}
                    onClick={() => setDiff(d)}
                    className={`btn-press rounded-2xl border-2 px-2 py-3 font-display text-xs font-extrabold uppercase transition ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                onStart(openTopic.id, diff);
                setOpenTopic(null);
              }}
              className="card-3d btn-press mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--success)] px-4 py-4 font-display text-base font-extrabold uppercase tracking-wide text-[var(--success-foreground)]"
            >
              <Play className="h-5 w-5 fill-current" />
              Iniciar lição
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TrailNode({
  topic,
  index,
  onClick,
  soon,
}: {
  topic: Topic;
  index: number;
  onClick: () => void;
  soon?: boolean;
}) {
  const state = topic.completed ? "done" : topic.unlocked && !soon ? "active" : "locked";

  return (
    <div className="flex flex-col items-center">
      {index > 0 && <div className="mb-2 h-6 w-1 rounded-full bg-white/25" />}
      <button
        onClick={onClick}
        disabled={state === "locked"}
        className={`card-3d btn-press relative grid h-20 w-20 place-items-center rounded-full border-4 border-white/70 font-display text-2xl font-extrabold transition ${
          state === "done"
            ? "bg-[var(--success)] text-white"
            : state === "active"
              ? "animate-pulse-soft bg-white text-foreground"
              : "cursor-not-allowed bg-white/30 text-white/70"
        }`}
      >
        {state === "done" ? (
          <Check className="h-9 w-9" />
        ) : state === "active" ? (
          <Star className="h-9 w-9 fill-[var(--primary)] text-[var(--primary)]" />
        ) : (
          <Lock className="h-8 w-8" />
        )}
      </button>
      <p
        className={`mt-2 max-w-[180px] truncate text-center text-xs font-bold ${
          state === "locked" ? "text-white/70" : "text-white"
        }`}
      >
        {topic.title}
      </p>
      {soon && (
        <span className="mt-1 rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-extrabold uppercase text-white">
          Brevemente
        </span>
      )}
    </div>
  );
}