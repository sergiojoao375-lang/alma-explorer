CREATE TABLE public.premios_config (
  tier text PRIMARY KEY,
  tipo_item text NOT NULL,
  nome_visivel text NOT NULL,
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.premios_config TO anon;
GRANT SELECT ON public.premios_config TO authenticated;
GRANT ALL ON public.premios_config TO service_role;

ALTER TABLE public.premios_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY premios_config_public_read ON public.premios_config FOR SELECT USING (true);

INSERT INTO public.premios_config (tier, tipo_item, nome_visivel) VALUES
  ('BRONZE', 'Kit_Bronze', '2 Lápis + 1 Borracha'),
  ('PRATA', 'Caderno_Linhas', '3 Cadernos de linhas'),
  ('OURO', 'Mochila', 'Mochila escolar completa');