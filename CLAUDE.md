# CLAUDE.md — kaeru

Project-level guidance for Claude Code. The full engineering + design contract
lives in **[AGENTS.md](./AGENTS.md)** — read it first. This file only adds the
agent-workflow specifics.

## Read before working

1. `AGENTS.md` — stack, structure, conventions, dev commands
2. `guidelines/design-system.md` — tokens, shadcn, palette (before any UI work)
3. `docs/planning/` — roadmap and design docs for what we're building

## Tooling

- **Package manager: bun.** Use `bun` / `bun run <script>`, not npm/pnpm.
- **MCP:** `context7` is configured in `.mcp.json` — use it to fetch current docs
  for Next.js, next-intl, Tailwind, shadcn rather than relying on memory.
- Verify changes with `bun run typecheck` and `bun run build` before finishing.

## Guardrails

- TypeScript strict; no `any`/`as`/`!` — see AGENTS.md.
- Reference design tokens, never hardcode colors.
- Never commit secrets; env in `.env.local` (gitignored).
- This repo uses an issue-driven CI/release flow (see README.md §Workflows) —
  don't touch `.github/` workflows without being asked.
