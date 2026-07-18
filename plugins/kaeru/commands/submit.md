---
description: Submit the change for review — open a pull request (never merges)
allowed-tools: Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(git branch:*), Bash(gh pr create:*)
---

Reply to the user in their own language (Japanese or English). Keep it simple and
non-technical.

## Rules (always)
- Never merge yourself — the developer reviews and merges.
- Never push directly to `main`. The PR base is always `main`.

## Steps
1. Review the change and write a clear commit message.
2. `git add -A && git commit`.
3. `git push -u origin <current-branch>`.
4. Open the PR with `gh pr create --base main` — a short, plain title and body describing
   what changed. **Never merge.**
5. Give the user the PR URL and tell them: the developer will review it, and the Vercel
   preview URL will appear in the PR.
