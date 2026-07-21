---
description: View or re-run CI checks for a PR or the latest workflow runs
allowed-tools: Bash(gh pr checks:*), Bash(gh run list:*), Bash(gh run view:*), Bash(gh run rerun:*)
---

# /octo:checks

## Steps
1. For a PR (current branch, or one the user names): `gh pr checks`.
2. For recent workflow runs: `gh run list`; read failures with `gh run view --log-failed`.
3. Summarize pass / fail in plain words — which check failed and why.
4. Offer to re-run failed checks: `gh run rerun <id> --failed`.
