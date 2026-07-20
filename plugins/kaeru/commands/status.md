---
description: Check whether the current change is OK — CI checks, review status, and conflicts, explained simply
allowed-tools: Bash(gh pr view:*), Bash(gh pr checks:*), Bash(gh pr status:*), Bash(git status:*), Bash(git fetch:*), Read
---

Reply to the user in their own language (Japanese or English). Keep it simple and
non-technical. This command only **reads** status — it never changes anything.

## Steps
1. Find the pull request for the current branch (`gh pr status` or `gh pr view`). If there's
   no PR yet, tell the user their change hasn't been submitted — they can use `/kaeru:submit`.
2. Read three things:
   - **Tests / checks** — `gh pr checks`
   - **Review** — is it waiting, approved, or are changes requested?
   - **Conflicts** — is the PR mergeable, or does it clash with the latest `main`?
3. Explain each in plain words with a simple marker:
   - ✅ tests passed / ⏳ still running / ⚠️ tests failed
   - ⏳ waiting for the developer / ✅ approved / ✏️ changes requested
   - ✅ no conflicts / ⚠️ conflicts with the latest site
4. Tell them what to do next, gently:
   - All good → "Nothing to do — the developer will review it."
   - Tests failed → suggest `/kaeru:fix`.
   - Conflicts or anything confusing → suggest `/kaeru:help`.
