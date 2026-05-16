# kv.studio

Plataforma de desdobramento inteligente de key visuals para agências de publicidade.

## Pré-requisitos

- Node.js 20+ (https://nodejs.org)
- pnpm 9+ (`npm install -g pnpm`)

## Primeiros passos

```bash
pnpm install
pnpm dev
```

- Frontend: http://localhost:5173
- Backend:  http://localhost:3333/health
- Konva Spike: http://localhost:5173/spike

## Estrutura

```
apps/
  web/      # React + Vite + Tailwind
  api/      # Fastify
packages/
  shared/   # Tipos compartilhados
```

## Documentação técnica

Veja [`CLAUDE.md`](./CLAUDE.md) para contexto técnico e convenções.
