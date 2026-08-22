import * as Icons from "lucide-react";
import { SUBJECTS, isSubjectAvailable, topicsForGrade } from "./data";
import { TopStatsBar } from "./Header";
import type { AppState, Grade } from "./types";

export function Dashboard({
  state,
  onOpenSubject,
  onProfile,
  onOpenMistakes,
  onOpenShop,
  onOpenArena,
  onOpenPrizes,
  onOpenRanking,
}: {
  state: AppState;
  onOpenSubject: (id: string) => void;
  onProfile: () => void;
  onOpenMistakes: () => void;
  onOpenShop: () => void;
  onOpenArena: () => void;
  onOpenPrizes: () => void;
  onOpenRanking: () => void;
}) {
  const grade: Grade = state.grade ?? "6ª";
  const available = SUBJECTS.filter((s) => isSubjectAvailable(s, grade));
  const soon = SUBJECTS.filter((s) => !isSubjectAvailable(s, grade));
  const overall =
    available.length > 0
      ? Math.round(available.reduce((a, s) => a + s.progress, 0) / available.length)
      : 0;

  return (
    <div className="min-h-screen bg-background pb-10">
      <TopStatsBar
        name={state.name}
        streak={state.streak}
        lives={state.lives}
        coins={state.coins}
        onProfile={onProfile}
      />

      <div className="px-5 pt-5">
        <ProgressRing value={overall} grade={grade} />
      </div>

      <div className="mt-4 px-5">
        <button
          onClick={onOpenArena}
          className="card-3d btn-press relative flex w-full items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 p-5 text-left"
        >
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
            <Icons.Swords className="h-7 w-7 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-xl font-extrabold text-white">Arena de Duelos ⚔️</p>
            <p className="truncate text-sm font-semibold text-white/85">
              Desafia um estudante e aposta as tuas moedas
            </p>
          </div>
          <Icons.ChevronRight className="h-6 w-6 shrink-0 text-white/80" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 px-5">
        <button
          onClick={onOpenPrizes}
          className="card-3d btn-press col-span-2 flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-4 text-left"
        >
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
            <Icons.Gift className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold text-foreground">Prémios 🎁</p>
            <p className="truncate text-[11px] font-semibold text-muted-foreground">
              Material escolar real dos supermercados parceiros
            </p>
          </div>
          <Icons.ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
        </button>
        <button
          onClick={onOpenRanking}
          className="card-3d btn-press col-span-2 flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-4 text-left"
        >
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
            <Icons.Trophy className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold text-foreground">Ranking do Dia 🏆</p>
            <p className="truncate text-[11px] font-semibold text-muted-foreground">
              Quem ganhou prémios hoje e o top 5 de pontos
            </p>
          </div>
          <Icons.ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
        </button>
        <button
          onClick={onOpenMistakes}
          className="card-3d btn-press flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-4 text-left"
        >
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--destructive)_14%,transparent)] text-destructive">
            <Icons.BookMarked className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold text-foreground">Caderno de Erros</p>
            <p className="truncate text-[11px] font-semibold text-muted-foreground">
              {state.mistakes.length === 0
                ? "Sem erros para rever"
                : `${state.mistakes.length} pergunta${state.mistakes.length === 1 ? "" : "s"} p/ rever`}
            </p>
          </div>
        </button>
        <button
          onClick={onOpenShop}
          className="card-3d btn-press flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-4 text-left"
        >
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
            <Icons.ShoppingBag className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold text-foreground">Loja Almara</p>
            <p className="truncate text-[11px] font-semibold text-muted-foreground">
              {state.coins} moeda{state.coins === 1 ? "" : "s"}
              {state.shield ? " · 🛡️ escudo activo" : ""}
            </p>
          </div>
        </button>
      </div>

      <div className="mt-6 px-5">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-extrabold text-foreground">Disciplinas</h2>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {available.length} disponíveis
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {available.map((s) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[s.icon];
            const count = topicsForGrade(s, grade).length;
            return (
              <button
                key={s.id}
                onClick={() => onOpenSubject(s.id)}
                className={`card-3d btn-press group relative overflow-hidden rounded-3xl p-5 text-left ${s.bg}`}
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
                <div className="pointer-events-none absolute -right-4 bottom-2 text-6xl opacity-20">
                  {s.emoji}
                </div>
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                    {Icon ? <Icon className="h-7 w-7 text-white" /> : <span className="text-2xl">{s.emoji}</span>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-xl font-extrabold text-white">{s.name}</p>
                    <p className="truncate text-sm font-semibold text-white/85">
                      {s.tagline} · {count} tópico{count === 1 ? "" : "s"}
                    </p>
                  </div>
                  <Icons.ChevronRight className="h-6 w-6 shrink-0 text-white/80" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-white/80">
                    <span>Progresso</span>
                    <span>{s.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/25">
                    <div
                      className="h-full rounded-full bg-white"
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {soon.length > 0 && (
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <Icons.Clock className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Em breve na tua classe
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {soon.map((s) => {
                const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[s.icon];
                return (
                  <div
                    key={s.id}
                    aria-disabled
                    className={`card-3d relative cursor-not-allowed overflow-hidden rounded-2xl p-4 opacity-60 ${s.bg}`}
                  >
                    <div className="absolute right-2 top-2 rounded-full bg-black/40 px-2 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-wider text-white">
                      Brevemente
                    </div>
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/25">
                      {Icon ? (
                        <Icon className="h-5 w-5 text-white" />
                      ) : (
                        <span className="text-lg">{s.emoji}</span>
                      )}
                    </div>
                    <p className="mt-3 truncate font-display text-base font-extrabold text-white">
                      {s.name}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-white/85">
                      <Icons.Lock className="h-3 w-3" />
                      A partir da {s.minGrade}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressRing({ value, grade }: { value: number; grade: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="card-3d relative overflow-hidden rounded-3xl border-2 border-border bg-card p-5">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-soft blur-2xl" />
      <div className="relative flex items-center gap-5">
        <div className="relative grid place-items-center">
          <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
            <circle cx="44" cy="44" r={r} fill="none" strokeWidth="10" className="stroke-muted" />
            <circle
              cx="44"
              cy="44"
              r={r}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              className="stroke-[var(--primary)] transition-[stroke-dasharray] duration-700"
              strokeDasharray={`${dash} ${c}`}
            />
          </svg>
          <span className="absolute font-display text-xl font-extrabold text-foreground">{value}%</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Ano lectivo
          </p>
          <p className="mt-0.5 font-display text-lg font-extrabold text-foreground">
            {grade} Classe — em progresso
          </p>
          <p className="mt-1 text-xs font-semibold text-muted-foreground">
            Continua a praticar todos os dias para manter a tua ofensiva.
          </p>
        </div>
      </div>
    </div>
  );
}