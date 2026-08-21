import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ITENS_DISPONIVEIS, TAXA_RETENCAO_SOFTWARE } from "./almara-premios";

export type Supermercado = {
  id: string;
  nome_rede: string;
  filial_local: string;
  credito_troco_acumulado: number;
  utilizador_gerente: string | null;
  ativo: boolean;
};

export type StockItem = {
  id: string;
  supermercado_id: string;
  tipo_item: string;
  quantidade_disponivel: number;
  custo_moedas_almara: number;
  valor_comercial_kz: number;
};

export type ContaCentral = {
  id: number;
  saldo_total_arrecadado: number;
  retencao_lucro_software_10: number;
  saldo_disponivel_distribuicao: number;
};

export type Transacao = {
  id: string;
  tipo_doacao: string;
  origem_doador: string;
  supermercado_id: string | null;
  valor_kwanza: number;
  data_registo: string;
};

export type Patrocinador = {
  id: string;
  nome_marca: string;
  disciplina_alvo: string;
  valor_patrocinio: number;
  ativo: boolean;
  pergunta: string | null;
  opcoes: string[] | null;
  resposta_index: number;
  explicacao: string | null;
};

export type Metricas = {
  totalAlunos: number;
  mediaLicoes: number;
  faturamentoMarcas: number;
  /** Alunos e média de lições agrupados por classe (6ª a 10ª). */
  porClasse: { classe: string; alunos: number; mediaLicoes: number }[];
  totalLicoes: number;
  totalXp: number;
};

export type PremioConfig = {
  tier: string;
  tipo_item: string;
  nome_visivel: string;
};



async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Valida o PIN contra o hash guardado na base de dados (fallback: ADMIN_PIN). */
async function checkPin(pin: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("admin_config")
    .select("pin_hash")
    .eq("id", 1)
    .maybeSingle();
  if (data?.pin_hash) {
    if ((await sha256(pin)) === data.pin_hash) return;
    throw new Error("PIN de administrador inválido");
  }
  const expected = process.env["ADMIN_PIN"];
  if (!expected || pin !== expected) throw new Error("PIN de administrador inválido");
}

/** Leitura pública do painel (lojas, stock, conta central, últimas transações). */
export const getPainel = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const [lojas, stock, conta, transacoes, marcas, alunos] = await Promise.all([
    supabaseAdmin.from("supermercados").select("*").order("nome_rede"),
    supabaseAdmin.from("stock_premios").select("*"),
    supabaseAdmin.from("conta_central_almara").select("*").eq("id", 1).maybeSingle(),
    supabaseAdmin
      .from("transacoes_financeiras")
      .select("*")
      .order("data_registo", { ascending: false })
      .limit(12),
    supabaseAdmin.from("patrocinadores").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("alunos_estatisticas").select("licoes_concluidas, xp, classe"),
  ]);
  if (lojas.error) console.error("[almara] lojas", lojas.error);
  if (stock.error) console.error("[almara] stock", stock.error);

  const linhasAlunos = alunos.data ?? [];
  const patrocinadores = (marcas.data ?? []) as Patrocinador[];
  const grupos = new Map<string, { alunos: number; licoes: number }>();
  for (const l of linhasAlunos) {
    const classe = (l.classe ?? "Sem classe") as string;
    const g = grupos.get(classe) ?? { alunos: 0, licoes: 0 };
    g.alunos += 1;
    g.licoes += Number(l.licoes_concluidas);
    grupos.set(classe, g);
  }
  const totalLicoes = linhasAlunos.reduce((a, l) => a + Number(l.licoes_concluidas), 0);
  const metricas: Metricas = {
    totalAlunos: linhasAlunos.length,
    mediaLicoes: linhasAlunos.length === 0 ? 0 : totalLicoes / linhasAlunos.length,
    faturamentoMarcas: patrocinadores
      .filter((p) => p.ativo)
      .reduce((a, p) => a + Number(p.valor_patrocinio), 0),
    porClasse: [...grupos.entries()]
      .map(([classe, g]) => ({
        classe,
        alunos: g.alunos,
        mediaLicoes: g.alunos === 0 ? 0 : g.licoes / g.alunos,
      }))
      .sort((a, b) => a.classe.localeCompare(b.classe)),
    totalLicoes,
    totalXp: linhasAlunos.reduce((a, l) => a + Number(l.xp ?? 0), 0),
  };

  const premios = await supabaseAdmin.from("premios_config").select("*").order("tier");

  return {
    premios: (premios.data ?? []) as PremioConfig[],
    lojas: (lojas.data ?? []) as Supermercado[],
    stock: (stock.data ?? []) as StockItem[],
    conta: (conta.data ?? null) as ContaCentral | null,
    transacoes: (transacoes.data ?? []) as Transacao[],
    patrocinadores,
    metricas,
  };
});

