import type { Difficulty, QuizQuestion } from "./types";

// ---------- BANCOS ADICIONAIS DE TÓPICOS (5+ por disciplina) ----------
const MAT_EQUACOES: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "Na equação x + 5 = 12, qual é o valor de x?", options: ["5", "7", "12", "17"], answerIndex: 1, explain: "Passa o 5 para o outro lado: x = 12 − 5 = 7." },
    { id: 2, question: "Resolve: x − 3 = 10", options: ["7", "13", "30", "3"], answerIndex: 1, explain: "x = 10 + 3 = 13." },
    { id: 3, question: "Se 2x = 14, então x vale:", options: ["7", "12", "16", "28"], answerIndex: 0, explain: "Divide ambos os lados por 2: x = 14 ÷ 2 = 7." },
  ],
  Intermédio: [
    { id: 4, question: "Resolve: 3x + 2 = 17", options: ["3", "5", "6", "15"], answerIndex: 1, explain: "3x = 15, logo x = 5." },
    { id: 5, question: "Um candongueiro cobra 200 Kz por passageiro. Se recebeu 3000 Kz, quantos passageiros levou?", options: ["10", "12", "15", "20"], answerIndex: 2, explain: "200x = 3000 → x = 15 passageiros." },
    { id: 6, question: "Resolve: x/4 = 6", options: ["10", "2", "24", "4"], answerIndex: 2, explain: "Multiplica ambos os lados por 4: x = 24." },
  ],
  Avançado: [
    { id: 7, question: "Resolve: 5x − 3 = 2x + 9", options: ["2", "4", "6", "12"], answerIndex: 1, explain: "5x − 2x = 9 + 3 → 3x = 12 → x = 4." },
    { id: 8, question: "Kiala tinha x kwanzas, gastou 500 e ficou com o dobro de 250. Quanto tinha?", options: ["750 Kz", "1000 Kz", "1250 Kz", "1500 Kz"], answerIndex: 1, explain: "x − 500 = 500 → x = 1000 Kz." },
    { id: 9, question: "Resolve: 2(x + 3) = 16", options: ["5", "8", "11", "13"], answerIndex: 0, explain: "2x + 6 = 16 → 2x = 10 → x = 5." },
  ],
};

const MAT_ESTATISTICA: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "A média de 4, 6 e 8 é:", options: ["5", "6", "7", "18"], answerIndex: 1, explain: "(4+6+8) ÷ 3 = 18 ÷ 3 = 6." },
    { id: 2, question: "O valor que aparece mais vezes num conjunto chama-se:", options: ["Média", "Moda", "Mediana", "Total"], answerIndex: 1, explain: "Moda é o valor mais frequente — como o preço mais praticado no mercado." },
    { id: 3, question: "Num gráfico de barras, a barra mais alta representa:", options: ["O menor valor", "O maior valor", "A média", "O erro"], answerIndex: 1, explain: "Quanto mais alta a barra, maior a quantidade representada." },
  ],
  Intermédio: [
    { id: 4, question: "A mediana de 3, 7, 9 é:", options: ["3", "7", "9", "6,3"], answerIndex: 1, explain: "Ordenando, o valor do meio é 7." },
    { id: 5, question: "Numa turma de 40 alunos, 10 faltaram. Que percentagem faltou?", options: ["10%", "20%", "25%", "40%"], answerIndex: 2, explain: "10 ÷ 40 = 0,25 = 25%." },
    { id: 6, question: "Amplitude de um conjunto é:", options: ["Maior menos menor valor", "A soma de todos", "O valor médio", "O mais repetido"], answerIndex: 0, explain: "Amplitude = valor máximo − valor mínimo." },
  ],
  Avançado: [
    { id: 7, question: "Média de 12, 15, 18 e 15:", options: ["14", "15", "16", "60"], answerIndex: 1, explain: "60 ÷ 4 = 15." },
    { id: 8, question: "Se a média de 5 notas é 12, a soma das notas é:", options: ["12", "17", "50", "60"], answerIndex: 3, explain: "Soma = média × nº de valores = 12 × 5 = 60." },
    { id: 9, question: "Num conjunto com número par de valores, a mediana é:", options: ["O valor central", "A média dos dois centrais", "A moda", "O maior valor"], answerIndex: 1, explain: "Com número par de dados faz-se a média dos dois valores centrais." },
  ],
};

const MAT_PROPORCAO: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "Quanto é 10% de 2000 Kz?", options: ["20 Kz", "100 Kz", "200 Kz", "2000 Kz"], answerIndex: 2, explain: "10% = dividir por 10 → 200 Kz." },
    { id: 2, question: "Se 1 kg de arroz custa 800 Kz, 3 kg custam:", options: ["1600 Kz", "2400 Kz", "2800 Kz", "3200 Kz"], answerIndex: 1, explain: "800 × 3 = 2400 Kz." },
    { id: 3, question: "50% de um valor é o mesmo que:", options: ["Um terço", "Metade", "Um quarto", "O dobro"], answerIndex: 1, explain: "50% corresponde a metade." },
  ],
  Intermédio: [
    { id: 4, question: "Numa promoção do Kero, um produto de 5000 Kz tem 20% de desconto. Pagas:", options: ["1000 Kz", "3000 Kz", "4000 Kz", "4800 Kz"], answerIndex: 2, explain: "Desconto = 1000 Kz; 5000 − 1000 = 4000 Kz." },
    { id: 5, question: "Se 4 cadernos custam 2000 Kz, 6 cadernos custam:", options: ["2400 Kz", "2500 Kz", "3000 Kz", "3600 Kz"], answerIndex: 2, explain: "Cada caderno = 500 Kz; 500 × 6 = 3000 Kz." },
    { id: 6, question: "Duas grandezas são directamente proporcionais quando:", options: ["Uma sobe e a outra desce", "Ambas sobem na mesma razão", "Não se relacionam", "Uma é sempre zero"], answerIndex: 1, explain: "Se duplicas uma, a outra duplica — a razão mantém-se constante." },
  ],
  Avançado: [
    { id: 7, question: "Um trabalho feito por 3 pedreiros em 8 dias; com 6 pedreiros leva:", options: ["2 dias", "4 dias", "8 dias", "16 dias"], answerIndex: 1, explain: "Proporcionalidade inversa: o dobro de trabalhadores, metade do tempo → 4 dias." },
    { id: 8, question: "Um preço subiu de 4000 Kz para 5000 Kz. O aumento foi de:", options: ["10%", "20%", "25%", "50%"], answerIndex: 2, explain: "1000 ÷ 4000 = 0,25 = 25%." },
    { id: 9, question: "Se 2/5 de uma turma são 16 alunos, a turma tem:", options: ["30", "36", "40", "45"], answerIndex: 2, explain: "16 ÷ 2 = 8 por quinto; 8 × 5 = 40 alunos." },
  ],
};

