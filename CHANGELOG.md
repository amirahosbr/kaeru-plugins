# Changelog

All notable changes to **kaeru-plugins** are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/); each plugin is versioned
in its own `plugin.json`. (GitHub Release notes are generated separately by release-drafter.)

> **Bump the version in `plugin.json` in the same commit as the change.**
> `claude plugin update` compares the declared version and stops at "already at
> the latest version" when it matches, and there is no `--force` — so content
> pushed without a bump never reaches anyone who has the plugin installed, no
> matter how often they update. It is not a formality; it is the delivery
> mechanism. CI enforces it (`plugin-version-guard.yml`).

## [Unreleased]

### Changed
- **octo 0.2.2:** `/octo:release` now drafts the public release notes in plain
  language for makers — what changed for the person, where to find it, New /
  Better / Fixed, under ten lines, ending with the ship date — from the
  changelog's Unreleased section, and shows the draft before anything is
  published. The repo's own `CHANGELOG.md` entry stays as written.

### Docs
- **Repo:** `CLAUDE.md` reoriented around the marketplace — where `plugins/kaeru`
  and `plugins/octo` live, naming (`kaeru-plugins`, `gh-flow` → `octo`), and the
  canonical reads (`README.md`, `plugins/kaeru/README.md`, `docs/kaeru-plugins.html`,
  this changelog).
- **Repo:** this changelog backfilled so the `0.2.0` notes match what actually
  landed on `main` (kaeru a11y/color/resolve; full octo command set; `/octo:fill-pr`).

## kaeru 0.3.0

### Changed
- **kaeru:** `/kaeru:submit` now writes a **plain-language pull request** instead of "a short,
  plain title and body". The PR is the approval surface, and the person approving it is often
  reading it on a phone and does not read code — so the body leads with *what changed, in one
  sentence, in the user's own words*, then the page to check, then a **変更前 → 変更後** block
  (quoted strings for text, token name + both values for color, embedded images for an image
  swap). Branch, file count, and file paths move into a collapsed `<details>` — present for the
  developer, invisible to the PM by default. Raw diffs are explicitly banned from the body.
  Title is plain language too — `トップページの見出しを変更`, not `fix(home): update h1 copy`.
- **kaeru:** `/kaeru:submit` no longer implies the preview URL can be in the PR body. It does
  not exist at `gh pr create` time (the Vercel bot comments it afterwards), so the body points
  at the comment rather than inventing a URL.

  This is the whole of Kaeru's mobile answer for now: GitHub Mobile already renders the PR and
  its approvals already satisfy branch protection, so the gap was comprehension, not device.
  (`kaeru-hq/research/uiux/implementable/UX-08-plain-language-pr-body.md`.)

### Security
- **kaeru:** `/kaeru:submit` gains `gh repo view` (read-only, for the `owner/repo` needed to
  embed before/after images) and `git diff` (to describe the change). Still no `gh pr merge`,
  ever — the plugin does not merge.

## octo 0.2.1

### Added
- **octo:** `setup-cicd` skill — scaffold the full issue-driven GitHub CI/CD pack
  (issue templates, PR template, Actions workflows, release-drafter + RELEASE_PR_TEMPLATE;
  optional githooks) into a repo that has no `.github` yet. Conversational / auto
  path for empty repos; slash equivalent remains `/octo:setup with-workflows`.

## kaeru 0.2.1

### Security
- The bundled Playwright MCP server is pinned to `@playwright/mcp@0.0.78` instead of
  `@latest`. Kaeru installs and enables this plugin for you, and `@latest` meant the
  package was resolved fresh from npm on every run — so whatever had been published
  since ran on your machine, unreviewed. Pinning trades automatic upgrades for
  knowing what executes; bumping it is now a visible, reviewable edit.

## kaeru 0.2.0, octo 0.2.0

Everything below sat unreleased on `main` behind an unchanged `0.1.0`, and so had
never reached an installed copy. Released together when versions were bumped and
the version-guard CI was added.

