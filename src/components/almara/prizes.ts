import type { AppState, Redemption } from "./types";

export interface Prize {
  id: string;
  code: string; // usado no QR
  name: string;
  items: string;
  sponsor: string;
  tier: "Bronze" | "Prata" | "Ouro";
  bg: string;
  requirement: string;
  /** Nº de perguntas da prova final deste prémio. */
  perguntas: number;
}

/** Segundos disponíveis para responder a cada pergunta da prova de prémio. */
export const SEGUNDOS_POR_PERGUNTA = 20;

/** Intervalo obrigatório entre tentativas de prova de prémio (4 horas). */
export const COOLDOWN_MS = 4 * 60 * 60 * 1000;

export const PRIZES: Prize[] = [
  {
    id: "bronze",
    code: "BRONZE",
    name: "Kit Bronze",
    items: "2 Lápis + 1 Borracha",
    sponsor: "Kero",
    tier: "Bronze",
    bg: "bg-gradient-to-br from-amber-500 to-orange-700",
    requirement: "Ofensiva de 3 dias",
    perguntas: 10,
  },
  {
    id: "prata",
    code: "PRATA",
    name: "Kit Prata",
    items: "3 Cadernos de linhas",
    sponsor: "Candando",
    tier: "Prata",
    bg: "bg-gradient-to-br from-slate-400 to-slate-600",
    requirement: "9 lições concluídas + 230 XP",
    perguntas: 15,
  },
  {
    id: "ouro",
    code: "OURO",
    name: "Kit Ouro",
    items: "Mochila escolar completa",
    sponsor: "Kero",
    tier: "Ouro",
    bg: "bg-gradient-to-br from-yellow-400 to-amber-600",
    requirement: "Ofensiva de 30 dias ou ano lectivo completo",
    perguntas: 20,
  },
];

/** Lê os requisitos a partir do estado guardado no localStorage. */
export function isPrizeUnlocked(prize: Prize, state: AppState): boolean {
  if (prize.id === "bronze") return state.streak >= 3;
  if (prize.id === "prata") return state.lessonsDone >= 9 && state.xp >= 230;
  return state.streak >= 30 || state.lessonsDone >= 60;
}

export function prizeProgressLabel(prize: Prize, state: AppState): string {
  if (prize.id === "bronze") return `Ofensiva ${state.streak}/3 dias`;
  if (prize.id === "prata") return `${state.lessonsDone}/9 lições · ${state.xp}/230 XP`;
  return `Ofensiva ${state.streak}/30 dias · ${state.lessonsDone}/60 lições`;
}

const SECRET = "ALMARA2024NGOLA";

/** ID único do aparelho, guardado localmente. */
export function getDeviceId(): string {
  try {
    const k = "almara:device";
    let id = localStorage.getItem(k);
    if (!id) {
      id = Math.random().toString(36).slice(2, 8).toUpperCase();
      localStorage.setItem(k, id);
    }
    return id;
  } catch {
    return "OFFLINE";
  }
}

function checksum(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) % 99991;
  }
  return String(h).padStart(5, "0");
}

/** ALM-<LOJA>-<PRÉMIO>-<CHECKSUM> — assinado com a chave secreta Almara. */
export function generateRedemption(prize: Prize): Redemption {
  const device = getDeviceId();
  const created = new Date();
  const expires = new Date(created.getTime() + 7 * 24 * 60 * 60 * 1000);
  const payload = `${device}|${prize.code}|${expires.toISOString().slice(0, 10)}|${SECRET}`;
  const code = `ALM-${prize.sponsor.toUpperCase()}-${prize.code}-${checksum(payload)}`;
  return {
    code,
    prizeId: prize.id,
    prizeName: prize.name,
    createdAt: created.toISOString(),
    expiresAt: expires.toISOString(),
    used: false,
  };
}

/** String completa codificada no QR Code. */
export function qrPayload(r: Redemption): string {
  return `${getDeviceId()}|${r.code}|${r.expiresAt.slice(0, 10)}|${checksum(r.code + SECRET)}`;
}

/** ---------- TRAVA DE OPORTUNIDADE (4 horas entre tentativas) ---------- */
const COOLDOWN_KEY = "almara:prize-cooldown";

type CooldownMap = Record<string, number>;

function lerCooldowns(): CooldownMap {
  try {
    return JSON.parse(localStorage.getItem(COOLDOWN_KEY) ?? "{}") as CooldownMap;
  } catch {
    return {};
  }
}

/** Regista o momento da tentativa falhada de um prémio. */
export function registarTentativa(prizeId: string): void {
  try {
    const mapa = lerCooldowns();
    mapa[prizeId] = Date.now();
    localStorage.setItem(COOLDOWN_KEY, JSON.stringify(mapa));
  } catch {
    // offline-first: sem localStorage o aluno não fica bloqueado
  }
}

/** Milissegundos que faltam até poder tentar de novo (0 = livre). */
export function tempoRestanteCooldown(prizeId: string): number {
  const ultimo = lerCooldowns()[prizeId];
  if (!ultimo) return 0;
  return Math.max(0, ultimo + COOLDOWN_MS - Date.now());
}

/** Formata o tempo restante como "03h:59m" ou "04m:12s" no último minuto. */
export function formatarCooldown(ms: number): string {
  const total = Math.ceil(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${String(h).padStart(2, "0")}h:${String(m).padStart(2, "0")}m`;
  return `${String(m).padStart(2, "0")}m:${String(s).padStart(2, "0")}s`;
}