const POR_SUJEITO: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "Na frase “A Ana estuda”, o sujeito é:", options: ["estuda", "A Ana", "A", "Nenhum"], answerIndex: 1, explain: "Sujeito é quem pratica a acção: A Ana." },
    { id: 2, question: "O predicado indica:", options: ["Quem faz", "O que se diz do sujeito", "O local", "O tempo"], answerIndex: 1, explain: "O predicado informa a acção ou estado do sujeito." },
    { id: 3, question: "Em “Os meninos jogam bola no musseque”, o sujeito é:", options: ["bola", "no musseque", "Os meninos", "jogam"], answerIndex: 2, explain: "Quem joga? Os meninos." },
  ],
  Intermédio: [
    { id: 4, question: "Sujeito simples é aquele que tem:", options: ["Um só núcleo", "Dois núcleos", "Nenhum núcleo", "Verbo"], answerIndex: 0, explain: "Sujeito simples tem apenas um núcleo, ex.: “O Kiala chegou”." },
    { id: 5, question: "Em “Kiala e Nzinga foram à lavra”, o sujeito é:", options: ["Simples", "Composto", "Oculto", "Indeterminado"], answerIndex: 1, explain: "Tem dois núcleos → sujeito composto." },
    { id: 6, question: "Em “Chegámos cedo”, o sujeito é:", options: ["Composto", "Oculto (nós)", "Indeterminado", "Inexistente"], answerIndex: 1, explain: "O sujeito “nós” está subentendido na forma verbal." },
  ],
  Avançado: [
    { id: 7, question: "Em “Chove muito no Uíge”, o sujeito é:", options: ["Chove", "muito", "Inexistente", "Oculto"], answerIndex: 2, explain: "Verbos que exprimem fenómenos da natureza não têm sujeito." },
    { id: 8, question: "O núcleo do predicado é sempre:", options: ["O nome", "O verbo", "O adjectivo", "O advérbio"], answerIndex: 1, explain: "O verbo é o núcleo do predicado." },
    { id: 9, question: "Em “Dizem que o mercado abriu cedo”, o sujeito é:", options: ["Simples", "Composto", "Indeterminado", "Oculto"], answerIndex: 2, explain: "Não se identifica quem diz → sujeito indeterminado." },
  ],
};

const POR_NARRATIVO: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "O texto narrativo conta:", options: ["Uma receita", "Uma história", "Uma lista", "Uma regra"], answerIndex: 1, explain: "Narrar é contar acontecimentos com personagens, tempo e espaço." },
    { id: 2, question: "Quem conta a história chama-se:", options: ["Personagem", "Narrador", "Autor", "Leitor"], answerIndex: 1, explain: "O narrador é a voz que conta os acontecimentos." },
    { id: 3, question: "As partes principais da narrativa são:", options: ["Título e fim", "Introdução, desenvolvimento e conclusão", "Só o meio", "Verso e prosa"], answerIndex: 1, explain: "A narrativa organiza-se em introdução, desenvolvimento e conclusão." },
  ],
  Intermédio: [
    { id: 4, question: "A personagem principal chama-se:", options: ["Antagonista", "Protagonista", "Narrador", "Figurante"], answerIndex: 1, explain: "O protagonista é o centro da acção." },
    { id: 5, question: "O espaço da narrativa indica:", options: ["Quando", "Onde", "Quem", "Porquê"], answerIndex: 1, explain: "Espaço é o lugar onde decorre a acção — ex.: uma sanzala do Bié." },
    { id: 6, question: "Narrador participante é aquele que:", options: ["Está fora da história", "É personagem da história", "Não existe", "É o autor real"], answerIndex: 1, explain: "Conta na 1.ª pessoa porque participa nos acontecimentos." },
  ],
  Avançado: [
    { id: 7, question: "O momento de maior tensão da narrativa é:", options: ["A introdução", "O clímax", "O prólogo", "O epílogo"], answerIndex: 1, explain: "O clímax é o ponto alto do conflito." },
    { id: 8, question: "Narrador omnisciente é aquele que:", options: ["Sabe tudo, até os pensamentos", "Só vê o exterior", "É personagem", "Não fala"], answerIndex: 0, explain: "Omnisciente significa “que sabe tudo”." },
    { id: 9, question: "Discurso directo caracteriza-se por:", options: ["Falas com travessão ou aspas", "Resumo do narrador", "Ausência de personagens", "Versos"], answerIndex: 0, explain: "No discurso directo reproduz-se a fala tal como foi dita." },
  ],
};

const POR_ORTOGRAFIA: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "Qual palavra está bem escrita?", options: ["caza", "casa", "kasa", "cassa"], answerIndex: 1, explain: "Escreve-se “casa”, com s entre vogais a ler como z." },
    { id: 2, question: "A palavra “avó” leva acento:", options: ["Agudo", "Circunflexo", "Til", "Nenhum"], answerIndex: 0, explain: "Avó leva acento agudo no ó aberto." },
    { id: 3, question: "Antes de p e b escreve-se:", options: ["n", "m", "nh", "h"], answerIndex: 1, explain: "Regra: campo, também, sempre — usa-se m antes de p e b." },
  ],
  Intermédio: [
    { id: 4, question: "Palavras graves acentuam-se quando terminam em:", options: ["a, e, o", "l, r, x, ão", "Sempre", "Nunca"], answerIndex: 1, explain: "Graves acentuam-se se terminarem em l, r, x, n, ps, ã(s), ão(s), i, u." },
    { id: 5, question: "Qual está correcta?", options: ["excessão", "excepção", "excesão", "eceção"], answerIndex: 1, explain: "A forma correcta em português europeu é “excepção”." },
    { id: 6, question: "A palavra “Luanda” escreve-se com maiúscula porque é:", options: ["Nome comum", "Nome próprio", "Adjectivo", "Verbo"], answerIndex: 1, explain: "Nomes próprios de cidades levam maiúscula inicial." },
  ],
  Avançado: [
    { id: 7, question: "Esdrúxulas (proparoxítonas) acentuam-se:", options: ["Nunca", "Sempre", "Só com til", "Só no plural"], answerIndex: 1, explain: "Todas as palavras esdrúxulas são acentuadas: música, árvore, câmara." },
    { id: 8, question: "Qual das formas está correcta?", options: ["à noite", "a noite fria chegou tarde à", "àh noite", "á noite"], answerIndex: 0, explain: "A crase “à” resulta de a + a e usa-se em “à noite”." },
    { id: 9, question: "Em “por que”, “porquê” e “porque”, a forma usada no fim de pergunta é:", options: ["por que", "porque", "porquê", "porqué"], answerIndex: 2, explain: "No fim de frase interrogativa usa-se “porquê?”." },
  ],
};

