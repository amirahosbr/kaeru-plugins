# CLAUDE.md — kaeru-plugins

Project-level guidance for Claude Code. The full engineering + design contract
lives in **[AGENTS.md](./AGENTS.md)** — read it first. This file orients you on
**what this repo is** and **where things live**.

## What this repo is

This is **`amirahosbr/kaeru-plugins`** — a Claude Code **plugin marketplace**,
not an app you run day-to-day. The Next.js site under `src/` is supporting
UI/demo; the product is the plugins.

| Plugin | Audience | Source |
|--------|----------|--------|
| **kaeru** | Non-technical PMs (content edits, PR-only) | [`plugins/kaeru/`](./plugins/kaeru) |
| **octo** | Developers (GitHub issue → PR → CI → release) | [`plugins/octo/`](./plugins/octo) |

Marketplace registry: [`.claude-plugin/marketplace.json`](./.claude-plugin/marketplace.json).
Each plugin's version lives in `plugins/<name>/.claude-plugin/plugin.json`.

### Naming (do not regress)

- Repo / marketplace: **`kaeru-plugins`** (was briefly just `kaeru`).
- GitHub workflow plugin: **`octo`** (was **`gh-flow`**). Paths, commands, and
  install IDs are `/octo:*` and `octo@kaeru-plugins` — never `gh-flow`.

### Where to read first (humans + agents)

1. [`README.md`](./README.md) — how to install and use the plugins
2. [`plugins/kaeru/README.md`](./plugins/kaeru/README.md) — full `/kaeru:*` command list
3. [`docs/kaeru-plugins.html`](./docs/kaeru-plugins.html) — one-page overview (both plugins + full flow)
4. [`CHANGELOG.md`](./CHANGELOG.md) — what shipped at which plugin version
5. `AGENTS.md` — stack, TypeScript/UI conventions (when touching `src/`)
6. `guidelines/design-system.md` — tokens/palette (before any UI work)

## Octo — layout

```
plugins/octo/
  .claude-plugin/plugin.json   # name + version (bump on every shippable change)
  commands/                    # /octo:* slash commands
  skills/create-issue/         # create-issue skill (normal path)
  skills/setup-cicd/           # full CI/CD scaffold (auto path; same as /octo:setup with-workflows)
  assets/                      # bundled .github templates + workflows + githooks
                               #   (what /octo:setup and setup-cicd copy into other repos)
```

Installed copies for Claude Code live under
`~/.claude/plugins/cache/kaeru-plugins/octo/<version>/` — **edit the source in
this repo**, not the cache.

## Read before working

1. `AGENTS.md` — stack, structure, conventions, dev commands
2. `guidelines/design-system.md` — tokens, shadcn, palette (before any UI work)
3. `CHANGELOG.md` + the relevant `plugins/*/commands` or `skills` — for plugin work

## Tooling

- **Package manager: bun.** Use `bun` / `bun run <script>`, not npm/pnpm.
- **MCP:** `context7` is configured in `.mcp.json` — use it to fetch current docs
  for Next.js, next-intl, Tailwind, shadcn rather than relying on memory.
- Verify app changes with `bun run typecheck` and `bun run build` before finishing.
- Plugin command/skill edits are markdown — still bump `plugin.json` version in
  the **same commit** or `claude plugin update` will not deliver them (see
  CHANGELOG header + `plugin-version-guard.yml`).

## Guardrails

- TypeScript strict; no `any`/`as`/`!` — see AGENTS.md.
- Reference design tokens, never hardcode colors.
- Never commit secrets; env in `.env.local` (gitignored).
- This repo uses an issue-driven CI/release flow (see README.md § For developers) —
  don't touch `.github/` workflows without being asked.
- After editing canonical `.github/` templates here, run `/octo:sync-templates`
  (or equivalent) so `plugins/octo/assets/` stays in sync.
