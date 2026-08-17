import type { Difficulty, QuizQuestion } from "./types";

/**
 * Banco central de perguntas por disciplina e nível.
 * Serve para garantir que qualquer tópico tem SEMPRE, no mínimo, 12 perguntas
 * reais e contextualizadas com a realidade angolana em cada nível.
 * Os ids começam em 1000 para nunca colidirem com os ids dos tópicos.
 */
export type Pool = Record<Difficulty, QuizQuestion[]>;

function n(base: number, list: Omit<QuizQuestion, "id">[]): QuizQuestion[] {
  return list.map((q, i) => ({ ...q, id: base + i }));
}

// ============================ MATEMÁTICA ============================
const MAT: Pool = {
  Básico: n(1000, [
    { question: "Quanto é 45 + 38?", options: ["73", "83", "85", "93"], answerIndex: 1, explain: "45 + 38 = 83. Soma primeiro as dezenas (40+30=70) e depois as unidades (5+8=13)." },
    { question: "Um pão custa 100 Kz. Quanto custam 7 pães?", options: ["600 Kz", "700 Kz", "750 Kz", "800 Kz"], answerIndex: 1, explain: "7 × 100 = 700 Kz." },
    { question: "Qual destes números é par?", options: ["17", "23", "34", "45"], answerIndex: 2, explain: "Números pares terminam em 0, 2, 4, 6 ou 8. 34 termina em 4." },
    { question: "Quanto é 9 × 6?", options: ["45", "54", "56", "63"], answerIndex: 1, explain: "9 × 6 = 54." },
    { question: "Numa turma há 30 alunos e faltaram 6. Quantos vieram?", options: ["22", "23", "24", "26"], answerIndex: 2, explain: "30 − 6 = 24 alunos presentes." },
    { question: "Qual é o dobro de 125?", options: ["225", "250", "255", "275"], answerIndex: 1, explain: "125 × 2 = 250." },
    { question: "Quanto é 1000 ÷ 4?", options: ["200", "250", "300", "400"], answerIndex: 1, explain: "1000 ÷ 4 = 250." },
    { question: "Uma nota de 2000 Kz paga um caderno de 1500 Kz. Qual é o troco?", options: ["300 Kz", "400 Kz", "500 Kz", "600 Kz"], answerIndex: 2, explain: "2000 − 1500 = 500 Kz de troco." },
    { question: "Qual é o valor posicional do 7 no número 4 725?", options: ["7 unidades", "7 dezenas", "7 centenas", "7 milhares"], answerIndex: 2, explain: "Em 4 725 o 7 está na casa das centenas, valendo 700." },
    { question: "Quanto é metade de 1 hora em minutos?", options: ["15 min", "20 min", "30 min", "45 min"], answerIndex: 2, explain: "1 hora = 60 minutos; metade são 30 minutos." },
    { question: "Qual é o resultado de 12 + 8 × 2?", options: ["28", "40", "32", "22"], answerIndex: 0, explain: "Primeiro a multiplicação: 8×2=16; depois 12+16=28." },
    { question: "Quantos lados tem um quadrado?", options: ["3", "4", "5", "6"], answerIndex: 1, explain: "O quadrado tem 4 lados iguais e 4 ângulos rectos." },
  ]),
  Intermédio: n(1100, [
    { question: "Um candongueiro leva 15 passageiros e cobra 300 Kz cada. Quanto arrecada por viagem?", options: ["3 500 Kz", "4 000 Kz", "4 500 Kz", "5 000 Kz"], answerIndex: 2, explain: "15 × 300 = 4 500 Kz." },
    { question: "Quanto é 25% de 8 000 Kz?", options: ["1 600 Kz", "2 000 Kz", "2 400 Kz", "2 800 Kz"], answerIndex: 1, explain: "25% = 1/4. 8 000 ÷ 4 = 2 000 Kz." },
    { question: "Resolve: 4x = 36", options: ["6", "8", "9", "12"], answerIndex: 2, explain: "x = 36 ÷ 4 = 9." },
    { question: "O perímetro de um rectângulo de 8 m por 5 m é:", options: ["13 m", "26 m", "40 m", "20 m"], answerIndex: 1, explain: "Perímetro = 2×(8+5) = 26 m." },
    { question: "A área de um rectângulo de 8 m por 5 m é:", options: ["13 m²", "26 m²", "40 m²", "45 m²"], answerIndex: 2, explain: "Área = comprimento × largura = 8 × 5 = 40 m²." },
    { question: "Quanto é 3/5 de 2 500 Kz?", options: ["1 000 Kz", "1 250 Kz", "1 500 Kz", "1 750 Kz"], answerIndex: 2, explain: "2 500 ÷ 5 = 500; 500 × 3 = 1 500 Kz." },
    { question: "Converte 2,5 kg em gramas:", options: ["250 g", "2 500 g", "25 000 g", "25 g"], answerIndex: 1, explain: "1 kg = 1 000 g, logo 2,5 kg = 2 500 g." },
    { question: "A média das notas 12, 14 e 16 é:", options: ["13", "14", "15", "16"], answerIndex: 1, explain: "(12+14+16) ÷ 3 = 42 ÷ 3 = 14." },
    { question: "Um saco de cimento custa 9 000 Kz. Com desconto de 10% fica por:", options: ["8 000 Kz", "8 100 Kz", "8 500 Kz", "8 900 Kz"], answerIndex: 1, explain: "10% de 9 000 = 900; 9 000 − 900 = 8 100 Kz." },
    { question: "Qual é o mínimo múltiplo comum de 4 e 6?", options: ["8", "10", "12", "24"], answerIndex: 2, explain: "Múltiplos de 4: 4, 8, 12... de 6: 6, 12... O menor comum é 12." },
    { question: "Resolve: 2x + 7 = 19", options: ["4", "5", "6", "7"], answerIndex: 2, explain: "2x = 12, logo x = 6." },
    { question: "Se 1 USD vale 900 Kz, quanto valem 20 USD?", options: ["9 000 Kz", "12 000 Kz", "18 000 Kz", "20 000 Kz"], answerIndex: 2, explain: "20 × 900 = 18 000 Kz." },
  ]),
  Avançado: n(1200, [
    { question: "Resolve: 3(x − 2) = 4x − 10", options: ["2", "4", "6", "8"], answerIndex: 1, explain: "3x − 6 = 4x − 10 → 4 = x, logo x = 4." },
    { question: "Um comerciante compra por 12 000 Kz e vende por 15 000 Kz. Qual é a percentagem de lucro?", options: ["20%", "25%", "30%", "35%"], answerIndex: 1, explain: "Lucro = 3 000; 3 000 ÷ 12 000 = 0,25 → 25%." },
    { question: "Quanto vale x em x² = 144, sendo x positivo?", options: ["11", "12", "14", "72"], answerIndex: 1, explain: "12 × 12 = 144, logo x = 12." },
    { question: "A área de um círculo de raio 7 m (π≈3,14) é aproximadamente:", options: ["44 m²", "98 m²", "154 m²", "308 m²"], answerIndex: 2, explain: "A = πr² = 3,14 × 49 ≈ 154 m²." },
    { question: "Num triângulo rectângulo os catetos medem 3 e 4. A hipotenusa mede:", options: ["5", "6", "7", "12"], answerIndex: 0, explain: "Pitágoras: 3² + 4² = 9 + 16 = 25 → hipotenusa = 5." },
    { question: "Simplifica a fracção 18/24:", options: ["2/3", "3/4", "4/5", "9/12"], answerIndex: 1, explain: "Dividindo ambos por 6: 18/24 = 3/4." },
    { question: "Uma quitandeira dobra o capital em 3 meses partindo de 40 000 Kz. Quanto ganhou?", options: ["20 000 Kz", "40 000 Kz", "60 000 Kz", "80 000 Kz"], answerIndex: 1, explain: "Dobrar significa passar a 80 000; o ganho é 80 000 − 40 000 = 40 000 Kz." },
    { question: "Qual é o valor de 2³ × 2²?", options: ["2⁵ = 32", "2⁶ = 64", "4⁵", "2¹ = 2"], answerIndex: 0, explain: "Ao multiplicar potências da mesma base somam-se os expoentes: 2³⁺² = 2⁵ = 32." },
    { question: "Um depósito enche 3/8 em 6 horas. Quantas horas leva a encher tudo ao mesmo ritmo?", options: ["12 h", "14 h", "16 h", "18 h"], answerIndex: 2, explain: "6 h → 3/8; 1/8 leva 2 h; 8/8 leva 16 h." },
    { question: "Resolve o sistema: x + y = 10 e x − y = 2", options: ["x=6, y=4", "x=5, y=5", "x=7, y=3", "x=4, y=6"], answerIndex: 0, explain: "Somando: 2x = 12 → x = 6; então y = 4." },
    { question: "Qual é a raiz quadrada de 0,25?", options: ["0,05", "0,5", "2,5", "5"], answerIndex: 1, explain: "0,5 × 0,5 = 0,25." },
    { question: "Numa escola, 60% dos 450 alunos são raparigas. Quantas são?", options: ["240", "260", "270", "290"], answerIndex: 2, explain: "450 × 0,6 = 270 raparigas." },
  ]),
};

