import { jsPDF } from "jspdf";
import { TAXA_DISTRIBUICAO, TAXA_RETENCAO_SOFTWARE } from "./almara-premios";

export type EmpresaRelatorio = {
  nome: string;
  disciplina: string;
  valor: number;
  ativo: boolean;
  pergunta: string | null;
};

export type DadosRelatorio = {
  totalAlunos: number;
  mediaLicoes: number;
  totalLicoes: number;
  totalXp: number;
  porClasse: { classe: string; alunos: number; mediaLicoes: number }[];
  faturamentoMarcas: number;
  retencaoSoftware: number;
  fundoDisponivel: number;
  totalArrecadado: number;
  lojasActivas: number;
  totalStock: number;
  stockPorItem: { item: string; quantidade: number }[];
  marcasActivas: string[];
  /** Detalhe por empresa patrocinadora — gera uma página explicativa por marca. */
  empresas?: EmpresaRelatorio[];
  /** Rede física de levantamento (rede + filial). */
  filiais?: { rede: string; local: string; ativo: boolean }[];
};

const kz = (n: number) =>
  `${new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 0 }).format(Math.round(n))} Kz`;

const LARANJA: [number, number, number] = [234, 88, 12];
const ESCURO: [number, number, number] = [15, 23, 42];
const CINZA: [number, number, number] = [100, 116, 139];
const VERDE: [number, number, number] = [5, 150, 105];

const M = 48;

