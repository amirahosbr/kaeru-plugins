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
| `/kaeru:help` | PM | Explain an error gently + produce a Japanese memo for the dev |
| `/kaeru:setup` | **Dev** | Run once per repo: detect framework, write `.kaeru/where.md` |

## Design

- **Japanese-first** — all PM conversation is in Japanese.
- **Framework-neutral** — the per-repo map lives in `.kaeru/where.md` (written by
  `/kaeru:setup`), never baked into the plugin (D16).
- **PR-only** — `/kaeru:submit` opens a PR; only the developer merges (D6).
- **Guardrails inline** — each command restates the rules, so the plugin is self-contained.

## Install

```bash
/plugin marketplace add amirahosbr/kaeru      # or a local path for testing
/plugin install kaeru@kaeru-plugins
```

Or auto-enable per repo via `.claude/settings.json` (`extraKnownMarketplaces` + `enabledPlugins`).
