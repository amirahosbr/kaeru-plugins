# Changelog

All notable changes to **kaeru-plugins** are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/); each plugin is versioned
in its own `plugin.json`. (GitHub Release notes are generated separately by release-drafter.)

## [Unreleased]

### Added
- **kaeru:** `/kaeru:status` — read CI checks, review state, and conflicts, explained in plain language (read-only).
- **kaeru:** `/kaeru:fix` — explain failing checks and fix the simple, safe ones (lint / format / typo); escalates anything risky to the developer.
- **kaeru:** `/kaeru:undo` — undo the last change safely; never rewrites pushed history, never force-pushes.
- **kaeru:** `/kaeru:switch` — resume another change; work is shown by PR title, and unsaved edits are kept safe (stash) before switching.
- **octo:** `/octo:setup` — scaffold `.github` issue + PR templates (and, optionally, the auto-PR / release workflows) into any repo. Canonical templates are bundled as plugin assets.

### Changed
- **kaeru:** command sources rewritten in English with **language-mirroring** — the agent replies in the user's own language (Japanese or English); Japanese is produced at runtime, not hardcoded. Maintainable by a non-Japanese-reading developer.
- **kaeru:** uniform guardrail coverage across all 12 commands (explicit `Rules` blocks, or safe-by-nature notes for read-only / dev-only / tutorial commands).
- **octo:** `create-issue` and `/octo:create-pr` now detect a missing template set and offer `/octo:setup` instead of bailing out.
- **Repo:** renamed `kaeru` → `kaeru-plugins` (it's a marketplace hosting `kaeru` + `octo`, not a single plugin). Internal references updated (settings, both `plugin.json`, README, create-issue skill).

## kaeru 0.1.0 — Kaeru plugin (MVP)

### Added
- Japanese-first, guardrailed content editing for non-technical PMs; git hidden behind commands, **PR-only** (the plugin never merges).
- Commands: `/kaeru:start`, `/kaeru:edit-text`, `/kaeru:edit-image`, `/kaeru:preview`, `/kaeru:submit`, `/kaeru:help`, `/kaeru:learn`, `/kaeru:setup`.
- Framework-neutral: the per-repo map lives in `.kaeru/where.md`, written by `/kaeru:setup`.
- Playwright MCP bundled for visual before/after preview.

## octo 0.1.0 — GitHub issue-to-PR flow

### Added
- `create-issue` skill — create a GitHub issue from the repo's templates.
- `/octo:create-pr` — one-shot fallback (issue → branch → PR → switch) for when the repo's auto-PR Action can't run.
