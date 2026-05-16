# kv.studio — Contexto Técnico para Claude Code

## O que é
Plataforma web (browser-only) que automatiza o desdobramento de key visuals em múltiplos formatos digitais, com inteligência de layout que replica o raciocínio de um diretor de arte. **Designer é protagonista** — a home é o repositório dele, não o dashboard do sênior.

Documento-mãe completo: `../kv-studio-compactacao_v2.md` (na pasta pai).

## Stack
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + Zustand + React Router
- **Canvas:** Konva.js (react-konva) — drag/resize/camadas/exportação
- **Backend:** Node.js + Fastify + TypeScript + Zod
- **Banco/Auth/Storage:** Supabase (PostgreSQL) — ainda não conectado, projeto roda 100% local com mocks
- **IA Visual:** Claude API Vision (claude-sonnet-4-6) — integração no Mês 2
- **Deploy futuro:** Vercel (web) + Railway (api) + Cloudflare CDN

## Estrutura (monorepo pnpm)
```
kv-studio/
├── apps/
│   ├── web/         # Vite + React + Tailwind  (porta 5173)
│   └── api/         # Fastify                   (porta 3333)
└── packages/
    └── shared/      # Tipos compartilhados
```

## Fluxo de 7 fases (stepper sempre visível durante criação)
1. **Brand Studio** — identidade visual por cliente (logo, tipografia, paleta, regras)
2. **KV Master** — upload PSD ou editor nativo
3. **Seleção de Formatos** — até 5 âncoras
4. **Wireframe Anotado** — IA gera + comentário por elemento
5. **Diálogo com a IA** — confirma intenção antes de gerar pixel
6. **Revisão** — canvas com todos os formatos + caixa de IA global
7. **Aprovação** — sênior → revisora → entrega

## Princípios de Produto (não viole)
- **Repositório sempre editável** — nada achata na plataforma; só exportação fecha.
- **Exportação não trava por aprovação** — pleno pode exportar sem ok do sênior.
- **Aprovação retroativa** — sistema notifica, sênior aprova quando puder.
- **Wireframe limita a 5 formatos** — derivados saem dos âncoras.
- **IA dialoga antes de gerar** — corrige intenção, não pixel.
- **Brand Studio antes do desdobramento** — IA consulta brand kit sempre.
- **Caixa de IA global no canvas de revisão** — orientação aplica em todos.
- **Status desacoplado de exportação** — "Entregue" ≠ "Aprovado".

## Sistema de Status (bolinhas)
- 🔘 Cinza — Em produção
- 🟠 Laranja — Editado / Pendente
- 🟢 Verde — Aprovado pelo sênior/DA
- 🩷 Rosa claro — Revisora revisou, sem apontamentos
- 🌸 Rosa choque — Revisora apontou correção

## Convenções de Código
- **Componentes:** PascalCase, um por arquivo, em `src/components/`
- **Páginas (telas):** em `src/pages/` — uma por fase do fluxo
- **Layouts:** em `src/layouts/` — `AppShell` envolve topbar/sidebar
- **Store:** Zustand em `src/lib/store.ts` — estado de projeto/UI
- **Mocks:** dados estáticos em `src/data/` para o protótipo
- **Tailwind:** preferir utility classes; cor de destaque do produto é laranja (`amber-500`)
- **TS strict:** `tsconfig` com `strict: true`; sem `any` em código novo

## Cores do Produto
- **Acento:** `amber-500` (#f59e0b) — laranja kv.studio
- **Fundo canvas de revisão:** `neutral-900` (escuro)
- **Status:** ver mapeamento acima

## Comandos
```bash
pnpm install              # primeiro setup
pnpm dev                  # roda web + api em paralelo
pnpm dev:web              # só frontend (5173)
pnpm dev:api              # só backend (3333)
pnpm build                # build de tudo
pnpm typecheck            # checa tipos em todos os pacotes
```

## O que está pronto neste protótipo
- [x] Estrutura monorepo + configs (pnpm, Vite, Tailwind, TS)
- [x] Backend Fastify rodando local com rota `/health`
- [x] Frontend com router + AppShell (Topbar + Sidebar)
- [x] **Konva Spike** — `/spike` valida drag/resize/export PNG
- [x] 8 telas do protótipo (UI mockada, sem backend real)
- [ ] Auth (Supabase) — Mês 1
- [ ] Upload PSD + extração de camadas — Mês 1
- [ ] Claude Vision para análise de KV — Mês 2
- [ ] Motor de layout / geração de formatos — Mês 2
- [ ] Editor manual com Konva — Mês 3
- [ ] Exportação JPG/PNG/PDF/ZIP — Mês 3

## Próximas Decisões Pendentes
- Spike Konva.js: validar exportação em alta resolução; fallback Fabric.js
- Modelagem do banco (Supabase): tabelas `clients`, `brand_kits`, `projects`, `formats`, `comments`, `approvals`, `notifications`
- Estratégia de extração de PSD: lib server-side (`psd.js` no backend) vs. lib client-side