const HIS_COLONIZACAO: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "Em que ano chegou Diogo Cão à foz do rio Zaire?", options: ["1482", "1575", "1648", "1885"], answerIndex: 0, explain: "Diogo Cão chegou em 1482, iniciando o contacto português com o Reino do Congo." },
    { id: 2, question: "Quem fundou a cidade de Luanda, em 1575?", options: ["Diogo Cão", "Paulo Dias de Novais", "Salvador Correia", "Afonso I"], answerIndex: 1, explain: "Paulo Dias de Novais fundou São Paulo da Assunção de Loanda." },
    { id: 3, question: "O tráfico de escravizados partia sobretudo dos portos de:", options: ["Luanda e Benguela", "Huambo e Bié", "Uíge e Malanje", "Lubango e Namibe"], answerIndex: 0, explain: "Luanda e Benguela foram os principais portos negreiros do Atlântico Sul." },
  ],
  Intermédio: [
    { id: 4, question: "A Conferência de Berlim (1884-85) serviu para:", options: ["Libertar África", "Partilhar África entre potências europeias", "Acabar a escravatura", "Criar a ONU"], answerIndex: 1, explain: "Nela as potências europeias dividiram o continente africano entre si." },
    { id: 5, question: "O trabalho forçado imposto aos angolanos chamava-se:", options: ["Contrato", "Kimbanda", "Kilombo", "Sanzala"], answerIndex: 0, explain: "O regime de “contrato” obrigava os africanos a trabalhar em roças e obras." },
    { id: 6, question: "A resistência dos Dembos destacou-se sobretudo:", options: ["No litoral sul", "No norte de Angola", "No deserto do Namibe", "No planalto do Bié"], answerIndex: 1, explain: "Os Dembos, a norte de Luanda, resistiram durante séculos." },
  ],
  Avançado: [
    { id: 7, question: "Mandume ya Ndemufayo foi líder de que povo?", options: ["Bakongo", "Ovambo (Cuanhama)", "Ovimbundu", "Chokwe"], answerIndex: 1, explain: "Mandume liderou os Cuanhama no sul, resistindo até 1917." },
    { id: 8, question: "O Estatuto do Indigenato dividia a população em:", options: ["Ricos e pobres", "Indígenas e assimilados", "Urbanos e rurais", "Livres e escravos"], answerIndex: 1, explain: "Só os “assimilados” tinham alguns direitos civis." },
    { id: 9, question: "A ocupação efectiva de todo o território angolano concluiu-se sobretudo:", options: ["No século XVI", "No século XVII", "No início do século XX", "Em 1975"], answerIndex: 2, explain: "As campanhas de “pacificação” prolongaram-se até às primeiras décadas do século XX." },
  ],
};

const HIS_INDEPENDENCIA: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "Em que data Angola se tornou independente?", options: ["4 de Fevereiro de 1961", "11 de Novembro de 1975", "1 de Maio de 1974", "17 de Setembro de 1979"], answerIndex: 1, explain: "A independência foi proclamada a 11 de Novembro de 1975." },
    { id: 2, question: "Quem proclamou a independência de Angola?", options: ["Agostinho Neto", "Mandume", "Njinga Mbandi", "Salvador Correia"], answerIndex: 0, explain: "António Agostinho Neto, primeiro Presidente de Angola." },
    { id: 3, question: "O 4 de Fevereiro de 1961 marca:", options: ["A independência", "O início da luta armada", "O fim da guerra", "A criação da ONU"], answerIndex: 1, explain: "Assalto às cadeias de Luanda — início da luta armada de libertação." },
  ],
  Intermédio: [
    { id: 4, question: "O Acordo do Alvor (1975) foi assinado entre Portugal e:", options: ["MPLA, FNLA e UNITA", "Só o MPLA", "A ONU", "A OUA"], answerIndex: 0, explain: "Definiu a transição para a independência com os três movimentos." },
    { id: 5, question: "A Revolução dos Cravos em Portugal ocorreu em:", options: ["25 de Abril de 1974", "11 de Novembro de 1975", "4 de Fevereiro de 1961", "1 de Janeiro de 1970"], answerIndex: 0, explain: "O 25 de Abril de 1974 abriu caminho à descolonização." },
    { id: 6, question: "Agostinho Neto era também conhecido como:", options: ["Poeta e médico", "Engenheiro", "Militar de carreira", "Comerciante"], answerIndex: 0, explain: "Foi médico e um dos maiores poetas angolanos." },
  ],
  Avançado: [
    { id: 7, question: "O Dia dos Heróis Nacionais assinala o nascimento de Agostinho Neto a:", options: ["11 de Novembro", "17 de Setembro", "4 de Fevereiro", "1 de Maio"], answerIndex: 1, explain: "17 de Setembro, Dia dos Heróis Nacionais." },
    { id: 8, question: "Os três movimentos de libertação de Angola foram:", options: ["MPLA, FNLA e UNITA", "MPLA, ANC e SWAPO", "FNLA, ZANU e PAIGC", "UNITA, FRELIMO e MPLA"], answerIndex: 0, explain: "MPLA, FNLA e UNITA lutaram contra o colonialismo português." },
    { id: 9, question: "Os Acordos de Bicesse (1991) visaram:", options: ["Iniciar a guerra", "Estabelecer a paz e eleições", "Criar o kwanza", "Fundar a OUA"], answerIndex: 1, explain: "Previram cessar-fogo e as primeiras eleições multipartidárias de 1992." },
  ],
};

const HIS_CONTEMPORANEA: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "A moeda oficial de Angola chama-se:", options: ["Escudo", "Kwanza", "Rand", "Franco"], answerIndex: 1, explain: "O Kwanza (AOA) tem o nome do maior rio inteiramente angolano." },
    { id: 2, question: "A capital de Angola é:", options: ["Huambo", "Luanda", "Benguela", "Lubango"], answerIndex: 1, explain: "Luanda é a capital política e económica do país." },
    { id: 3, question: "A paz definitiva em Angola foi alcançada em:", options: ["1992", "1998", "2002", "2010"], answerIndex: 2, explain: "O acordo do Luena, em 2002, encerrou o conflito armado." },
  ],
  Intermédio: [
    { id: 4, question: "Angola é membro da SADC, que é uma organização:", options: ["Africana austral", "Europeia", "Americana", "Asiática"], answerIndex: 0, explain: "A SADC reúne países da África Austral para cooperação regional." },
    { id: 5, question: "A principal fonte de receitas de Angola tem sido:", options: ["Turismo", "Petróleo", "Pesca", "Têxteis"], answerIndex: 1, explain: "O petróleo, sobretudo do Zaire e Cabinda, domina as exportações." },
    { id: 6, question: "As primeiras eleições multipartidárias em Angola realizaram-se em:", options: ["1975", "1992", "2002", "2008"], answerIndex: 1, explain: "Em Setembro de 1992." },
  ],
  Avançado: [
    { id: 7, question: "A Constituição actualmente em vigor foi aprovada em:", options: ["1975", "1992", "2010", "2017"], answerIndex: 2, explain: "A Constituição da República de Angola data de 2010." },
    { id: 8, question: "Angola aderiu à OPEP no ano de:", options: ["1998", "2007", "2015", "2020"], answerIndex: 1, explain: "Entrou em 2007 (e saiu em 2024)." },
    { id: 9, question: "A diversificação da economia procura reduzir a dependência de:", options: ["Agricultura", "Petróleo", "Turismo", "Educação"], answerIndex: 1, explain: "O objectivo é depender menos das receitas petrolíferas." },
  ],
};

