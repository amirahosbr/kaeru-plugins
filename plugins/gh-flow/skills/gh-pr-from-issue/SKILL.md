---
name: gh-pr-from-issue
description: Manual fallback to create a branch and open a pull request linked to an existing GitHub issue, for when the repo's own auto-PR Action cannot run (eg out of Actions minutes). For repos scaffolded from the amirahosbr/kaeru issue-driven template.
---

# Create PR From Issue (manual fallback)

This template's repos auto-create the branch and PR by themselves the moment an issue is opened, via `.github/workflows/start-pull-request.yml`, no manual step needed beyond `gh-issue-from-template`. Only use this skill when that Action is not running (Actions minutes exhausted, workflow disabled, etc). Once Actions is healthy again, this skill is not needed for regular issues.

Use this after an issue already exists (see the `gh-issue-from-template` skill) and the code change for it is sitting locally, ready to send off. The person using this may not know git or GitHub terms, so handle every git/gh step yourself. Never ask them to run a git command, only ask what changed if that is not already clear from the conversation.

## Steps

1. Confirm the issue number. If unclear, look it up with `gh issue list` and match by title/topic.
2. Get the issue title: `gh issue view <num> --json title -q .title`
3. Create and switch to a new branch, this template's naming convention is `i<issue-num>-<YYYYMMDD-HHMM>`:

   ```bash
   git checkout -b "i<num>-$(date +%Y%m%d-%H%M)"
   ```
4. Stage and commit the pending changes with a short, plain-language message, then push:

   ```bash
   git add -A
   git commit -m "<short message describing the change>"
   git push -u origin HEAD
   ```
5. Open the PR, filled simply, one or two sentences per section is enough:

   ```bash
   gh pr create \
     --title "<issue title>" \
     --body "$(cat <<EOF
   ## What

   <one or two sentences>

   ## Why

   Closes #<num>

   ## Testing

   - [ ] Manual smoke-test of the affected feature
   EOF
   )"
   ```
6. Report back in plain language: the change is sent off and waiting for review, with the PR link. Do not mention branches, commits, or git terms in that summary.

Note: no CI check or reviewer ping here, that is a separate skill, not built yet.
