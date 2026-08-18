import type { Difficulty, Grade, QuizQuestion, Subject, Topic } from "./types";
import {
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
} from "./data-extra";

type TopicSeed = Omit<Topic, "unlocked" | "completed">;

function seed(topics: TopicSeed[]): Topic[] {
  return topics.map((t) => ({
    ...t,
    unlocked: true,
    completed: false,
  }));
}

// ---------- MATEMÁTICA (6ª) ----------
const MAT_FRACOES: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 10, question: "Qual é a fracção equivalente a 0,5?", options: ["1/3", "1/2", "2/5", "3/4"], answerIndex: 1, explain: "0,5 é metade da unidade, ou seja 5/10 que simplificado dá 1/2." },
    { id: 1, question: "Qual das seguintes representa metade de um bolo?", options: ["1/4", "1/2", "2/3", "3/4"], answerIndex: 1, explain: "Metade = 1 em 2 partes iguais → 1/2." },
    { id: 2, question: "Quanto é 0,5 escrito como fracção?", options: ["1/5", "1/2", "5/1", "2/5"], answerIndex: 1, explain: "0,5 significa 5 décimos = 5/10 = 1/2." },
    { id: 3, question: "Se dividires 1 pão em 4 partes iguais e comeres 3, comeste:", options: ["1/4", "2/4", "3/4", "4/4"], answerIndex: 2, explain: "Comeste 3 das 4 partes → 3/4." },
  ],
  Intermédio: [
    { id: 4, question: "Quanto é 1/2 + 1/4?", options: ["1/6", "2/6", "3/4", "1/8"], answerIndex: 2, explain: "1/2 = 2/4, e 2/4 + 1/4 = 3/4." },
    { id: 5, question: "Convertendo 0,75 em fracção irredutível:", options: ["7/5", "3/4", "75/10", "1/4"], answerIndex: 1, explain: "0,75 = 75/100 = 3/4 depois de simplificar." },
    { id: 6, question: "Qual é maior: 2/3 ou 3/5?", options: ["2/3", "3/5", "São iguais", "Não dá para comparar"], answerIndex: 0, explain: "2/3 ≈ 0,66 e 3/5 = 0,60, logo 2/3 é maior." },
  ],
  Avançado: [
    { id: 7, question: "Um saco tem 3/4 kg de fuba. Se retirares 1/3 kg, quanto resta?", options: ["1/12 kg", "5/12 kg", "1/2 kg", "2/3 kg"], answerIndex: 1, explain: "3/4 − 1/3 = 9/12 − 4/12 = 5/12 kg." },
    { id: 8, question: "Quanto é 2/5 de 1500 kwanzas?", options: ["300 Kz", "500 Kz", "600 Kz", "750 Kz"], answerIndex: 2, explain: "1500 ÷ 5 = 300; 300 × 2 = 600 Kz." },
    { id: 9, question: "0,2 × 0,3 =", options: ["0,06", "0,6", "0,006", "6"], answerIndex: 0, explain: "2 × 3 = 6; total de 2 casas decimais → 0,06." },
  ],
};

const MAT_GEOMETRIA: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "Um ângulo recto mede:", options: ["45°", "90°", "180°", "360°"], answerIndex: 1, explain: "O canto de uma folha é um ângulo recto: 90°." },
    { id: 2, question: "Um triângulo tem quantos lados?", options: ["2", "3", "4", "5"], answerIndex: 1, explain: "Tri = três. Três lados e três ângulos." },
    { id: 3, question: "Ângulo com menos de 90° chama-se:", options: ["Obtuso", "Recto", "Agudo", "Raso"], answerIndex: 2, explain: "Agudo = mais fechado que o ângulo recto." },
  ],
  Intermédio: [
    { id: 4, question: "A soma dos ângulos internos de um triângulo é:", options: ["90°", "180°", "270°", "360°"], answerIndex: 1, explain: "Em qualquer triângulo, os três ângulos somam sempre 180°." },
    { id: 5, question: "Um triângulo com todos os lados iguais chama-se:", options: ["Escaleno", "Isósceles", "Equilátero", "Rectângulo"], answerIndex: 2, explain: "Equi = igual. Três lados iguais → equilátero." },
    { id: 6, question: "Um ângulo de 120° é:", options: ["Agudo", "Recto", "Obtuso", "Raso"], answerIndex: 2, explain: "Está entre 90° e 180° → obtuso." },
  ],
  Avançado: [
    { id: 7, question: "Num triângulo, dois ângulos medem 50° e 60°. Quanto mede o terceiro?", options: ["60°", "70°", "80°", "90°"], answerIndex: 1, explain: "180 − (50 + 60) = 70°." },
    { id: 8, question: "Um triângulo rectângulo tem sempre um ângulo de:", options: ["45°", "60°", "90°", "180°"], answerIndex: 2, explain: "Por definição, um rectângulo tem um ângulo recto (90°)." },
    { id: 9, question: "Se um triângulo isósceles tem um ângulo de 40° entre os lados iguais, os outros dois medem:", options: ["40° e 40°", "70° e 70°", "60° e 80°", "90° e 50°"], answerIndex: 1, explain: "Os dois iguais somam 180 − 40 = 140°; cada um vale 70°." },
  ],
};