const FIS_FORCAS: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "A unidade de força no Sistema Internacional é:", options: ["Joule", "Newton", "Watt", "Pascal"], answerIndex: 1, explain: "Força mede-se em newton (N)." },
    { id: 2, question: "A força que puxa os corpos para o centro da Terra é:", options: ["Atrito", "Gravidade", "Tensão", "Empuxo"], answerIndex: 1, explain: "A gravidade faz cair a manga da árvore." },
    { id: 3, question: "O atrito é uma força que:", options: ["Ajuda o movimento", "Opõe-se ao movimento", "Não existe", "Cria energia"], answerIndex: 1, explain: "O atrito contraria o deslizamento — é por isso que o pneu agarra a estrada." },
  ],
  Intermédio: [
    { id: 4, question: "A 1.ª Lei de Newton é a lei da:", options: ["Acção e reacção", "Inércia", "Gravitação", "Conservação"], answerIndex: 1, explain: "Um corpo mantém o seu estado de repouso ou movimento se nenhuma força resultante actuar." },
    { id: 5, question: "Segundo F = m × a, se a massa é 10 kg e a aceleração 2 m/s², a força é:", options: ["5 N", "12 N", "20 N", "0,2 N"], answerIndex: 2, explain: "F = 10 × 2 = 20 N." },
    { id: 6, question: "Quando empurras uma parede, ela empurra-te de volta. Esta é a:", options: ["1.ª Lei", "2.ª Lei", "3.ª Lei", "Lei de Ohm"], answerIndex: 2, explain: "Acção e reacção: forças iguais em módulo e sentidos opostos." },
  ],
  Avançado: [
    { id: 7, question: "Um corpo de 60 kg na Terra (g = 10 m/s²) tem peso:", options: ["6 N", "60 N", "600 N", "6000 N"], answerIndex: 2, explain: "P = m × g = 60 × 10 = 600 N." },
    { id: 8, question: "Se a força resultante sobre um corpo é zero, o corpo:", options: ["Acelera", "Mantém velocidade constante", "Pára de imediato", "Ganha massa"], answerIndex: 1, explain: "Sem força resultante não há aceleração — equilíbrio dinâmico." },
    { id: 9, question: "Massa e peso diferem porque:", options: ["São iguais", "Peso depende da gravidade", "Massa depende do local", "Peso mede-se em kg"], answerIndex: 1, explain: "A massa é constante; o peso varia com a gravidade do local." },
  ],
};

const FIS_ENERGIA: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "A unidade de energia no SI é:", options: ["Newton", "Joule", "Watt", "Ampere"], answerIndex: 1, explain: "Energia e trabalho medem-se em joule (J)." },
    { id: 2, question: "Energia armazenada num corpo elevado chama-se:", options: ["Cinética", "Potencial gravítica", "Térmica", "Sonora"], answerIndex: 1, explain: "Depende da altura e da massa — como água numa caixa no telhado." },
    { id: 3, question: "A energia do movimento é a energia:", options: ["Cinética", "Potencial", "Química", "Nuclear"], answerIndex: 0, explain: "Cinética vem do grego “kinesis”, movimento." },
  ],
  Intermédio: [
    { id: 4, question: "Trabalho calcula-se por:", options: ["W = F × d", "W = m × a", "W = P/t", "W = V × I"], answerIndex: 0, explain: "Trabalho é força vezes deslocamento na direcção da força." },
    { id: 5, question: "Potência é:", options: ["Força por tempo", "Trabalho por unidade de tempo", "Massa por volume", "Energia vezes tempo"], answerIndex: 1, explain: "P = W / t, medida em watt." },
    { id: 6, question: "A barragem de Laúca converte energia:", options: ["Solar em química", "Potencial da água em eléctrica", "Térmica em sonora", "Nuclear em cinética"], answerIndex: 1, explain: "A água em queda move turbinas que geram electricidade." },
  ],
  Avançado: [
    { id: 7, question: "Uma força de 50 N desloca um caixote 4 m. O trabalho é:", options: ["12,5 J", "54 J", "200 J", "0 J"], answerIndex: 2, explain: "W = 50 × 4 = 200 J." },
    { id: 8, question: "Segundo a conservação da energia, a energia:", options: ["Desaparece", "Transforma-se", "Cria-se do nada", "É sempre cinética"], answerIndex: 1, explain: "A energia não se cria nem se destrói, apenas se transforma." },
    { id: 9, question: "Uma máquina realiza 600 J em 3 s. A potência é:", options: ["200 W", "1800 W", "2 W", "60 W"], answerIndex: 0, explain: "P = 600 ÷ 3 = 200 W." },
  ],
};

const FIS_ELETRICIDADE: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "A corrente eléctrica mede-se em:", options: ["Volt", "Ampere", "Ohm", "Watt"], answerIndex: 1, explain: "A intensidade da corrente mede-se em ampere (A)." },
    { id: 2, question: "Material que conduz bem a electricidade:", options: ["Borracha", "Cobre", "Madeira", "Vidro"], answerIndex: 1, explain: "O cobre é usado nos fios eléctricos por ser bom condutor." },
    { id: 3, question: "Para a lâmpada acender, o circuito deve estar:", options: ["Aberto", "Fechado", "Partido", "Sem pilha"], answerIndex: 1, explain: "Só um circuito fechado permite a passagem da corrente." },
  ],
  Intermédio: [
    { id: 4, question: "A tensão eléctrica mede-se em:", options: ["Ampere", "Volt", "Joule", "Newton"], answerIndex: 1, explain: "Tensão ou diferença de potencial mede-se em volt (V)." },
    { id: 5, question: "A resistência eléctrica mede-se em:", options: ["Ohm", "Watt", "Volt", "Coulomb"], answerIndex: 0, explain: "Símbolo Ω, em homenagem a Georg Ohm." },
    { id: 6, question: "Num circuito em série, se uma lâmpada queima:", options: ["As outras continuam", "Todas apagam", "Aumenta a corrente", "Nada muda"], answerIndex: 1, explain: "Em série há um único caminho para a corrente." },
  ],
  Avançado: [
    { id: 7, question: "Lei de Ohm: se V = 12 V e R = 4 Ω, a corrente é:", options: ["3 A", "48 A", "0,3 A", "16 A"], answerIndex: 0, explain: "I = V / R = 12 ÷ 4 = 3 A." },
    { id: 8, question: "Um aparelho de 100 W ligado 10 h consome:", options: ["1 kWh", "10 kWh", "100 kWh", "0,1 kWh"], answerIndex: 0, explain: "100 W × 10 h = 1000 Wh = 1 kWh." },
    { id: 9, question: "Num circuito em paralelo, a tensão em cada ramo é:", options: ["Diferente", "A mesma", "Zero", "Metade"], answerIndex: 1, explain: "Em paralelo todos os ramos ficam sujeitos à mesma tensão." },
  ],
};

