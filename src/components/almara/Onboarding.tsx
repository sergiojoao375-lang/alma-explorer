import { useState } from "react";
import { Sparkles, ArrowRight, GraduationCap } from "lucide-react";
import type { Grade } from "./types";

const GRADES: Grade[] = ["6ª", "7ª", "8ª", "9ª", "10ª"];

export function Onboarding({ onStart }: { onStart: (name: string, grade: Grade) => void }) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<Grade | null>(null);

  const canStart = name.trim().length > 0 && grade !== null;

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-brand-soft via-background to-background px-6 pb-32 pt-14">
      <div className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

      <div className="flex items-center gap-2 text-primary">
        <Sparkles className="h-5 w-5" />
        <span className="text-sm font-bold uppercase tracking-widest">Bem-vindo</span>
      </div>

      <h1 className="mt-3 font-display text-6xl font-extrabold leading-none text-foreground">
        Almara<span className="text-primary">.</span>
      </h1>
      <p className="mt-3 max-w-sm text-base text-muted-foreground">
        Aprende com alegria, ao teu ritmo. Feito para estudantes angolanos.
      </p>

      <label className="mt-10 block text-sm font-bold text-foreground/80">Como te chamas?</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex.: Kiala"
        className="mt-2 w-full rounded-2xl border-2 border-border bg-card px-5 py-4 text-lg font-semibold text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/20"
      />

      <div className="mt-8 flex items-center gap-2">
        <GraduationCap className="h-5 w-5 text-primary" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground/70">A tua classe</h2>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {GRADES.map((g) => {
          const active = grade === g;
          return (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={`card-3d btn-press aspect-square rounded-3xl border-2 text-center font-display font-extrabold transition ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              <div className="text-3xl leading-none">{g}</div>
              <div className={`mt-1 text-[10px] font-bold uppercase tracking-wider ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                Classe
              </div>
            </button>
          );
        })}
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-background/90 px-6 py-5 backdrop-blur">
        <button
          disabled={!canStart}
          onClick={() => canStart && onStart(name.trim(), grade!)}
          className={`card-3d btn-press flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-display text-lg font-extrabold uppercase tracking-wide transition ${
            canStart
              ? "bg-primary text-primary-foreground"
              : "cursor-not-allowed bg-muted text-muted-foreground"
          }`}
        >
          Começar
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}