// ============================ LÍNGUA PORTUGUESA ============================
const POR: Pool = {
  Básico: n(1000, [
    { question: "Qual é o plural de «pão»?", options: ["Pães", "Pãos", "Pans", "Pãoes"], answerIndex: 0, explain: "Palavras em -ão podem fazer plural em -ães: pão → pães." },
    { question: "Na frase «A Nzuzi lê um livro», qual é o verbo?", options: ["Nzuzi", "lê", "um", "livro"], answerIndex: 1, explain: "«Lê» indica a acção praticada — é o verbo." },
    { question: "Qual palavra está bem escrita?", options: ["Excursão", "Escursão", "Excurção", "Escurção"], answerIndex: 0, explain: "Escreve-se «excursão», com x e s." },
    { question: "«Luanda é bonita.» A palavra «bonita» é:", options: ["Verbo", "Adjectivo", "Advérbio", "Artigo"], answerIndex: 1, explain: "Caracteriza o substantivo Luanda → adjectivo." },
    { question: "Qual é o feminino de «rei»?", options: ["Reia", "Rainha", "Reina", "Reisa"], answerIndex: 1, explain: "O feminino de rei é rainha." },
    { question: "Quantas sílabas tem a palavra «kizomba»?", options: ["2", "3", "4", "5"], answerIndex: 1, explain: "ki-zom-ba → 3 sílabas." },
    { question: "Qual destas frases está na negativa?", options: ["Ele estuda", "Ele não estuda", "Estuda!", "Estudas?"], answerIndex: 1, explain: "A palavra «não» torna a frase negativa." },
    { question: "O antónimo de «alegre» é:", options: ["Feliz", "Contente", "Triste", "Animado"], answerIndex: 2, explain: "Antónimo é o contrário: alegre ↔ triste." },
    { question: "Qual é o artigo definido correcto: «___ escola é grande»?", options: ["Um", "Uma", "A", "As"], answerIndex: 2, explain: "«Escola» é feminino singular → a escola." },
    { question: "«Mucanda» significa carta em kimbundu. Palavras vindas de línguas nacionais chamam-se:", options: ["Estrangeirismos", "Empréstimos", "Erros", "Siglas"], answerIndex: 1, explain: "São empréstimos linguísticos que enriquecem o português de Angola." },
    { question: "Qual palavra tem acento correcto?", options: ["Cafe", "Café", "Cafè", "Cafê"], answerIndex: 1, explain: "«Café» leva acento agudo no e final tónico." },
    { question: "O sinal usado no fim de uma pergunta é:", options: ["Ponto final", "Ponto de interrogação", "Vírgula", "Reticências"], answerIndex: 1, explain: "As perguntas terminam com ponto de interrogação (?)." },
  ]),
  Intermédio: n(1100, [
    { question: "Em «Os alunos estudaram muito», o sujeito é:", options: ["estudaram", "muito", "Os alunos", "Os"], answerIndex: 2, explain: "Quem estudou? Os alunos — é o sujeito da frase." },
    { question: "«Ontem fomos ao Mercado do Kikolo.» O verbo está no:", options: ["Presente", "Pretérito perfeito", "Futuro", "Imperativo"], answerIndex: 1, explain: "«Fomos» refere-se a uma acção terminada no passado." },
    { question: "Qual é o grau superlativo de «bonito»?", options: ["Mais bonito", "Bonitinho", "Boníssimo", "Bonita"], answerIndex: 2, explain: "Superlativo absoluto sintético: boníssimo/muito bonito." },
    { question: "Identifica o advérbio: «Ela fala calmamente».", options: ["Ela", "fala", "calmamente", "nenhum"], answerIndex: 2, explain: "«Calmamente» indica o modo da acção → advérbio de modo." },
    { question: "«Se eu estudasse, passaria de classe.» O verbo «estudasse» está no:", options: ["Indicativo", "Conjuntivo", "Imperativo", "Infinitivo"], answerIndex: 1, explain: "Exprime hipótese → modo conjuntivo (subjuntivo)." },
    { question: "Qual frase usa correctamente a vírgula?", options: ["Kiala, Nzuzi e Ana chegaram.", "Kiala Nzuzi, e Ana chegaram.", "Kiala Nzuzi e, Ana chegaram.", "Kiala, Nzuzi, e Ana, chegaram."], answerIndex: 0, explain: "A vírgula separa elementos da enumeração; antes do último «e» não se usa." },
    { question: "Numa carta formal, a saudação adequada é:", options: ["Olá mano", "Exmo. Senhor Director", "Boas, chefe", "Fala aí"], answerIndex: 1, explain: "Em textos formais usa-se tratamento respeitoso e completo." },
    { question: "«O livro foi lido pela turma.» Esta frase está na voz:", options: ["Activa", "Passiva", "Reflexa", "Imperativa"], answerIndex: 1, explain: "O sujeito sofre a acção → voz passiva." },
    { question: "Qual é o sinónimo de «trabalho»?", options: ["Descanso", "Labuta", "Sono", "Festa"], answerIndex: 1, explain: "Labuta é sinónimo de trabalho, esforço." },
    { question: "«Kubata» e «casa» são palavras:", options: ["Antónimas", "Sinónimas", "Homógrafas", "Parónimas"], answerIndex: 1, explain: "Têm o mesmo significado → sinónimas." },
    { question: "Em «Comprei mandioca e ginguba», a conjunção «e» indica:", options: ["Oposição", "Adição", "Causa", "Conclusão"], answerIndex: 1, explain: "«E» é conjunção coordenativa copulativa: acrescenta ideias." },
    { question: "O texto que conta uma história com personagens e acção é:", options: ["Descritivo", "Narrativo", "Argumentativo", "Instrucional"], answerIndex: 1, explain: "Texto narrativo tem narrador, personagens, espaço, tempo e acção." },
  ]),
  Avançado: n(1200, [
    { question: "«Agostinho Neto escreveu poesia de resistência.» A função sintáctica de «poesia de resistência» é:", options: ["Sujeito", "Complemento directo", "Predicativo", "Vocativo"], answerIndex: 1, explain: "Responde a «escreveu o quê?» → complemento directo." },
    { question: "A figura de estilo em «o mar rugia de raiva» é:", options: ["Metáfora", "Personificação", "Hipérbole", "Ironia"], answerIndex: 1, explain: "Atribui sentimentos humanos ao mar → personificação." },
    { question: "«Chorei rios de lágrimas» é exemplo de:", options: ["Comparação", "Hipérbole", "Eufemismo", "Antítese"], answerIndex: 1, explain: "É um exagero intencional → hipérbole." },
    { question: "Na frase «Embora chovesse, fomos à escola», a oração destacada é:", options: ["Causal", "Concessiva", "Final", "Temporal"], answerIndex: 1, explain: "«Embora» introduz uma concessão — um obstáculo que não impede a acção." },
    { question: "Qual é a forma correcta do verbo «haver» em «___ muitos alunos na sala»?", options: ["Hão", "Houveram", "Há", "Hás"], answerIndex: 2, explain: "«Haver» no sentido de existir é impessoal: há muitos alunos." },
    { question: "Em «Luuanda», de Luandino Vieira, destaca-se:", options: ["Português europeu puro", "A oralidade e o kimbundu", "Vocabulário técnico", "Linguagem jurídica"], answerIndex: 1, explain: "Luandino recria a fala dos musseques, misturando português e kimbundu." },
    { question: "Um texto argumentativo tem obrigatoriamente:", options: ["Rimas", "Tese e argumentos", "Diálogos", "Receita"], answerIndex: 1, explain: "Defende uma tese com argumentos e conclusão." },
    { question: "«Nós vos agradecemos» — o pronome «vos» é:", options: ["Sujeito", "Complemento indirecto", "Adjunto", "Vocativo"], answerIndex: 1, explain: "Indica a quem se agradece → complemento indirecto." },
    { question: "Qual palavra é esdrúxula (proparoxítona)?", options: ["Caderno", "Música", "Papel", "Cidade"], answerIndex: 1, explain: "«Música» tem acento na antepenúltima sílaba → esdrúxula." },
    { question: "A coesão de um texto obtém-se sobretudo através de:", options: ["Títulos grandes", "Conectores e pronomes", "Imagens", "Letra bonita"], answerIndex: 1, explain: "Conectores (porém, além disso) e pronomes ligam as ideias." },
    { question: "«Ele disse que viria.» Trata-se de discurso:", options: ["Directo", "Indirecto", "Indirecto livre", "Monólogo"], answerIndex: 1, explain: "A fala é relatada pelo narrador, sem aspas → discurso indirecto." },
    { question: "Em Angola, «bué» é um exemplo de:", options: ["Arcaísmo", "Angolanismo/coloquialismo", "Termo técnico", "Estrangeirismo inglês"], answerIndex: 1, explain: "É uma marca do português falado em Angola, com sentido de «muito»." },
  ]),
};