/** Perguntas patrocinadas activas — leitura pública para o quiz do aluno. */
export const getPatrocinadoresAtivos = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("patrocinadores")
    .select("id, nome_marca, disciplina_alvo, valor_patrocinio, ativo, pergunta, opcoes, resposta_index, explicacao")
    .eq("ativo", true);
  return (data ?? []) as Patrocinador[];
});

/** Sincroniza as estatísticas anónimas do aluno para as métricas de impacto. */
export const sincronizarAluno = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        deviceId: z.string().min(6).max(64),
        nome: z.string().min(1).max(60),
        classe: z.string().max(10).nullable(),
        licoesConcluidas: z.number().int().min(0).max(100000),
        xp: z.number().int().min(0).max(10_000_000),
        moedas: z.number().int().min(0).max(10_000_000),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const hoje = new Date().toISOString().slice(0, 10);
    const { data: actual } = await supabaseAdmin
      .from("alunos_estatisticas")
      .select("xp, xp_base_dia, dia_referencia")
      .eq("device_id", data.deviceId)
      .maybeSingle();

    // O ranking diário reinicia às 00:00: num novo dia a base passa a ser o XP actual.
    const novoDia = !actual || actual.dia_referencia !== hoje;
    const base = novoDia ? data.xp : Number(actual.xp_base_dia ?? 0);
    const xpDia = Math.max(0, data.xp - base);

    await supabaseAdmin.from("alunos_estatisticas").upsert(
      {
        device_id: data.deviceId,
        nome: data.nome,
        classe: data.classe,
        licoes_concluidas: data.licoesConcluidas,
        xp: data.xp,
        moedas: data.moedas,
        xp_base_dia: base,
        xp_dia: xpDia,
        dia_referencia: hoje,
      },
      { onConflict: "device_id" },
    );
    return { ok: true };
  });

/** Lojas parceiras activas — o aluno escolhe onde levanta o material. */
export const getLojasParceiras = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("supermercados")
    .select("id, nome_rede, filial_local")
    .eq("ativo", true)
    .order("nome_rede");
  return (data ?? []) as { id: string; nome_rede: string; filial_local: string }[];
});

/** Regista o prémio conquistado para aparecer no ranking diário. */
export const registarResgate = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        deviceId: z.string().min(6).max(64),
        nomeAluno: z.string().min(1).max(60),
        classe: z.string().max(10).nullable(),
        premioNome: z.string().min(1).max(80),
        tier: z.string().min(1).max(20),
        supermercadoId: z.string().uuid().nullable(),
        nomeLoja: z.string().min(1).max(140),
        codigo: z.string().min(1).max(80),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("resgates_premios").insert({
      device_id: data.deviceId,
      nome_aluno: data.nomeAluno,
      classe: data.classe,
      premio_nome: data.premioNome,
      tier: data.tier,
      supermercado_id: data.supermercadoId,
      nome_loja: data.nomeLoja,
      codigo: data.codigo,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Ranking do dia: prémios ganhos hoje + top 5 alunos com mais pontos hoje. */
export const getRankingDiario = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const hoje = new Date().toISOString().slice(0, 10);
  const inicioDia = `${hoje}T00:00:00.000Z`;

  const [resgates, top] = await Promise.all([
    supabaseAdmin
      .from("resgates_premios")
      .select("nome_aluno, classe, premio_nome, tier, nome_loja, criado_em")
      .gte("criado_em", inicioDia)
      .order("criado_em", { ascending: false })
      .limit(30),
    supabaseAdmin
      .from("alunos_estatisticas")
      .select("nome, classe, xp_dia")
      .eq("dia_referencia", hoje)
      .gt("xp_dia", 0)
      .order("xp_dia", { ascending: false })
      .limit(5),
  ]);

  return {
    dia: hoje,
    premiados: (resgates.data ?? []) as {
      nome_aluno: string;
      classe: string | null;
      premio_nome: string;
      tier: string;
      nome_loja: string;
      criado_em: string;
    }[],
    topPontos: (top.data ?? []) as { nome: string; classe: string | null; xp_dia: number }[],
  };
});


