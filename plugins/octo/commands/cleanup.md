---
description: Tidy up merged branches — list and delete branches whose PRs are already merged
allowed-tools: Bash(git branch:*), Bash(git fetch:*), Bash(gh pr list:*), Bash(git push:*), Bash(git switch:*)
---

# /octo:cleanup

## Rules
- Only delete branches whose PR is **merged**, or that the user explicitly confirms.
- Never delete `main` or `release`, and never delete unmerged work.

## Steps
1. `git fetch --prune` to drop stale remote refs.
2. Find local branches whose PR is merged (cross-check `gh pr list --state merged`).
3. Show the list and confirm before deleting.
4. Delete merged branches locally (`git branch -d`), and offer to delete the remotes too
   (`git push origin --delete <branch>`).
