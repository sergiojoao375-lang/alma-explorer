import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Onboarding } from "@/components/almara/Onboarding";
import { Dashboard } from "@/components/almara/Dashboard";
import { Trail } from "@/components/almara/Trail";
import { Quiz } from "@/components/almara/Quiz";
import { Profile } from "@/components/almara/Profile";
import { Shop } from "@/components/almara/Shop";
import { MistakesSession } from "@/components/almara/MistakesSession";
import { Arena } from "@/components/almara/Arena";
import { Prizes } from "@/components/almara/Prizes";
import { SUBJECTS, getQuestions } from "@/components/almara/data";
import { perguntasPatrocinadas, type PatrocinadorAtivo } from "@/components/almara/sponsors";
import { getPatrocinadoresAtivos, sincronizarAluno } from "@/lib/almara-backend.functions";
import { useServerFn } from "@tanstack/react-start";
import { computeStreakOnOpen, registerLessonToday } from "@/components/almara/streak";
import type {
  AppState,
  Difficulty,
  Grade,
  MistakeEntry,
  QuizQuestion,
  Redemption,
  Screen,
} from "@/components/almara/types";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [hydrated, setHydrated] = useState(false);
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [state, setState] = useState<AppState>({
    name: "",
    grade: null,
    streak: 3,
    lives: 5,
    xp: 120,
    lessonsDone: 4,
    daysActive: 3,
    currentSubjectId: null,
    currentTopicId: null,
    currentDifficulty: "Básico",
    coins: 0,
    shield: false,
    lastStudyDate: null,
    mistakes: [],
    redemptions: [],
  });
  const [lastLessonReward, setLastLessonReward] = useState<{
    coinsEarned: number;
    streakIncreased: boolean;
    newStreak: number;
  } | null>(null);
  const [patrocinadores, setPatrocinadores] = useState<PatrocinadorAtivo[]>([]);
  const currentSubjectIdForAds = state.currentSubjectId;
  const carregarMarcas = useServerFn(getPatrocinadoresAtivos);
  const enviarEstatisticas = useServerFn(sincronizarAluno);

  // Campanhas patrocinadas activas (falha em silêncio se estiver offline).
  useEffect(() => {
    void (async () => {
      try {
        const marcas = await carregarMarcas();
        setPatrocinadores(marcas as PatrocinadorAtivo[]);
      } catch {
        // offline-first: o quiz continua a funcionar sem campanhas
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("almara:state");
      if (raw) {
        const saved = JSON.parse(raw) as Partial<AppState>;
        setState((s) => {
          const merged: AppState = { ...s, ...saved };
          // Regra do foguinho ao abrir o app.
          const upd = computeStreakOnOpen({
            streak: merged.streak,
            lastStudyDate: merged.lastStudyDate,
            shield: merged.shield,
          });
          return { ...merged, streak: upd.streak, shield: upd.shield };
        });
        if (saved.name && saved.grade) setScreen("dashboard");
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("almara:state", JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, hydrated]);

  // Métricas de impacto escolar (anónimo, por aparelho).
  useEffect(() => {
    if (!hydrated || !state.name || !state.grade) return;
    const t = setTimeout(() => {
      let deviceId = localStorage.getItem("almara:device");
      if (!deviceId) {
        deviceId = `dev-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
        localStorage.setItem("almara:device", deviceId);
      }
      void enviarEstatisticas({
        data: {
          deviceId,
          nome: state.name,
          classe: state.grade,
          licoesConcluidas: state.lessonsDone,
          xp: state.xp,
          moedas: state.coins,
        },
      }).catch(() => undefined);
    }, 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, state.name, state.grade, state.lessonsDone, state.xp, state.coins]);

  const handleStart = (name: string, grade: Grade) => {
    setState((s) => ({ ...s, name, grade }));
    setScreen("dashboard");
  };

  const openSubject = (id: string) => {
    setState((s) => ({ ...s, currentSubjectId: id }));
    setScreen("trail");
  };

  const startQuiz = (topicId: number, difficulty: Difficulty) => {
    setState((s) => ({ ...s, currentTopicId: topicId, currentDifficulty: difficulty }));
    setScreen("quiz");
  };

  const finishQuiz = (correct: number, _total: number, finished: boolean) => {
    setState((s) => {
      if (!finished) {
        // Game over — sem recompensas de moedas nem streak.
        return { ...s, xp: s.xp + correct * 10 };
      }
      const coinsEarned = 10;
      const streakUpd = registerLessonToday({
        streak: s.streak,
        lastStudyDate: s.lastStudyDate,
      });
      setLastLessonReward({
        coinsEarned,
        streakIncreased: streakUpd.increased,
        newStreak: streakUpd.streak,
      });
      return {
        ...s,
        xp: s.xp + correct * 10,
        lessonsDone: s.lessonsDone + 1,
        coins: s.coins + coinsEarned,
        streak: streakUpd.streak,
        lastStudyDate: streakUpd.lastStudyDate,
      };
    });
    setScreen("trail");
  };

  const addMistake = (entry: MistakeEntry) => {
    setState((s) => {
      const key = `${entry.subjectId}|${entry.topicId}|${entry.difficulty}|${entry.questionId}`;
      const exists = s.mistakes.some(
        (m) =>
          `${m.subjectId}|${m.topicId}|${m.difficulty}|${m.questionId}` === key,
      );
      if (exists) return s;
      return { ...s, mistakes: [...s.mistakes, entry] };
    });
  };

  const removeMistake = (entry: MistakeEntry) => {
    setState((s) => ({
      ...s,
      mistakes: s.mistakes.filter(
        (m) =>
          !(
            m.subjectId === entry.subjectId &&
            m.topicId === entry.topicId &&
            m.difficulty === entry.difficulty &&
            m.questionId === entry.questionId
          ),
      ),
    }));
  };

  const buyLives = () => {
    setState((s) => {
      if (s.coins < 50 || s.lives >= 5) return s;
      return { ...s, coins: s.coins - 50, lives: 5 };
    });
  };

  const buyShield = () => {
    setState((s) => {
      if (s.coins < 100 || s.shield) return s;
      return { ...s, coins: s.coins - 100, shield: true };
    });
  };

  const settleCoins = (delta: number) => {
    setState((s) => ({ ...s, coins: Math.max(0, s.coins + delta) }));
  };

  const addRedemption = (r: Redemption) => {
    setState((s) => ({ ...s, redemptions: [...(s.redemptions ?? []), r] }));
  };

  const currentSubject =
    SUBJECTS.find((s) => s.id === state.currentSubjectId) ?? SUBJECTS[0];

  // Campanhas activas da disciplina actual — estável entre renders para não baralhar o quiz.
  const perguntasDeMarcas = useMemo(
    () => perguntasPatrocinadas(patrocinadores, currentSubjectIdForAds ?? SUBJECTS[0].id),
    [patrocinadores, currentSubjectIdForAds],
  );

  return (
    <div key={screen} className="animate-fade-in mx-auto min-h-screen max-w-md bg-background">
      {screen === "onboarding" && <Onboarding onStart={handleStart} />}
      {screen === "dashboard" && (
        <Dashboard
          state={state}
          onOpenSubject={openSubject}
          onProfile={() => setScreen("profile")}
          onOpenMistakes={() => setScreen("mistakes")}
          onOpenShop={() => setScreen("shop")}
          onOpenArena={() => setScreen("arena")}
          onOpenPrizes={() => setScreen("prizes")}
        />
      )}
      {screen === "prizes" && (
        <Prizes
          state={state}
          onBack={() => setScreen("dashboard")}
          onRedeem={addRedemption}
        />
      )}
      {screen === "trail" && (
        <Trail
          subject={currentSubject}
          grade={state.grade ?? "6ª"}
          onBack={() => setScreen("dashboard")}
          onStart={startQuiz}
        />
      )}
      {screen === "quiz" && (
        <Quiz
          subjectId={currentSubject.id}
          topicId={state.currentTopicId ?? 1}
          difficulty={state.currentDifficulty}
          onExit={() => setScreen("trail")}
          onComplete={finishQuiz}
          onWrong={(q) =>
            addMistake({
              subjectId: currentSubject.id,
              topicId: state.currentTopicId ?? 1,
              difficulty: state.currentDifficulty,
              questionId: q.id,
            })
          }
          reward={lastLessonReward}
          extraQuestions={perguntasDeMarcas}
        />
      )}
      {screen === "profile" && <Profile state={state} onBack={() => setScreen("dashboard")} />}
      {screen === "arena" && (
        <Arena
          playerName={state.name}
          grade={state.grade ?? "6ª"}
          coins={state.coins}
          onBack={() => setScreen("dashboard")}
          onSettle={settleCoins}
        />
      )}
      {screen === "shop" && (
        <Shop
          coins={state.coins}
          lives={state.lives}
          shield={state.shield}
          onBack={() => setScreen("dashboard")}
          onBuyLives={buyLives}
          onBuyShield={buyShield}
        />
      )}
      {screen === "mistakes" && (
        <MistakesSession
          mistakes={state.mistakes}
          onBack={() => setScreen("dashboard")}
          onCorrect={removeMistake}
          resolveQuestion={(m: MistakeEntry): QuizQuestion | null => {
            const qs = getQuestions(m.subjectId, m.topicId, m.difficulty);
            return qs.find((q) => q.id === m.questionId) ?? null;
          }}
        />
      )}
    </div>
  );
}