/** Cadastro de nova marca patrocinadora. */
export const criarPatrocinador = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        pin: z.string().min(1),
        nomeMarca: z.string().min(1).max(80),
        disciplinaAlvo: z.string().min(1).max(40),
        valor: z.number().min(0).max(1_000_000_000),
        ativo: z.boolean(),
        pergunta: z.string().max(300).optional(),
        opcoes: z.array(z.string().max(120)).length(4).optional(),
        respostaIndex: z.number().int().min(0).max(3).optional(),
        explicacao: z.string().max(300).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    await checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("patrocinadores").insert({
      nome_marca: data.nomeMarca,
      disciplina_alvo: data.disciplinaAlvo,
      valor_patrocinio: data.valor,
      ativo: data.ativo,
      pergunta: data.pergunta ?? null,
      opcoes: data.opcoes ?? null,
      resposta_index: data.respostaIndex ?? 0,
      explicacao: data.explicacao ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Liga/desliga uma campanha patrocinada. */
export const alternarPatrocinador = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ pin: z.string().min(1), id: z.string().uuid(), ativo: z.boolean() }).parse(d),
  )
  .handler(async ({ data }) => {
    await checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("patrocinadores")
      .update({ ativo: data.ativo })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Cadastro de nova filial parceira (+ stock inicial dos três prémios). */
export const criarFilial = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        pin: z.string().min(1),
        nomeRede: z.string().min(1).max(80),
        filialLocal: z.string().min(1).max(80),
        saldoInicial: z.number().min(0).max(1_000_000_000),
        emailGerente: z.string().email().max(120).or(z.literal("")),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    await checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: loja, error } = await supabaseAdmin
      .from("supermercados")
      .insert({
        nome_rede: data.nomeRede,
        filial_local: data.filialLocal,
        credito_troco_acumulado: data.saldoInicial,
        utilizador_gerente: data.emailGerente || null,
      })
      .select("id")
      .single();
    if (error || !loja) throw new Error(error?.message ?? "Não foi possível criar a filial");

    await supabaseAdmin.from("stock_premios").insert([
      { supermercado_id: loja.id, tipo_item: "Kit_Bronze", quantidade_disponivel: 0, custo_moedas_almara: 300, valor_comercial_kz: 500 },
      { supermercado_id: loja.id, tipo_item: "Caderno_Linhas", quantidade_disponivel: 0, custo_moedas_almara: 600, valor_comercial_kz: 1200 },
      { supermercado_id: loja.id, tipo_item: "Mochila", quantidade_disponivel: 0, custo_moedas_almara: 1500, valor_comercial_kz: 5000 },
    ]);
    return { ok: true, id: loja.id };
  });