// ---------- LÍNGUA PORTUGUESA (6ª) ----------
const POR_CLASSES: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 10, question: "Na frase «O Kiala comprou uma esferográfica BIC azul», qual é o substantivo próprio?", options: ["esferográfica", "Kiala", "comprou", "azul"], answerIndex: 1, explain: "«Kiala» é o nome de uma pessoa, por isso é um substantivo próprio e escreve-se com maiúscula." },
    { id: 1, question: "Na frase «O Kiala comeu funge», a palavra “Kiala” é:", options: ["Verbo", "Substantivo", "Adjectivo", "Advérbio"], answerIndex: 1, explain: "“Kiala” nomeia uma pessoa → substantivo próprio." },
    { id: 2, question: "Qual das palavras é um verbo?", options: ["Casa", "Correr", "Bonito", "Rápido"], answerIndex: 1, explain: "Verbo indica acção: correr, comer, dormir." },
    { id: 3, question: "“Luanda” é um substantivo:", options: ["Comum", "Próprio", "Colectivo", "Abstracto"], answerIndex: 1, explain: "Nomes de cidades escrevem-se com maiúscula → substantivo próprio." },
  ],
  Intermédio: [
    { id: 4, question: "Em «As crianças brincam no quintal», o verbo está no tempo:", options: ["Passado", "Presente", "Futuro", "Condicional"], answerIndex: 1, explain: "“Brincam” = agora → presente do indicativo." },
    { id: 5, question: "Qual é o plural de “animal”?", options: ["Animais", "Animales", "Animals", "Animaus"], answerIndex: 0, explain: "Palavras terminadas em -al fazem plural em -ais: animal → animais." },
    { id: 6, question: "Na frase «A minha mãe cozinha calulu», quantos substantivos há?", options: ["1", "2", "3", "4"], answerIndex: 1, explain: "“Mãe” e “calulu” são substantivos; “cozinha” aqui é verbo." },
  ],
  Avançado: [
    { id: 7, question: "Conjuga o verbo “estudar” na 1.ª pessoa do plural do presente:", options: ["Estudo", "Estudas", "Estudamos", "Estudaram"], answerIndex: 2, explain: "Nós estudamos — 1.ª pessoa do plural, presente do indicativo." },
    { id: 8, question: "Identifica o substantivo colectivo:", options: ["Aluno", "Turma", "Livro", "Caderno"], answerIndex: 1, explain: "“Turma” designa um conjunto de alunos → colectivo." },
    { id: 9, question: "Em «O músico angolano cantou belo semba», a palavra “belo” é:", options: ["Substantivo", "Verbo", "Adjectivo", "Preposição"], answerIndex: 2, explain: "“Belo” caracteriza o substantivo “semba” → adjectivo." },
  ],
};

const POR_INTERP: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 10, question: "O que significa o provérbio «Quem quer passar o rio não pode ter medo do jacaré»?", options: ["Que devemos evitar os rios", "Para alcançar um objectivo, é preciso enfrentar os riscos", "Que os jacarés são calmos", "Que só se atravessa o rio de barco"], answerIndex: 1, explain: "Quem quer conquistar algo grande tem de enfrentar as dificuldades do caminho." },
    { id: 1, question: "O provérbio «Devagar se vai ao longe» ensina-nos a:", options: ["Correr sempre", "Ter paciência", "Desistir", "Falar alto"], answerIndex: 1, explain: "Fazer as coisas com calma e paciência leva-nos mais longe." },
    { id: 2, question: "«Quem não tem cão, caça com gato» significa:", options: ["Que gatos caçam", "Que devemos ter animais", "Que aproveitamos o que temos", "Que gatos e cães brigam"], answerIndex: 2, explain: "Quando falta o ideal, usamos o que está disponível." },
    { id: 3, question: "«O filho do peixe, peixinho é» quer dizer que:", options: ["Peixes têm filhos pequenos", "Filhos parecem-se com os pais", "Peixes vivem em cardume", "Devemos comer peixe"], answerIndex: 1, explain: "Ensina que os filhos costumam parecer-se com os pais." },
  ],
  Intermédio: [
    { id: 4, question: "«Kubata sem fogão não é kubata» sugere que:", options: ["Casas precisam de decoração", "O essencial é o que dá vida ao lar", "Só se cozinha em casa", "Kubatas são frias"], answerIndex: 1, explain: "O fogão simboliza a comida e o calor da família — o essencial do lar." },
    { id: 5, question: "Num texto, a IDEIA PRINCIPAL é:", options: ["Uma frase qualquer", "O assunto central que o autor defende", "O título apenas", "A última frase"], answerIndex: 1, explain: "É a mensagem central que atravessa todo o texto." },
    { id: 6, question: "«Água mole em pedra dura, tanto bate até que fura» valoriza:", options: ["A força bruta", "A persistência", "A pressa", "A sorte"], answerIndex: 1, explain: "Insistir com calma acaba por vencer obstáculos." },
  ],
  Avançado: [
    { id: 7, question: "Num provérbio, o sentido é geralmente:", options: ["Literal", "Figurado", "Numérico", "Estrangeiro"], answerIndex: 1, explain: "Os provérbios usam imagens do dia a dia para ensinar lições — sentido figurado." },
    { id: 8, question: "«Muitas mãos fazem obra leve» defende o valor da:", options: ["Solidão", "Cooperação", "Competição", "Preguiça"], answerIndex: 1, explain: "Trabalhar em conjunto torna a tarefa mais fácil — kutufunda entre vizinhos." },
    { id: 9, question: "Ao interpretar um texto, INFERIR significa:", options: ["Copiar frases", "Adivinhar ao acaso", "Deduzir a partir de pistas", "Traduzir palavras"], answerIndex: 2, explain: "Inferir é chegar a uma conclusão usando pistas dadas pelo texto." },
  ],
};