### Added
- **kaeru:** `/kaeru:status` — read CI checks, review state, and conflicts, explained in plain language (read-only).
- **kaeru:** `/kaeru:fix` — explain failing checks and fix the simple, safe ones (lint / format / typo); escalates anything risky to the developer.
- **kaeru:** `/kaeru:undo` — undo the last change safely; never rewrites pushed history, never force-pushes.
- **kaeru:** `/kaeru:switch` — resume another change; work is shown by PR title, and unsaved edits are kept safe (stash) before switching.
- **kaeru:** `/kaeru:edit-color` — change a color (design-token values only).
- **kaeru:** `/kaeru:resolve` — help with a merge conflict; resolve safe ones, escalate the rest.
- **kaeru:** `/kaeru:check-a11y` — basic accessibility check in plain language (alt text, contrast, labels); small safe text fixes only.
- **octo:** `/octo:setup` — scaffold `.github` issue + PR templates (and, optionally, the auto-PR / release workflows) into any repo. Canonical templates are bundled as plugin assets.
- **octo:** `/octo:init` — bootstrap a repo (git init, first commit, create GitHub repo, push; optionally run setup).
- **octo:** `/octo:config` + `/octo:whoami` — set up and show git + GitHub identity.
- **octo:** `/octo:merge` — merge a reviewed PR after verifying CI green + approval.
- **octo:** `/octo:fill-pr` — fill the PR description from the actual diff, following the repo's PR template (honest checklist; no fabrication). `/octo:merge` offers this when the body is empty.
- **octo:** `/octo:checks` — view or re-run CI checks.
- **octo:** `/octo:release` — cut a release via the repo's release flow.
- **octo:** `/octo:cleanup` — list/delete branches whose PRs are already merged.
- **octo:** `/octo:sync-templates` — (maintainer) copy canonical `.github/` templates into `plugins/octo/assets/` so setup stays current.
- **Repo:** `docs/kaeru-plugins.html` — one-page marketplace overview (command counts, install, end-to-end kaeru → PR → octo → merge → release flow).

### Changed
- **Naming:** plugin **`gh-flow` → `octo`** (commands `/octo:*`, install `octo@kaeru-plugins`, source `plugins/octo/`).
- **Repo:** renamed **`kaeru` → `kaeru-plugins`** (marketplace hosting `kaeru` + `octo`, not a single plugin). Internal references updated (settings, both `plugin.json`, README, create-issue skill).
- **kaeru:** command sources rewritten in English with **language-mirroring** — the agent replies in the user's own language (Japanese or English); Japanese is produced at runtime, not hardcoded.
- **kaeru:** uniform guardrail coverage across commands (explicit `Rules` blocks, or safe-by-nature notes for read-only / dev-only / tutorial commands). Command surface grew to **15** `/kaeru:*` commands.
- **kaeru:** `/kaeru:submit` runs the project's checks first (lint / type-check from `.kaeru/where.md`); bundled pre-commit / pre-push hooks support auto-detecting bun / pnpm / npm.
- **octo:** `create-issue` and `/octo:create-pr` now detect a missing template set and offer `/octo:setup` instead of bailing out. Octo is a full GitHub + CI/CD toolkit (**12** commands + `create-issue` skill), not only the PR fallback.
- **Repo:** root `README.md` rewritten as a plain "how to use" guide for the marketplace.

## kaeru 0.1.0 — Kaeru plugin (MVP)

### Added
- Japanese-first, guardrailed content editing for non-technical PMs; git hidden behind commands, **PR-only** (the plugin never merges).
- Commands: `/kaeru:start`, `/kaeru:edit-text`, `/kaeru:edit-image`, `/kaeru:preview`, `/kaeru:submit`, `/kaeru:help`, `/kaeru:learn`, `/kaeru:setup`.
- Framework-neutral: the per-repo map lives in `.kaeru/where.md`, written by `/kaeru:setup`.
- Playwright MCP bundled for visual before/after preview.

## octo 0.1.0 — GitHub issue-to-PR flow

*(Shipped originally as **`gh-flow` 0.1.0**; renamed to **octo** before the 0.2.0 release.)*

### Added
- `create-issue` skill — create a GitHub issue from the repo's templates.
- `/octo:create-pr` — one-shot fallback (issue → branch → PR → switch) for when the repo's auto-PR Action can't run.
