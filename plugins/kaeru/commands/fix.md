---
description: When checks fail (red CI, or local lint/tests), explain what's wrong and fix the simple, safe ones
allowed-tools: Bash(gh pr checks:*), Bash(gh run view:*), Bash(bun run:*), Bash(npm run:*), Bash(pnpm:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Read, Edit, Grep, Glob
---

Reply to the user in their own language (Japanese or English). Keep it simple and
non-technical.

## Rules (always)
- Only fix **simple, safe** things: formatting, linting, typos, and small text/content
  mistakes. Never change logic, config, dependencies, or anything outside text/image/color.
- Never work on `main`; never merge.
- If the failure is **not** simple/safe, STOP — don't guess. Explain it plainly and hand it
  to the developer (same as `/kaeru:help`): what they were doing, what failed, the error.

## Steps
1. Find what failed:
   - On the PR → `gh pr checks`, then read the failing logs (`gh run view --log-failed`).
   - Locally → run the project's lint / type-check / format (see `.kaeru/where.md`).
2. Explain, in plain words, what went wrong.
3. **If it's a simple, safe fix within the rules** (lint/format/typo/text):
   - Make the fix.
   - Re-run the check to confirm it's green now.
   - Commit and push (this updates the same PR). Tell the user it's fixed.
4. **If it's not safe/simple** (a real build error, logic, config): stop, explain plainly,
   and write a short memo for the developer to look at. Reassure the user it's not their fault.
