# Progresso

## Etapa 01 — Fundação

**Status:** COMPLETED

### Critérios comprovados

- Monorepo npm workspaces criado.
- Frontend React/Vite/TypeScript executável.
- Backend Fastify executável.
- Rota `GET /api/v1/health` implementada.
- Landing page, autenticação visual, dashboard e projetos criados.
- Navegação React Router configurada.
- Tailwind CSS, Lucide React e organização inicial de componentes configurados.
- `.env.example` sem segredos criado.
- Documentação inicial criada.

### Fora do escopo

Autenticação real, Supabase, RLS, pagamentos, IA, uploads, filas, renderização e publicação.

## Etapa 02 — Autenticação e banco de dados

**Status:** IN_PROGRESS

### Implementado

- Cliente Supabase configurável com persistência oficial de sessão.
- Cadastro, login, logout, confirmação de e-mail e recuperação de senha.
- Rotas `/forgot-password`, `/reset-password`, `/register` e proteção das áreas privadas.
- Middleware Fastify para Bearer Token e rota `GET /api/v1/auth/me`.
- Migração versionada para `profiles`, `projects`, `assets`, trigger de perfil e RLS.
- Testes automatizados de validação e contrato de autorização.

### Bloqueado para validação final

- Projeto Supabase real, URLs de redirect e chaves ainda não configurados.
- Migração não aplicada em um banco remoto.
- Fluxos reais de confirmação/recuperação e testes RLS entre dois usuários ainda não executados.