// ============================ GEOGRAFIA ============================
const GEO: Pool = {
  Básico: n(1000, [
    { question: "Quantas províncias tem Angola?", options: ["16", "18", "20", "21"], answerIndex: 1, explain: "Angola está dividida em 18 províncias." },
    { question: "Qual é a capital de Angola?", options: ["Benguela", "Huambo", "Luanda", "Lubango"], answerIndex: 2, explain: "Luanda é a capital e maior cidade do país." },
    { question: "O oceano que banha Angola é o:", options: ["Índico", "Atlântico", "Pacífico", "Árctico"], answerIndex: 1, explain: "Angola tem costa no Oceano Atlântico." },
    { question: "A capital da província do Huambo é:", options: ["Huambo", "Caála", "Bailundo", "Kuito"], answerIndex: 0, explain: "A cidade do Huambo é a capital da província com o mesmo nome." },
    { question: "O maior rio inteiramente angolano é o:", options: ["Kwanza", "Zaire", "Cunene", "Cubango"], answerIndex: 0, explain: "O rio Kwanza nasce e desagua em Angola e deu nome à moeda." },
    { question: "Qual país NÃO faz fronteira com Angola?", options: ["Namíbia", "Zâmbia", "RD Congo", "Moçambique"], answerIndex: 3, explain: "Moçambique fica na costa oriental, sem fronteira com Angola." },
    { question: "Cabinda é uma província:", options: ["Insular", "Separada do resto do país", "Do planalto central", "Do deserto"], answerIndex: 1, explain: "Cabinda é um enclave separado pelo território da RD Congo." },
    { question: "A moeda de Angola chama-se:", options: ["Metical", "Kwanza", "Rand", "Escudo"], answerIndex: 1, explain: "A moeda nacional é o Kwanza (Kz)." },
    { question: "O deserto que se estende no sul de Angola é o:", options: ["Sara", "Kalahari/Namibe", "Gobi", "Atacama"], answerIndex: 1, explain: "O Namibe prolonga-se pelo sul, junto ao Kalahari." },
    { question: "A capital da província de Benguela é:", options: ["Lobito", "Benguela", "Catumbela", "Baía Farta"], answerIndex: 1, explain: "A cidade de Benguela é a capital provincial; o Lobito é o grande porto." },
    { question: "Um mapa mostra as direcções através da:", options: ["Legenda", "Rosa-dos-ventos", "Escala", "Título"], answerIndex: 1, explain: "A rosa-dos-ventos indica norte, sul, este e oeste." },
    { question: "Angola situa-se em que parte de África?", options: ["Norte", "África Austral/Central-Ocidental", "Corno de África", "Ilhas"], answerIndex: 1, explain: "Angola fica na África Austral, na costa ocidental." },
  ]),
  Intermédio: n(1100, [
    { question: "A província com maior área territorial é:", options: ["Moxico", "Luanda", "Huíla", "Bié"], answerIndex: 0, explain: "O Moxico é a maior província em extensão, embora pouco povoada." },
    { question: "A província mais populosa de Angola é:", options: ["Huambo", "Benguela", "Luanda", "Huíla"], answerIndex: 2, explain: "Luanda concentra vários milhões de habitantes." },
    { question: "A serra da Leba fica na província de:", options: ["Namibe", "Huíla", "Cunene", "Benguela"], answerIndex: 1, explain: "A famosa estrada da Leba liga a Huíla ao Namibe." },
    { question: "O caminho-de-ferro de Benguela (CFB) liga o Lobito ao:", options: ["Namibe", "Interior e à fronteira leste", "Soyo", "Cabinda"], answerIndex: 1, explain: "O CFB atravessa o país até ao Luau, fronteira com a RDC." },
    { question: "O clima predominante no litoral do Namibe é:", options: ["Equatorial húmido", "Desértico/árido", "Mediterrânico", "Frio de montanha"], answerIndex: 1, explain: "A corrente fria de Benguela torna o litoral sul muito seco." },
    { question: "O Planalto Central angolano tem altitudes médias de cerca de:", options: ["200 m", "600 m", "1 500 m", "3 500 m"], answerIndex: 2, explain: "Ronda os 1 500 m, o que dá um clima mais fresco (Huambo, Bié)." },
    { question: "O ponto mais alto de Angola é o Morro do Moco, na província de:", options: ["Huambo", "Bié", "Huíla", "Malanje"], answerIndex: 0, explain: "O Morro do Moco, com 2 620 m, fica no Huambo." },
    { question: "As Quedas de Kalandula situam-se em:", options: ["Malanje", "Uíge", "Kwanza-Sul", "Zaire"], answerIndex: 0, explain: "Kalandula, em Malanje, é uma das maiores quedas de água de África." },
    { question: "O principal porto petrolífero do norte é o:", options: ["Soyo", "Lobito", "Namibe", "Porto Amboim"], answerIndex: 0, explain: "O Soyo, no Zaire, é central na indústria do petróleo e gás." },
    { question: "A província do Lunda-Norte é conhecida pela exploração de:", options: ["Petróleo", "Diamantes", "Carvão", "Ouro"], answerIndex: 1, explain: "As Lundas concentram a produção diamantífera do país." },
    { question: "A estação das chuvas em grande parte de Angola vai de:", options: ["Setembro a Abril", "Maio a Agosto", "Junho a Setembro", "Todo o ano"], answerIndex: 0, explain: "O cacimbo (seco) vai de Maio a Agosto; as chuvas de Setembro a Abril." },
    { question: "A densidade populacional mede:", options: ["Total de habitantes", "Habitantes por km²", "Nascimentos por ano", "Área do país"], answerIndex: 1, explain: "Densidade = habitantes ÷ área em km²." },
  ]),
  Avançado: n(1200, [
    { question: "A corrente marítima fria que influencia o clima do litoral angolano é a de:", options: ["Benguela", "Agulhas", "Golfo", "Humboldt"], answerIndex: 0, explain: "A corrente fria de Benguela reduz as chuvas no litoral sul." },
    { question: "O rio Cunene é importante sobretudo por:", options: ["Navegação intensa", "Energia hidroeléctrica e fronteira sul", "Pesca de bacalhau", "Turismo de neve"], answerIndex: 1, explain: "Tem barragens como Ruacaná/Matala e marca a fronteira com a Namíbia." },
    { question: "O principal produto de exportação de Angola continua a ser:", options: ["Café", "Petróleo", "Peixe", "Milho"], answerIndex: 1, explain: "O petróleo domina as exportações, seguido de diamantes e gás." },
    { question: "A diversificação económica em Angola procura reduzir a dependência:", options: ["Do turismo", "Do petróleo", "Da agricultura", "Da pesca"], answerIndex: 1, explain: "O objectivo é diminuir a dependência das receitas petrolíferas." },
    { question: "O êxodo rural provoca sobretudo:", options: ["Menos cidades", "Crescimento desordenado dos musseques", "Aumento da floresta", "Queda da população total"], answerIndex: 1, explain: "A migração campo-cidade adensa bairros periféricos sem infra-estruturas." },
    { question: "A savana de gramíneas e árvores dispersas domina:", options: ["O litoral do Namibe", "Grande parte do interior de Angola", "Apenas Cabinda", "As zonas urbanas"], answerIndex: 1, explain: "A savana é a formação vegetal mais extensa do país." },
    { question: "A floresta densa húmida de Angola encontra-se principalmente em:", options: ["Cabinda e Uíge", "Namibe", "Cunene", "Moxico sul"], answerIndex: 0, explain: "O norte, mais chuvoso, tem floresta tropical (Maiombe)." },
    { question: "O Parque Nacional da Kissama é importante para:", options: ["Extracção mineira", "Conservação da fauna", "Produção de petróleo", "Indústria têxtil"], answerIndex: 1, explain: "É uma área protegida onde se conservam elefantes e outras espécies." },
    { question: "Uma bacia hidrográfica é:", options: ["Um lago artificial", "A área drenada por um rio e afluentes", "Um poço", "Uma barragem"], answerIndex: 1, explain: "Inclui todo o território cujas águas correm para o mesmo rio." },
    { question: "A construção da barragem de Laúca teve como objectivo principal:", options: ["Produzir electricidade", "Criar praia", "Regar o deserto", "Extrair diamantes"], answerIndex: 0, explain: "Laúca, no rio Kwanza, é uma das maiores hidroeléctricas de África." },
    { question: "A desertificação no sul de Angola agrava-se com:", options: ["Reflorestação", "Secas prolongadas e sobrepastoreio", "Chuvas fortes", "Turismo"], answerIndex: 1, explain: "A seca no Cunene e Namibe, com pressão sobre o solo, expande as áreas áridas." },
    { question: "O corredor do Lobito é estratégico porque:", options: ["Liga minério do interior ao Atlântico", "Serve só passageiros", "Atravessa o deserto do Sara", "Liga Angola à Ásia"], answerIndex: 0, explain: "Escoa minérios da RDC e Zâmbia até ao porto do Lobito." },
  ]),
};

