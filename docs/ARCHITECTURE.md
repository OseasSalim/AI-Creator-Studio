# Arquitetura

```text
apps/web       Aplicação React/Vite e rotas da interface
apps/api       API Fastify versionada
packages/shared Tipos e contratos compartilhados
docs           Documentação e rastreabilidade
```

O frontend possui páginas, componentes de layout/UI e estilos globais. O backend está preparado para crescer por módulos e serviços, mantendo a rota de saúde como primeiro contrato público.