// ---------- HISTÓRIA (7ª) ----------
const HIS_PREHIST: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "Em que continente surgiram os primeiros seres humanos?", options: ["Europa", "Ásia", "África", "América"], answerIndex: 2, explain: "Os fósseis mais antigos do Homem foram encontrados em África." },
    { id: 2, question: "O Homem da Pré-História vivia sobretudo de:", options: ["Indústria", "Caça e recolecção", "Comércio online", "Agricultura industrial"], answerIndex: 1, explain: "Caçavam animais e recolhiam frutos e raízes." },
    { id: 3, question: "O primeiro grande instrumento dos humanos foi feito de:", options: ["Plástico", "Ferro", "Pedra", "Ouro"], answerIndex: 2, explain: "Por isso a época chama-se Idade da Pedra." },
  ],
  Intermédio: [
    { id: 4, question: "A descoberta do fogo permitiu:", options: ["Voar", "Cozinhar e aquecer", "Escrever", "Construir cidades"], answerIndex: 1, explain: "O fogo tornou os alimentos mais seguros e aqueceu os abrigos." },
    { id: 5, question: "A Pré-História divide-se em Paleolítico e:", options: ["Neolítico", "Renascimento", "Idade Média", "Época Moderna"], answerIndex: 0, explain: "Paleolítico (pedra lascada) e Neolítico (pedra polida)." },
    { id: 6, question: "No Neolítico, o Homem começou a:", options: ["Ver televisão", "Cultivar a terra e criar animais", "Usar computadores", "Explorar o espaço"], answerIndex: 1, explain: "Foi a chamada Revolução Neolítica — nasceu a agricultura." },
  ],
  Avançado: [
    { id: 7, question: "Os fósseis dos ancestrais humanos mais antigos foram achados em:", options: ["Vale do Nilo", "Vale do Rift, África Oriental", "Península Ibérica", "Vale do Kwanza"], answerIndex: 1, explain: "O Vale do Rift (Etiópia, Quénia, Tanzânia) é considerado o berço da humanidade." },
    { id: 8, question: "As pinturas rupestres serviam sobretudo para:", options: ["Decorar hotéis", "Registar caçadas e rituais", "Ensinar matemática", "Assinar contratos"], answerIndex: 1, explain: "Contavam histórias de caça e crenças espirituais." },
    { id: 9, question: "A passagem de nómada para sedentário aconteceu quando:", options: ["Se inventou a roda apenas", "Surgiu a agricultura", "Chegou o alfabeto", "Começou o comércio marítimo"], answerIndex: 1, explain: "Ao cultivar, as pessoas fixaram-se em aldeias." },
  ],
};

const HIS_REINOS: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 10, question: "Quem foi a célebre Rainha que liderou a resistência nos reinos do Ndongo e da Matamba?", options: ["Rainha Jinga Mbandi", "Rainha Kimpa Vita", "Rainha Ana de Sousa", "Rainha Nzumba"], answerIndex: 0, explain: "Njinga (Jinga) Mbandi governou o Ndongo e a Matamba e resistiu durante décadas à ocupação portuguesa." },
    { id: 1, question: "O Reino do Kongo situava-se sobretudo no:", options: ["Sul de Angola", "Norte de Angola e regiões vizinhas", "Leste africano", "Norte de África"], answerIndex: 1, explain: "Ocupava o norte do actual território angolano e áreas próximas." },
    { id: 2, question: "O rei do Kongo era chamado:", options: ["Faraó", "Ngola", "Manikongo", "Sultão"], answerIndex: 2, explain: "“Manikongo” = senhor do Kongo." },
    { id: 3, question: "O Reino do Ndongo foi governado por um líder chamado:", options: ["Manikongo", "Ngola", "Muene Puto", "Oba"], answerIndex: 1, explain: "Deste título “Ngola” vem o nome Angola." },
  ],
  Intermédio: [
    { id: 4, question: "A capital do Reino do Kongo chamava-se:", options: ["M’banza Kongo", "Luanda", "Kuito", "Benguela"], answerIndex: 0, explain: "M’banza Kongo foi a capital, hoje património da humanidade." },
    { id: 5, question: "A rainha Njinga Mbandi ficou célebre por:", options: ["Inventar o funge", "Resistir aos portugueses", "Descobrir o Kwanza", "Construir pirâmides"], answerIndex: 1, explain: "Njinga liderou o Ndongo e o Matamba na resistência à ocupação portuguesa." },
    { id: 6, question: "O nome “Angola” vem da palavra:", options: ["Ngola", "Kongo", "Luanda", "Kwanza"], answerIndex: 0, explain: "Título dos reis do Ndongo — “Ngola” → Angola." },
  ],
  Avançado: [
    { id: 7, question: "O Manikongo D. Afonso I ficou conhecido por:", options: ["Introduzir o cristianismo no Kongo", "Fundar Luanda", "Escrever a primeira gramática kikongo", "Descobrir o Cabo"], answerIndex: 0, explain: "Foi baptizado e promoveu o cristianismo no reino no séc. XVI." },
    { id: 8, question: "Um grande problema imposto pelos europeus aos reinos africanos foi:", options: ["Comércio de especiarias", "Tráfico de escravizados", "Turismo cultural", "Exportação de café"], answerIndex: 1, explain: "O tráfico transatlântico devastou populações e economias." },
    { id: 9, question: "O Reino do Ndongo tinha como zona central a região do:", options: ["Rio Kunene", "Planalto Central", "Rio Kwanza", "Deserto do Namibe"], answerIndex: 2, explain: "Localizava-se na região do rio Kwanza, no actual centro-norte de Angola." },
  ],
};

