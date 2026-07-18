---
description: Start a new change — pull the latest main and open a fresh work branch
allowed-tools: Bash(git status:*), Bash(git checkout:*), Bash(git switch:*), Bash(git pull:*), Bash(date:*)
---

Reply to the user in their own language (they may write in Japanese or English). Keep it
simple — avoid git and technical jargon.

## Rules (always)
- Only text, images, and color values may change. Never touch logic, config, dependencies,
  `.github/`, or env vars.
- Never work directly on `main` (always a new branch). Never merge yourself — the developer
  reviews.
- If unsure, stop and ask, or point to `/kaeru:help`.

## Steps
1. If there are unsaved changes, tell the user and confirm before continuing.
2. Run `git checkout main && git pull` to get the latest.
3. Create a new branch named `edit/YYYYMMDD-HHmm-<short-english-slug>`
   (e.g. `edit/20260706-1030-hero-text`; get the date via `date '+%Y%m%d-%H%M'`).
   The `edit/` prefix is configurable per repo.
4. Tell the user you're ready and ask what they'd like to change — in plain words, keeping
   the git details hidden.