// ============================ HISTÓRIA ============================
const HIS: Pool = {
  Básico: n(1000, [
    { question: "Em que ano Angola alcançou a independência?", options: ["1961", "1974", "1975", "1980"], answerIndex: 2, explain: "A independência foi proclamada a 11 de Novembro de 1975." },
    { question: "Quem proclamou a independência de Angola?", options: ["Agostinho Neto", "Njinga Mbandi", "José Eduardo dos Santos", "Mandela"], answerIndex: 0, explain: "Foi Dr. António Agostinho Neto, primeiro Presidente de Angola." },
    { question: "O nome «Angola» deriva do título:", options: ["Manikongo", "Ngola", "Soba", "Oba"], answerIndex: 1, explain: "«Ngola» era o título dos reis do Ndongo." },
    { question: "A capital do antigo Reino do Kongo era:", options: ["Luanda", "M'banza Kongo", "Malanje", "Ambriz"], answerIndex: 1, explain: "M'banza Kongo é hoje Património Mundial da UNESCO." },
    { question: "A rainha Njinga governou o Ndongo e:", options: ["A Matamba", "O Kongo", "A Lunda", "O Bailundo"], answerIndex: 0, explain: "Njinga Mbandi liderou o Ndongo e depois a Matamba." },
    { question: "Que data se celebra o Dia da Independência?", options: ["4 de Fevereiro", "11 de Novembro", "17 de Setembro", "1 de Maio"], answerIndex: 1, explain: "11 de Novembro de 1975." },
    { question: "Os primeiros europeus a chegar ao Kongo, em 1482, eram:", options: ["Ingleses", "Portugueses", "Franceses", "Holandeses"], answerIndex: 1, explain: "Diogo Cão chegou à foz do rio Zaire em 1482." },
    { question: "O 4 de Fevereiro de 1961 marca:", options: ["A independência", "O início da luta armada", "O fim da guerra civil", "A criação do Kwanza"], answerIndex: 1, explain: "Foi o início da luta armada de libertação nacional." },
    { question: "A História estuda:", options: ["Os astros", "Os factos do passado humano", "As rochas", "As plantas"], answerIndex: 1, explain: "A História estuda as acções humanas no tempo." },
    { question: "Um documento antigo usado pelo historiador chama-se:", options: ["Fonte histórica", "Notícia", "Romance", "Mapa mental"], answerIndex: 0, explain: "Fontes históricas podem ser escritas, orais ou materiais." },
    { question: "A tradição oral em Angola é transmitida sobretudo por:", options: ["Jornais", "Mais-velhos e griots", "Internet", "Rádio apenas"], answerIndex: 1, explain: "Os mais-velhos guardam e passam a memória das comunidades." },
    { question: "Hoje, Angola é uma:", options: ["Monarquia", "República", "Colónia", "Império"], answerIndex: 1, explain: "Angola é uma República com Presidente eleito." },
  ]),
  Intermédio: n(1100, [
    { question: "O tráfico transatlântico de escravizados afectou Angola sobretudo entre os séculos:", options: ["X e XII", "XVI e XIX", "XIX e XX", "XX e XXI"], answerIndex: 1, explain: "Durante cerca de três séculos milhões de pessoas foram levadas à força." },
    { question: "Luanda foi fundada em 1576 por:", options: ["Diogo Cão", "Paulo Dias de Novais", "Vasco da Gama", "Njinga"], answerIndex: 1, explain: "Paulo Dias de Novais fundou São Paulo da Assunção de Loanda." },
    { question: "A Conferência de Berlim (1884-85) serviu para:", options: ["Libertar África", "Partilhar África entre potências europeias", "Criar a ONU", "Acabar a escravatura"], answerIndex: 1, explain: "As potências europeias dividiram o continente entre si." },
    { question: "A revolta da Baixa de Cassanje (1961) foi contra:", options: ["A cultura forçada do algodão", "Os impostos sobre o café", "O trabalho nas minas", "A escola colonial"], answerIndex: 0, explain: "Camponeses revoltaram-se contra a imposição do cultivo do algodão." },
    { question: "O Movimento que proclamou a independência foi o:", options: ["MPLA", "PAIGC", "ANC", "FRELIMO"], answerIndex: 0, explain: "O MPLA proclamou a independência em Luanda a 11/11/1975." },
    { question: "A Revolução dos Cravos, em Portugal, ocorreu em:", options: ["25 de Abril de 1974", "11 de Novembro de 1975", "4 de Fevereiro de 1961", "1 de Janeiro de 1970"], answerIndex: 0, explain: "Abriu caminho à descolonização das colónias portuguesas." },
    { question: "Os Acordos de Alvor (1975) foram assinados entre Portugal e:", options: ["MPLA, FNLA e UNITA", "Apenas o MPLA", "A ONU", "A África do Sul"], answerIndex: 0, explain: "Definiram a transição para a independência com os três movimentos." },
    { question: "A guerra civil angolana terminou oficialmente em:", options: ["1991", "1994", "2002", "2008"], answerIndex: 2, explain: "O Memorando do Luena, em 2002, selou a paz." },
    { question: "O Reino da Lunda destacou-se pelo(a):", options: ["Comércio de longa distância e organização política", "Navegação atlântica", "Escrita alfabética", "Construção de pirâmides"], answerIndex: 0, explain: "A Lunda tinha um sistema político sofisticado e amplas redes comerciais." },
    { question: "Um «soba» era:", options: ["Um comerciante europeu", "Uma autoridade tradicional local", "Um soldado colonial", "Um missionário"], answerIndex: 1, explain: "Os sobas lideravam comunidades e mantêm hoje papel tradicional." },
    { question: "O «Estatuto do Indigenato» colonial servia para:", options: ["Dar direitos iguais", "Discriminar juridicamente os africanos", "Criar escolas", "Proteger a floresta"], answerIndex: 1, explain: "Separava «civilizados» de «indígenas», negando direitos à maioria." },
    { question: "A resistência do Bailundo em 1902 foi liderada por:", options: ["Mutu-ya-Kevela", "Njinga", "Ekuikui II", "Mandume"], answerIndex: 0, explain: "Mutu-ya-Kevela liderou a revolta do Bailundo contra os colonos." },
  ]),
  Avançado: n(1200, [
    { question: "Mandume ya Ndemufayo resistiu no sul de Angola contra:", options: ["Portugueses e sul-africanos", "Franceses", "Belgas", "Ingleses no Congo"], answerIndex: 0, explain: "Rei kwanyama, combateu até 1917 forças portuguesas e sul-africanas." },
    { question: "A batalha do Cuito Cuanavale (1987-88) teve como consequência histórica:", options: ["A independência de Angola", "Negociações que levaram à independência da Namíbia", "O fim do Reino do Kongo", "A criação da OUA"], answerIndex: 1, explain: "Alterou o equilíbrio regional e acelerou a retirada sul-africana e a independência namibiana." },
    { question: "A batalha de Mbwila (1665) resultou em:", options: ["Vitória do Kongo", "Derrota do Kongo e fragmentação do reino", "Fundação de Luanda", "Fim do tráfico"], answerIndex: 1, explain: "Após a derrota, o Reino do Kongo entrou em desagregação." },
    { question: "Kimpa Vita (Beatriz do Kongo) ficou conhecida por:", options: ["Liderar um movimento profético de reunificação do Kongo", "Fundar Benguela", "Assinar Alvor", "Criar o Kwanza"], answerIndex: 0, explain: "Pregou a restauração do Kongo e foi executada em 1706." },
    { question: "A ocupação efectiva do interior de Angola intensificou-se:", options: ["No século XVI", "Após a Conferência de Berlim", "Depois de 1975", "Na Idade Média"], answerIndex: 1, explain: "Berlim exigiu ocupação efectiva, gerando campanhas militares até ao séc. XX." },
    { question: "O «contrato» colonial correspondia, na prática, a:", options: ["Trabalho forçado", "Emprego bem pago", "Bolsa de estudo", "Serviço militar voluntário"], answerIndex: 0, explain: "Muitos angolanos eram recrutados à força para roças e obras." },
    { question: "A Geração de 50 destacou-se em Angola no campo:", options: ["Militar", "Literário e nacionalista", "Desportivo", "Religioso"], answerIndex: 1, explain: "Poetas como Agostinho Neto e Viriato da Cruz uniram literatura e luta." },
    { question: "A UNITA e a FNLA distinguiram-se do MPLA sobretudo por:", options: ["Bases sociais e apoios externos diferentes", "Não terem líderes", "Serem europeias", "Serem partidos actuais apenas"], answerIndex: 0, explain: "Cada movimento tinha implantação regional e alianças internacionais distintas." },
    { question: "A Constituição angolana em vigor foi aprovada em:", options: ["1975", "1992", "2010", "2017"], answerIndex: 2, explain: "A Constituição da República de Angola data de 2010." },
    { question: "A entrada de Angola na ONU ocorreu em:", options: ["1975", "1976", "1980", "1992"], answerIndex: 1, explain: "Angola tornou-se membro das Nações Unidas em 1976." },
    { question: "Uma consequência demográfica do tráfico de escravizados foi:", options: ["Crescimento populacional", "Despovoamento e desestruturação social", "Urbanização acelerada", "Aumento da esperança de vida"], answerIndex: 1, explain: "Regiões inteiras perderam população jovem e activa." },
    { question: "O processo de reconciliação pós-2002 assentou sobretudo em:", options: ["Amnistia e reintegração dos combatentes", "Expulsão de populações", "Novo colonialismo", "Fim das eleições"], answerIndex: 0, explain: "A paz foi consolidada com amnistia, desmobilização e reintegração." },
  ]),
};

