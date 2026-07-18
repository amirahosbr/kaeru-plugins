# Kaeru — Decision Log

> One line each: the decision + why. Extracted from the brainstorm; update as things change.

| # | Decision | Why |
|---|----------|-----|
| D1 | **Name = Kaeru（カエル）** | Triple meaning 変える/帰る/蛙; friendly & memorable to Japanese non-tech users. |
| D2 | **Direct code access via Claude Code, not a CMS migration** | Most content is hardcoded; only news is in microCMS. |
| D3 | **Split: news → microCMS UI, everything else → Kaeru** | microCMS UI is already Japanese/safe/free for content; don't force content through code. |
| D4 | **Hide git completely behind slash commands** | Non-tech PMs should never type a git command or see a branch. |
| D5 | **Command names in English, instructions in Japanese** | Malay names were confusing for Japanese staff; English command names are universal. |
| D6 | **PR-only; dev is the sole merger** | Review is the last safety net; `/submit` opens a PR, never merges. |
| D7 | **Two safety layers: repo guardrails + GitHub branch protection** | Even if the agent errs, GitHub blocks main; PMs get Write access only. |
| D8 | **Preview = real dev server + Vercel per-PR preview, NOT Claude Artifacts** | Artifacts can't render real Nuxt (no Node/SSR/microCMS); would mislead approvals. |
| D9 | **Vercel Git integration for per-PR previews = "staging"** | Replaces manual deploys; free staging-per-change. Prod stays on VPS. |
| D10 | ~~**VS Code + Claude Code extension as the PM front-end**~~ **Superseded by D18** | VS Code judged too heavy; replaced by a Terax fork. |
| D11 | **On-demand sandbox (scale-to-zero), never always-on / self-hosted VPS** | Persistent ≠ always-on; self-hosting is overengineered ops + security risk. |
| D12 | **Kaeru product built in Next.js (React)** | Full-stack in one; Vercel AI SDK + agent-UI ecosystem (assistant-ui, shadcn/ui) are React-first. |
| D13 | **Kaeru decoupled from client stack** | Client sites are Nuxt/Vue; Kaeru talks via git + sandbox, so it can be React/Next with zero conflict. |
| D14 | **Don't build the agent from scratch — use Claude Agent SDK** | The brain exists; wrap it with guardrails + a friendly surface. |
| D15 | **Cloudflare-native backend preferred (Sandbox SDK + Workflows + R2)** | Covers the hard parts on one low-ops platform; Amirah already has CF connected. AWS = overkill. |
| D16 | **Kit is framework-agnostic via a `/setup` auto-detect command** | One kit for Nuxt/Astro/Next; only the "where things live" section differs. |
| D17 | **MVP = productize the kit + thin wrapper; prove with 2 PMs before scaling** | Sexy-but-fragile is worse than boring-that-works; validate cheaply. |
| D18 | **PM front-end = a fork of Terax (`amirahosbr/terax-ai`), not VS Code** | 7 MB terminal-first workspace with terminal + file tree + live preview + AI already built; lighter than VS Code, far less work than a from-scratch product; we strip scary bits + rebrand + default Japanese. Supersedes D10. See `tooling-setup.md`. |
| D19 | **Claude auth = subscription login (Pro/Max), not API key** | Simplest for non-tech; no key handling. Per-seat cost per PM (roadmap Phase 0). |
| D20 | **Install via idempotent per-OS scripts (macOS + Windows), terminal touched once** | Beat "setup hell": one copy-paste command; after that the PM lives in the Kaeru window. Two interactive logins (Claude, GitHub) can't be auto'd. See `tooling-setup.md`. |
| D21 | **Folder tree + light dev visibility is OK for the local MVP tool** | Helps familiarity; the "invisible sandbox" rule applies to the eventual product, not this local tool. |
| D22 | **Naming taxonomy: brand = Kaeru; distinct repos/tiers** | Avoid the collision where app and kit both want to be `kaeru`. Brand stays **Kaeru** (D1). Layers: `kaeru` (this repo = the Claude Code **plugin** + marketplace + docs), **`kaeru-app`** (Terax fork = local PM window), future **Kaeru Spaces** (cloud tier — "Spaces" ⇒ cloud only, never the local app). Distribution mechanism → see D24 (was `@kaeru/kit` npx; superseded). |
| D23 | **Monorepo *later* for owned + coupled code (plugin + CLI-if-any + cloud product); the Terax fork `kaeru-app` stays a separate repo forever** | Don't scaffold a monorepo for a single package (premature). Adopt pnpm workspaces only once ≥2 owned TS/Node packages need coordinating. **`kaeru-app` must never be absorbed** — it's a fork that tracks `upstream` (crynta/terax-ai); subtree-merging a fork inside a monorepo is painful, a standalone repo + `upstream` remote is clean. |
| D24 | **Distribute the kit as a native Claude Code plugin + marketplace, NOT a custom `npx` CLI** | Claude Code has a built-in plugin system (bundle commands/skills/hooks/MCP; install/update via `/plugin` + a marketplace = a git repo). Use the native primitive instead of building `@kaeru/kit`. Layout: `.claude-plugin/marketplace.json` + `plugins/kaeru/.claude-plugin/plugin.json`. Auto-enable per repo via `.claude/settings.json` (`extraKnownMarketplaces` + `enabledPlugins`). Per-repo map lives in `.kaeru/where.md` written by `/kaeru:setup`, keeping the plugin framework-neutral (D16). Commands namespaced `/kaeru:*`. |
| D25 | **PM plugin is MCP-light: bundle Playwright only** | Free/local MCPs avoid the secrets-setup friction. Bundle **Playwright** (visual before/after confirm in `/kaeru:preview`) — needs `npx playwright install chromium`, no API key. **Exclude** chrome-devtools (overlaps Playwright; dev/perf-oriented), **context7** (dev docs only; its API key is just for higher rate limits, not secrets — keep at repo/dev level), and **microCMS** (routing news → CMS UI directly per D3; bundling would blur that split). |
| D26 | **Repo renamed `kaeru` → `kaeru-plugins`; it is a plugin *marketplace* (hosts `kaeru` + `gh-flow`), not a single plugin** | Removes the repo-vs-`kaeru`-plugin name collision; repo name now matches the marketplace name. GitHub auto-redirects old URLs. Internal refs updated (settings `extraKnownMarketplaces`, both `plugin.json` homepage/repository, kaeru README, gh-flow create-issue SKILL). Local folder kept as `kaeru` — folder name need not match repo name. |

## Open questions (unresolved in the brainstorm)

- **Infra for the pilot:** local vs Codespaces vs Cloudflare — leaning local for prototype
  ($0), Cloudflare for production.
- **Notify channel:** PMs in the *same* Slack channel as the dev, or a separate channel/DM?
- **Content/code ratio:** what % of "small edits" is actually microCMS content vs hardcoded
  Nuxt code? (Answered partially: CMS ≈ news only; the rest hardcoded → Kaeru is the main answer.)
- **Which pilot repo** to start with.
- **Claude licensing** for the 2 PMs — confirm plan/cost per person.

## Product / market note (aside)

The brainstorm floated this as a potential product: buyers are **agencies/freelancers** who
maintain client sites and are tired of tiny edit requests. The strongest wedge is
**Japanese localization + LINE + "runs on your existing repo, dev keeps control"** — a
niche English-first tools underserve. Validate cheaply first (talk to 5 agencies) before
building SaaS. The real moat is smooth onboarding/LMS + localization + agency relationships,
not the slash commands (easily copied).