// ---------- FÍSICA (8ª) ----------
const FIS_MATERIA: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "Matéria é tudo aquilo que:", options: ["Tem cor", "Tem massa e ocupa espaço", "Só se vê", "Só se toca"], answerIndex: 1, explain: "Definição: matéria tem massa e volume." },
    { id: 2, question: "Um dos três estados físicos da matéria é:", options: ["Vento", "Sólido", "Som", "Luz"], answerIndex: 1, explain: "Sólido, líquido e gasoso." },
    { id: 3, question: "A água em copo é um exemplo de:", options: ["Sólido", "Líquido", "Gás", "Plasma"], answerIndex: 1, explain: "Água à temperatura ambiente está no estado líquido." },
  ],
  Intermédio: [
    { id: 4, question: "Quando a água ferve e vira vapor, chama-se:", options: ["Fusão", "Solidificação", "Vaporização", "Condensação"], answerIndex: 2, explain: "Passagem de líquido para gasoso = vaporização." },
    { id: 5, question: "A densidade calcula-se como:", options: ["massa × volume", "massa ÷ volume", "volume ÷ massa", "massa + volume"], answerIndex: 1, explain: "d = m/V (kg/m³, g/cm³…)." },
    { id: 6, question: "Qual destas é uma propriedade FÍSICA?", options: ["Enferrujar", "Queimar", "Ponto de fusão", "Apodrecer"], answerIndex: 2, explain: "Enferrujar/queimar são químicas; ponto de fusão é física." },
  ],
  Avançado: [
    { id: 7, question: "1 kg de ferro e 1 kg de algodão. Qual tem mais massa?", options: ["Ferro", "Algodão", "Têm a mesma", "Depende do volume"], answerIndex: 2, explain: "1 kg é sempre 1 kg — mudam volume e densidade, não a massa." },
    { id: 8, question: "Se 200 g de líquido ocupam 250 cm³, a densidade é:", options: ["0,5 g/cm³", "0,8 g/cm³", "1,25 g/cm³", "50 g/cm³"], answerIndex: 1, explain: "d = 200/250 = 0,8 g/cm³." },
    { id: 9, question: "Passagem directa de sólido para gás chama-se:", options: ["Fusão", "Sublimação", "Condensação", "Ebulição"], answerIndex: 1, explain: "Ex.: naftalina evapora sem passar por líquido → sublimação." },
  ],
};

const FIS_MOVIMENTO: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 10, question: "Se um candongueiro percorre 120 km entre Luanda e o Dondo em exactamente 2 horas, qual foi a sua velocidade média?", options: ["50 km/h", "60 km/h", "80 km/h", "120 km/h"], answerIndex: 1, explain: "v = d ÷ t = 120 km ÷ 2 h = 60 km/h." },
    { id: 1, question: "Um corpo está em MOVIMENTO quando:", options: ["Muda de cor", "Muda de posição no tempo", "Está parado", "Está quente"], answerIndex: 1, explain: "Movimento = mudança de posição em relação a um referencial, ao longo do tempo." },
    { id: 2, question: "A unidade de velocidade no SI é:", options: ["km/h", "m/s", "cm/min", "s/m"], answerIndex: 1, explain: "No Sistema Internacional, velocidade mede-se em metros por segundo (m/s)." },
    { id: 3, question: "A fórmula da velocidade média é:", options: ["v = d × t", "v = d / t", "v = t / d", "v = d + t"], answerIndex: 1, explain: "Velocidade = distância ÷ tempo." },
  ],
  Intermédio: [
    { id: 4, question: "Um candongueiro percorre 60 km em 1 hora. Velocidade média?", options: ["30 km/h", "60 km/h", "90 km/h", "120 km/h"], answerIndex: 1, explain: "v = 60 km ÷ 1 h = 60 km/h." },
    { id: 5, question: "Se um ciclista faz 20 km em 2 horas, a sua velocidade média é:", options: ["5 km/h", "10 km/h", "20 km/h", "40 km/h"], answerIndex: 1, explain: "v = 20/2 = 10 km/h." },
    { id: 6, question: "Quanto tempo leva a percorrer 150 km a 50 km/h?", options: ["1 h", "2 h", "3 h", "5 h"], answerIndex: 2, explain: "t = d/v = 150/50 = 3 horas." },
  ],
  Avançado: [
    { id: 7, question: "72 km/h em m/s são:", options: ["7,2 m/s", "20 m/s", "36 m/s", "72 m/s"], answerIndex: 1, explain: "Divide por 3,6 → 72 ÷ 3,6 = 20 m/s." },
    { id: 8, question: "Movimento em linha recta com velocidade constante chama-se:", options: ["MRU", "MRUV", "Movimento circular", "Movimento oscilatório"], answerIndex: 0, explain: "MRU = Movimento Rectilíneo Uniforme." },
    { id: 9, question: "Um comboio a 30 m/s percorre em 10 s uma distância de:", options: ["3 m", "30 m", "100 m", "300 m"], answerIndex: 3, explain: "d = v × t = 30 × 10 = 300 m." },
  ],
};

