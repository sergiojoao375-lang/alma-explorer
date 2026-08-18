/** Catálogo de itens físicos que podem ser atribuídos a cada categoria de prémio. */
export const ITENS_DISPONIVEIS = [
  "Kit_Bronze",
  "Caderno_Linhas",
  "Mochila",
  "Lapis_de_Cor",
  "Livro_Escolar",
  "Compasso",
  "Caderno_Desenho",
  "Livro_Colorir",
] as const;

export type ItemPremio = (typeof ITENS_DISPONIVEIS)[number];

/** Nome legível de cada item para alunos e balcão. */
export const NOME_ITEM: Record<string, string> = {
  Kit_Bronze: "2 Lápis + 1 Borracha",
  Caderno_Linhas: "3 Cadernos de linhas",
  Mochila: "Mochila escolar completa",
  Lapis_de_Cor: "Caixa de lápis de cor",
  Livro_Escolar: "1 Livro escolar",
  Compasso: "Compasso escolar",
  Caderno_Desenho: "Caderno de desenho",
  Livro_Colorir: "Livro de colorir",
};

/** Percentagem retida pela Almara para custos operacionais e lucro do software. */
export const TAXA_RETENCAO_SOFTWARE = 0.15;

/** Percentagem que vai para distribuição corporativa em material escolar. */
export const TAXA_DISTRIBUICAO = 1 - TAXA_RETENCAO_SOFTWARE;

export const TIERS = ["BRONZE", "PRATA", "OURO"] as const;
