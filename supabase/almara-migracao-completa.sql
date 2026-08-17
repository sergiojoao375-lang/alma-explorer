-- ============================================================
-- ALMARA — Migração completa para conta Supabase própria
-- Cola este ficheiro inteiro no SQL Editor do teu projeto e corre.
-- Idempotente: podes correr mais do que uma vez sem duplicar dados.
-- ============================================================

-- ---------- função de updated_at ----------
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============================================================
-- 1. SUPERMERCADOS (filiais parceiras)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.supermercados (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_rede text NOT NULL,
  filial_local text NOT NULL,
  credito_troco_acumulado numeric NOT NULL DEFAULT 0,
  utilizador_gerente text,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.supermercados TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.supermercados TO authenticated;
GRANT ALL ON public.supermercados TO service_role;
ALTER TABLE public.supermercados ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS supermercados_public_read ON public.supermercados;
CREATE POLICY supermercados_public_read ON public.supermercados FOR SELECT USING (true);

-- ============================================================
-- 2. STOCK_PREMIOS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.stock_premios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supermercado_id uuid NOT NULL REFERENCES public.supermercados(id) ON DELETE CASCADE,
  tipo_item text NOT NULL,
  quantidade_disponivel integer NOT NULL DEFAULT 0,
  custo_moedas_almara integer NOT NULL DEFAULT 0,
  valor_comercial_kz numeric NOT NULL DEFAULT 500
);
GRANT SELECT ON public.stock_premios TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.stock_premios TO authenticated;
GRANT ALL ON public.stock_premios TO service_role;
ALTER TABLE public.stock_premios ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS stock_public_read ON public.stock_premios;
CREATE POLICY stock_public_read ON public.stock_premios FOR SELECT USING (true);

-- ============================================================
-- 3. CONTA_CENTRAL_ALMARA (fundo 10 / 90)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.conta_central_almara (
  id integer PRIMARY KEY,
  saldo_total_arrecadado numeric NOT NULL DEFAULT 0,
  retencao_lucro_software_10 numeric NOT NULL DEFAULT 0,
  saldo_disponivel_distribuicao numeric NOT NULL DEFAULT 0
);
GRANT SELECT ON public.conta_central_almara TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.conta_central_almara TO authenticated;
GRANT ALL ON public.conta_central_almara TO service_role;
ALTER TABLE public.conta_central_almara ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS conta_central_public_read ON public.conta_central_almara;
CREATE POLICY conta_central_public_read ON public.conta_central_almara FOR SELECT USING (true);

-- ============================================================
-- 4. TRANSACOES_FINANCEIRAS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.transacoes_financeiras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo_doacao text NOT NULL,
  origem_doador text NOT NULL,
  supermercado_id uuid REFERENCES public.supermercados(id) ON DELETE SET NULL,
  valor_kwanza numeric NOT NULL,
  data_registo timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.transacoes_financeiras TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.transacoes_financeiras TO authenticated;
GRANT ALL ON public.transacoes_financeiras TO service_role;
ALTER TABLE public.transacoes_financeiras ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS transacoes_public_read ON public.transacoes_financeiras;
CREATE POLICY transacoes_public_read ON public.transacoes_financeiras FOR SELECT USING (true);

-- ============================================================
-- 5. PATROCINADORES (campanhas de marcas)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.patrocinadores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_marca text NOT NULL,
  disciplina_alvo text NOT NULL,
  valor_patrocinio numeric NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  pergunta text,
  opcoes text[],
  resposta_index integer NOT NULL DEFAULT 0,
  explicacao text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.patrocinadores TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.patrocinadores TO authenticated;
GRANT ALL ON public.patrocinadores TO service_role;
ALTER TABLE public.patrocinadores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS patrocinadores_public_read ON public.patrocinadores;
CREATE POLICY patrocinadores_public_read ON public.patrocinadores FOR SELECT USING (true);
DROP TRIGGER IF EXISTS trg_patrocinadores_updated ON public.patrocinadores;
CREATE TRIGGER trg_patrocinadores_updated BEFORE UPDATE ON public.patrocinadores
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- 6. ALUNOS_ESTATISTICAS (métricas de impacto, anónimas)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.alunos_estatisticas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id text NOT NULL UNIQUE,
  nome text NOT NULL,
  classe text,
  licoes_concluidas integer NOT NULL DEFAULT 0,
  xp integer NOT NULL DEFAULT 0,
  moedas integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.alunos_estatisticas TO authenticated;
