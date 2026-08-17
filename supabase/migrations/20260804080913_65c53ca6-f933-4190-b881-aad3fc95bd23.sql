-- 1. Patrocinadores
CREATE TABLE public.patrocinadores (
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
GRANT SELECT ON public.patrocinadores TO authenticated;
GRANT ALL ON public.patrocinadores TO service_role;
ALTER TABLE public.patrocinadores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "patrocinadores_public_read" ON public.patrocinadores FOR SELECT USING (true);

-- 2. Suspensão de filial
ALTER TABLE public.supermercados ADD COLUMN IF NOT EXISTS ativo boolean NOT NULL DEFAULT true;

-- 3. Config do administrador (PIN)
CREATE TABLE public.admin_config (
  id integer PRIMARY KEY,
  pin_hash text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.admin_config TO service_role;
ALTER TABLE public.admin_config ENABLE ROW LEVEL SECURITY;

-- 4. Estatísticas de alunos
CREATE TABLE public.alunos_estatisticas (
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
GRANT ALL ON public.alunos_estatisticas TO service_role;
ALTER TABLE public.alunos_estatisticas ENABLE ROW LEVEL SECURITY;

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_patrocinadores_updated BEFORE UPDATE ON public.patrocinadores
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_alunos_updated BEFORE UPDATE ON public.alunos_estatisticas
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed de patrocinadores
INSERT INTO public.patrocinadores (nome_marca, disciplina_alvo, valor_patrocinio, ativo, pergunta, opcoes, resposta_index, explicacao) VALUES
('BIC', 'por', 750000, true, 'Na frase "Escrevi com a minha esferográfica BIC", qual é o verbo?', ARRAY['Escrevi','esferográfica','minha','BIC'], 0, 'O verbo indica a acção: "escrevi" (verbo escrever no pretérito perfeito).'),
('Faber-Castell', 'mat', 500000, true, 'Uma caixa Faber-Castell tem 12 lápis. Se repartires igualmente por 4 colegas, quantos recebe cada um?', ARRAY['2','3','4','6'], 1, '12 ÷ 4 = 3 lápis para cada colega.'),
('Refriango', 'geo', 300000, false, 'A fábrica da Refriango em Bom Jesus fica em que província de Angola?', ARRAY['Benguela','Huíla','Bengo','Namibe'], 2, 'Bom Jesus situa-se na província do Bengo, perto de Luanda.');