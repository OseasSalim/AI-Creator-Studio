# AI Creator Studio

Fundação da plataforma SaaS de criação de conteúdo com IA.

## Requisitos

- Node.js LTS (Node 22+ recomendado)
- npm 10+

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
API: `http://localhost:3333`

Health check: `http://localhost:3333/api/v1/health`

## Verificações

```bash
npm run lint
npm run typecheck
npm run build
```

As telas de login e cadastro são demonstrativas nesta etapa. Consulte `docs/PROGRESS.md` e `docs/ROADMAP.md` para o estado do produto.

## Configuração do Supabase — Etapa 02

1. Crie um projeto no Supabase.
2. Em **Project Settings > API**, copie a URL e a publishable key para `.env`, usando os nomes de `.env.example`.
3. Em **Authentication > URL Configuration**, adicione `http://localhost:5173` e `http://localhost:5173/reset-password` como URLs permitidas.
4. Aplique `supabase/migrations/20261102000100_auth_profiles_projects_assets.sql` pelo SQL Editor ou pelo Supabase CLI.
5. Reinicie `npm run dev` após alterar o `.env`.

O projeto não usa service role key no frontend e não inventa credenciais. Sem essas configurações, as telas exibem o estado de integração indisponível. A etapa permanece `IN_PROGRESS` até os fluxos de e-mail e os testes RLS serem validados em um projeto real.