// ---------- GEOGRAFIA (6ª) ----------
const GEO_PROVINCIAS: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "Quantas províncias tem Angola?", options: ["16", "17", "18", "21"], answerIndex: 2, explain: "Angola está dividida em 18 províncias, de Cabinda ao Cunene." },
    { id: 2, question: "Qual é a capital da província do Huambo?", options: ["Lubango", "Huambo", "Caála", "Bailundo"], answerIndex: 1, explain: "A cidade do Huambo é a capital da província com o mesmo nome." },
    { id: 3, question: "Qual é a capital de Angola?", options: ["Benguela", "Luanda", "Malanje", "Namibe"], answerIndex: 1, explain: "Luanda é a capital do país e a maior cidade de Angola." },
  ],
  Intermédio: [
    { id: 4, question: "A cidade do Lubango é capital de que província?", options: ["Huíla", "Namibe", "Cunene", "Bié"], answerIndex: 0, explain: "O Lubango é a capital da Huíla, conhecida pela Serra da Leba." },
    { id: 5, question: "Qual província está separada do resto do país por território estrangeiro?", options: ["Zaire", "Cabinda", "Uíge", "Moxico"], answerIndex: 1, explain: "Cabinda é um enclave, separado pela República Democrática do Congo." },
    { id: 6, question: "Qual é a maior província de Angola em área?", options: ["Moxico", "Luanda", "Bengo", "Cuanza Sul"], answerIndex: 0, explain: "O Moxico é a província com maior extensão territorial." },
  ],
  Avançado: [
    { id: 7, question: "A capital da província do Bié é:", options: ["Menongue", "Kuito", "Saurimo", "Ndalatando"], answerIndex: 1, explain: "O Kuito é a capital do Bié, no planalto central." },
    { id: 8, question: "Ndalatando é a capital de que província?", options: ["Cuanza Norte", "Cuanza Sul", "Malanje", "Bengo"], answerIndex: 0, explain: "Ndalatando é a capital do Cuanza Norte." },
    { id: 9, question: "Qual destas províncias faz fronteira com a Namíbia?", options: ["Uíge", "Cunene", "Malanje", "Lunda Norte"], answerIndex: 1, explain: "O Cunene faz fronteira a sul com a Namíbia." },
  ],
};

const GEO_RELEVO: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 10, question: "Qual é o maior rio que corre integralmente dentro do território de Angola?", options: ["Rio Cunene", "Rio Zambeze", "Rio Kwanza", "Rio Congo"], answerIndex: 2, explain: "O Rio Kwanza nasce no Bié e desagua no Oceano Atlântico em Luanda, sendo o maior rio totalmente nacional." },
    { id: 1, question: "Qual é o rio mais importante que nasce e desagua inteiramente em Angola?", options: ["Rio Zaire", "Rio Kwanza", "Rio Cunene", "Rio Cubango"], answerIndex: 1, explain: "O Kwanza é o maior rio totalmente angolano e deu nome à nossa moeda." },
    { id: 2, question: "O Deserto do Namibe fica em que zona do país?", options: ["Norte", "Centro", "Sudoeste", "Leste"], answerIndex: 2, explain: "O Namibe fica no sudoeste, junto ao Oceano Atlântico." },
    { id: 3, question: "Que oceano banha a costa de Angola?", options: ["Índico", "Atlântico", "Pacífico", "Ártico"], answerIndex: 1, explain: "Angola tem cerca de 1650 km de costa no Oceano Atlântico." },
  ],
  Intermédio: [
    { id: 4, question: "A planta Welwitschia mirabilis é típica de:", options: ["Deserto do Namibe", "Floresta do Maiombe", "Serra da Leba", "Rio Kwanza"], answerIndex: 0, explain: "A Welwitschia sobrevive no deserto do Namibe e pode viver mais de 1000 anos." },
    { id: 5, question: "O rio Kwanza é muito usado para:", options: ["Produzir energia eléctrica", "Fabricar cimento", "Extrair petróleo", "Criar camelos"], answerIndex: 0, explain: "Barragens como Capanda e Laúca produzem energia no rio Kwanza." },
    { id: 6, question: "A floresta densa do Maiombe fica na província de:", options: ["Cabinda", "Namibe", "Huíla", "Bié"], answerIndex: 0, explain: "O Maiombe, em Cabinda, é chamado a 'Amazónia de África'." },
  ],
  Avançado: [
    { id: 7, question: "O ponto mais alto de Angola é o Morro do Moco, na província de:", options: ["Huambo", "Bié", "Huíla", "Benguela"], answerIndex: 0, explain: "O Morro do Moco tem 2620 m e situa-se no Huambo." },
    { id: 8, question: "O rio Cunene serve de fronteira natural com:", options: ["Zâmbia", "Namíbia", "Congo", "Botswana"], answerIndex: 1, explain: "Parte do curso do Cunene marca a fronteira sul com a Namíbia." },
    { id: 9, question: "O clima do litoral do Namibe é sobretudo:", options: ["Tropical húmido", "Desértico e seco", "Frio de montanha", "Equatorial"], answerIndex: 1, explain: "A corrente fria de Benguela torna o litoral do Namibe seco e desértico." },
  ],
};

