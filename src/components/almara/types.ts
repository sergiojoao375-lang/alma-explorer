export type Screen =
  | "onboarding"
  | "dashboard"
  | "trail"
  | "quiz"
  | "profile"
  | "mistakes"
  | "shop"
  | "arena"
  | "prizes"
  | "ranking";


export type Grade = "6ª" | "7ª" | "8ª" | "9ª" | "10ª";

export type Difficulty = "Básico" | "Intermédio" | "Avançado";

export interface Subject {
  id: string;
  name: string;
  tagline: string;
  icon: string; // lucide icon name
  hue: string; // tailwind-ish class root
  bg: string;
  ring: string;
  emoji: string;
  progress: number;
  topics: Topic[];
  minGrade: Grade;
}

export interface Topic {
  id: number;
  title: string;
  unlocked: boolean;
  completed: boolean;
  grades: Grade[];
  questions?: Partial<Record<Difficulty, QuizQuestion[]>>;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explain: string;
}

export interface AppState {
  name: string;
  grade: Grade | null;
  streak: number;
  lives: number;
  xp: number;
  lessonsDone: number;
  daysActive: number;
  currentSubjectId: string | null;
  currentTopicId: number | null;
  currentDifficulty: Difficulty;
  coins: number;
  shield: boolean;
  lastStudyDate: string | null; // YYYY-MM-DD
  mistakes: MistakeEntry[];
  redemptions: Redemption[];
}

export interface Redemption {
  code: string;
  prizeId: string;
  prizeName: string;
  createdAt: string;
  expiresAt: string;
  used: boolean;
  /** Filial escolhida para levantar o material (ex.: "Kero — Kilamba"). */
  lojaNome?: string;
  lojaId?: string | null;
}


export interface MistakeEntry {
  subjectId: string;
  topicId: number;
  difficulty: Difficulty;
  questionId: number;
}