// ============================ FÍSICA ============================
const FIS: Pool = {
  Básico: n(1000, [
    { question: "A unidade de medida da força no SI é o:", options: ["Joule", "Newton", "Watt", "Pascal"], answerIndex: 1, explain: "A força mede-se em newtons (N)." },
    { question: "A unidade de massa no SI é o:", options: ["Litro", "Quilograma", "Newton", "Metro"], answerIndex: 1, explain: "A massa mede-se em quilogramas (kg)." },
    { question: "A água ferve, ao nível do mar, a:", options: ["50 °C", "80 °C", "100 °C", "150 °C"], answerIndex: 2, explain: "À pressão normal a água ferve a 100 °C." },
    { question: "O instrumento usado para medir temperatura é o:", options: ["Termómetro", "Barómetro", "Dinamómetro", "Voltímetro"], answerIndex: 0, explain: "O termómetro mede a temperatura." },
    { question: "Os estados físicos da matéria mais comuns são:", options: ["Sólido, líquido e gasoso", "Duro, mole e leve", "Quente, frio e morno", "Grande, médio e pequeno"], answerIndex: 0, explain: "Sólido, líquido e gasoso (e ainda o plasma)." },
    { question: "A passagem de líquido a gás chama-se:", options: ["Fusão", "Vaporização", "Solidificação", "Condensação"], answerIndex: 1, explain: "Vaporização: a água do rio Kwanza evapora com o calor do sol." },
    { question: "A força que nos puxa para o centro da Terra é a:", options: ["Gravidade", "Fricção", "Magnética", "Eléctrica"], answerIndex: 0, explain: "A gravidade atrai os corpos para a Terra." },
    { question: "A luz viaja mais depressa que:", options: ["O som", "Nada", "A electricidade sempre", "O pensamento"], answerIndex: 0, explain: "Vemos o relâmpago antes de ouvir o trovão porque a luz é muito mais rápida." },
    { question: "Um corpo em repouso tem velocidade:", options: ["Máxima", "Zero", "Negativa", "Constante e alta"], answerIndex: 1, explain: "Em repouso, a velocidade é nula." },
    { question: "Que instrumento mede a massa?", options: ["Balança", "Régua", "Cronómetro", "Termómetro"], answerIndex: 0, explain: "A balança mede a massa dos corpos." },
    { question: "O som propaga-se melhor:", options: ["No vácuo", "Nos sólidos e líquidos", "Só no ar", "Na escuridão"], answerIndex: 1, explain: "O som precisa de meio material; propaga-se melhor em sólidos." },
    { question: "A energia que vem do Sol chama-se energia:", options: ["Eólica", "Solar", "Nuclear", "Química"], answerIndex: 1, explain: "É energia solar, muito abundante em Angola." },
  ]),
  Intermédio: n(1100, [
    { question: "Velocidade média calcula-se por:", options: ["distância × tempo", "distância ÷ tempo", "tempo ÷ distância", "massa × aceleração"], answerIndex: 1, explain: "v = d ÷ t." },
    { question: "Um carro percorre 180 km em 3 h. A velocidade média é:", options: ["45 km/h", "60 km/h", "80 km/h", "90 km/h"], answerIndex: 1, explain: "180 ÷ 3 = 60 km/h." },
    { question: "A 2.ª Lei de Newton exprime-se por:", options: ["F = m × a", "E = m c²", "P = m × g", "v = d/t"], answerIndex: 0, explain: "Força = massa × aceleração." },
    { question: "O peso de um corpo de 10 kg (g ≈ 10 m/s²) é:", options: ["1 N", "10 N", "100 N", "1000 N"], answerIndex: 2, explain: "P = m × g = 10 × 10 = 100 N." },
    { question: "A unidade de energia e trabalho é o:", options: ["Newton", "Joule", "Ampere", "Volt"], answerIndex: 1, explain: "Trabalho e energia medem-se em joules (J)." },
    { question: "Potência mede-se em:", options: ["Watt", "Joule", "Newton", "Ohm"], answerIndex: 0, explain: "Potência = trabalho ÷ tempo, medida em watts (W)." },
    { question: "A força que se opõe ao movimento entre superfícies é o:", options: ["Atrito", "Peso", "Empuxo", "Impulso"], answerIndex: 0, explain: "O atrito trava o movimento e produz calor." },
    { question: "Num circuito eléctrico simples são necessários:", options: ["Fonte, condutores e receptor", "Só pilhas", "Apenas lâmpadas", "Só interruptores"], answerIndex: 0, explain: "Precisa de gerador, fios condutores e um receptor (lâmpada)." },
    { question: "A corrente eléctrica mede-se em:", options: ["Volt", "Ampere", "Watt", "Ohm"], answerIndex: 1, explain: "A intensidade da corrente mede-se em amperes (A)." },
    { question: "A energia produzida na barragem de Cambambe é:", options: ["Térmica", "Hidroeléctrica", "Nuclear", "Eólica"], answerIndex: 1, explain: "Aproveita a queda de água do rio Kwanza — energia hidroeléctrica." },
    { question: "A densidade calcula-se por:", options: ["massa × volume", "massa ÷ volume", "volume ÷ massa", "peso × altura"], answerIndex: 1, explain: "d = m/V. Por isso o óleo flutua na água." },
    { question: "Ao aquecer um metal, geralmente ele:", options: ["Contrai", "Dilata", "Não muda", "Derrete sempre"], answerIndex: 1, explain: "O calor provoca dilatação térmica — por isso as pontes têm juntas." },
  ]),
  Avançado: n(1200, [
    { question: "A Lei de Ohm relaciona:", options: ["U = R × I", "F = m × a", "P = m × g", "E = mc²"], answerIndex: 0, explain: "Tensão = resistência × intensidade da corrente." },
    { question: "Numa resistência de 20 Ω percorrida por 2 A, a tensão é:", options: ["10 V", "22 V", "40 V", "80 V"], answerIndex: 2, explain: "U = R × I = 20 × 2 = 40 V." },
    { question: "A energia cinética de um corpo depende de:", options: ["Massa e velocidade", "Só da altura", "Só do tempo", "Da cor"], answerIndex: 0, explain: "Ec = ½mv²." },
    { question: "Energia potencial gravítica calcula-se por:", options: ["Ep = m g h", "Ep = ½mv²", "Ep = U I", "Ep = F d"], answerIndex: 0, explain: "Depende da massa, da gravidade e da altura." },
    { question: "Um gerador de 12 V fornece 60 W. A corrente é:", options: ["2 A", "5 A", "7 A", "72 A"], answerIndex: 1, explain: "P = U × I → I = 60 ÷ 12 = 5 A." },
    { question: "O princípio de conservação da energia diz que a energia:", options: ["Desaparece", "Transforma-se, não se cria nem se destrói", "Aumenta sozinha", "Só existe no Sol"], answerIndex: 1, explain: "A energia apenas muda de forma." },
    { question: "A 3.ª Lei de Newton afirma que:", options: ["A toda acção corresponde uma reacção igual e oposta", "Tudo cai", "A força é massa vezes aceleração", "Nada se move"], answerIndex: 0, explain: "Acção e reacção actuam em corpos diferentes com igual intensidade." },
    { question: "Num movimento uniformemente acelerado, a velocidade:", options: ["É constante", "Varia de forma constante no tempo", "É sempre zero", "Diminui sempre"], answerIndex: 1, explain: "A aceleração constante faz a velocidade variar uniformemente." },
    { question: "A pressão calcula-se por:", options: ["P = F / A", "P = F × A", "P = m g h", "P = U I"], answerIndex: 0, explain: "Pressão = força ÷ área; por isso facas afiadas cortam melhor." },
    { question: "Os painéis solares convertem energia solar em:", options: ["Energia eléctrica", "Energia nuclear", "Som", "Massa"], answerIndex: 0, explain: "O efeito fotovoltaico transforma luz em electricidade." },
    { question: "Num transformador eleva-se a tensão para:", options: ["Reduzir perdas no transporte de energia", "Aquecer os cabos", "Gastar mais", "Aumentar o atrito"], answerIndex: 0, explain: "Alta tensão reduz a corrente e as perdas por efeito Joule." },
    { question: "A refracção da luz explica porquê:", options: ["Uma colher parece partida dentro de água", "O eco existe", "O ímane atrai ferro", "Um corpo cai"], answerIndex: 0, explain: "A luz muda de direcção ao passar de um meio para outro." },
  ]),
};

