import type { QuizQuestion } from "./types";

export type PatrocinadorAtivo = {
  id: string;
  nome_marca: string;
  disciplina_alvo: string;
  ativo: boolean;
  pergunta: string | null;
  opcoes: string[] | null;
  resposta_index: number;
  explicacao: string | null;
};

/** Pergunta genérica quando a marca não trouxe pergunta própria. */
function perguntaPadrao(marca: string): Omit<QuizQuestion, "id"> {
  return {
    question: `Material escolar da marca ${marca}: qual destas atitudes cuida melhor do teu material?`,
    options: [
      "Guardar na mochila depois de usar",
      "Deixar ao sol o dia todo",
      "Emprestar e nunca pedir de volta",
      "Partir a ponta de propósito",
    ],
    answerIndex: 0,
    explain: `Cuidar do material ${marca} faz o teu kit escolar durar todo o ano lectivo.`,
  };
}

/**
 * Injecta as perguntas temáticas das marcas activas na disciplina indicada.
 * Marcas inactivas nunca aparecem no quiz.
 */
export function perguntasPatrocinadas(
  patrocinadores: PatrocinadorAtivo[],
  subjectId: string,
): QuizQuestion[] {
  return patrocinadores
    .filter((p) => p.ativo && p.disciplina_alvo === subjectId)
    .map((p, i) => {
      const base =
        p.pergunta && p.opcoes && p.opcoes.length >= 2
          ? {
              question: p.pergunta,
              options: p.opcoes,
              answerIndex: Math.min(p.resposta_index, p.opcoes.length - 1),
              explain: p.explicacao ?? `Pergunta patrocinada por ${p.nome_marca}.`,
            }
          : perguntaPadrao(p.nome_marca);
      return { id: 90_000 + i, ...base } satisfies QuizQuestion;
    });
}