// ---------- SUBJECTS ----------
// ---------- QUÍMICA (9ª) ----------
const QUI_ATOMO: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "Quais são as partículas com carga eléctrica positiva localizadas no núcleo do átomo?", options: ["Electrões", "Neutrões", "Protões", "Fotões"], answerIndex: 2, explain: "Os protões têm carga positiva e ficam no núcleo, junto com os neutrões (sem carga)." },
    { id: 2, question: "As partículas com carga negativa que giram à volta do núcleo chamam-se:", options: ["Protões", "Electrões", "Neutrões", "Moléculas"], answerIndex: 1, explain: "Os electrões orbitam o núcleo na nuvem electrónica e têm carga negativa." },
    { id: 3, question: "O número atómico de um elemento corresponde ao número de:", options: ["Neutrões", "Protões", "Electrões livres", "Moléculas"], answerIndex: 1, explain: "O número atómico (Z) é o número de protões do núcleo e identifica o elemento." },
  ],
  Intermédio: [
    { id: 4, question: "Um átomo neutro tem sempre:", options: ["Mais protões que electrões", "Igual número de protões e electrões", "Só neutrões", "Mais electrões que protões"], answerIndex: 1, explain: "Num átomo neutro as cargas positivas e negativas anulam-se: nº de protões = nº de electrões." },
    { id: 5, question: "O símbolo químico do oxigénio é:", options: ["Ox", "O", "Og", "Om"], answerIndex: 1, explain: "O oxigénio representa-se apenas pela letra O; a molécula do ar é O₂." },
    { id: 6, question: "A massa do átomo está praticamente toda:", options: ["Nos electrões", "No núcleo", "No vazio à volta", "Nas ligações"], answerIndex: 1, explain: "Protões e neutrões concentram quase toda a massa; o electrão é cerca de 1836 vezes mais leve." },
  ],
  Avançado: [
    { id: 7, question: "Um átomo com 11 protões e 12 neutrões tem número de massa:", options: ["11", "12", "23", "1"], answerIndex: 2, explain: "Número de massa A = protões + neutrões = 11 + 12 = 23 (sódio)." },
    { id: 8, question: "Quando um átomo perde um electrão, transforma-se num:", options: ["Anião", "Catião", "Isótopo", "Neutrão"], answerIndex: 1, explain: "Perder electrão deixa carga positiva → catião (ex.: Na⁺ no sal de cozinha)." },
    { id: 9, question: "Isótopos são átomos do mesmo elemento com número diferente de:", options: ["Protões", "Electrões", "Neutrões", "Núcleos"], answerIndex: 2, explain: "Mesmo número atómico, mas número de neutrões diferente — ex.: carbono-12 e carbono-14." },
  ],
};

// ---------- BIOLOGIA (10ª) ----------
const BIO_CELULA: Partial<Record<Difficulty, QuizQuestion[]>> = {
  Básico: [
    { id: 1, question: "Qual é a estrutura celular responsável por controlar todas as actividades da célula?", options: ["Citoplasma", "Membrana", "Núcleo", "Parede celular"], answerIndex: 2, explain: "O núcleo guarda o ADN e comanda todas as funções da célula." },
    { id: 2, question: "A célula é considerada:", options: ["Um órgão", "A unidade básica da vida", "Um tecido", "Um mineral"], answerIndex: 1, explain: "Todos os seres vivos são feitos de uma ou mais células." },
    { id: 3, question: "A estrutura que envolve a célula e controla o que entra e sai é:", options: ["Membrana celular", "Núcleo", "Ribossoma", "Vacúolo"], answerIndex: 0, explain: "A membrana plasmática é semipermeável e faz o controlo das trocas." },
  ],
  Intermédio: [
    { id: 4, question: "O organelo que produz energia (respiração celular) chama-se:", options: ["Mitocôndria", "Cloroplasto", "Lisossoma", "Núcleo"], answerIndex: 0, explain: "A mitocôndria produz ATP — é a 'central eléctrica' da célula." },
    { id: 5, question: "Os cloroplastos existem sobretudo nas células:", options: ["Animais", "Vegetais", "Bacterianas", "Do sangue"], answerIndex: 1, explain: "Contêm clorofila e fazem a fotossíntese nas plantas, como no cafeeiro do Uíge." },
    { id: 6, question: "A parede celular rígida é uma característica da célula:", options: ["Animal", "Vegetal", "Nervosa", "Muscular"], answerIndex: 1, explain: "A parede de celulose dá forma e protecção às células vegetais." },
  ],
  Avançado: [
    { id: 7, question: "Células sem núcleo definido chamam-se:", options: ["Eucarióticas", "Procarióticas", "Somáticas", "Gaméticas"], answerIndex: 1, explain: "As procarióticas (bactérias) têm o material genético solto no citoplasma." },
    { id: 8, question: "O processo de divisão que origina duas células idênticas é:", options: ["Meiose", "Mitose", "Fotossíntese", "Osmose"], answerIndex: 1, explain: "A mitose garante crescimento e reparação dos tecidos com células iguais à original." },
    { id: 9, question: "A entrada de água na célula por diferença de concentração chama-se:", options: ["Osmose", "Digestão", "Respiração", "Excreção"], answerIndex: 0, explain: "Osmose é a passagem de água através da membrana semipermeável." },
  ],
};

