# Kaeru — Tooling & Setup (PM local environment)

> The concrete "what to install and how" for the **near-term MVP**: PMs run a local
> tool + browser, edit via Claude Code, submit a PR. This **supersedes D10** (VS Code)
> and is distinct from the eventual headless product in `architecture.md` (shape #2).
> See `decisions.md` D18–D20.

## Surface decision — fork Terax

**PM front-end = a fork of [Terax](https://terax.app/) → `amirahosbr/terax-ai`**
(upstream `crynta/terax-ai`, Apache-2.0, ~7 MB, terminal-first AI dev workspace).

Why a fork instead of VS Code (D10) or a from-scratch product (architecture.md):

- **Lighter than VS Code** — 7 MB / ~300 ms cold start vs Electron's hundreds of MB.
- **Already has the right pieces** — terminal + file tree + live web preview
  (auto-detects Vite/Next/Astro dev servers) + AI, in one window.
- **Not building an IDE from scratch** — forking an existing base is weeks, not months.
- **We control the surface** — strip the scary dev bits, rebrand to Kaeru, hard-wire
  Claude Code, default to Japanese.

### PM comfort level (updated)

Earlier principle was "PMs never see file tree/terminal" (architecture.md). For the
**local MVP** that is relaxed: **seeing the folder tree + a bit of dev is OK** — it helps
familiarity. The invisible-sandbox rule still applies to the *eventual product*, not this
local tool.

### What to customize in the fork (backlog for `terax-ai`)

- Rebrand → Kaeru (name, icon, frog mascot).
- Default language → Japanese (UI + Claude Code output).
- Hard-wire Claude Code as the AI panel; ship the Kaeru slash commands.
- De-emphasise / hide the scariest panels (Vim mode, commit graph, hunk-level git) —
  git stays behind slash commands (`/start`, `/submit`).
- Keep: terminal, file tree, live web preview.

## Prerequisites — what the install script installs

Same set on both OS; only the package manager differs. Script must be **idempotent**
(skip anything already present) and print a version check at the end.

| Tool | Why | macOS | Windows |
|------|-----|-------|---------|
| Package manager | Installs everything below | Homebrew | `winget` (built into Win 10/11) |
| **Git** | Version control (hidden behind slash commands) | `brew install git` | `winget install Git.Git` |
| **GitHub CLI (`gh`)** | `/submit` opens the PR; also sets up `git push` auth | `brew install gh` | `winget install GitHub.cli` |
| **Node.js LTS** | Runtime for the local live preview | `brew install node` | `winget install OpenJS.NodeJS.LTS` |
| **bun** | `kaeru` uses bun (a Nuxt client repo may use npm — `/setup` detects per repo) | `brew install oven-sh/bun/bun` | `powershell -c "irm bun.sh/install.ps1 \| iex"` |
| **Claude Code** | The AI + slash commands | `curl -fsSL https://claude.ai/install.sh \| bash` ⚠️ verify | `irm https://claude.ai/install.ps1 \| iex` ⚠️ verify |
| **Terminal** | Where Claude Code runs (only needed for setup + as the Terax host) | Terminal.app (built-in) | `winget install Microsoft.WindowsTerminal` |
| **terax-ai** | The PM window (terminal + file tree + preview) | download built release from the fork ⚠️ TBD | download built release from the fork ⚠️ TBD |

⚠️ = confirm exact command/distribution before shipping the script.
`terax-ai` distribution depends on building the fork first (not yet done).

## Authentication

Two **interactive** logins the script can launch but **cannot fully automate** (security).
The `SETUP.ja.md` checklist walks these with screenshots.

1. **Claude — subscription login (Pro/Max), no API key.**
   `claude` → `/login` → browser → sign in. Simplest for non-tech; no key handling.
   Each PM needs their own Claude plan (a real per-seat cost — see roadmap Phase 0).
2. **GitHub — `gh auth login`** → browser. One step covers both `git push` auth and PR
   creation.

## Install-script deliverables (planned)

1. `install-macos.sh` — Homebrew → git / gh / node / bun / Claude Code, then version check.
2. `install-windows.ps1` — same via `winget` + `irm` installers.
3. `SETUP.ja.md` — illustrated Japanese checklist: run one command → 2 logins → done.
   The `terax-ai` install step slots in once the fork is built/released.

The terminal is touched **once** (to run the script); after that the PM lives in the
Kaeru (terax-ai) window.