/** Gera e descarrega o Relatório de Impacto Social da Almara (mínimo 3 páginas). */
export function gerarRelatorioImpacto(d: DadosRelatorio): void {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();

  const banda = (titulo: string, subtitulo: string) => {
    doc.setFillColor(...ESCURO);
    doc.rect(0, 0, W, 96, "F");
    doc.setFillColor(...LARANJA);
    doc.rect(0, 90, W, 6, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(titulo, M, 46);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(subtitulo, M, 68, { maxWidth: W - M * 2 });
  };

  const titulo = (y: number, texto: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...ESCURO);
    doc.text(texto, M, y);
    return y + 18;
  };

  const paragrafo = (y: number, texto: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...CINZA);
    const linhas = doc.splitTextToSize(texto, W - M * 2) as string[];
    doc.text(linhas, M, y);
    return y + linhas.length * 13 + 8;
  };

  const linhaValor = (y: number, rotulo: string, valor: string, i: number) => {
    if (i % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(M, y - 12, W - M * 2, 22, "F");
    }
    doc.setTextColor(...ESCURO);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(rotulo, M + 8, y + 3);
    doc.setFont("helvetica", "bold");
    doc.text(valor, W - M - 8, y + 3, { align: "right" });
    return y + 22;
  };

  const barra = (
    y: number,
    rotulo: string,
    valor: number,
    max: number,
    legenda: string,
    cor: [number, number, number],
  ) => {
    const largura = W - M * 2 - 210;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...ESCURO);
    doc.text(rotulo, M, y + 10, { maxWidth: 100 });
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(M + 110, y, largura, 14, 3, 3, "F");
    doc.setFillColor(...cor);
    doc.roundedRect(M + 110, y, Math.max(2, (valor / max) * largura), 14, 3, 3, "F");
    doc.setTextColor(...CINZA);
    doc.setFontSize(9);
    doc.text(legenda, M + 120 + largura, y + 10);
    return y + 24;
  };

  // ===================== PÁGINA 1 — RESUMO EXECUTIVO =====================
  banda(
    "ALMARA · Relatorio de Impacto Social",
    `Emitido em ${new Date().toLocaleDateString("pt-PT")} · Educacao gratuita e material escolar em Angola`,
  );

  let y = 132;
  y = titulo(y, "1. Resumo executivo");
  y = paragrafo(
    y,
    "A Almara e uma plataforma angolana de estudo gratuito onde cada licao concluida aproxima o estudante " +
      "de material escolar real, levantado numa filial de supermercado parceira. As empresas patrocinadoras " +
      "financiam esse material e, em troca, entram no percurso educativo do aluno com perguntas tematicas " +
      "aprovadas pela Almara. Este relatorio apresenta os resultados acumulados da plataforma, a " +
      "transparencia financeira do fundo escolar e uma analise dedicada a cada empresa patrocinadora.",
  );

  const kpis: [string, string][] = [
    ["Estudantes activos", String(d.totalAlunos)],
    ["Licoes concluidas", String(d.totalLicoes)],
    ["Media de licoes / aluno", d.mediaLicoes.toFixed(1)],
    ["Pontos (XP) acumulados", String(d.totalXp)],
    ["Supermercados parceiros", String(d.lojasActivas)],
    ["Itens em stock", String(d.totalStock)],
  ];
  const cardW = (W - M * 2 - 20) / 3;
  kpis.forEach((kpi, i) => {
    const x = M + (i % 3) * (cardW + 10);
    const cy = y + Math.floor(i / 3) * 62;
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(x, cy, cardW, 52, 6, 6, "F");
    doc.setFontSize(8);
    doc.setTextColor(...CINZA);
    doc.setFont("helvetica", "normal");
    doc.text(kpi[0].toUpperCase(), x + 10, cy + 18, { maxWidth: cardW - 16 });
    doc.setFontSize(16);
    doc.setTextColor(...ESCURO);
    doc.setFont("helvetica", "bold");
    doc.text(kpi[1], x + 10, cy + 40);
  });
  y += 62 * Math.ceil(kpis.length / 3) + 14;

  y = titulo(y, "2. Transparencia financeira");
  y = paragrafo(
    y,
    `Modelo Almara: ${Math.round(TAXA_DISTRIBUICAO * 100)}% de cada patrocinio e convertido em material escolar ` +
      `entregue aos estudantes; ${Math.round(TAXA_RETENCAO_SOFTWARE * 100)}% cobrem servidores, conteudos pedagogicos, ` +
      "auditoria antifraude dos codigos QR e manutencao da plataforma.",
  );
  const linhas: [string, string][] = [
    ["Total arrecadado", kz(d.totalArrecadado)],
    [`Retencao do software (${Math.round(TAXA_RETENCAO_SOFTWARE * 100)}%)`, kz(d.retencaoSoftware)],
    [`Fundo escolar disponivel (${Math.round(TAXA_DISTRIBUICAO * 100)}%)`, kz(d.fundoDisponivel)],
    ["Faturamento de campanhas activas", kz(d.faturamentoMarcas)],
  ];
  linhas.forEach((l, i) => {
    y = linhaValor(y, l[0], l[1], i);
  });

  // ===================== PÁGINA 2 — ALUNOS, STOCK E REDE =====================
  doc.addPage();
  banda("Alcance pedagogico e rede fisica", "Como o investimento das marcas chega as escolas e as familias");
  y = 132;

  y = titulo(y, "3. Estudantes por classe");
  y = paragrafo(
    y,
    "Distribuicao dos estudantes activos da 6a a 10a classe e intensidade de estudo em cada nivel. " +
      "Classes com maior media de licoes indicam onde as campanhas patrocinadas tem maior exposicao.",
  );
  const classes =
    d.porClasse.length > 0 ? d.porClasse : [{ classe: "Sem dados", alunos: 0, mediaLicoes: 0 }];
  const maxAlunos = Math.max(1, ...classes.map((c) => c.alunos));
  for (const c of classes) {
    y = barra(
      y,
      `${c.classe} classe`,
      c.alunos,
      maxAlunos,
      `${c.alunos} alunos | ${c.mediaLicoes.toFixed(1)} licoes/aluno`,
      LARANJA,
    );
  }
  y += 10;

  y = titulo(y, "4. Material escolar em stock");
  const itens =
    d.stockPorItem.length > 0 ? d.stockPorItem : [{ item: "Sem stock", quantidade: 0 }];
  const maxStock = Math.max(1, ...itens.map((s) => s.quantidade));
  for (const s of itens) {
    if (y > 700) {
      doc.addPage();
      y = 70;
    }
    y = barra(y, s.item.replace(/_/g, " "), s.quantidade, maxStock, `${s.quantidade} un.`, VERDE);
  }
  y += 10;

  if (y > 640) {
    doc.addPage();
    y = 70;
  }
  y = titulo(y, "5. Rede de levantamento");
  y = paragrafo(
    y,
    "Cada vale gerado pelo estudante indica a rede e a filial exacta onde o material e levantado " +
      "(por exemplo Kero Kilamba, Kero Viana ou Candando Cacuaco). O codigo QR e unico, assinado e " +
      "so pode ser usado uma vez, no balcao da filial escolhida.",
  );
  const filiais = d.filiais ?? [];
  if (filiais.length === 0) {
    y = paragrafo(y, "Sem filiais registadas no momento da emissao deste relatorio.");
  } else {
    filiais.slice(0, 24).forEach((f, i) => {
      if (y > 760) {
        doc.addPage();
        y = 70;
      }
      y = linhaValor(y, `${f.rede} — ${f.local}`, f.ativo ? "Activa" : "Suspensa", i);
    });
  }

  // ===================== PÁGINAS 3+ — UMA POR EMPRESA =====================
  const empresas =
    d.empresas && d.empresas.length > 0
      ? d.empresas
      : d.marcasActivas.map((nome) => ({
          nome,
          disciplina: "—",
          valor: 0,
          ativo: true,
          pergunta: null,
        }));

  const totalPatrocinio = Math.max(
    1,
    empresas.reduce((a, e) => a + e.valor, 0),
  );

  if (empresas.length === 0) {
    doc.addPage();
    banda("Empresas patrocinadoras", "Nenhuma campanha registada");
    paragrafo(
      132,
      "Ainda nao existem empresas patrocinadoras registadas. Assim que a primeira campanha for activada, " +
        "este relatorio passa a incluir uma pagina dedicada a cada marca, com investimento, alcance " +
        "estimado, material financiado e retorno reputacional.",
    );
  }

  empresas.forEach((e, idx) => {
    doc.addPage();
    banda(
      `Patrocinador ${idx + 1}: ${e.nome}`,
      `Analise dedicada de impacto social e retorno de marca · ${e.ativo ? "Campanha activa" : "Campanha suspensa"}`,
    );
    let ey = 132;

    const quota = e.valor / totalPatrocinio;
    const parteMaterial = e.valor * TAXA_DISTRIBUICAO;
    const parteSoftware = e.valor * TAXA_RETENCAO_SOFTWARE;
    const kitsEstimados = Math.floor(parteMaterial / 1000);
    const alunosAlcancados = Math.round(d.totalAlunos * quota);
    const licoesAlcancadas = Math.round(d.totalLicoes * quota);

    ey = titulo(ey, "A. Quem e esta empresa dentro da Almara");
    ey = paragrafo(
      ey,
      `${e.nome} patrocina a disciplina de ${e.disciplina} na plataforma Almara. Isto significa que, sempre que ` +
        "um estudante estuda essa disciplina, a marca aparece de forma educativa e nao intrusiva: em vez de um " +
        "banner publicitario, a empresa entra com uma pergunta tematica revista pela equipa pedagogica da Almara. " +
        "O aluno aprende, responde e associa a marca a um momento positivo do seu percurso escolar.",
    );

    ey = titulo(ey, "B. Investimento e destino do dinheiro");
    const detalhe: [string, string][] = [
      ["Valor total investido", kz(e.valor)],
      [
        `Convertido em material escolar (${Math.round(TAXA_DISTRIBUICAO * 100)}%)`,
        kz(parteMaterial),
      ],
      [
        `Operacao e manutencao da plataforma (${Math.round(TAXA_RETENCAO_SOFTWARE * 100)}%)`,
        kz(parteSoftware),
      ],
      ["Peso no fundo escolar total", `${Math.round(quota * 100)}%`],
      ["Kits escolares estimados financiados", `${kitsEstimados} kits`],
    ];
    detalhe.forEach((l, i) => {
      ey = linhaValor(ey, l[0], l[1], i);
    });
    ey += 12;

    ey = titulo(ey, "C. Alcance estimado junto dos estudantes");
    ey = paragrafo(
      ey,
      `Com base na quota deste patrocinio no fundo escolar (${Math.round(quota * 100)}%), estimamos um alcance de ` +
        `cerca de ${alunosAlcancados} estudantes activos e ${licoesAlcancadas} licoes concluidas atribuiveis a este ` +
        `investimento. O material financiado e levantado nas ${d.lojasActivas} filiais parceiras, com codigo QR ` +
        "unico por aluno, o que permite auditar cada entrega.",
    );

    ey = titulo(ey, "D. Conteudo patrocinado em circulacao");
    ey = paragrafo(
      ey,
      e.pergunta
        ? `Pergunta em circulacao: "${e.pergunta}" Esta pergunta e apresentada dentro da disciplina de ${e.disciplina}, ` +
            "com explicacao pedagogica no fim, garantindo que a presenca da marca acrescenta valor ao estudo."
        : "Esta campanha usa a pergunta tematica padrao da Almara sobre cuidado com o material escolar, " +
            "com o nome da marca integrado no enunciado e na explicacao final.",
    );

    ey = titulo(ey, "E. Retorno social e reputacional");
    ey = paragrafo(
      ey,
      `${e.nome} passa a estar associada a tres resultados verificaveis: (1) reducao do custo de material escolar ` +
        "para familias angolanas de baixo rendimento; (2) aumento do tempo de estudo dos alunos, medido em licoes " +
        "concluidas e pontos acumulados; (3) trafego qualificado as filiais parceiras, ja que o levantamento do " +
        "premio leva o encarregado de educacao ao supermercado. Todos estes numeros sao auditaveis no painel " +
        "administrativo da Almara e podem ser reemitidos em qualquer momento neste formato.",
    );

    if (ey < 700) {
      doc.setFillColor(255, 247, 237);
      doc.roundedRect(M, ey, W - M * 2, 54, 8, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...LARANJA);
      doc.text(`Compromisso Almara com ${e.nome}`, M + 14, ey + 22);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...ESCURO);
      doc.text(
        "Cada kwanza patrocinado tem destino rastreavel: stock, filial, aluno e data de levantamento.",
        M + 14,
        ey + 40,
        { maxWidth: W - M * 2 - 28 },
      );
    }
  });

  // ===================== PÁGINA FINAL — METODOLOGIA =====================
  doc.addPage();
  banda("Metodologia e notas tecnicas", "Como estes numeros sao recolhidos e validados");
  let my = 132;
  my = paragrafo(
    my,
    "1. Estudantes activos: aparelhos com perfil criado e pelo menos uma sincronizacao de progresso. " +
      "Os dados sao anonimos por aparelho; a Almara nao recolhe morada, telefone nem documentos do aluno.",
  );
  my = paragrafo(
    my,
    "2. Licoes e pontos (XP): contabilizados apenas quando o aluno termina a licao completa. O ranking " +
      "diario de pontos reinicia todos os dias as 00:00.",
  );
  my = paragrafo(
    my,
    "3. Premios: so podem ser resgatados apos uma prova final cronometrada (20 segundos por pergunta) " +
      "com mais de 80% de acerto, com bloqueio de 4 horas em caso de falha. Isto impede resgates em massa " +
      "e garante que o material vai para quem estudou.",
  );
  my = paragrafo(
    my,
    `4. Distribuicao financeira: ${Math.round(TAXA_DISTRIBUICAO * 100)}% de cada patrocinio vai para material ` +
      `escolar e ${Math.round(TAXA_RETENCAO_SOFTWARE * 100)}% para operacao. O saldo por filial e actualizado ` +
      "a cada levantamento validado no balcao.",
  );
  paragrafo(
    my,
    "5. Estimativas por empresa: o alcance individual e calculado pela quota do patrocinio no fundo escolar " +
      "total do periodo. Sao estimativas de atribuicao, nao contagens directas por marca.",
  );

  // ---------- Rodapé ----------
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p += 1) {
    doc.setPage(p);
    doc.setDrawColor(226, 232, 240);
    doc.line(M, H - 46, W - M, H - 46);
    doc.setFontSize(8);
    doc.setTextColor(...CINZA);
    doc.setFont("helvetica", "normal");
    doc.text("Almara | Estudar hoje, material escolar amanha.", M, H - 30);
    doc.text(`Pagina ${p} de ${total}`, W - M, H - 30, { align: "right" });
  }

  doc.save(`almara-relatorio-impacto-${new Date().toISOString().slice(0, 10)}.pdf`);
}
