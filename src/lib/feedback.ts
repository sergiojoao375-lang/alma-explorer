import confetti from "canvas-confetti";

/** Preferência do aluno — pode desligar o som no perfil. */
const KEY = "almara:som";

export function somActivo(): boolean {
  try {
    return localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

export function alternarSom(activo: boolean): void {
  try {
    localStorage.setItem(KEY, activo ? "on" : "off");
  } catch {
    // sem localStorage o som fica sempre ligado
  }
}

let ctx: AudioContext | null = null;

function audioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx ??= new Ctor();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

type Nota = { freq: number; inicio: number; duracao: number; tipo?: OscillatorType; vol?: number };

function tocar(notas: Nota[]): void {
  if (!somActivo()) return;
  const ac = audioContext();
  if (!ac) return;
  const agora = ac.currentTime;
  for (const n of notas) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = n.tipo ?? "sine";
    osc.frequency.setValueAtTime(n.freq, agora + n.inicio);
    const vol = n.vol ?? 0.18;
    gain.gain.setValueAtTime(0.0001, agora + n.inicio);
    gain.gain.exponentialRampToValueAtTime(vol, agora + n.inicio + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, agora + n.inicio + n.duracao);
    osc.connect(gain).connect(ac.destination);
    osc.start(agora + n.inicio);
    osc.stop(agora + n.inicio + n.duracao + 0.02);
  }
}

/** Ding alegre de resposta certa. */
export function somAcerto(): void {
  tocar([
    { freq: 784, inicio: 0, duracao: 0.12, tipo: "triangle" },
    { freq: 1047, inicio: 0.09, duracao: 0.18, tipo: "triangle" },
  ]);
}

/** Zumbido curto e grave de resposta errada. */
export function somErro(): void {
  tocar([
    { freq: 220, inicio: 0, duracao: 0.16, tipo: "sawtooth", vol: 0.12 },
    { freq: 155, inicio: 0.12, duracao: 0.24, tipo: "sawtooth", vol: 0.12 },
  ]);
}

/** Fanfarra de fase concluída. */
export function somVitoria(): void {
  tocar([
    { freq: 523, inicio: 0, duracao: 0.14, tipo: "triangle" },
    { freq: 659, inicio: 0.12, duracao: 0.14, tipo: "triangle" },
    { freq: 784, inicio: 0.24, duracao: 0.16, tipo: "triangle" },
    { freq: 1047, inicio: 0.38, duracao: 0.34, tipo: "triangle" },
  ]);
}

/** Chuva de confetes ao concluir uma lição ou desbloquear um prémio. */
export function confetes(intenso = false): void {
  if (typeof window === "undefined") return;
  const disparar = (particulas: number, spread: number, origemX: number) =>
    confetti({
      particleCount: particulas,
      spread,
      startVelocity: 42,
      origin: { x: origemX, y: 0.65 },
      colors: ["#ea580c", "#facc15", "#22c55e", "#3b82f6", "#ef4444"],
      disableForReducedMotion: true,
    });
  disparar(intenso ? 120 : 70, 70, 0.5);
  window.setTimeout(() => disparar(intenso ? 80 : 45, 100, 0.25), 180);
  window.setTimeout(() => disparar(intenso ? 80 : 45, 100, 0.75), 320);
}