// ============================ QUÍMICA ============================
const QUI: Pool = {
  Básico: n(1000, [
    { question: "A fórmula química da água é:", options: ["CO₂", "H₂O", "O₂", "NaCl"], answerIndex: 1, explain: "Dois átomos de hidrogénio e um de oxigénio." },
    { question: "O símbolo químico do oxigénio é:", options: ["Ox", "O", "Og", "Om"], answerIndex: 1, explain: "O oxigénio representa-se pela letra O." },
    { question: "O sal de cozinha é quimicamente:", options: ["NaCl", "H₂O", "CO₂", "CaCO₃"], answerIndex: 0, explain: "Cloreto de sódio, NaCl — produzido em salinas no Namibe." },
    { question: "As partículas com carga negativa do átomo são os:", options: ["Protões", "Neutrões", "Electrões", "Iões"], answerIndex: 2, explain: "Os electrões giram à volta do núcleo e têm carga negativa." },
    { question: "O núcleo do átomo contém:", options: ["Protões e neutrões", "Só electrões", "Só neutrões", "Nada"], answerIndex: 0, explain: "Protões (positivos) e neutrões (neutros) formam o núcleo." },
    { question: "O gás que respiramos para viver é o:", options: ["Azoto", "Oxigénio", "Dióxido de carbono", "Hélio"], answerIndex: 1, explain: "O oxigénio (O₂) é essencial à respiração." },
    { question: "Uma mistura de areia e água é:", options: ["Homogénea", "Heterogénea", "Um elemento", "Um composto"], answerIndex: 1, explain: "Distinguem-se as fases a olho nu → heterogénea." },
    { question: "Separar sal da água do mar faz-se por:", options: ["Filtração", "Evaporação", "Decantação", "Peneiração"], answerIndex: 1, explain: "Nas salinas a água evapora e o sal fica." },
    { question: "O símbolo do carbono é:", options: ["Ca", "C", "Co", "Cr"], answerIndex: 1, explain: "Carbono = C; o diamante é carbono puro cristalizado." },
    { question: "Uma substância com pH 3 é:", options: ["Ácida", "Neutra", "Básica", "Salgada"], answerIndex: 0, explain: "pH abaixo de 7 é ácido, como o limão." },
    { question: "O que acontece ao gelo quando aquece?", options: ["Sublima logo", "Funde e torna-se água líquida", "Vira gás directamente sempre", "Fica mais duro"], answerIndex: 1, explain: "A fusão transforma o sólido em líquido." },
    { question: "A matéria é tudo o que:", options: ["Tem massa e ocupa espaço", "Brilha", "Se vê apenas", "É sólido"], answerIndex: 0, explain: "Definição básica de matéria." },
  ]),
  Intermédio: n(1100, [
    { question: "Na tabela periódica, as colunas verticais chamam-se:", options: ["Períodos", "Grupos/famílias", "Séries", "Blocos únicos"], answerIndex: 1, explain: "As colunas são grupos; as linhas são períodos." },
    { question: "O número atómico corresponde ao número de:", options: ["Neutrões", "Protões", "Electrões de valência", "Moléculas"], answerIndex: 1, explain: "Z = número de protões no núcleo." },
    { question: "A ligação entre metal e não-metal com transferência de electrões é:", options: ["Covalente", "Iónica", "Metálica", "Ponte de hidrogénio"], answerIndex: 1, explain: "Como no NaCl: o sódio cede um electrão ao cloro." },
    { question: "A ligação covalente caracteriza-se por:", options: ["Partilha de electrões", "Transferência total", "Atracção magnética", "Fusão nuclear"], answerIndex: 0, explain: "Os átomos partilham pares de electrões, como em H₂O." },
    { question: "Numa reacção química, a massa total:", options: ["Aumenta", "Conserva-se", "Diminui", "Desaparece"], answerIndex: 1, explain: "Lei de Lavoisier: nada se perde, tudo se transforma." },
    { question: "Equilibra: H₂ + O₂ → H₂O. O coeficiente correcto do H₂O é:", options: ["1", "2", "3", "4"], answerIndex: 1, explain: "2H₂ + O₂ → 2H₂O." },
    { question: "O CO₂ é libertado principalmente:", options: ["Na respiração e queima de combustíveis", "Na fotossíntese", "Na fusão do gelo", "Na evaporação"], answerIndex: 0, explain: "Respiração e combustão libertam dióxido de carbono." },
    { question: "Um indicador comum de ácidos e bases é a:", options: ["Tintura de iodo", "Fenolftaleína/tornesol", "Água salgada", "Areia"], answerIndex: 1, explain: "Mudam de cor conforme o pH." },
    { question: "A reacção entre um ácido e uma base chama-se:", options: ["Combustão", "Neutralização", "Oxidação", "Sublimação"], answerIndex: 1, explain: "Produz sal e água." },
    { question: "A ferrugem no ferro é um exemplo de:", options: ["Oxidação", "Fusão", "Destilação", "Filtração"], answerIndex: 0, explain: "O ferro reage com oxigénio e humidade — muito comum no litoral." },
    { question: "O petróleo é uma mistura separada por:", options: ["Destilação fraccionada", "Peneiração", "Decantação simples", "Congelação"], answerIndex: 0, explain: "Nas refinarias, as fracções separam-se por ponto de ebulição." },
    { question: "Um átomo neutro tem:", options: ["Mais protões que electrões", "Igual número de protões e electrões", "Só neutrões", "Carga negativa"], answerIndex: 1, explain: "As cargas positivas e negativas equilibram-se." },
  ]),
  Avançado: n(1200, [
    { question: "A massa molar da água (H=1, O=16) é:", options: ["16 g/mol", "18 g/mol", "20 g/mol", "34 g/mol"], answerIndex: 1, explain: "2(1) + 16 = 18 g/mol." },
    { question: "Um mol contém aproximadamente:", options: ["6,02 × 10²³ partículas", "1 000 partículas", "10⁶ partículas", "100 partículas"], answerIndex: 0, explain: "É a constante de Avogadro." },
    { question: "Numa solução, o soluto é:", options: ["A substância dissolvida", "O líquido que dissolve", "O recipiente", "O gás libertado"], answerIndex: 0, explain: "O solvente dissolve; o soluto é dissolvido." },
    { question: "A concentração em massa calcula-se por:", options: ["massa do soluto ÷ volume da solução", "volume ÷ massa", "massa × volume", "massa do solvente ÷ massa total"], answerIndex: 0, explain: "C = m/V, em g/L." },
    { question: "O pH de uma solução neutra a 25 °C é:", options: ["0", "5", "7", "14"], answerIndex: 2, explain: "pH 7 corresponde à neutralidade." },
    { question: "Isótopos são átomos do mesmo elemento com diferente número de:", options: ["Protões", "Electrões", "Neutrões", "Iões"], answerIndex: 2, explain: "Mesmo Z, diferentes massas, como o carbono-12 e carbono-14." },
    { question: "Na reacção de combustão completa de um hidrocarboneto obtém-se:", options: ["CO₂ e H₂O", "Só carvão", "H₂ e O₂", "NaCl"], answerIndex: 0, explain: "Combustível + O₂ → CO₂ + H₂O + energia." },
    { question: "Os hidrocarbonetos são compostos formados por:", options: ["Carbono e hidrogénio", "Carbono e oxigénio", "Hidrogénio e azoto", "Ferro e enxofre"], answerIndex: 0, explain: "Base do petróleo e do gás natural angolanos." },
    { question: "Uma reacção que liberta calor diz-se:", options: ["Endotérmica", "Exotérmica", "Isotérmica", "Neutra"], answerIndex: 1, explain: "Exo = para fora: liberta energia, como a combustão." },
    { question: "O catalisador numa reacção serve para:", options: ["Acelerar sem se consumir", "Ser consumido totalmente", "Parar a reacção", "Mudar a cor"], answerIndex: 0, explain: "Reduz a energia de activação e não é gasto." },
    { question: "A electrólise da água produz:", options: ["Hidrogénio e oxigénio", "Sal e açúcar", "Ferro", "Metano"], answerIndex: 0, explain: "A corrente eléctrica decompõe a água em H₂ e O₂." },
    { question: "A chuva ácida forma-se sobretudo devido a:", options: ["Óxidos de enxofre e azoto na atmosfera", "Excesso de oxigénio", "Vapor de água puro", "Poeira do deserto"], answerIndex: 0, explain: "SO₂ e NOx reagem com a água da chuva formando ácidos." },
  ]),
};

