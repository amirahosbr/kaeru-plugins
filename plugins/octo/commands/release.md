---
description: Cut a release using this repo's flow (main → release-candidate PR → release branch → published release)
allowed-tools: Bash(gh pr list:*), Bash(gh pr view:*), Bash(gh release list:*), Bash(gh release view:*), Bash(git log:*)
---

# /octo:release

Helps cut a release. The workflows do the heavy lifting — this command shows the state and
guides the next step.

## The flow
`main` → **Prepare Release** opens a release-candidate PR → merge it into `release` →
**Release** deploys and publishes a CalVer GitHub release (notes via release-drafter).

## Steps
1. Show what's pending: recent merges to `main` not yet released (`git log`), and any open
   release-candidate PR (`gh pr list --label release-candidate`).
2. Explain the state in plain words.
3. If a release-candidate PR is open and looks good, guide the user to review and merge it —
   the Release workflow publishes automatically.
4. If none exists, remind them that pushing to `main` triggers Prepare Release to open one.

Don't force anything manually; let the workflows run.
