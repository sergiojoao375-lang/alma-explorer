import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Gift, Lock, PartyPopper, ShieldCheck, Trophy, X } from "lucide-react";
import { getMixedQuestions } from "./data";
import { PRIZES, generateRedemption, isPrizeUnlocked, prizeProgressLabel, qrPayload, type Prize } from "./prizes";
import type { AppState, QuizQuestion, Redemption } from "./types";

export function Prizes({
  state,
  onBack,
  onRedeem,
}: {
  state: AppState;
  onBack: () => void;
  onRedeem: (r: Redemption) => void;
}) {
  const [challenge, setChallenge] = useState<Prize | null>(null);
  const [ticket, setTicket] = useState<Redemption | null>(null);

  if (ticket) {
    return <TicketScreen ticket={ticket} onBack={() => { setTicket(null); setChallenge(null); }} />;
  }

  if (challenge) {
    return (
      <FinalChallenge
        prize={challenge}
        state={state}
        onCancel={() => setChallenge(null)}
        onPass={(prize) => {
          const r = generateRedemption(prize);
          onRedeem(r);
          setTicket(r);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur">
        <button onClick={onBack} className="btn-press grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground" aria-label="Voltar">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-lg font-extrabold text-foreground">Missões Solidárias</h1>
        <Gift className="ml-auto h-5 w-5 text-primary" />
      </header>

      <div className="px-5 pt-5">
        <p className="text-sm font-semibold text-muted-foreground">
          Estuda, cumpre a missão e levanta material escolar real nos supermercados parceiros. 🎁
        </p>
      </div>

      <div className="mt-4 space-y-4 px-5">
        {PRIZES.map((p) => {
          const unlocked = isPrizeUnlocked(p, state);
          const already = state.redemptions?.find((r) => r.prizeId === p.id && !r.used);
          return (
            <div
              key={p.id}
              className={`card-3d relative overflow-hidden rounded-3xl p-5 ${unlocked ? p.bg : "bg-muted"}`}
            >
              <div className="flex items-center gap-3">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${unlocked ? "bg-white/20 text-white" : "bg-background text-muted-foreground"}`}>
                  {unlocked ? <Trophy className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`font-display text-xl font-extrabold ${unlocked ? "text-white" : "text-muted-foreground"}`}>{p.name}</p>
                  <p className={`truncate text-sm font-semibold ${unlocked ? "text-white/85" : "text-muted-foreground"}`}>{p.items}</p>
                </div>
              </div>
              <p className={`mt-3 text-[11px] font-bold uppercase tracking-wider ${unlocked ? "text-white/80" : "text-muted-foreground"}`}>
                Patrocinado por {p.sponsor} · {p.requirement}
              </p>
              <p className={`mt-1 text-xs font-semibold ${unlocked ? "text-white/85" : "text-muted-foreground"}`}>
                {prizeProgressLabel(p, state)}
              </p>

              {already ? (
                <button
                  onClick={() => setTicket(already)}
                  className="btn-press mt-4 w-full rounded-2xl bg-white py-3 font-display text-sm font-extrabold text-foreground"
                >
                  Ver o meu QR Code
                </button>
              ) : (
                <button
                  disabled={!unlocked}
                  onClick={() => setChallenge(p)}
                  className={`btn-press mt-4 w-full rounded-2xl py-3 font-display text-sm font-extrabold ${
                    unlocked ? "bg-white text-foreground" : "cursor-not-allowed bg-background/70 text-muted-foreground"
                  }`}
                >
                  {unlocked ? "Resgatar Desafio do Patrocinador" : "Bloqueado"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FinalChallenge({
  prize,
  state,
  onCancel,
  onPass,
}: {
  prize: Prize;
  state: AppState;
  onCancel: () => void;
  onPass: (p: Prize) => void;
}) {
  const [questions] = useState<QuizQuestion[]>(() => getMixedQuestions(state.grade ?? "6ª", 5));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[i];
  const pct = Math.round((correct / questions.length) * 100);

  if (done) {
    const passed = pct > 80;
    return (
      <div className="min-h-screen bg-background px-6 py-16 text-center">
        <div className={`mx-auto grid h-24 w-24 place-items-center rounded-full ${passed ? "bg-emerald-100 text-emerald-600" : "bg-muted text-muted-foreground"}`}>
          {passed ? <PartyPopper className="h-12 w-12" /> : <X className="h-12 w-12" />}
        </div>
        <h2 className="mt-5 font-display text-2xl font-extrabold text-foreground">
          {passed ? "Parabéns, conseguiste!" : "Quase lá!"}
        </h2>
        <p className="mt-2 text-sm font-semibold text-muted-foreground">
          Acertaste {correct} de {questions.length} ({pct}%). {passed ? "O teu prémio está desbloqueado." : "Precisas de mais de 80% para resgatar."}
        </p>
        <button
          onClick={() => (passed ? onPass(prize) : onCancel())}
          className="btn-press mt-8 w-full rounded-2xl bg-primary py-4 font-display text-base font-extrabold text-primary-foreground"
        >
          {passed ? "Gerar QR Code Seguro" : "Voltar aos prémios"}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="flex items-center gap-3 px-4 py-3">
        <button onClick={onCancel} className="btn-press grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground" aria-label="Sair">
          <X className="h-5 w-5" />
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((i + (picked !== null ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>
        <span className="font-display text-sm font-extrabold text-muted-foreground">{i + 1}/{questions.length}</span>
      </header>

      <div className="px-5 pt-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Prova final · {prize.name}</p>
        <h2 className="mt-2 font-display text-xl font-extrabold text-foreground">{q.question}</h2>
        <div className="mt-5 space-y-3">
          {q.options.map((opt, idx) => {
            const isPicked = picked === idx;
            const reveal = picked !== null;
            const isRight = idx === q.answerIndex;
            return (
              <button
                key={idx}
                disabled={reveal}
                onClick={() => {
                  setPicked(idx);
                  if (isRight) setCorrect((c) => c + 1);
                }}
                className={`btn-press w-full rounded-2xl border-2 p-4 text-left font-semibold ${
                  reveal && isRight
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                    : isPicked
                      ? "border-destructive bg-[color-mix(in_oklab,var(--destructive)_10%,transparent)] text-destructive"
                      : "border-border bg-card text-foreground"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div className="animate-fade-in mt-5 rounded-2xl border-2 border-border bg-card p-4">
            <p className="text-sm font-semibold text-muted-foreground">{q.explain}</p>
            <button
              onClick={() => {
                if (i + 1 >= questions.length) setDone(true);
                else {
                  setI(i + 1);
                  setPicked(null);
                }
              }}
              className="btn-press mt-4 w-full rounded-2xl bg-primary py-3 font-display text-sm font-extrabold text-primary-foreground"
            >
              {i + 1 >= questions.length ? "Ver resultado" : "Continuar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TicketScreen({ ticket, onBack }: { ticket: Redemption; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="flex items-center gap-3 px-4 py-3">
        <button onClick={onBack} className="btn-press grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground" aria-label="Voltar">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-lg font-extrabold text-foreground">O teu vale</h1>
      </header>

      <div className="px-5">
        <div className="card-3d rounded-3xl border-2 border-border bg-card p-6 text-center">
          <ShieldCheck className="mx-auto h-8 w-8 text-emerald-600" />
          <p className="mt-2 font-display text-xl font-extrabold text-foreground">{ticket.prizeName}</p>
          <p className="text-sm font-semibold text-muted-foreground">
            Mostra este código no balcão do supermercado parceiro.
          </p>
          <div className="mx-auto mt-5 w-fit rounded-2xl bg-white p-4">
            <QRCodeSVG value={qrPayload(ticket)} size={196} level="M" />
          </div>
          <p className="mt-4 font-display text-lg font-extrabold tracking-wider text-foreground">{ticket.code}</p>
          <p className="mt-1 text-xs font-semibold text-muted-foreground">
            Válido até {new Date(ticket.expiresAt).toLocaleDateString("pt-PT")} · {ticket.used ? "JÁ UTILIZADO" : "Por utilizar"}
          </p>
        </div>
        <p className="mt-4 text-center text-xs font-semibold text-muted-foreground">
          Cada código é único ao teu aparelho e só pode ser usado uma vez.
        </p>
      </div>
    </div>
  );
}
