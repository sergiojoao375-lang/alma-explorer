-- admin_config: só o servidor pode ler/alterar o PIN
DROP POLICY IF EXISTS admin_config_deny_authenticated ON public.admin_config;
CREATE POLICY admin_config_deny_authenticated ON public.admin_config FOR ALL TO authenticated USING (false) WITH CHECK (false);
DROP POLICY IF EXISTS admin_config_deny_anon ON public.admin_config;
CREATE POLICY admin_config_deny_anon ON public.admin_config FOR ALL TO anon USING (false) WITH CHECK (false);

-- alunos_estatisticas: só o servidor insere/actualiza métricas anónimas
DROP POLICY IF EXISTS alunos_estatisticas_deny_authenticated ON public.alunos_estatisticas;
CREATE POLICY alunos_estatisticas_deny_authenticated ON public.alunos_estatisticas FOR ALL TO authenticated USING (false) WITH CHECK (false);
DROP POLICY IF EXISTS alunos_estatisticas_deny_anon ON public.alunos_estatisticas;
CREATE POLICY alunos_estatisticas_deny_anon ON public.alunos_estatisticas FOR ALL TO anon USING (false) WITH CHECK (false);