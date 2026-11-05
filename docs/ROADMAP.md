# Roadmap do Social AI

## Fase 1 — Base do produto
- [x] Criar repositório e documentação inicial.
- [x] Criar painel responsivo em React + TypeScript.
- [x] Criar navegação: visão geral, conversas, radar, conteúdo, contatos, agenda e integrações.
- [x] Criar rascunhos locais com aprovação humana.
- [ ] Validar build e publicar uma prévia.

## Fase 2 — Backend seguro
- [ ] API backend para autenticação, usuários e workspaces.
- [ ] Banco de dados para contatos autorizados, rascunhos e agenda.
- [ ] Gestão segura de tokens OAuth e segredos no servidor.
- [ ] Auditoria de ações e consentimentos.

## Fase 3 — Integrações Meta
- [ ] Instagram Graph API para contas profissionais elegíveis.
- [ ] Facebook Pages / Messenger conforme permissões aprovadas.
- [ ] WhatsApp Business Platform / Cloud API.
- [ ] Tela de status, escopos e renovação de conexões.

## Fase 4 — Inteligência artificial
- [ ] Assistente para resumir conversas autorizadas e sugerir respostas.
- [ ] Gerador de legendas, roteiros e carrosséis.
- [ ] Classificação de intenção e sentimento com indicação de incerteza.
- [ ] Pesquisa de tendências em fontes públicas e permitidas.

## Fase 5 — Operação
- [ ] Calendário editorial e agendamento quando suportado pela API.
- [ ] CRM leve com histórico autorizado.
- [ ] Relatórios e alertas.
- [ ] Testes, segurança, documentação e implantação.

## Limites de segurança e plataforma
- Não coletar dados privados nem rastrear localização privada.
- Não automatizar disparos em massa, spam ou solicitações indiscriminadas.
- Não enviar mensagens nem publicar sem confirmação explícita do usuário.
- Usar apenas APIs oficiais, escopos concedidos e dados públicos/autorizados.
- Nunca armazenar chaves de API ou tokens no frontend ou no Git.