const QUI_TABELA: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "A tabela periódica organiza os elementos por:", options: ["Ordem alfabética", "Número atómico crescente", "Preço", "Cor"], answerIndex: 1, explain: "Mendeleev e a versão moderna organizam por número atómico." },
    { id: 2, question: "O símbolo do hidrogénio é:", options: ["He", "H", "Hi", "Hy"], answerIndex: 1, explain: "Hidrogénio = H, o elemento mais leve." },
    { id: 3, question: "As linhas horizontais da tabela chamam-se:", options: ["Grupos", "Períodos", "Famílias", "Séries"], answerIndex: 1, explain: "As linhas são períodos; as colunas são grupos." },
  ],
  Intermédio: [
    { id: 4, question: "Os elementos do grupo 18 chamam-se:", options: ["Metais alcalinos", "Halogéneos", "Gases nobres", "Lantanídeos"], answerIndex: 2, explain: "Gases nobres são muito estáveis, como o hélio e o néon." },
    { id: 5, question: "O símbolo do sódio é:", options: ["So", "Na", "Sd", "S"], answerIndex: 1, explain: "Na, do latim natrium — presente no sal de cozinha." },
    { id: 6, question: "Elementos do mesmo grupo têm em comum:", options: ["A massa", "O número de electrões de valência", "O número de neutrões", "A cor"], answerIndex: 1, explain: "É isso que lhes dá propriedades químicas semelhantes." },
  ],
  Avançado: [
    { id: 7, question: "O ferro, muito usado na construção em Angola, tem símbolo:", options: ["Fr", "F", "Fe", "Ir"], answerIndex: 2, explain: "Fe, do latim ferrum." },
    { id: 8, question: "Um elemento do 3.º período tem quantas camadas electrónicas?", options: ["1", "2", "3", "4"], answerIndex: 2, explain: "O número do período indica o número de camadas." },
    { id: 9, question: "Metais caracterizam-se geralmente por:", options: ["Serem maus condutores", "Serem bons condutores e maleáveis", "Serem gasosos", "Não terem brilho"], answerIndex: 1, explain: "Metais conduzem calor e electricidade e são maleáveis." },
  ],
};

const QUI_LIGACOES: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "A ligação entre um metal e um não-metal chama-se:", options: ["Iónica", "Covalente", "Metálica", "Nuclear"], answerIndex: 0, explain: "Há transferência de electrões — ex.: NaCl, o sal de cozinha." },
    { id: 2, question: "A fórmula da água é:", options: ["CO2", "H2O", "O2", "NaCl"], answerIndex: 1, explain: "Duas partes de hidrogénio e uma de oxigénio." },
    { id: 3, question: "Na ligação covalente os átomos:", options: ["Trocam electrões", "Partilham electrões", "Perdem núcleos", "Não interagem"], answerIndex: 1, explain: "Partilham pares de electrões, como na molécula de O₂." },
  ],
  Intermédio: [
    { id: 4, question: "O sal de cozinha (NaCl) é formado por ligação:", options: ["Covalente", "Iónica", "Metálica", "Fraca"], answerIndex: 1, explain: "O sódio cede um electrão ao cloro formando iões Na⁺ e Cl⁻." },
    { id: 5, question: "A ligação metálica explica-se por:", options: ["Mar de electrões livres", "Partilha de pares", "Transferência total", "Pontes de hidrogénio"], answerIndex: 0, explain: "Os electrões deslocalizados explicam a condutividade dos metais." },
    { id: 6, question: "Compostos iónicos, em geral:", options: ["Têm baixo ponto de fusão", "Conduzem corrente quando dissolvidos", "Não se dissolvem", "São gases"], answerIndex: 1, explain: "Os iões livres em solução conduzem electricidade." },
  ],
  Avançado: [
    { id: 7, question: "Na molécula CO₂ existem ligações:", options: ["Iónicas", "Covalentes duplas", "Metálicas", "Nenhuma"], answerIndex: 1, explain: "O carbono liga-se a cada oxigénio por uma dupla ligação." },
    { id: 8, question: "Electronegatividade é a tendência para:", options: ["Perder electrões", "Atrair electrões numa ligação", "Emitir radiação", "Ganhar neutrões"], answerIndex: 1, explain: "Quanto maior, mais o átomo puxa o par electrónico." },
    { id: 9, question: "A regra do octeto diz que os átomos tendem a ficar com:", options: ["2 electrões", "8 electrões de valência", "0 electrões", "18 electrões"], answerIndex: 1, explain: "Procuram a configuração estável dos gases nobres." },
  ],
};

const QUI_REACOES: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "Numa reacção química, as substâncias iniciais chamam-se:", options: ["Produtos", "Reagentes", "Catalisadores", "Resíduos"], answerIndex: 1, explain: "Reagentes transformam-se em produtos." },
    { id: 2, question: "A ferrugem no ferro é um exemplo de:", options: ["Mudança física", "Reacção química (oxidação)", "Fusão", "Evaporação"], answerIndex: 1, explain: "O ferro reage com oxigénio e humidade formando óxido." },
    { id: 3, question: "Sinal de que houve reacção química:", options: ["Mudança de forma", "Libertação de gás ou mudança de cor", "Mudança de lugar", "Aquecimento do ambiente apenas"], answerIndex: 1, explain: "Bolhas, cor nova, cheiro ou precipitado indicam reacção." },
  ],
  Intermédio: [
    { id: 4, question: "A equação H₂ + O₂ → H₂O fica correctamente acertada como:", options: ["H₂ + O₂ → H₂O", "2H₂ + O₂ → 2H₂O", "H₂ + 2O₂ → H₂O", "2H₂ + 2O₂ → H₂O"], answerIndex: 1, explain: "É preciso igualar os átomos dos dois lados." },
    { id: 5, question: "A Lei de Lavoisier diz que a massa:", options: ["Aumenta", "Diminui", "Conserva-se", "Desaparece"], answerIndex: 2, explain: "Na natureza nada se cria, nada se perde, tudo se transforma." },
    { id: 6, question: "A combustão do gás butano na cozinha é uma reacção:", options: ["Endotérmica", "Exotérmica", "Nuclear", "Neutra"], answerIndex: 1, explain: "Liberta calor e luz — exotérmica." },
  ],
  Avançado: [
    { id: 7, question: "Um catalisador serve para:", options: ["Consumir os reagentes", "Acelerar a reacção sem se consumir", "Parar a reacção", "Mudar os produtos"], answerIndex: 1, explain: "Diminui a energia de activação sem ser gasto." },
    { id: 8, question: "Reacção que absorve calor chama-se:", options: ["Exotérmica", "Endotérmica", "Iónica", "Reversível"], answerIndex: 1, explain: "Endotérmica retira calor do meio, arrefecendo-o." },
    { id: 9, question: "Na reacção CaCO₃ → CaO + CO₂, o tipo é:", options: ["Síntese", "Decomposição", "Neutralização", "Combustão"], answerIndex: 1, explain: "Uma substância origina duas — decomposição." },
  ],
};

