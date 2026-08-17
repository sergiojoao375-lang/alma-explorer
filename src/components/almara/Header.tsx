import { Coins, Flame, Heart } from "lucide-react";

export function TopStatsBar({
  name,
  streak,
  lives,
  coins,
  onProfile,
}: {
  name: string;
  streak: number;
  lives: number;
  coins?: number;
  onProfile: () => void;
}) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 px-5 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          onClick={onProfile}
          className="btn-press grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary font-display text-lg font-extrabold text-primary-foreground"
        >
          {initials || "A"}
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Olá,
          </p>
          <p className="truncate font-display text-lg font-extrabold leading-tight text-foreground">
            {name || "Estudante"}
          </p>
        </div>
        <Pill icon={<Flame className="h-4 w-4" />} value={streak} color="streak" />
        <Pill icon={<Heart className="h-4 w-4 fill-current" />} value={lives} color="life" />
        {typeof coins === "number" && (
          <Pill icon={<Coins className="h-4 w-4" />} value={coins} color="coin" />
        )}
      </div>
    </header>
  );
}

function Pill({
  icon,
  value,
  color,
}: {
  icon: React.ReactNode;
  value: number;
  color: "streak" | "life" | "coin";
}) {
  const cls =
    color === "streak"
      ? "text-[var(--streak)] bg-[color-mix(in_oklab,var(--streak)_14%,transparent)]"
      : color === "life"
        ? "text-[var(--life)] bg-[color-mix(in_oklab,var(--life)_14%,transparent)]"
        : "text-amber-600 bg-amber-100";
  return (
    <div className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-sm font-extrabold ${cls}`}>
      {icon}
      {value}
    </div>
  );
}