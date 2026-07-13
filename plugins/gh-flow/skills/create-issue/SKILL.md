---
name: create-issue
description: Create a GitHub issue using this repo's issue templates, with the fields filled in from the conversation. For repos scaffolded from the amirahosbr/kaeru issue-driven template.
---

# Create GitHub Issue From Template

This template's issue templates live in `.github/ISSUE_TEMPLATE/`:

- `TMPL_01_ADDITION.yml` - new feature (label: addition)
- `TMPL_02_MODIFICATION.yml` - change to existing behavior (label: modification)
- `TMPL_03_REFACTORING.yml` - internal restructuring, no behavior change (label: refactoring)
- `TMPL_04_FIX.yml` - bug fix (label: fix)
- `TMPL_05_EPIC.yml` - umbrella issue, no PR follows (label: epic)
- `TMPL_06_IDEA.yml` - idea or proposal, no PR follows (label: idea)

If the repo does not have these templates, this skill does not apply.

## Steps

1. From the conversation, work out what changed and pick the matching template above. Ask the user if it is not clear.
2. Write a short, plain title describing the change. This doubles as the future PR title.
3. Fill the fields simply, one or two sentences is enough, no need for exhaustive detail:
   - Requirement: what changed and why.
   - Notes: leave "Related Issues" as a placeholder if there is none yet.
4. Create the issue:

   ```bash
   gh issue create \
     --title "<title>" \
     --label "<label from the list above>" \
     --body "$(cat <<'EOF'
   ### Requirement

   <one or two sentences>

   #### Related Issues

   (URL or issue no here)
   EOF
   )"
   ```

5. Report the issue URL and number back to the user.

Do not assign anyone or open a PR here, that is the `/create-pr` command. `epic` and `idea` issues never get a PR.

Use this on its own only when the repo's `start-pull-request.yml` Action is healthy (it auto-creates the branch and PR once the issue opens). If Actions can't run right now, use `/create-pr` instead, which does this same step plus everything after it.
