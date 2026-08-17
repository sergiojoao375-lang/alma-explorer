import { ArrowLeft, Coins, Heart, Shield, Check } from "lucide-react";

export function Shop({
  coins,
  lives,
  shield,
  onBack,
  onBuyLives,
  onBuyShield,
}: {
  coins: number;
  lives: number;
  shield: boolean;
  onBack: () => void;
  onBuyLives: () => void;
  onBuyShield: () => void;
}) {
  const canLives = coins >= 50 && lives < 5;
  const canShield = coins >= 100 && !shield;

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
        <h1 className="font-display text-lg font-extrabold text-foreground">Loja Almara</h1>
        <div className="ml-auto flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 font-display text-sm font-extrabold text-amber-700">
          <Coins className="h-4 w-4" /> {coins}
        </div>
      </header>

      <div className="px-5 pt-5">
        <p className="text-sm font-semibold text-muted-foreground">
          Usa as tuas moedas para continuar a estudar sem parar.
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-3 px-5">
        <ShopItem
          icon={<Heart className="h-6 w-6 fill-current" />}
          tone="life"
          title="Recarregar Vidas"
          desc={lives >= 5 ? "Já tens as 5 vidas cheias." : `Enche até 5 corações (tens ${lives}).`}
          price={50}
          disabled={!canLives}
          onClick={onBuyLives}
        />
        <ShopItem
          icon={shield ? <Check className="h-6 w-6" /> : <Shield className="h-6 w-6" />}
          tone="brand"
          title="Bloqueio de Ofensiva"
          desc={
            shield
              ? "Escudo activo — a tua ofensiva está protegida por 1 dia."
              : "Protege a tua ofensiva 🔥 se falhares 1 dia."
          }
          price={100}
          disabled={!canShield}
          onClick={onBuyShield}
        />
      </div>
    </div>
  );
}

function ShopItem({
  icon,
  title,
  desc,
  price,
  tone,
  disabled,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  price: number;
  tone: "life" | "brand";
  disabled: boolean;
  onClick: () => void;
}) {
  const iconCls =
    tone === "life"
      ? "bg-[color-mix(in_oklab,var(--life)_14%,transparent)] text-[var(--life)]"
      : "bg-brand-soft text-primary";
  return (
    <div className="card-3d flex items-center gap-4 rounded-3xl border-2 border-border bg-card p-4">
      <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${iconCls}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display text-lg font-extrabold text-foreground">{title}</p>
        <p className="text-xs font-semibold text-muted-foreground">{desc}</p>
      </div>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`btn-press flex shrink-0 items-center gap-1 rounded-2xl px-4 py-3 font-display text-xs font-extrabold uppercase tracking-wide ${
          disabled
            ? "cursor-not-allowed bg-muted text-muted-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        <Coins className="h-4 w-4" /> {price}
      </button>
    </div>
  );
}