---
description: Scaffold the issue-driven GitHub flow into this repo — issue templates + PR template, and optionally the auto-PR / release workflows. Use when a repo has no .github issue templates yet.
argument-hint: add "with-workflows" to also install the Actions (auto-PR, tests, release)
allowed-tools: Bash(mkdir:*), Bash(cp:*), Bash(ls:*), Bash(test:*), Bash(echo:*), Read
---

# /octo:setup

Scaffolds this repo so the `create-issue` skill and `/octo:create-pr` work — even on a
repo that has none of the templates yet. Bundled sources live in `${CLAUDE_PLUGIN_ROOT}/assets/`.

## Steps

1. **Check existing setup first.** If `.github/ISSUE_TEMPLATE/` already exists, tell the user
   it's already scaffolded and ask before touching anything. Never clobber silently.

2. **Issue + PR templates (always):**
   ```bash
   mkdir -p .github/ISSUE_TEMPLATE
   cp -n "${CLAUDE_PLUGIN_ROOT}/assets/ISSUE_TEMPLATE/"*.yml .github/ISSUE_TEMPLATE/
   cp -n "${CLAUDE_PLUGIN_ROOT}/assets/pull_request_template.md" .github/pull_request_template.md
   ```
   (`cp -n` never overwrites an existing file.)

3. **Workflows (optional).** Only if `$ARGUMENTS` contains `with-workflows`, or the user
   confirms when you ask:
   ```bash
   mkdir -p .github/workflows
   cp -n "${CLAUDE_PLUGIN_ROOT}/assets/workflows/"*.yml .github/workflows/
   cp -n "${CLAUDE_PLUGIN_ROOT}/assets/release-drafter-config.yml" .github/release-drafter-config.yml
   cp -n "${CLAUDE_PLUGIN_ROOT}/assets/RELEASE_PR_TEMPLATE" .github/RELEASE_PR_TEMPLATE
   ```
   Then warn the user, plainly:
   - Pushing workflow files needs the **`workflow`** scope on their GitHub token
     (`gh auth refresh -s workflow` if the push is rejected).
   - `run-tests.yml` and `release.yml` ship with **placeholder** build/test/deploy steps to fill in.
   - The `release` branch is created automatically on the first release run.

4. **Pre-commit / pre-push checks (optional).** If the user wants checks to run automatically
   before every commit and push:
   ```bash
   mkdir -p .githooks
   cp "${CLAUDE_PLUGIN_ROOT}/assets/githooks/"* .githooks/
   chmod +x .githooks/*
   git config core.hooksPath .githooks
   ```
   This runs `lint` + `typecheck` before a commit and `test` before a push (auto-detecting
   bun / pnpm / npm; skipped once with `--no-verify`). Tell the user checks are now automatic.
5. **Report** what was created (list the files), then point to next steps: create an issue with
   the `create-issue` skill, or run `/octo:create-pr` for the one-shot fallback.

If the person isn't technical, keep it plain — don't dwell on git/workflow jargon.