/** Actualiza a quantidade disponível de um prémio numa filial. */
export const atualizarStock = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({ pin: z.string().min(1), stockId: z.string().uuid(), quantidade: z.number().int().min(0).max(100000) })
      .parse(d),
  )
  .handler(async ({ data }) => {
    await checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("stock_premios")
      .update({ quantidade_disponivel: data.quantidade })
      .eq("id", data.stockId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Suspende ou reactiva remotamente uma filial (antifraude). */
export const alternarFilial = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ pin: z.string().min(1), supermercadoId: z.string().uuid(), ativo: z.boolean() }).parse(d),
  )
  .handler(async ({ data }) => {
    await checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("supermercados")
      .update({ ativo: data.ativo })
      .eq("id", data.supermercadoId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Alteração do PIN de administrador (guardado como hash SHA-256). */
export const alterarPin = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ pin: z.string().min(1), novoPin: z.string().min(4).max(40) }).parse(d),
  )
  .handler(async ({ data }) => {
    await checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("admin_config")
      .upsert({ id: 1, pin_hash: await sha256(data.novoPin), updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Doação local: troco da caixa ou express local — soma direto na loja. */
export const doacaoLocal = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        supermercadoId: z.string().uuid(),
        valor: z.number().positive().max(100_000_000),
        origem: z.string().min(1).max(120),
        tipo: z.enum(["Troco_Caixa", "Express_Local"]),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: loja, error } = await supabaseAdmin
      .from("supermercados")
      .select("credito_troco_acumulado")
      .eq("id", data.supermercadoId)
      .maybeSingle();
    if (error || !loja) throw new Error("Loja não encontrada");

    await supabaseAdmin
      .from("supermercados")
      .update({ credito_troco_acumulado: Number(loja.credito_troco_acumulado) + data.valor })
      .eq("id", data.supermercadoId);

    await supabaseAdmin.from("transacoes_financeiras").insert({
      tipo_doacao: data.tipo,
      origem_doador: data.origem,
      supermercado_id: data.supermercadoId,
      valor_kwanza: data.valor,
    });
    return { ok: true };
  });

/** Grande patrocínio: 15% retenção Almara (custos + lucro), 85% fundo escolar. */
export const registarPatrocinio = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        pin: z.string().min(1),
        valor: z.number().positive().max(1_000_000_000),
        origem: z.string().min(1).max(120),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    await checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: conta } = await supabaseAdmin
      .from("conta_central_almara")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (!conta) throw new Error("Conta central indisponível");

    const retencao = data.valor * TAXA_RETENCAO_SOFTWARE;
    const distribuicao = data.valor * (1 - TAXA_RETENCAO_SOFTWARE);

    await supabaseAdmin
      .from("conta_central_almara")
      .update({
        saldo_total_arrecadado: Number(conta.saldo_total_arrecadado) + data.valor,
        retencao_lucro_software_10: Number(conta.retencao_lucro_software_10) + retencao,
        saldo_disponivel_distribuicao: Number(conta.saldo_disponivel_distribuicao) + distribuicao,
      })
      .eq("id", 1);

    await supabaseAdmin.from("transacoes_financeiras").insert({
      tipo_doacao: "Patrocinio_Empresa",
      origem_doador: data.origem,
      valor_kwanza: data.valor,
    });
    return { retencao, distribuicao };
  });

/** Administrador injecta crédito digital do fundo central numa loja. */
export const injectarCredito = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        pin: z.string().min(1),
        supermercadoId: z.string().uuid(),
        valor: z.number().positive().max(1_000_000_000),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    await checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: conta } = await supabaseAdmin
      .from("conta_central_almara")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (!conta) throw new Error("Conta central indisponível");
    if (Number(conta.saldo_disponivel_distribuicao) < data.valor) {
      throw new Error("Fundo escolar insuficiente para esta injecção");
    }
    const { data: loja } = await supabaseAdmin
      .from("supermercados")
      .select("credito_troco_acumulado")
      .eq("id", data.supermercadoId)
      .maybeSingle();
    if (!loja) throw new Error("Loja não encontrada");

    await supabaseAdmin
      .from("conta_central_almara")
      .update({
        saldo_disponivel_distribuicao: Number(conta.saldo_disponivel_distribuicao) - data.valor,
      })
      .eq("id", 1);
    await supabaseAdmin
      .from("supermercados")
      .update({ credito_troco_acumulado: Number(loja.credito_troco_acumulado) + data.valor })
      .eq("id", data.supermercadoId);
    await supabaseAdmin.from("transacoes_financeiras").insert({
      tipo_doacao: "Injeccao_Fundo_Central",
      origem_doador: "Conta Central Almara",
      supermercado_id: data.supermercadoId,
      valor_kwanza: data.valor,
    });
    return { ok: true };
  });

const ITEM_POR_TIER_PADRAO: Record<string, string> = {
  BRONZE: "Kit_Bronze",
  PRATA: "Caderno_Linhas",
  OURO: "Mochila",
};

/** Configuração semanal: que item físico corresponde a cada categoria de prémio. */
export const getPremiosConfig = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("premios_config").select("*").order("tier");
  return (data ?? []) as PremioConfig[];
});

/** Administrador troca o item físico de uma categoria (rotatividade semanal). */
export const definirItemPremio = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        pin: z.string().min(1),
        tier: z.enum(["BRONZE", "PRATA", "OURO"]),
        tipoItem: z.enum(ITENS_DISPONIVEIS),
        nomeVisivel: z.string().min(1).max(80),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    await checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("premios_config").upsert({
      tier: data.tier,
      tipo_item: data.tipoItem,
      nome_visivel: data.nomeVisivel,
      atualizado_em: new Date().toISOString(),
    });
    if (error) throw new Error(error.message);

    // Garante que todas as filiais activas têm linha de stock para o novo item.
    const { data: lojas } = await supabaseAdmin.from("supermercados").select("id");
    const { data: existentes } = await supabaseAdmin
      .from("stock_premios")
      .select("supermercado_id")
      .eq("tipo_item", data.tipoItem);
    const jaTem = new Set((existentes ?? []).map((e) => e.supermercado_id));
    const novas = (lojas ?? [])
      .filter((l) => !jaTem.has(l.id))
      .map((l) => ({
        supermercado_id: l.id,
        tipo_item: data.tipoItem,
        quantidade_disponivel: 0,
        custo_moedas_almara: 500,
        valor_comercial_kz: 1000,
      }));
    if (novas.length > 0) await supabaseAdmin.from("stock_premios").insert(novas);
    return { ok: true };
  });

