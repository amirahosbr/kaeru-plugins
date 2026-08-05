---
name: setup-cicd
description: Scaffold the issue-driven GitHub CI/CD flow into a repo that has no .github templates yet — issue templates, PR template, Actions workflows, and release config from the octo plugin assets. Use when a repo is empty of CI/CD, missing .github, or the user asks to set up CI/CD / GitHub Actions / issue-driven flow (e.g. Ripple or any fresh repo).
---

# Setup CI/CD (full pack)

Scaffolds the issue-driven GitHub flow into this repo — issue templates, PR template,
Actions workflows, and release config. Bundled sources live in
`${CLAUDE_PLUGIN_ROOT}/assets/` (same as `/octo:setup with-workflows`).

This skill is the conversational / auto-trigger path when a repo is empty of CI/CD
or the user asks to set up CI/CD. The slash equivalent is `/octo:setup with-workflows`.

## Steps

1. **Check existing setup first.** If `.github/ISSUE_TEMPLATE/` already exists, tell the
   user it's already scaffolded and ask before touching anything. Never clobber silently
   (`cp -n`). If they only want workflows (templates already present), skip to step 3
   and install workflows only with `cp -n`.

2. **Full pack (default) — issue + PR templates, then workflows + release config:**
   ```bash
   mkdir -p .github/ISSUE_TEMPLATE
   cp -n "${CLAUDE_PLUGIN_ROOT}/assets/ISSUE_TEMPLATE/"*.yml .github/ISSUE_TEMPLATE/
   cp -n "${CLAUDE_PLUGIN_ROOT}/assets/pull_request_template.md" .github/pull_request_template.md

   mkdir -p .github/workflows
   cp -n "${CLAUDE_PLUGIN_ROOT}/assets/workflows/"*.yml .github/workflows/
   cp -n "${CLAUDE_PLUGIN_ROOT}/assets/release-drafter-config.yml" .github/release-drafter-config.yml
   cp -n "${CLAUDE_PLUGIN_ROOT}/assets/RELEASE_PR_TEMPLATE" .github/RELEASE_PR_TEMPLATE
   ```
   (`cp -n` never overwrites an existing file.)

3. **Workflows only** (when templates already exist and the user confirms they want
   Actions / release config without re-copying templates):
   ```bash
   mkdir -p .github/workflows
   cp -n "${CLAUDE_PLUGIN_ROOT}/assets/workflows/"*.yml .github/workflows/
   cp -n "${CLAUDE_PLUGIN_ROOT}/assets/release-drafter-config.yml" .github/release-drafter-config.yml
   cp -n "${CLAUDE_PLUGIN_ROOT}/assets/RELEASE_PR_TEMPLATE" .github/RELEASE_PR_TEMPLATE
   ```

4. **Warn the user**, plainly:
   - Pushing workflow files needs the **`workflow`** scope on their GitHub token
     (`gh auth refresh -s workflow` if the push is rejected).
   - `run-tests.yml` and `release.yml` ship with **placeholder** build/test/deploy steps to fill in.
   - The `release` branch is created automatically on the first release run.

5. **Pre-commit / pre-push checks (optional).** If the user wants checks to run
   automatically before every commit and push:
   ```bash
   mkdir -p .githooks
   cp "${CLAUDE_PLUGIN_ROOT}/assets/githooks/"* .githooks/
   chmod +x .githooks/*
   git config core.hooksPath .githooks
   ```
   This runs `lint` + `typecheck` before a commit and `test` before a push (auto-detecting
   bun / pnpm / npm; skipped once with `--no-verify`). Tell the user checks are now automatic.

6. **Report** what was created (list the files), then point to next steps: create an
   issue with the `create-issue` skill, or run `/octo:create-pr` for the one-shot fallback.

If the person isn't technical, keep it plain — don't dwell on git/workflow jargon.
Mention `gh` where relevant for auth and scope.
