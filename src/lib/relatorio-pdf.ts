import { jsPDF } from "jspdf";
import { TAXA_DISTRIBUICAO, TAXA_RETENCAO_SOFTWARE } from "./almara-premios";

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
};

const kz = (n: number) =>
  `${new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 0 }).format(Math.round(n))} Kz`;

/** Gera e descarrega o Relatório de Impacto Social da Almara. */
export function gerarRelatorioImpacto(d: DadosRelatorio): void {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const M = 48;
  const laranja: [number, number, number] = [234, 88, 12];
  const escuro: [number, number, number] = [15, 23, 42];
  const cinza: [number, number, number] = [100, 116, 139];

  // ---------- Cabeçalho ----------
  doc.setFillColor(...escuro);
  doc.rect(0, 0, W, 110, "F");
  doc.setFillColor(...laranja);
  doc.rect(0, 104, W, 6, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("ALMARA", M, 50);
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.text("Relatorio Corporativo de Impacto Social", M, 72);
  doc.setFontSize(9);
  doc.text(
    `Emitido em ${new Date().toLocaleDateString("pt-PT")} | Educacao gratuita em Angola`,
    M,
    90,
  );

  let y = 150;

  // ---------- KPIs ----------
  doc.setTextColor(...escuro);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("1. Indicadores gerais", M, y);
  y += 16;

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
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = M + col * (cardW + 10);
    const cy = y + row * 62;
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(x, cy, cardW, 52, 6, 6, "F");
    doc.setFontSize(8);
    doc.setTextColor(...cinza);
    doc.setFont("helvetica", "normal");
    doc.text(kpi[0].toUpperCase(), x + 10, cy + 18);
    doc.setFontSize(16);
    doc.setTextColor(...escuro);
    doc.setFont("helvetica", "bold");
    doc.text(kpi[1], x + 10, cy + 40);
  });
  y += 62 * Math.ceil(kpis.length / 3) + 18;

  // ---------- Financeiro ----------
  doc.setFontSize(14);
  doc.setTextColor(...escuro);
  doc.text("2. Transparencia financeira", M, y);
  y += 18;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...cinza);
  doc.text(
    `Modelo: ${Math.round(TAXA_DISTRIBUICAO * 100)}% de cada patrocinio e convertido em material escolar; ` +
      `${Math.round(TAXA_RETENCAO_SOFTWARE * 100)}% cobrem custos e manutencao da plataforma.`,
    M,
    y,
    { maxWidth: W - M * 2 },
  );
  y += 26;

  const linhas: [string, string][] = [
    ["Total arrecadado", kz(d.totalArrecadado)],
    [`Retencao do software (${Math.round(TAXA_RETENCAO_SOFTWARE * 100)}%)`, kz(d.retencaoSoftware)],
    [`Fundo escolar disponivel (${Math.round(TAXA_DISTRIBUICAO * 100)}%)`, kz(d.fundoDisponivel)],
    ["Faturamento de campanhas activas", kz(d.faturamentoMarcas)],
  ];
  linhas.forEach((l, i) => {
    if (i % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(M, y - 12, W - M * 2, 22, "F");
    }
    doc.setTextColor(...escuro);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(l[0], M + 8, y + 3);
    doc.setFont("helvetica", "bold");
    doc.text(l[1], W - M - 8, y + 3, { align: "right" });
    y += 22;
  });
  y += 22;

  // ---------- Gráfico por classe ----------
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("3. Estudantes por classe", M, y);
  y += 20;

  const dados = d.porClasse.length > 0 ? d.porClasse : [{ classe: "Sem dados", alunos: 0, mediaLicoes: 0 }];
  const maxAlunos = Math.max(1, ...dados.map((c) => c.alunos));
  const barMax = W - M * 2 - 150;
  dados.forEach((c) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...escuro);
    doc.text(`${c.classe} classe`, M, y + 10);
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(M + 90, y, barMax, 14, 3, 3, "F");
    const w = Math.max(2, (c.alunos / maxAlunos) * barMax);
    doc.setFillColor(...laranja);
    doc.roundedRect(M + 90, y, w, 14, 3, 3, "F");
    doc.setTextColor(...cinza);
    doc.setFontSize(9);
    doc.text(
      `${c.alunos} alunos | ${c.mediaLicoes.toFixed(1)} licoes/aluno`,
      M + 100 + barMax,
      y + 10,
    );
    y += 24;
  });
  y += 12;

  if (y > 660) {
    doc.addPage();
    y = 70;
  }

  // ---------- Stock ----------
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...escuro);
  doc.text("4. Material escolar em stock", M, y);
  y += 20;
  const maxStock = Math.max(1, ...d.stockPorItem.map((s) => s.quantidade));
  const itens = d.stockPorItem.length > 0 ? d.stockPorItem : [{ item: "Sem stock", quantidade: 0 }];
  itens.forEach((s) => {
    if (y > 780) {
      doc.addPage();
      y = 70;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...escuro);
    doc.text(s.item.replace(/_/g, " "), M, y + 10);
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(M + 150, y, barMax - 60, 14, 3, 3, "F");
    doc.setFillColor(5, 150, 105);
    doc.roundedRect(M + 150, y, Math.max(2, (s.quantidade / maxStock) * (barMax - 60)), 14, 3, 3, "F");
    doc.setTextColor(...cinza);
    doc.setFontSize(9);
    doc.text(`${s.quantidade} un.`, M + 160 + barMax - 60, y + 10);
    y += 24;
  });

  if (y > 700) {
    doc.addPage();
    y = 70;
  }
  y += 12;

  // ---------- Marcas ----------
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...escuro);
  doc.text("5. Marcas patrocinadoras activas", M, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...cinza);
  doc.text(
    d.marcasActivas.length > 0 ? d.marcasActivas.join(" | ") : "Nenhuma campanha activa.",
    M,
    y,
    { maxWidth: W - M * 2 },
  );

  // ---------- Rodapé em todas as páginas ----------
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p += 1) {
    doc.setPage(p);
    const H = doc.internal.pageSize.getHeight();
    doc.setDrawColor(226, 232, 240);
    doc.line(M, H - 46, W - M, H - 46);
    doc.setFontSize(8);
    doc.setTextColor(...cinza);
    doc.setFont("helvetica", "normal");
    doc.text("Almara | Estudar hoje, material escolar amanha.", M, H - 30);
    doc.text(`Pagina ${p} de ${total}`, W - M, H - 30, { align: "right" });
  }

  doc.save(`almara-relatorio-impacto-${new Date().toISOString().slice(0, 10)}.pdf`);
}