const QUI_ACIDOS: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "O limão tem sabor azedo porque contém:", options: ["Base", "Ácido", "Sal", "Metal"], answerIndex: 1, explain: "O ácido cítrico dá o sabor azedo." },
    { id: 2, question: "O pH da água pura é:", options: ["0", "7", "14", "3"], answerIndex: 1, explain: "pH 7 é neutro." },
    { id: 3, question: "Substância com pH menor que 7 é:", options: ["Ácida", "Básica", "Neutra", "Metálica"], answerIndex: 0, explain: "Abaixo de 7 = ácido; acima de 7 = base." },
  ],
  Intermédio: [
    { id: 4, question: "O sabão e a lixívia são exemplos de:", options: ["Ácidos", "Bases", "Sais neutros", "Gases nobres"], answerIndex: 1, explain: "São substâncias básicas ou alcalinas, escorregadias ao tacto." },
    { id: 5, question: "Ácido + base origina:", options: ["Sal e água", "Só gás", "Metal", "Óleo"], answerIndex: 0, explain: "É a reacção de neutralização." },
    { id: 6, question: "O papel de tornassol fica vermelho em presença de:", options: ["Base", "Ácido", "Água", "Sal"], answerIndex: 1, explain: "Ácidos coram o tornassol de vermelho; bases de azul." },
  ],
  Avançado: [
    { id: 7, question: "O ácido presente no estômago é:", options: ["Ácido sulfúrico", "Ácido clorídrico", "Ácido cítrico", "Ácido acético"], answerIndex: 1, explain: "O HCl gástrico ajuda na digestão." },
    { id: 8, question: "Uma solução de pH 2 é:", options: ["Ligeiramente ácida", "Fortemente ácida", "Neutra", "Básica"], answerIndex: 1, explain: "Quanto menor o pH, mais forte o ácido." },
    { id: 9, question: "O antiácido alivia a azia porque:", options: ["Aumenta a acidez", "Neutraliza o excesso de ácido", "Cria gás", "Baixa o pH"], answerIndex: 1, explain: "Contém bases que neutralizam o ácido do estômago." },
  ],
};

const BIO_REINOS: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "O leão pertence ao reino:", options: ["Plantae", "Animalia", "Fungi", "Monera"], answerIndex: 1, explain: "Animais formam o reino Animalia." },
    { id: 2, question: "Os cogumelos pertencem ao reino:", options: ["Fungi", "Plantae", "Animalia", "Protista"], answerIndex: 0, explain: "Fungos formam o reino Fungi." },
    { id: 3, question: "As bactérias pertencem ao reino:", options: ["Monera", "Plantae", "Animalia", "Fungi"], answerIndex: 0, explain: "São seres unicelulares procariontes." },
  ],
  Intermédio: [
    { id: 4, question: "As plantas produzem o seu alimento por:", options: ["Respiração", "Fotossíntese", "Digestão", "Fermentação"], answerIndex: 1, explain: "Usam luz solar, água e CO₂ para produzir glicose." },
    { id: 5, question: "Seres que se alimentam de outros seres chamam-se:", options: ["Autotróficos", "Heterotróficos", "Produtores", "Minerais"], answerIndex: 1, explain: "Heterotróficos não produzem o próprio alimento." },
    { id: 6, question: "A imbondeiro (mulemba/embondeiro) é um ser do reino:", options: ["Animalia", "Plantae", "Fungi", "Monera"], answerIndex: 1, explain: "É uma árvore, logo pertence ao reino das plantas." },
  ],
  Avançado: [
    { id: 7, question: "Seres unicelulares eucariontes como a ameba pertencem ao reino:", options: ["Protista", "Monera", "Fungi", "Animalia"], answerIndex: 0, explain: "Protista reúne eucariontes maioritariamente unicelulares." },
    { id: 8, question: "A classificação científica usa nomes em:", options: ["Português", "Latim", "Inglês", "Kimbundu"], answerIndex: 1, explain: "A nomenclatura binomial usa o latim, ex.: Panthera leo." },
    { id: 9, question: "Vertebrados distinguem-se por terem:", options: ["Concha", "Coluna vertebral", "Exoesqueleto", "Clorofila"], answerIndex: 1, explain: "Peixes, anfíbios, répteis, aves e mamíferos têm coluna vertebral." },
  ],
};

const BIO_CORPO: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "O órgão que bombeia o sangue é:", options: ["Pulmão", "Coração", "Fígado", "Rim"], answerIndex: 1, explain: "O coração bombeia sangue para todo o corpo." },
    { id: 2, question: "A digestão começa na:", options: ["Boca", "Estômago", "Intestino", "Garganta"], answerIndex: 0, explain: "Na boca, com a mastigação e a saliva." },
    { id: 3, question: "Respiramos oxigénio através dos:", options: ["Rins", "Pulmões", "Ossos", "Músculos"], answerIndex: 1, explain: "Os pulmões fazem as trocas gasosas." },
  ],
  Intermédio: [
    { id: 4, question: "O funge de bombó fornece sobretudo:", options: ["Proteínas", "Hidratos de carbono", "Vitaminas", "Gorduras"], answerIndex: 1, explain: "A mandioca é rica em hidratos de carbono — fonte de energia." },
    { id: 5, question: "O peixe e o feijão são ricos em:", options: ["Proteínas", "Água", "Fibra apenas", "Açúcar"], answerIndex: 0, explain: "Proteínas ajudam no crescimento e reparação dos tecidos." },
    { id: 6, question: "Os rins têm a função de:", options: ["Digerir", "Filtrar o sangue e produzir urina", "Bombear sangue", "Respirar"], answerIndex: 1, explain: "Eliminam resíduos e regulam a água do corpo." },
  ],
  Avançado: [
    { id: 7, question: "A absorção dos nutrientes ocorre principalmente no:", options: ["Estômago", "Intestino delgado", "Esófago", "Cólon"], answerIndex: 1, explain: "As vilosidades do intestino delgado absorvem os nutrientes." },
    { id: 8, question: "A falta de vitamina C provoca:", options: ["Escorbuto", "Raquitismo", "Anemia ferropénica", "Cegueira nocturna"], answerIndex: 0, explain: "Frutas como a laranja e o cajá previnem o escorbuto." },
    { id: 9, question: "A malária é transmitida pela picada do mosquito:", options: ["Aedes", "Anopheles", "Culex", "Tsé-tsé"], answerIndex: 1, explain: "A fêmea do Anopheles transmite o Plasmodium." },
  ],
};

