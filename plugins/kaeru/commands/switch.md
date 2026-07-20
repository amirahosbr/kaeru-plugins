---
description: Switch to or resume another change you were working on
allowed-tools: Bash(git status:*), Bash(git stash:*), Bash(git switch:*), Bash(git branch:*), Bash(git pull:*), Bash(gh pr list:*)
---

Reply to the user in their own language (Japanese or English). Keep it simple — refer to
work by its plain title, not by branch names.

## Rules (always)
- Never lose the user's current work. If they have unsaved edits, keep them safe first, and
  tell them.
- Never use `main` as a workspace; never merge.

## Steps
1. Check for unsaved changes (`git status`). If there are any, offer to keep them safe first
   (`git stash`, or finish/submit the current one) and explain plainly what you did.
2. Show the user their in-progress work in friendly terms — list their open PRs by title
   (`gh pr list --author @me`) and any work branches. Hide the raw git jargon.
3. Ask which one they want to go back to.
4. Switch to it (`git switch <branch>`) and pull the latest if needed.
5. Confirm in plain words: "You're back on '<title>' — you can keep editing." If you stashed
   something, remind them it's saved and that you can bring it back anytime.

If anything is unclear, use `/kaeru:help`.
