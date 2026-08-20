ALTER TABLE public.alunos_estatisticas
  ADD COLUMN IF NOT EXISTS xp_dia integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS xp_base_dia integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS dia_referencia date NOT NULL DEFAULT current_date;

CREATE TABLE IF NOT EXISTS public.resgates_premios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id text NOT NULL,
  nome_aluno text NOT NULL,
  classe text,
  premio_nome text NOT NULL,
  tier text NOT NULL,
  supermercado_id uuid REFERENCES public.supermercados(id),
  nome_loja text NOT NULL,
  codigo text NOT NULL,
  criado_em timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.resgates_premios TO service_role;
ALTER TABLE public.resgates_premios ENABLE ROW LEVEL SECURITY;
CREATE POLICY resgates_deny_anon ON public.resgates_premios AS PERMISSIVE FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY resgates_deny_authenticated ON public.resgates_premios AS PERMISSIVE FOR ALL TO authenticated USING (false) WITH CHECK (false);

CREATE INDEX IF NOT EXISTS idx_resgates_criado_em ON public.resgates_premios (criado_em DESC);