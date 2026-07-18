---
description: Create an issue from template, branch it, and open a PR, then stay on that branch ready to work.
argument-hint: what changed (e.g. "fix the broken submit button on the pricing page")
allowed-tools: Bash(gh issue create:*), Bash(gh issue view:*), Bash(git checkout:*), Bash(git commit:*), Bash(git push:*), Bash(gh pr create:*), Bash(date:*)
---

# /create-pr

One-shot fallback for when this repo's `start-pull-request.yml` Action cannot run (Actions
minutes exhausted, workflow disabled, etc). Normally the Action does everything from the
branch onward the moment an issue opens - use the standalone `create-issue` skill alone in
that case. Only reach for this command when that automation is not firing.

Does the full chain yourself: issue, branch, empty commit, push, PR - then leaves the
person on that branch so they can start making the actual change right away, the same
place they'd be in if the Action had run.

## Steps

0. **If this repo has no `.github/ISSUE_TEMPLATE/`**, its labels and templates don't exist
   yet — offer to run `/gh-flow:setup` first (scaffolds them), or proceed with a plain issue
   and a generic label.
1. From `$ARGUMENTS` (or the conversation if empty), work out what changed and pick the
   matching template: Addition, Modification, Refactoring, Fix, Epic, or Idea. Ask if unclear.
   `epic` and `idea` never get a PR - stop after the issue for those.
2. Create the issue, filled simply (one or two sentences), same shape as `create-issue`:

   ```bash
   gh issue create --title "<title>" --label "<label>" --body "<short body>"
   ```

   Capture the returned issue number and title.
3. Create and switch to a new branch, this template's convention is
   `i<issue-num>-<YYYYMMDD-HHMM>`:

   ```bash
   git checkout -b "i<num>-$(date +%Y%m%d-%H%M)"
   ```
4. Make the initial commit and push, mirroring what the Action would have done:

   ```bash
   git commit --allow-empty -m "Initial commit for the issue #<num>"
   git push origin HEAD
   ```
5. Open the PR, body filled simply:

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
6. Report back in plain language: issue link, PR link, and that they're now on the new
   branch and can go ahead and make the change - further commits just update this same PR.

If the person invoking this may not know git/GitHub terms, handle every step yourself and
report back without mentioning branches or commits.
