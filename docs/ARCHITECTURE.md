# Arquitetura

```text
apps/web       Aplicação React/Vite e rotas da interface
apps/api       API Fastify versionada
packages/shared Tipos e contratos compartilhados
docs           Documentação e rastreabilidade
```

O frontend possui páginas, componentes de layout/UI e estilos globais. A autenticação é centralizada em `AuthProvider`, usando Supabase Auth e sem armazenamento manual de tokens. Rotas privadas passam por `ProtectedRoute`.

O backend valida o Bearer Token com `supabase.auth.getUser()` antes de expor `auth/me`. A migração em `supabase/migrations` cria as tabelas privadas e políticas RLS. A autorização de dados deve ser reforçada pelo banco, nunca por um `user_id` confiado do frontend.
