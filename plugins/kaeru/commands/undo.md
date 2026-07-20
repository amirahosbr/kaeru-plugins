---
description: Undo the last change safely — for when you want to go back
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git restore:*), Bash(git checkout:*), Bash(git revert:*), Read
---

Reply to the user in their own language (Japanese or English). Keep it simple and
reassuring — mistakes are easy to undo, there's nothing to worry about.

## Rules (always)
- Only undo the user's own recent work on their current branch. Never touch `main`.
- Never rewrite history that's already been pushed / submitted. If a change is already in a
  PR, undo it with a NEW reverting change — not by erasing history. **Never force-push.**
- Always show what you're about to undo, and confirm, before doing it.

## Steps
1. Look at what changed recently: unsaved edits (`git status`, `git diff`) and the latest
   commit on this branch (`git log -1`).
2. Tell the user, in plain words, what the most recent change was, and ask which one they
   want to undo (or confirm it's the latest).
3. Undo safely:
   - **Unsaved edits** → restore the file(s) to how they were (`git restore <file>`).
   - **A saved change not yet submitted** → revert it (prefer `git revert`, so nothing is lost).
   - **Already in a PR** → make a new change that puts it back; have them re-check with
     `/kaeru:preview`.
4. Confirm in plain words that it's undone, and suggest `/kaeru:preview` to see the result.

If anything is unclear or feels risky, stop and use `/kaeru:help`.