/** Adiciona um novo tipo de item ao stock de uma filial. */
export const adicionarItemStock = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        pin: z.string().min(1),
        supermercadoId: z.string().uuid(),
        tipoItem: z.enum(ITENS_DISPONIVEIS),
        quantidade: z.number().int().min(0).max(100000),
        valorComercialKz: z.number().min(0).max(10_000_000),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    await checkPin(data.pin);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existente } = await supabaseAdmin
      .from("stock_premios")
      .select("id, quantidade_disponivel")
      .eq("supermercado_id", data.supermercadoId)
      .eq("tipo_item", data.tipoItem)
      .maybeSingle();
    if (existente) {
      const { error } = await supabaseAdmin
        .from("stock_premios")
        .update({
          quantidade_disponivel: data.quantidade,
          valor_comercial_kz: data.valorComercialKz,
        })
        .eq("id", existente.id);
      if (error) throw new Error(error.message);
      return { ok: true, criado: false };
    }
    const { error } = await supabaseAdmin.from("stock_premios").insert({
      supermercado_id: data.supermercadoId,
      tipo_item: data.tipoItem,
      quantidade_disponivel: data.quantidade,
      custo_moedas_almara: 500,
      valor_comercial_kz: data.valorComercialKz,
    });
    if (error) throw new Error(error.message);
    return { ok: true, criado: true };
  });

/** Balcão: valida o código, consome stock e debita o crédito da loja. */
export const resgatarPremio = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        codigo: z.string().min(4).max(60),
        supermercadoId: z.string().uuid(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const partes = data.codigo.toUpperCase().split("-");
    const tier = partes[2] ?? "";
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: config } = await supabaseAdmin
      .from("premios_config")
      .select("tipo_item")
      .eq("tier", tier)
      .maybeSingle();
    const tipoItem = config?.tipo_item ?? ITEM_POR_TIER_PADRAO[tier];
    if (!tipoItem) {
      return { ok: false as const, motivo: "Código sem prémio reconhecido", tipoItem: null };
    }

    const { data: lojaEstado } = await supabaseAdmin
      .from("supermercados")
      .select("ativo")
      .eq("id", data.supermercadoId)
      .maybeSingle();
    if (lojaEstado && lojaEstado.ativo === false) {
      return { ok: false as const, motivo: "Filial suspensa pelo administrador Almara", tipoItem: null };
    }
    const { data: item } = await supabaseAdmin
      .from("stock_premios")
      .select("*")
      .eq("supermercado_id", data.supermercadoId)
      .eq("tipo_item", tipoItem)
      .maybeSingle();

    if (!item) {
      return { ok: false as const, motivo: `Esta filial não trabalha com ${tipoItem}`, tipoItem };
    }
    if (item.quantidade_disponivel <= 0) {
      return { ok: false as const, motivo: `Sem stock de ${tipoItem} nesta filial`, tipoItem };
    }

    const { data: loja } = await supabaseAdmin
      .from("supermercados")
      .select("credito_troco_acumulado")
      .eq("id", data.supermercadoId)
      .maybeSingle();
    if (!loja) return { ok: false as const, motivo: "Loja não encontrada", tipoItem };

    await supabaseAdmin
      .from("stock_premios")
      .update({ quantidade_disponivel: item.quantidade_disponivel - 1 })
      .eq("id", item.id);

    const novoCredito =
      Number(loja.credito_troco_acumulado) - Number(item.valor_comercial_kz);
    await supabaseAdmin
      .from("supermercados")
      .update({ credito_troco_acumulado: novoCredito })
      .eq("id", data.supermercadoId);

    return {
      ok: true as const,
      motivo: "",
      tipoItem,
      restante: item.quantidade_disponivel - 1,
      custoKz: Number(item.valor_comercial_kz),
      creditoLoja: novoCredito,
    };
  });
