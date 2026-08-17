import { ArrowLeft, Flame, Trophy, Target, Clock, Award, Lock, Zap, Star, BookOpen, Coins, Shield } from "lucide-react";
import type { AppState } from "./types";

const ACHIEVEMENTS = [
  { name: "Primeira lição", icon: Star, unlocked: true },
  { name: "3 dias seguidos", icon: Flame, unlocked: true },
  { name: "100 pontos", icon: Zap, unlocked: true },
  { name: "10 lições", icon: BookOpen, unlocked: false },
  { name: "Mestre da Matemática", icon: Trophy, unlocked: false },
  { name: "Ofensiva 30 dias", icon: Award, unlocked: false },
];

export function Profile({ state, onBack }: { state: AppState; onBack: () => void }) {
  const initials = state.name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur">
        <button
          onClick={onBack}
          className="btn-press grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-lg font-extrabold text-foreground">Perfil</h1>
      </header>

      <div className="relative overflow-hidden px-5 pt-6">
        <div className="pointer-events-none absolute -top-10 right-0 h-40 w-40 rounded-full bg-brand-soft blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.65_0.2_10)] font-display text-3xl font-extrabold text-primary-foreground shadow-lg">
            {initials || "A"}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-display text-2xl font-extrabold text-foreground">
              {state.name || "Estudante"}
            </h2>
            <p className="mt-0.5 text-sm font-semibold text-muted-foreground">
              {state.grade ?? "6ª"} Classe · Angola
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,var(--streak)_15%,transparent)] px-3 py-1 font-display text-xs font-extrabold text-[var(--streak)]">
              <Flame className="h-3.5 w-3.5" /> {state.streak} dias de ofensiva
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 font-display text-xs font-extrabold text-amber-700">
                <Coins className="h-3.5 w-3.5" /> {state.coins} moedas
              </span>
              {state.shield && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 font-display text-xs font-extrabold text-primary">
                  <Shield className="h-3.5 w-3.5" /> Escudo activo
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 px-5">
        <Stat icon={<BookOpen className="h-5 w-5" />} label="Lições" value={state.lessonsDone} tone="brand" />
        <Stat icon={<Target className="h-5 w-5" />} label="Pontos" value={state.xp} tone="success" />
        <Stat icon={<Clock className="h-5 w-5" />} label="Dias" value={state.daysActive} tone="accent" />
      </div>

      <div className="mt-8 px-5">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="font-display text-xl font-extrabold text-foreground">Conquistas</h3>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {ACHIEVEMENTS.filter((a) => a.unlocked).length}/{ACHIEVEMENTS.length}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {ACHIEVEMENTS.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.name}
                className={`card-3d flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 p-2 text-center ${
                  a.unlocked ? "border-primary/30 bg-brand-soft" : "border-border bg-muted"
                }`}
              >
                <div
                  className={`grid h-11 w-11 place-items-center rounded-full ${
                    a.unlocked ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"
                  }`}
                >
                  {a.unlocked ? <Icon className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                </div>
                <p
                  className={`text-[11px] font-bold leading-tight ${
                    a.unlocked ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {a.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone: "brand" | "success" | "accent";
}) {
  const bg =
    tone === "brand"
      ? "bg-brand-soft text-primary"
      : tone === "success"
        ? "bg-[color-mix(in_oklab,var(--success)_14%,transparent)] text-[var(--success)]"
        : "bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] text-accent";
  return (
    <div className="card-3d rounded-2xl border-2 border-border bg-card p-3">
      <div className={`grid h-9 w-9 place-items-center rounded-xl ${bg}`}>{icon}</div>
      <p className="mt-2 font-display text-2xl font-extrabold text-foreground">{value}</p>
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}