export const SUBJECTS: Subject[] = [
  {
    id: "mat",
    name: "Matemática",
    tagline: "Números & lógica",
    icon: "Calculator",
    hue: "text-orange-50",
    bg: "bg-gradient-to-br from-orange-400 to-rose-500",
    ring: "ring-orange-300",
    emoji: "➗",
    progress: 32,
    minGrade: "6ª",
    topics: seed([
      { id: 1, title: "Frações e Números Decimais", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: MAT_FRACOES },
      { id: 2, title: "Geometria: Ângulos e Triângulos", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: MAT_GEOMETRIA },
      { id: 3, title: "Equações do 1.º grau", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: MAT_EQUACOES },
      { id: 4, title: "Estatística básica", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: MAT_ESTATISTICA },
      { id: 5, title: "Proporcionalidade e Percentagens", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: MAT_PROPORCAO },
    ]),
  },
  {
    id: "por",
    name: "Língua Portuguesa",
    tagline: "Palavras & escrita",
    icon: "BookOpenText",
    hue: "text-sky-50",
    bg: "bg-gradient-to-br from-sky-500 to-blue-700",
    ring: "ring-sky-300",
    emoji: "📖",
    progress: 18,
    minGrade: "6ª",
    topics: seed([
      { id: 1, title: "Classes de Palavras", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: POR_CLASSES },
      { id: 2, title: "Interpretação e Provérbios Angolanos", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: POR_INTERP },
      { id: 3, title: "Sujeito e Predicado", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: POR_SUJEITO },
      { id: 4, title: "Texto Narrativo", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: POR_NARRATIVO },
      { id: 5, title: "Acentuação e Ortografia", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: POR_ORTOGRAFIA },
    ]),
  },
  {
    id: "his",
    name: "História",
    tagline: "Angola & o mundo",
    icon: "Landmark",
    hue: "text-amber-50",
    bg: "bg-gradient-to-br from-amber-500 to-orange-700",
    ring: "ring-amber-300",
    emoji: "🏛️",
    progress: 5,
    minGrade: "7ª",
    topics: seed([
      { id: 1, title: "Origens do Homem e Pré-História em África", grades: ["7ª", "8ª", "9ª", "10ª"], questions: HIS_PREHIST },
      { id: 2, title: "Antigos Reinos de Angola", grades: ["7ª", "8ª", "9ª", "10ª"], questions: HIS_REINOS },
      { id: 3, title: "Colonização e Resistência", grades: ["7ª", "8ª", "9ª", "10ª"], questions: HIS_COLONIZACAO },
      { id: 4, title: "Independência de Angola", grades: ["7ª", "8ª", "9ª", "10ª"], questions: HIS_INDEPENDENCIA },
      { id: 5, title: "Angola Contemporânea", grades: ["7ª", "8ª", "9ª", "10ª"], questions: HIS_CONTEMPORANEA },
    ]),
  },
  {
    id: "fis",
    name: "Física",
    tagline: "Forças & energia",
    icon: "Atom",
    hue: "text-indigo-50",
    bg: "bg-gradient-to-br from-indigo-500 to-violet-600",
    ring: "ring-indigo-300",
    emoji: "⚛️",
    progress: 8,
    minGrade: "8ª",
    topics: seed([
      { id: 1, title: "Matéria e Propriedades Físicas", grades: ["8ª", "9ª", "10ª"], questions: FIS_MATERIA },
      { id: 2, title: "Movimento e Velocidade", grades: ["8ª", "9ª", "10ª"], questions: FIS_MOVIMENTO },
      { id: 3, title: "Forças e Leis de Newton", grades: ["8ª", "9ª", "10ª"], questions: FIS_FORCAS },
      { id: 4, title: "Energia e Trabalho", grades: ["8ª", "9ª", "10ª"], questions: FIS_ENERGIA },
      { id: 5, title: "Electricidade Básica", grades: ["8ª", "9ª", "10ª"], questions: FIS_ELETRICIDADE },
    ]),
  },
  {
    id: "qui",
    name: "Química",
    tagline: "Átomos & reações",
    icon: "FlaskConical",
    hue: "text-teal-50",
    bg: "bg-gradient-to-br from-teal-400 to-cyan-600",
    ring: "ring-teal-300",
    emoji: "⚗️",
    progress: 0,
    minGrade: "8ª",
    topics: seed([
      { id: 1, title: "Estrutura do Átomo", grades: ["8ª", "9ª", "10ª"], questions: QUI_ATOMO },
      { id: 2, title: "Tabela Periódica", grades: ["8ª", "9ª", "10ª"], questions: QUI_TABELA },
      { id: 3, title: "Ligações Químicas", grades: ["8ª", "9ª", "10ª"], questions: QUI_LIGACOES },
      { id: 4, title: "Reacções Químicas", grades: ["8ª", "9ª", "10ª"], questions: QUI_REACOES },
      { id: 5, title: "Ácidos e Bases", grades: ["8ª", "9ª", "10ª"], questions: QUI_ACIDOS },
    ]),
  },
  {
    id: "bio",
    name: "Biologia",
    tagline: "Vida & natureza",
    icon: "Leaf",
    hue: "text-emerald-50",
    bg: "bg-gradient-to-br from-emerald-400 to-green-600",
    ring: "ring-emerald-300",
    emoji: "🌿",
    progress: 0,
    minGrade: "7ª",
    topics: seed([
      { id: 1, title: "A Célula", grades: ["7ª", "8ª", "9ª", "10ª"], questions: BIO_CELULA },
      { id: 2, title: "Reinos dos Seres Vivos", grades: ["7ª", "8ª", "9ª", "10ª"], questions: BIO_REINOS },
      { id: 3, title: "Corpo Humano e Nutrição", grades: ["7ª", "8ª", "9ª", "10ª"], questions: BIO_CORPO },
      { id: 4, title: "Ecossistemas de Angola", grades: ["7ª", "8ª", "9ª", "10ª"], questions: BIO_ECOSSISTEMAS },
      { id: 5, title: "Reprodução e Genética", grades: ["7ª", "8ª", "9ª", "10ª"], questions: BIO_REPRODUCAO },
    ]),
  },
];