GRANT ALL ON public.alunos_estatisticas TO service_role;
ALTER TABLE public.alunos_estatisticas ENABLE ROW LEVEL SECURITY;
DROP TRIGGER IF EXISTS trg_alunos_updated ON public.alunos_estatisticas;
CREATE TRIGGER trg_alunos_updated BEFORE UPDATE ON public.alunos_estatisticas
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- 7. ADMIN_CONFIG (PIN do administrador, guardado como hash SHA-256)
--    Sem GRANTs para anon/authenticated: só o servidor lê.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.admin_config (
  id integer PRIMARY KEY,
  pin_hash text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.admin_config TO service_role;
ALTER TABLE public.admin_config ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- DADOS INICIAIS (Angola)
-- ============================================================

-- PIN "ALMARA2026" (SHA-256)
INSERT INTO public.admin_config (id, pin_hash) VALUES
  (1, '56852e0f8b5fff0b37039026f3a2a29a3d96077b8db7953b56af4f3970c9f4cd')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.conta_central_almara
  (id, saldo_total_arrecadado, retencao_lucro_software_10, saldo_disponivel_distribuicao)
VALUES (1, 1550000, 155000, 1394000)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.supermercados (id, nome_rede, filial_local, credito_troco_acumulado, utilizador_gerente, ativo) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Kero',     'Palanca',  25000, 'gerente.palanca',  true),
  ('22222222-2222-2222-2222-222222222222', 'Candando', 'Talatona', 19500, 'gerente.talatona', true),
  ('33333333-3333-3333-3333-333333333333', 'Kero',     'Benfica',   9200, 'gerente.benfica',  true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.stock_premios (supermercado_id, tipo_item, quantidade_disponivel, custo_moedas_almara, valor_comercial_kz) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Kit_Bronze',     24, 150,  500),
  ('11111111-1111-1111-1111-111111111111', 'Caderno_Linhas', 12, 300,  500),
  ('11111111-1111-1111-1111-111111111111', 'Mochila',         4, 900, 7500),
  ('22222222-2222-2222-2222-222222222222', 'Kit_Bronze',     15, 150,  500),
  ('22222222-2222-2222-2222-222222222222', 'Caderno_Linhas',  6, 300,  500),
  ('33333333-3333-3333-3333-333333333333', 'Kit_Bronze',      8, 150,  500),
  ('33333333-3333-3333-3333-333333333333', 'Mochila',         2, 900, 7500)
ON CONFLICT DO NOTHING;

INSERT INTO public.transacoes_financeiras (tipo_doacao, origem_doador, supermercado_id, valor_kwanza) VALUES
  ('Injeccao_Fundo_Central', 'Conta Central Almara', '22222222-2222-2222-2222-222222222222', 1000),
  ('Patrocinio_Empresa',     'PLUGTECH',             NULL,                                  50000)
ON CONFLICT DO NOTHING;

INSERT INTO public.patrocinadores (nome_marca, disciplina_alvo, valor_patrocinio, ativo, pergunta, opcoes, resposta_index, explicacao) VALUES
  ('BIC', 'por', 750000, true,
   'Na frase "Escrevi com a minha esferográfica BIC", qual é o verbo?',
   ARRAY['Escrevi','esferográfica','minha','BIC'], 0,
   'O verbo indica a acção: "escrevi" (verbo escrever no pretérito perfeito).'),
  ('Faber-Castell', 'mat', 500000, false,
   'Uma caixa Faber-Castell tem 12 lápis. Se repartires igualmente por 4 colegas, quantos recebe cada um?',
   ARRAY['2','3','4','6'], 1,
   '12 ÷ 4 = 3 lápis para cada colega.'),
  ('Refriango', 'geo', 300000, true,
   'A fábrica da Refriango em Bom Jesus fica em que província de Angola?',
   ARRAY['Benguela','Huíla','Bengo','Namibe'], 2,
   'Bom Jesus situa-se na província do Bengo, perto de Luanda.')
ON CONFLICT DO NOTHING;
