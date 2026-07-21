---
description: Show who you're acting as — git identity, GitHub account, and the current repo/branch
allowed-tools: Bash(git config:*), Bash(gh auth status:*), Bash(gh api user:*), Bash(git remote:*), Bash(git branch:*), Bash(git status:*)
---

# /octo:whoami

Read-only. Reports, in plain words:

1. **Git identity** — `git config user.name` and `git config user.email`.
2. **GitHub account** — `gh api user --jq .login` (fall back to `gh auth status`).
3. **Where you are** — the repo (`git remote get-url origin`) and current branch
   (`git branch --show-current`).
4. **Flag mismatches** — e.g. the git email doesn't match the logged-in GitHub account, or
   you're not logged in at all.

If anything is missing (no git identity, not logged in), point the user to `/octo:config`.
Never print tokens or secrets.
