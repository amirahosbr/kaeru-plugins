---
description: Merge a reviewed pull request (developer action) — verifies CI is green and it's approved first
allowed-tools: Bash(gh pr list:*), Bash(gh pr view:*), Bash(gh pr checks:*), Bash(gh pr merge:*)
---

# /octo:merge

Merge a PR after review. **Developer-only** — this is the one place a merge happens
(the `kaeru` plugin never merges).

## Rules
- Only merge when CI checks are green **and** the PR is approved — unless the developer
  explicitly overrides.
- Never bypass required checks on a protected branch.

## Steps
1. Identify the PR — the current branch's PR, or ask which one (`gh pr list`).
2. Show its status: checks (`gh pr checks`), review state, and mergeable/conflicts
   (`gh pr view`).
3. **Check the description** — if the PR body still has unfilled template placeholders or
   empty sections, offer to complete it with `/octo:fill-pr` before merging.
4. If checks are failing or it isn't approved, warn the developer and confirm before going on.
5. Merge (`gh pr merge`) — ask the method (default **squash**), and offer to delete the
   branch afterwards.
6. Report the result and the merge commit.
