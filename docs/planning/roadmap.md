# Kaeru — Roadmap

> Phased plan from the brainstorm. **Guiding principle: one pilot repo first, prove it,
> then scale.** And always split content (microCMS) from code (Kaeru).

## Phase 0 — Decide (no coding)

- Pick **1 pilot repo** (one of the Nuxt client projects).
- PM front-end: **VS Code + Claude Code extension** (chat panel — feels like an app, not
  a scary terminal). Slash commands run the same there.
- Start with **local install** (defer Codespaces/cloud).
- Set the **Slack channel** for review.
- **Confirm Claude licensing for the 2 PMs** — each person needs their own account/plan.
  This is a real cost; don't overlook it.

## Phase 1 — Set up the pilot repo

- Copy the Kaeru kit into the repo; rename `commands-for-dot-claude/` → `.claude/commands/`;
  fill placeholders (`[[PROJECT_NAME]]`, `[[STAGING_URL]]`, `[[MAIN_BRANCH]]`).
- **GitHub:** branch protection + PMs get **Write** access only + **only Amirah can merge**.
- **Vercel:** connect the repo → **preview URL per PR** (replaces manual deploys; becomes
  free "staging per change"). Prod stays on the VPS.
- Optional: 2 GitHub Actions —
  - `claude-review.yml` — auto-review each PR, post a JP/EN summary ("what changed, is it
    safe"). Needs `ANTHROPIC_API_KEY` as a repo secret.
  - `notify-staff.yml` — on merge, post a Japanese message to the PM's Slack:
    「公開されました 🎉」.

## Phase 2 — Train

- **Training repo** (a sandbox copy the PMs can't break) + PMs run **`/learn`** (Claude as
  an interactive Japanese teacher: "try changing this text", checks their work, levels up).
- Teach **microCMS** for the news pages.

## Phase 3 — Go live + refine

- PMs use it for real; Amirah reviews via **Slack → preview → merge**.
- Collect friction points, fix, then **roll out to the other repos**.

## Phase 4 — Nice-to-have (later)

- `/preview` command — start dev server + open browser preview before `/submit`.
- Friendly Japanese "before → after" summaries on every edit (instead of diffs).
- Click-on-live-preview → agent edits (see `ideas-backlog.md` #1/#2).
- LINE → PR (see `ideas-backlog.md` #4).
- A real staging environment (beyond per-PR Vercel previews).

## The Kaeru kit — what it contains

- **`CLAUDE.md`** — strict guardrails in Japanese: never push to main, always a new branch,
  small changes only, don't touch config/auth/server, must end with a PR. English notes on
  top for the dev.
- **Slash commands** (English names, Japanese instructions inside):
  - `/start` — pull latest main, create a new branch, ready to work
  - `/edit-text`, `/edit-image`, `/edit-color` — task-specific edits; git fully hidden
  - `/submit` — commit, push, open a PR to staging (does **not** merge — dev merges), returns a link
  - `/help` — explains/repairs errors & conflicts gently, produces a Japanese memo to forward to the dev
  - `/learn` — interactive Japanese lessons
- **`TUTORIAL.ja.md`** — a short 5-step Japanese checklist, based on the **VS Code chat
  panel** (not a generic terminal).
- Two safety layers: guardrails **in the repo** (`.claude/`, `CLAUDE.md`) **and** GitHub
  branch protection (so even if the agent errs, GitHub blocks main).

### Make it framework-agnostic (cracked mini-version of idea #1)

Don't hand-write the framework map per repo. Add a **`/setup`** command the dev runs once
per repo — it scans the repo, detects the framework (reads `package.json` + folder
structure), and writes the "where things live"（どこに何があるか）section + fills placeholders
in `CLAUDE.md` automatically. Edit commands stay framework-neutral (no hardcoded `.vue`).
→ One kit, any framework (Nuxt, Astro, Next, plain HTML). Only the "where things live"
section differs per repo.

## Review flow (realistic, free)

```
PM: /start → /edit-text (or image/layout) → /submit
   → PR + Vercel preview URL + Claude auto-review summary into Amirah's Slack
Amirah: tap link → view preview → merge on GitHub
   → on-merge Action → Japanese message to PM: 「公開されました 🎉」
```

- The official **GitHub Slack app cannot approve/merge from Slack** — it's notifications +
  light commands only. Path: Slack notification → tap link → open PR on GitHub → merge
  there (still one-tap-ish, works from phone). **Axolo** (paid third-party) *can* merge in
  Slack if that ever becomes daily work. Custom "LGTM" auto-merge is possible but more glue
  to maintain — start with the button version, zero custom code.