const BIO_ECOSSISTEMAS: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "Um ecossistema é formado por:", options: ["Só plantas", "Seres vivos e o meio ambiente", "Só animais", "Só água"], answerIndex: 1, explain: "Componentes bióticos e abióticos em interacção." },
    { id: 2, question: "A palanca-negra-gigante é símbolo de:", options: ["Moçambique", "Angola", "Namíbia", "Congo"], answerIndex: 1, explain: "É endémica de Angola, na Reserva de Cangandala e Luando." },
    { id: 3, question: "As plantas num ecossistema são:", options: ["Consumidores", "Produtores", "Decompositores", "Parasitas"], answerIndex: 1, explain: "Produzem matéria orgânica pela fotossíntese." },
  ],
  Intermédio: [
    { id: 4, question: "Numa cadeia alimentar, a energia flui:", options: ["Do consumidor ao produtor", "Do produtor ao consumidor", "Em círculo fechado", "Não flui"], answerIndex: 1, explain: "Erva → antílope → leão." },
    { id: 5, question: "Fungos e bactérias que reciclam matéria morta são:", options: ["Produtores", "Decompositores", "Herbívoros", "Carnívoros"], answerIndex: 1, explain: "Devolvem nutrientes ao solo." },
    { id: 6, question: "O Parque Nacional da Quiçama situa-se:", options: ["No Bié", "Perto de Luanda", "No Namibe", "No Uíge"], answerIndex: 1, explain: "Fica a sul de Luanda, junto ao rio Kwanza." },
  ],
  Avançado: [
    { id: 7, question: "A desflorestação para carvão vegetal provoca:", options: ["Mais biodiversidade", "Erosão e perda de habitat", "Mais chuva", "Solos mais férteis"], answerIndex: 1, explain: "Retirar árvores expõe o solo e destrói habitats." },
    { id: 8, question: "A planta Welwitschia mirabilis vive no:", options: ["Deserto do Namibe", "Rio Kwanza", "Planalto do Huambo", "Mangal de Cabinda"], answerIndex: 0, explain: "É uma planta milenar do deserto do Namibe." },
    { id: 9, question: "Área protegida serve para:", options: ["Explorar recursos livremente", "Conservar espécies e habitats", "Construir cidades", "Aumentar a caça"], answerIndex: 1, explain: "Protege a biodiversidade e permite investigação." },
  ],
};

const GEO_CLIMA: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "O clima predominante no litoral norte de Angola é:", options: ["Desértico", "Tropical húmido", "Polar", "Mediterrânico"], answerIndex: 1, explain: "Cabinda e o Uíge têm clima tropical húmido e muita chuva." },
    { id: 2, question: "A época das chuvas em grande parte de Angola vai de:", options: ["Setembro a Abril", "Maio a Agosto", "Junho a Julho", "Todo o ano"], answerIndex: 0, explain: "O cacimbo (seca) ocorre de Maio a Agosto." },
    { id: 3, question: "O sul de Angola, no Namibe, tem clima:", options: ["Desértico", "Equatorial", "Frio de montanha", "Temperado húmido"], answerIndex: 0, explain: "O deserto do Namibe é muito seco." },
  ],
  Intermédio: [
    { id: 4, question: "O cacimbo caracteriza-se por:", options: ["Chuva intensa", "Tempo fresco e seco", "Neve", "Ciclones"], answerIndex: 1, explain: "É a estação seca e fresca, com neblina no litoral." },
    { id: 5, question: "A vegetação de savana predomina:", options: ["No planalto central e leste", "Só no litoral", "No deserto", "Em Cabinda"], answerIndex: 0, explain: "Savana arbórea e herbácea cobre grande parte do interior." },
    { id: 6, question: "A floresta densa húmida encontra-se sobretudo em:", options: ["Cabinda e Uíge", "Namibe", "Huíla", "Cunene"], answerIndex: 0, explain: "O Maiombe, em Cabinda, é a maior floresta tropical do país." },
  ],
  Avançado: [
    { id: 7, question: "A corrente fria de Benguela influencia o clima porque:", options: ["Aumenta a chuva no sul", "Torna o litoral sul seco", "Provoca neve", "Aquece o mar"], answerIndex: 1, explain: "A água fria reduz a evaporação, ajudando a formar o deserto." },
    { id: 8, question: "A altitude do planalto central faz com que o Huambo tenha:", options: ["Temperaturas mais amenas", "Calor extremo", "Clima desértico", "Sem estações"], answerIndex: 0, explain: "Acima de 1500 m as temperaturas são mais frescas." },
    { id: 9, question: "A vegetação de mangal encontra-se:", options: ["Em zonas costeiras e estuários", "No planalto", "No deserto", "Nas montanhas"], answerIndex: 0, explain: "Mangais crescem em água salobra junto à foz dos rios." },
  ],
};

