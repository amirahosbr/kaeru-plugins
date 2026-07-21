# kaeru-plugins 🐸

Amirah's Claude Code **plugin marketplace**. It hosts two plugins:

| Plugin | What it does |
|--------|--------------|
| **kaeru** | Lets non-technical people safely edit a website's text, images, and colors — in their own language — and submit a PR for the developer to review. Git is hidden; it never merges. |
| **octo** | Issue → PR → CI helpers for the developer, including `/octo:setup` which scaffolds the issue/PR templates into any repo. |

> This is **not** a website or an app you "run". It's a set of commands you install into
> Claude Code and then type (e.g. `/kaeru:start`).

---

## How to use it (start here)

### Requirements
- **Claude Code** installed ([claude.com/claude-code](https://claude.com/claude-code))
- **git** and the **GitHub CLI** (`gh`) — logged in (`gh auth login`)
- **Node** (and **bun** or npm) — only needed for the live preview
- First time only, for preview screenshots: `npx playwright install chromium`

> Setting up a fresh machine? Run the one-command installer in [`setup/`](./setup)
> (`install-macos.sh` or `install-windows.ps1`) — it installs everything above.

### Step 1 — Install the plugin (once)
Open Claude Code and type:

```
/plugin marketplace add amirahosbr/kaeru-plugins
/plugin install kaeru@kaeru-plugins
/reload-plugins
```

*(Testing locally before it's pushed to GitHub? Use the folder path instead:*
`/plugin marketplace add /Users/amirah/Developer/person/kaeru`*)*

### Step 2 — Prepare a project (developer, once per website)
Open Claude Code **inside the website's project folder**, then:

```
/kaeru:setup
```

This looks at the project and writes a small map (`.kaeru/where.md`) so the edit commands
know where the text, images, and colors live.

### Step 3 — Make a change (this is what the non-tech user does)
Still inside the project, just type these one at a time:

```
/kaeru:start              → opens a fresh, safe workspace
/kaeru:edit-text          → say what to change, e.g. "change the homepage heading to Welcome"
/kaeru:preview            → see the change live in the browser
/kaeru:submit             → sends it to the developer to review (opens a PR — never merges)
```

That's it. You describe changes in plain words; Claude replies in your language (Japanese or
English) and hides all the git details.

### If something goes wrong
- `/kaeru:status` — "is my change OK?" (checks, review, conflicts, in plain words)
- `/kaeru:fix` — a check failed? explains it and fixes the simple ones
- `/kaeru:undo` — go back safely
- `/kaeru:help` — explains any error and writes a note for the developer

See the full command list in **[plugins/kaeru/README.md](./plugins/kaeru/README.md)**.

---

## For developers

- Plugin sources live in [`plugins/`](./plugins); the marketplace is `.claude-plugin/marketplace.json`.
- Planning, decisions (D1–D27), and architecture are in [`docs/planning/`](./docs/planning).
- Changes are tracked in [`CHANGELOG.md`](./CHANGELOG.md).
- This repo uses an issue-driven GitHub flow (issue → auto PR → CI → CalVer release). The
  same flow can be dropped into any repo with `/octo:setup`.

## License
See [LICENSE](LICENSE) if present.
