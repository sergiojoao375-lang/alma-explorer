import { useEffect, useState } from "react";
import { ArrowLeft, Flame, Trophy, Target, Clock, Award, Lock, Zap, Star, BookOpen, Coins, Shield, Info, HeartHandshake, Gamepad2, Timer, Volume2, VolumeX } from "lucide-react";
import { alternarSom, somAcerto, somActivo } from "@/lib/feedback";
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
  const [sobre, setSobre] = useState(false);
  const [som, setSom] = useState(true);
  useEffect(() => setSom(somActivo()), []);
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
        <button
          onClick={() => {
            const novo = !som;
            setSom(novo);
            alternarSom(novo);
            if (novo) somAcerto();
          }}
          className="btn-press ml-auto grid h-9 w-9 place-items-center rounded-full text-muted-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
          aria-label={som ? "Desligar som" : "Ligar som"}
        >
          {som ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </button>
        <button
          onClick={() => setSobre(true)}
          className="btn-press flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-muted-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
        >
          <Info className="h-3.5 w-3.5" /> Sobre
        </button>
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

      {sobre && <SobreAlmara onClose={() => setSobre(false)} />}
    </div>
  );
}

function SobreAlmara({ onClose }: { onClose: () => void }) {
  return (
    <div className="animate-fade-in fixed inset-0 z-50 overflow-y-auto bg-background">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border/60 bg-background/90 px-4 py-3 backdrop-blur">
        <button
          onClick={onClose}
          className="btn-press grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground"
          aria-label="Fechar"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="font-display text-lg font-extrabold text-foreground">Sobre o Almara</h2>
      </header>

      <div className="mx-auto max-w-md px-5 pb-16 pt-6">
        <div className="rounded-3xl bg-brand-soft p-5">
          <HeartHandshake className="h-7 w-7 text-primary" />
          <h3 className="mt-3 font-display text-xl font-extrabold text-foreground">
            Estudar hoje, material escolar amanhã
          </h3>
          <p className="mt-2 text-sm font-semibold text-muted-foreground">
            O Almara é um app angolano que transforma o esforço de estudo em material escolar real.
            Marcas e empresas patrocinam o fundo escolar; os alunos ganham lápis, cadernos e mochilas
            em supermercados parceiros — sem pagar nada.
          </p>
        </div>

        <SobreBloco icon={<Gamepad2 className="h-5 w-5" />} titulo="Como jogar">
          Escolhe uma disciplina, avança na trilha e responde aos quizzes de cada tópico. Cada nível
          (Básico, Intermédio e Avançado) tem no mínimo 12 perguntas ligadas à realidade angolana.
          Erraste? A explicação aparece logo a seguir e a pergunta volta na sessão «Rever Erros».
        </SobreBloco>

        <SobreBloco icon={<Coins className="h-5 w-5" />} titulo="Moedas e vidas">
          Cada lição concluída dá 10 moedas e pontos de experiência (XP). As moedas gastam-se na
          Loja: 50 moedas repõem as vidas e 100 moedas compram o Escudo, que protege a tua ofensiva
          num dia em que não consegues estudar. As moedas são virtuais — nunca se compram com
          dinheiro.
        </SobreBloco>

        <SobreBloco icon={<Flame className="h-5 w-5" />} titulo="Ofensiva (foguinho)">
          Estuda pelo menos uma lição por dia para manter a ofensiva. Se falhares um dia sem escudo,
          a ofensiva volta a zero. É a ofensiva que desbloqueia o Kit Bronze.
        </SobreBloco>

        <SobreBloco icon={<Trophy className="h-5 w-5" />} titulo="Prémios e provas">
          Ao cumprir os requisitos de cada kit fazes a prova final: 10 perguntas (Bronze), 15 (Prata)
          e 20 (Ouro), com 20 segundos por pergunta. Precisas de mais de 80% de acerto. Se falhares,
          só podes tentar de novo 4 horas depois. Ao passar recebes um QR Code único, válido 7 dias,
          para levantar o material no supermercado parceiro.
        </SobreBloco>

        <SobreBloco icon={<Timer className="h-5 w-5" />} titulo="Funciona sem internet">
          As lições ficam guardadas no teu telemóvel. Podes estudar offline; a app sincroniza as
          estatísticas quando houver rede.
        </SobreBloco>

        <SobreBloco icon={<Info className="h-5 w-5" />} titulo="Propósito social">
          Em Angola, muitas famílias não conseguem comprar material escolar. O Almara canaliza 85% de
          cada patrocínio para material distribuído nas províncias; os restantes 15% cobrem os custos
          e a manutenção da plataforma. Todo o percurso é auditável, para que as empresas parceiras
          possam justificar o investimento social.
        </SobreBloco>

        <button
          onClick={onClose}
          className="btn-press mt-6 w-full rounded-2xl bg-primary py-4 font-display text-base font-extrabold text-primary-foreground"
        >
          Voltar ao perfil
        </button>
      </div>
    </div>
  );
}

function SobreBloco({
  icon,
  titulo,
  children,
}: {
  icon: React.ReactNode;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-4 rounded-2xl border-2 border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-soft text-primary">{icon}</span>
        <h4 className="font-display text-base font-extrabold text-foreground">{titulo}</h4>
      </div>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-muted-foreground">{children}</p>
    </section>
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