const GEO_POPULACAO: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "A cidade mais populosa de Angola é:", options: ["Huambo", "Luanda", "Lobito", "Cabinda"], answerIndex: 1, explain: "Luanda concentra vários milhões de habitantes." },
    { id: 2, question: "A língua oficial de Angola é:", options: ["Umbundu", "Português", "Kimbundu", "Inglês"], answerIndex: 1, explain: "O português é a língua oficial; há várias línguas nacionais." },
    { id: 3, question: "Umbundu, Kimbundu e Kikongo são:", options: ["Línguas nacionais de Angola", "Cidades", "Rios", "Províncias"], answerIndex: 0, explain: "São línguas bantu faladas em Angola." },
  ],
  Intermédio: [
    { id: 4, question: "O êxodo rural significa:", options: ["Ida do campo para a cidade", "Ida da cidade para o campo", "Saída do país", "Entrada de estrangeiros"], answerIndex: 0, explain: "Muitas famílias migraram para Luanda e Benguela." },
    { id: 5, question: "Densidade populacional é:", options: ["Habitantes por km²", "Total de habitantes", "Número de casas", "Área do país"], answerIndex: 0, explain: "Relaciona a população com a área do território." },
    { id: 6, question: "A província com menor densidade populacional tende a ser:", options: ["Luanda", "Cuando Cubango", "Benguela", "Huambo"], answerIndex: 1, explain: "Grande área e poucos habitantes." },
  ],
  Avançado: [
    { id: 7, question: "O crescimento natural da população calcula-se por:", options: ["Natalidade menos mortalidade", "Nascimentos mais mortes", "Emigração", "Imigração"], answerIndex: 0, explain: "É a diferença entre a taxa de natalidade e a de mortalidade." },
    { id: 8, question: "Angola tem uma população maioritariamente:", options: ["Jovem", "Idosa", "Adulta idosa", "Estável e envelhecida"], answerIndex: 0, explain: "Mais de metade da população tem menos de 25 anos." },
    { id: 9, question: "A urbanização acelerada gera desafios como:", options: ["Menos trânsito", "Saneamento e habitação insuficientes", "Menos escolas necessárias", "Menos consumo de água"], answerIndex: 1, explain: "Os musseques enfrentam falta de infra-estruturas." },
  ],
};

const GEO_RECURSOS: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "O principal recurso de exportação de Angola é:", options: ["Café", "Petróleo", "Milho", "Madeira"], answerIndex: 1, explain: "O petróleo representa a maior fatia das exportações." },
    { id: 2, question: "Os diamantes exploram-se sobretudo na província da:", options: ["Lunda Norte", "Namibe", "Cabinda", "Huíla"], answerIndex: 0, explain: "Lunda Norte e Lunda Sul são regiões diamantíferas." },
    { id: 3, question: "O petróleo extrai-se principalmente em:", options: ["Cabinda e Zaire", "Huambo", "Bié", "Malanje"], answerIndex: 0, explain: "Sobretudo no offshore de Cabinda e do Zaire." },
  ],
  Intermédio: [
    { id: 4, question: "O café de Angola é famoso na província do:", options: ["Uíge", "Namibe", "Cunene", "Moxico"], answerIndex: 0, explain: "O café robusta do Uíge foi um dos maiores do mundo." },
    { id: 5, question: "A barragem de Laúca produz:", options: ["Petróleo", "Energia hidroeléctrica", "Diamantes", "Gás"], answerIndex: 1, explain: "Situa-se no rio Kwanza e é a maior do país." },
    { id: 6, question: "A pesca é muito importante nas províncias de:", options: ["Namibe e Benguela", "Malanje e Bié", "Uíge e Lunda", "Moxico e Cuando Cubango"], answerIndex: 0, explain: "O litoral sul é rico em pescado devido à corrente de Benguela." },
  ],
  Avançado: [
    { id: 7, question: "Recursos renováveis são, por exemplo:", options: ["Petróleo e diamantes", "Sol, vento e água", "Ouro e ferro", "Gás natural"], answerIndex: 1, explain: "Repõem-se naturalmente à escala humana." },
    { id: 8, question: "O Corredor do Lobito serve para:", options: ["Escoar minérios por caminho-de-ferro", "Produzir petróleo", "Regar campos", "Gerar energia"], answerIndex: 0, explain: "Liga o interior e países vizinhos ao porto do Lobito." },
    { id: 9, question: "Diversificar a economia significa:", options: ["Depender só do petróleo", "Desenvolver agricultura, indústria e serviços", "Exportar menos", "Fechar o comércio"], answerIndex: 1, explain: "Reduz a vulnerabilidade às oscilações do preço do petróleo." },
  ],
};
const BIO_REPRODUCAO: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "A reprodução serve para:", options: ["Alimentar o ser vivo", "Garantir a continuidade da espécie", "Respirar", "Crescer em altura"], answerIndex: 1, explain: "Sem reprodução as espécies desapareciam." },
    { id: 2, question: "As plantas com flor reproduzem-se sobretudo por:", options: ["Sementes", "Pedras", "Folhas secas", "Raízes mortas"], answerIndex: 0, explain: "Da flor nasce o fruto e dentro dele as sementes." },
    { id: 3, question: "A célula reprodutora masculina no ser humano é:", options: ["Óvulo", "Espermatozoide", "Neurónio", "Glóbulo branco"], answerIndex: 1, explain: "O espermatozoide é o gâmeta masculino; o óvulo é o feminino." },
  ],
  Intermédio: [
    { id: 4, question: "A união do óvulo com o espermatozoide chama-se:", options: ["Fecundação", "Digestão", "Respiração", "Polinização"], answerIndex: 0, explain: "Da fecundação resulta o ovo ou zigoto." },
    { id: 5, question: "A polinização é feita muitas vezes por:", options: ["Insectos e vento", "Peixes", "Rochas", "Nuvens"], answerIndex: 0, explain: "Abelhas e vento transportam o pólen entre flores." },
    { id: 6, question: "Reprodução assexuada caracteriza-se por:", options: ["Dois progenitores", "Um só progenitor", "Nenhum ser vivo", "Sempre sementes"], answerIndex: 1, explain: "Origina descendentes geneticamente iguais, como na estaca da mandioca." },
  ],
  Avançado: [
    { id: 7, question: "O ser humano tem quantos pares de cromossomas?", options: ["12", "23", "46", "64"], answerIndex: 1, explain: "23 pares, ou seja 46 cromossomas no total." },
    { id: 8, question: "A divisão celular que forma gâmetas é a:", options: ["Mitose", "Meiose", "Osmose", "Fotossíntese"], answerIndex: 1, explain: "A meiose reduz a metade o número de cromossomas." },
    { id: 9, question: "Os genes localizam-se:", options: ["Nos cromossomas", "Na membrana", "No citoplasma livre", "Nos ribossomas"], answerIndex: 0, explain: "Os genes são segmentos de ADN nos cromossomas e determinam as características hereditárias." },
  ],
};

export {
  MAT_EQUACOES,
  MAT_ESTATISTICA,
  MAT_PROPORCAO,
  POR_SUJEITO,
  POR_NARRATIVO,
  POR_ORTOGRAFIA,
  HIS_COLONIZACAO,
  HIS_INDEPENDENCIA,
  HIS_CONTEMPORANEA,
  FIS_FORCAS,
  FIS_ENERGIA,
  FIS_ELETRICIDADE,
  QUI_TABELA,
  QUI_LIGACOES,
  QUI_REACOES,
  QUI_ACIDOS,
  BIO_REINOS,
  BIO_CORPO,
  BIO_ECOSSISTEMAS,
  BIO_REPRODUCAO,
  GEO_CLIMA,
  GEO_POPULACAO,
  GEO_RECURSOS,
};
