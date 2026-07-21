---
description: (Maintainer) Sync this repo's canonical .github templates into the plugin's bundled assets, so /octo:setup stays current
allowed-tools: Bash(cp:*), Bash(ls:*), Bash(diff:*), Read
---

# /octo:sync-templates

Run this **inside the kaeru-plugins repo** after you edit the canonical templates in
`.github/`. It refreshes the bundled copies in `plugins/octo/assets/` that
`/octo:setup` scaffolds into other repos — closing the drift between the two.

## Steps
1. Diff the canonical sources against the bundled assets:
   - `.github/ISSUE_TEMPLATE/` vs `plugins/octo/assets/ISSUE_TEMPLATE/`
   - `.github/workflows/` vs `plugins/octo/assets/workflows/`
   - `.github/release-drafter-config.yml`, `.github/RELEASE_PR_TEMPLATE`
2. Show what differs.
3. Copy the canonical `.github/` versions into `plugins/octo/assets/` (overwrite the bundled copies).
4. Report what changed and remind the user to commit.

Direction is always **`.github/` → assets** (the repo's live templates are the source of truth).