SUBJECTS.push({
  id: "geo",
  name: "Geografia",
  tagline: "Angola de norte a sul",
  icon: "Globe2",
  hue: "text-lime-50",
  bg: "bg-gradient-to-br from-lime-500 to-emerald-700",
  ring: "ring-lime-300",
  emoji: "🗺️",
  progress: 12,
  minGrade: "6ª",
  topics: seed([
    { id: 1, title: "As 18 Províncias de Angola e Capitais", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: GEO_PROVINCIAS },
    { id: 2, title: "Hidrografia de Angola", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: GEO_RELEVO },
    { id: 3, title: "Clima e Vegetação", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: GEO_CLIMA },
    { id: 4, title: "População e Cidades", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: GEO_POPULACAO },
    { id: 5, title: "Recursos Naturais e Economia", grades: ["6ª", "7ª", "8ª", "9ª", "10ª"], questions: GEO_RECURSOS },
  ]),
});

function gradeIndex(g: Grade): number {
  return ["6ª", "7ª", "8ª", "9ª", "10ª"].indexOf(g);
}

export function topicsForGrade(subject: Subject, grade: Grade): Topic[] {
  return subject.topics.filter((t) => t.grades.includes(grade));
}

export function subjectHasContentForGrade(subject: Subject, grade: Grade): boolean {
  return topicsForGrade(subject, grade).some((t) => t.questions && Object.values(t.questions).some((arr) => arr && arr.length > 0));
}

export function isSubjectAvailable(subject: Subject, grade: Grade): boolean {
  return gradeIndex(grade) >= gradeIndex(subject.minGrade) && topicsForGrade(subject, grade).length > 0;
}

export function getQuestions(
  subjectId: string,
  topicId: number,
  difficulty: Difficulty,
): QuizQuestion[] {
  const subject = SUBJECTS.find((s) => s.id === subjectId);
  const topic = subject?.topics.find((t) => t.id === topicId);
  const bank = topic?.questions;
  const base =
    bank?.[difficulty] ?? bank?.Básico ?? bank?.Intermédio ?? bank?.Avançado ?? [];

  // Completa sempre até ao mínimo de 12 perguntas com o banco central da disciplina.
  const extra = poolFor(subjectId, difficulty);
  const vistas = new Set(base.map((q) => q.question));
  const completas = [...base];
  for (const q of extra) {
    if (completas.length >= MIN_PERGUNTAS_POR_NIVEL) break;
    if (vistas.has(q.question)) continue;
    vistas.add(q.question);
    completas.push(q);
  }
  return completas.length > 0 ? completas : FALLBACK_QUIZ;
}


/** Prova final: perguntas mistas de todas as disciplinas disponíveis na classe do aluno. */
export function getMixedQuestions(grade: Grade, count = 5): QuizQuestion[] {
  const pool: QuizQuestion[] = [];
  for (const subject of SUBJECTS) {
    if (!isSubjectAvailable(subject, grade)) continue;
    for (const topic of topicsForGrade(subject, grade)) {
      for (const arr of Object.values(topic.questions ?? {})) {
        if (arr) pool.push(...arr.map((q) => ({ ...q, id: q.id + subject.id.charCodeAt(0) * 1000 + topic.id * 100 })));
      }
    }
  }
  if (pool.length === 0) return FALLBACK_QUIZ;
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count);
}

/** Junta perguntas de todos os tópicos/dificuldades de uma disciplina para a classe do aluno. */
export function getDuelQuestions(
  subjectId: string,
  grade: Grade,
  count = 5,
): QuizQuestion[] {
  const subject = SUBJECTS.find((s) => s.id === subjectId);
  if (!subject) return FALLBACK_QUIZ;
  const pool: QuizQuestion[] = [];
  for (const topic of topicsForGrade(subject, grade)) {
    for (const arr of Object.values(topic.questions ?? {})) {
      if (arr) pool.push(...arr);
    }
  }
  if (pool.length === 0) return FALLBACK_QUIZ;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, count);
  // Se o banco for pequeno, repete perguntas para completar o duelo.
  let i = 0;
  while (picked.length < count) {
    picked.push(shuffled[i % shuffled.length]);
    i += 1;
  }
  return picked;
}

const FALLBACK_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "Este tópico ainda está em construção. Qual é a atitude certa?",
    options: ["Desistir", "Continuar a praticar noutros tópicos", "Fechar o app", "Reclamar"],
    answerIndex: 1,
    explain: "Enquanto novos conteúdos chegam, continua a praticar as lições disponíveis.",
  },
];