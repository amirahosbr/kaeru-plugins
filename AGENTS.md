# Agent guidance — kaeru

## Design

Before generating/modifying any UI, component, or animation, read:

- `guidelines/design-system.md` — token theme (oklch), shadcn conventions, palette

(Derived from the `design-styles` skill. Owned in-repo — edit token *values*, keep token *names*.)

## Stack

- Framework: **Next.js 16** (App Router, RSC, Turbopack) · React 19
- Styling: **Tailwind v4** (CSS-var tokens) + owned **shadcn** primitives
- i18n: **next-intl** (`[locale]` segment; locales `en`, `ja`; default `en`) — Japanese is a first-class locale (Kaeru's PMs are Japanese)
- Theme: **next-themes** (class strategy, `.dark`)
- Package manager: **bun**
- Dev port: 3000

```bash
bun install       # install deps
bun dev           # dev server (http://localhost:3000)
bun run build     # production build
bun start         # serve production build
bun run typecheck # tsc --noEmit
bun run lint      # eslint  (lint:fix to autofix)
```

## Project structure

```
src/
  app/[locale]/     # localized routes; layout.tsx owns <html>, providers
  components/
    ui/             # owned shadcn primitives (cva variants colocated)
    *.tsx           # feature/layout components
  i18n/             # routing.ts, request.ts, navigation.ts (single source of truth)
  libs/             # utils.ts → cn()
  proxy.ts          # next-intl middleware (Next 16 renamed middleware→proxy)
messages/           # en.json, ms.json
```

## Conventions

TypeScript strict + `noUncheckedIndexedAccess`; no `any` (use `unknown` at boundaries,
parse into typed shapes); avoid `as` (prefer `satisfies`); no non-null `!`; arrow functions;
`as const` unions over `enum`; explicit return types on exported fns.
JSDoc block atop every component/page/util/hook. kebab-case files/folders.
Reference design tokens (`bg-primary`, `text-muted-foreground`) — never raw oklch/hex.
Tailwind-first — reach for custom CSS only when Tailwind genuinely can't express it.
Full rules: the `code-rules` skill.

## Secrets

Never print or request secrets; redact in output; use authenticated CLIs.
Env vars live in `.env.local` (gitignored) — never commit.

## Workflow

Clarify unclear instructions. After changes: `bun run typecheck` + `bun run build`,
no errors, tests pass. Update README/AGENTS.md on new package/script.
See `docs/planning/` for the roadmap and design docs.
