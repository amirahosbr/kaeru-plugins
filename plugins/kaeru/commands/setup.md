---
description: (Developer, once per repo) Detect the framework and write .kaeru/where.md
allowed-tools: Read, Glob, Grep, Write, Bash(ls:*), Bash(cat:*)
---

For the **developer** to run once when adding Kaeru to a repo — not for PMs.

Keep the edit commands framework-neutral; only this per-repo map differs (D16).

## Steps
1. Detect the stack: read `package.json` (deps + scripts), lockfiles, and the folder layout.
2. Write `.kaeru/where.md` for THIS repo, describing:
   - UI text location(s) — i18n message files and/or components
   - Images / static assets location
   - Colors / design tokens location (values only)
   - Dev server command + local URL
   - Package manager
   - PR base branch
3. Confirm the map back to the developer.