// ============================ BIOLOGIA ============================
const BIO: Pool = {
  Básico: n(1000, [
    { question: "A unidade básica da vida é:", options: ["O átomo", "A célula", "O tecido", "O órgão"], answerIndex: 1, explain: "Todos os seres vivos são formados por células." },
    { question: "As plantas produzem o seu alimento através da:", options: ["Respiração", "Fotossíntese", "Digestão", "Transpiração"], answerIndex: 1, explain: "Usam luz solar, água e CO₂ para produzir glicose." },
    { question: "O órgão que bombeia o sangue é:", options: ["O pulmão", "O coração", "O fígado", "O rim"], answerIndex: 1, explain: "O coração bombeia o sangue por todo o corpo." },
    { question: "Respiramos oxigénio através dos:", options: ["Rins", "Pulmões", "Intestinos", "Ossos"], answerIndex: 1, explain: "Os pulmões fazem as trocas gasosas." },
    { question: "A palanca-negra-gigante é o símbolo natural de:", options: ["Angola", "Namíbia", "Zâmbia", "Congo"], answerIndex: 0, explain: "É uma espécie endémica de Angola, símbolo nacional." },
    { question: "Os seres que se alimentam apenas de plantas chamam-se:", options: ["Carnívoros", "Herbívoros", "Omnívoros", "Decompositores"], answerIndex: 1, explain: "Como a vaca ou a palanca." },
    { question: "A parte da planta que absorve água do solo é:", options: ["A folha", "A raiz", "A flor", "O fruto"], answerIndex: 1, explain: "As raízes absorvem água e sais minerais." },
    { question: "Um exemplo de mamífero é:", options: ["Crocodilo", "Elefante", "Tilápia", "Águia"], answerIndex: 1, explain: "Mamíferos amamentam as crias, como o elefante da Kissama." },
    { question: "O esqueleto humano serve para:", options: ["Sustentar e proteger o corpo", "Digerir", "Respirar", "Pensar"], answerIndex: 0, explain: "Sustenta o corpo e protege órgãos como o cérebro." },
    { question: "Para prevenir a malária deve-se:", options: ["Dormir sob rede mosquiteira", "Beber água salgada", "Andar descalço", "Guardar água parada"], answerIndex: 0, explain: "A rede impede a picada do mosquito Anopheles." },
    { question: "As bactérias pertencem ao reino:", options: ["Animal", "Monera", "Plantae", "Fungi"], answerIndex: 1, explain: "São seres unicelulares procariontes." },
    { question: "Uma dieta equilibrada deve incluir:", options: ["Só funge", "Variedade de alimentos e legumes", "Apenas refrigerantes", "Só carne"], answerIndex: 1, explain: "Precisamos de hidratos, proteínas, vitaminas e minerais." },
  ]),
  Intermédio: n(1100, [
    { question: "A estrutura que controla a célula é:", options: ["A membrana", "O núcleo", "O citoplasma", "O vacúolo"], answerIndex: 1, explain: "O núcleo guarda o material genético e comanda a célula." },
    { question: "A célula vegetal distingue-se da animal por ter:", options: ["Parede celular e cloroplastos", "Só núcleo", "Mitocôndrias", "Membrana"], answerIndex: 0, explain: "Parede de celulose e cloroplastos para a fotossíntese." },
    { question: "A energia da célula é produzida sobretudo na(o):", options: ["Mitocôndria", "Ribossoma", "Vacúolo", "Núcleo"], answerIndex: 0, explain: "As mitocôndrias fazem a respiração celular." },
    { question: "Numa cadeia alimentar, as plantas são:", options: ["Consumidores", "Produtores", "Decompositores", "Predadores"], answerIndex: 1, explain: "Produzem matéria orgânica a partir da luz solar." },
    { question: "Os fungos e bactérias que reciclam matéria morta são:", options: ["Produtores", "Decompositores", "Herbívoros", "Carnívoros"], answerIndex: 1, explain: "Devolvem nutrientes ao solo." },
    { question: "A digestão começa:", options: ["No estômago", "Na boca", "No intestino", "No fígado"], answerIndex: 1, explain: "A mastigação e a saliva iniciam a digestão." },
    { question: "A anemia falciforme é uma doença:", options: ["Infecciosa", "Genética do sangue", "Causada por mosquito", "Da pele"], answerIndex: 1, explain: "É hereditária e afecta a forma dos glóbulos vermelhos." },
    { question: "A vacinação serve para:", options: ["Criar imunidade contra doenças", "Curar fracturas", "Substituir alimentos", "Baixar a febre apenas"], answerIndex: 0, explain: "Estimula o sistema imunitário a produzir defesas." },
    { question: "O ecossistema do Maiombe, em Cabinda, é uma:", options: ["Floresta tropical húmida", "Savana seca", "Deserto", "Tundra"], answerIndex: 0, explain: "É a segunda maior floresta tropical de África." },
    { question: "A welwitschia mirabilis é uma planta típica do:", options: ["Deserto do Namibe", "Planalto Central", "Maiombe", "Rio Kwanza"], answerIndex: 0, explain: "Planta milenar adaptada ao deserto do Namibe." },
    { question: "Os anfíbios caracterizam-se por:", options: ["Viver em água e terra", "Ter penas", "Ter pelo", "Viver só no mar"], answerIndex: 0, explain: "Rãs e sapos vivem nas duas fases." },
    { question: "A água potável é essencial porque previne doenças como:", options: ["Cólera e diarreias", "Fracturas", "Miopia", "Alergias ao pólen"], answerIndex: 0, explain: "Água tratada evita doenças de transmissão hídrica." },
  ]),
  Avançado: n(1200, [
    { question: "A molécula que guarda a informação genética é o:", options: ["ADN", "ATP", "Amido", "Colagénio"], answerIndex: 0, explain: "O ADN contém os genes." },
    { question: "A divisão celular que origina gâmetas é a:", options: ["Mitose", "Meiose", "Fissão binária", "Gemulação"], answerIndex: 1, explain: "A meiose reduz o número de cromossomas para metade." },
    { question: "O ser humano tem quantos pares de cromossomas?", options: ["21", "22", "23", "24"], answerIndex: 2, explain: "23 pares, ou seja 46 cromossomas." },
    { question: "Segundo Mendel, um carácter recessivo manifesta-se quando:", options: ["Há dois alelos recessivos", "Há um alelo dominante", "Não há genes", "Só em machos"], answerIndex: 0, explain: "Precisa de estar em homozigotia (aa)." },
    { question: "A fotossíntese ocorre principalmente:", options: ["Nos cloroplastos", "Nas mitocôndrias", "No núcleo", "Na raiz"], answerIndex: 0, explain: "A clorofila dos cloroplastos capta a luz." },
    { question: "A equação simplificada da fotossíntese é:", options: ["CO₂ + H₂O + luz → glicose + O₂", "O₂ + glicose → CO₂", "H₂O → H₂ + O₂", "N₂ + H₂ → NH₃"], answerIndex: 0, explain: "As plantas fixam carbono e libertam oxigénio." },
    { question: "A malária é transmitida pelo mosquito:", options: ["Aedes aegypti", "Anopheles fêmea", "Culex macho", "Tsé-tsé"], answerIndex: 1, explain: "A fêmea do Anopheles transmite o Plasmodium." },
    { question: "Homeostasia é:", options: ["A manutenção do equilíbrio interno do organismo", "A perda de água", "A divisão celular", "A extinção de espécies"], answerIndex: 0, explain: "Regula temperatura, pH e glicemia, por exemplo." },
    { question: "A biodiversidade de Angola está ameaçada sobretudo por:", options: ["Caça furtiva e desflorestação", "Excesso de chuva", "Frio intenso", "Falta de sol"], answerIndex: 0, explain: "A pressão humana sobre habitats reduz espécies como a palanca-negra." },
    { question: "A seiva bruta circula na planta através do:", options: ["Xilema", "Floema", "Estoma", "Cloroplasto"], answerIndex: 0, explain: "O xilema conduz água e sais da raiz às folhas." },
    { question: "Os antibióticos actuam contra:", options: ["Bactérias", "Vírus", "Fungos apenas", "Todas as doenças"], answerIndex: 0, explain: "Não fazem efeito contra vírus — usá-los mal cria resistências." },
    { question: "A selecção natural, proposta por Darwin, explica:", options: ["A evolução das espécies", "A fotossíntese", "A digestão", "A mitose"], answerIndex: 0, explain: "Os indivíduos mais adaptados sobrevivem e transmitem os seus genes." },
  ]),
};

export const SUBJECT_POOLS: Record<string, Pool> = {
  mat: MAT,
  por: POR,
  geo: GEO,
  his: HIS,
  fis: FIS,
  qui: QUI,
  bio: BIO,
};

/** Nº mínimo de perguntas garantido em cada nível de cada tópico. */
export const MIN_PERGUNTAS_POR_NIVEL = 12;

export function poolFor(subjectId: string, difficulty: Difficulty): QuizQuestion[] {
  return SUBJECT_POOLS[subjectId]?.[difficulty] ?? [];
}
