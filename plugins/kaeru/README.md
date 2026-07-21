# kaeru（カエル）— Claude Code plugin

Lets non-technical Japanese PMs safely edit **text, images, and colors** and submit a
**PR** for the developer to review. Git is hidden behind commands; the plugin **never merges**.

## Commands (namespaced `/kaeru:*`)

| Command | For | What it does |
|---------|-----|--------------|
| `/kaeru:start` | PM | Pull latest `main`, create a work branch (git hidden) |
| `/kaeru:edit-text` | PM | Change wording/copy |
| `/kaeru:edit-image` | PM | Swap an image |
| `/kaeru:preview` | PM | Run the dev server + open the browser to self-check |
| `/kaeru:submit` | PM | Commit, push, open a PR to `main` (does **not** merge) |
| `/kaeru:status` | PM | Check if the change is OK — CI checks, review, conflicts, in plain words |
| `/kaeru:fix` | PM | When checks fail, explain and fix the simple/safe ones (lint/format/typo) |
| `/kaeru:undo` | PM | Undo the last change safely — easy to go back |
| `/kaeru:switch` | PM | Switch to or resume another change you were working on |
| `/kaeru:edit-color` | PM | Change a color (design-token values only) |
| `/kaeru:resolve` | PM | Help with a merge conflict — safe ones only, else escalate |
| `/kaeru:check-a11y` | PM | Check the change is easy for everyone (basic accessibility) |
| `/kaeru:help` | PM | Explain an error gently + produce a memo for the dev |
| `/kaeru:learn` | PM | Interactive guided tutorial — practice the whole flow |
| `/kaeru:setup` | **Dev** | Run once per repo: detect framework, write `.kaeru/where.md` |

## Design

- **Language-mirroring** — replies to the PM in whatever language they write (Japanese or English).
- **Framework-neutral** — the per-repo map lives in `.kaeru/where.md` (written by
  `/kaeru:setup`), never baked into the plugin (D16).
- **PR-only** — `/kaeru:submit` opens a PR; only the developer merges (D6).
- **Guardrails inline** — each command restates the rules, so the plugin is self-contained.

## Install

```bash
/plugin marketplace add amirahosbr/kaeru-plugins   # or a local path for testing
/plugin install kaeru@kaeru-plugins
```

Or auto-enable per repo via `.claude/settings.json` (`extraKnownMarketplaces` + `enabledPlugins`).
