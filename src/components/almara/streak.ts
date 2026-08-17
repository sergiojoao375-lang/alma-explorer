// Streak / ofensiva helpers — pure functions on top of local state.
// Storage keys are logically: ultima_data_estudo (lastStudyDate) e
// contador_ofensiva (streak). Guardamos tudo dentro de almara:state para
// manter uma única escrita atómica em localStorage.

export function todayKey(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseKey(k: string): Date {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function daysBetween(a: string, b: string): number {
  const da = parseKey(a).getTime();
  const db = parseKey(b).getTime();
  return Math.round((db - da) / (1000 * 60 * 60 * 24));
}

/** Ao abrir o app: se saltou mais de 1 dia, reset (a menos que tenha escudo). */
export function computeStreakOnOpen(input: {
  streak: number;
  lastStudyDate: string | null;
  shield: boolean;
  now?: Date;
}): { streak: number; shield: boolean } {
  const { streak, lastStudyDate, shield } = input;
  if (!lastStudyDate || streak <= 0) return { streak: 0, shield };
  const diff = daysBetween(lastStudyDate, todayKey(input.now));
  if (diff <= 1) return { streak, shield };
  // diff >= 2 → falhou pelo menos um dia
  if (shield && diff === 2) {
    return { streak, shield: false };
  }
  return { streak: 0, shield };
}

/** Após completar uma lição: incrementa streak conforme regras. */
export function registerLessonToday(input: {
  streak: number;
  lastStudyDate: string | null;
  now?: Date;
}): { streak: number; lastStudyDate: string; increased: boolean } {
  const today = todayKey(input.now);
  if (input.lastStudyDate === today) {
    return { streak: input.streak, lastStudyDate: today, increased: false };
  }
  if (input.lastStudyDate && daysBetween(input.lastStudyDate, today) === 1) {
    return { streak: input.streak + 1, lastStudyDate: today, increased: true };
  }
  return { streak: 1, lastStudyDate: today, increased: true };
}