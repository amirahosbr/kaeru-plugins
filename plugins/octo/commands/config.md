---
description: Set up or fix your git + GitHub identity — name, email, and GitHub login
allowed-tools: Bash(git config:*), Bash(gh auth status:*), Bash(gh auth login:*), Bash(gh api user:*)
---

# /octo:config

Get the machine ready to make commits and PRs. Use for first-time setup, or to fix a wrong
identity.

## Rules
- Never print tokens or secrets.
- Confirm before changing **global** config (it affects every repo on the machine).

## Steps
1. **Git identity** — check `git config user.name` and `git config user.email`. If missing,
   ask the user for their name and email and set them. Ask whether to apply **globally** (all
   repos) or **locally** (just this repo):
   ```bash
   git config --global user.name "<name>"     # or without --global for this repo only
   git config --global user.email "<email>"
   ```
2. **GitHub login** — check `gh auth status`. If not logged in, guide them:
   `gh auth login` is **interactive** — launch it and have them finish in the browser. You
   can't complete this step for them.
3. **Confirm** — show a short summary (same as `/octo:whoami`) so they can see they're set.
