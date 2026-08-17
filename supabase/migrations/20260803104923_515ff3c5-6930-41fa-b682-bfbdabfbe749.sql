
CREATE TABLE public.supermercados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_rede TEXT NOT NULL,
  filial_local TEXT NOT NULL,
  credito_troco_acumulado NUMERIC NOT NULL DEFAULT 0,
  utilizador_gerente TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.supermercados TO anon;
GRANT SELECT ON public.supermercados TO authenticated;
GRANT ALL ON public.supermercados TO service_role;
ALTER TABLE public.supermercados ENABLE ROW LEVEL SECURITY;
CREATE POLICY "supermercados_public_read" ON public.supermercados FOR SELECT USING (true);

CREATE TABLE public.conta_central_almara (
  id INT PRIMARY KEY,
  saldo_total_arrecadado NUMERIC NOT NULL DEFAULT 0,
  retencao_lucro_software_10 NUMERIC NOT NULL DEFAULT 0,
  saldo_disponivel_distribuicao NUMERIC NOT NULL DEFAULT 0
);
GRANT SELECT ON public.conta_central_almara TO anon;
GRANT SELECT ON public.conta_central_almara TO authenticated;
GRANT ALL ON public.conta_central_almara TO service_role;
ALTER TABLE public.conta_central_almara ENABLE ROW LEVEL SECURITY;
CREATE POLICY "conta_central_public_read" ON public.conta_central_almara FOR SELECT USING (true);

CREATE TABLE public.transacoes_financeiras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo_doacao TEXT NOT NULL,
  origem_doador TEXT NOT NULL,
  supermercado_id UUID REFERENCES public.supermercados(id) ON DELETE SET NULL,
  valor_kwanza NUMERIC NOT NULL,
  data_registo TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.transacoes_financeiras TO anon;
GRANT SELECT ON public.transacoes_financeiras TO authenticated;
GRANT ALL ON public.transacoes_financeiras TO service_role;
ALTER TABLE public.transacoes_financeiras ENABLE ROW LEVEL SECURITY;
CREATE POLICY "transacoes_public_read" ON public.transacoes_financeiras FOR SELECT USING (true);

CREATE TABLE public.stock_premios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supermercado_id UUID NOT NULL REFERENCES public.supermercados(id) ON DELETE CASCADE,
  tipo_item TEXT NOT NULL,
  quantidade_disponivel INT NOT NULL DEFAULT 0,
  custo_moedas_almara INT NOT NULL DEFAULT 0,
  valor_comercial_kz NUMERIC NOT NULL DEFAULT 500
);
GRANT SELECT ON public.stock_premios TO anon;
GRANT SELECT ON public.stock_premios TO authenticated;
GRANT ALL ON public.stock_premios TO service_role;
ALTER TABLE public.stock_premios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "stock_public_read" ON public.stock_premios FOR SELECT USING (true);

INSERT INTO public.conta_central_almara (id, saldo_total_arrecadado, retencao_lucro_software_10, saldo_disponivel_distribuicao)
VALUES (1, 1500000, 150000, 1350000);

INSERT INTO public.supermercados (id, nome_rede, filial_local, credito_troco_acumulado, utilizador_gerente) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Kero', 'Palanca', 25000, 'gerente.palanca'),
  ('22222222-2222-2222-2222-222222222222', 'Candando', 'Talatona', 18500, 'gerente.talatona'),
  ('33333333-3333-3333-3333-333333333333', 'Kero', 'Benfica', 9200, 'gerente.benfica');

INSERT INTO public.stock_premios (supermercado_id, tipo_item, quantidade_disponivel, custo_moedas_almara, valor_comercial_kz) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Kit_Bronze', 24, 150, 500),
  ('11111111-1111-1111-1111-111111111111', 'Caderno_Linhas', 12, 300, 500),
  ('11111111-1111-1111-1111-111111111111', 'Mochila', 4, 900, 7500),
  ('22222222-2222-2222-2222-222222222222', 'Kit_Bronze', 15, 150, 500),
  ('22222222-2222-2222-2222-222222222222', 'Caderno_Linhas', 3, 300, 500),
  ('33333333-3333-3333-3333-333333333333', 'Kit_Bronze', 8, 150, 500),
  ('33333333-3333-3333-3333-333333333333', 'Mochila', 2, 900, 7500);
