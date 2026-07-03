# Template

GitHub repository template with issue-driven workflow, automated pull requests, CI, and CalVer-based releases.

## Overview

- **Issue templates** for Addition, Modification, Refactoring, Fix, Epic, and Idea
- **Auto PR creation** when an issue is assigned (except for idea/epic)
- **CI** on pull requests (with `ci-testing` label) and on push to `main`
- **Release flow**: `main` → release PR → `release` branch → deploy and publish release notes (CalVer)

## Branches

| Branch   | Purpose |
|----------|--------|
| `main`   | Default branch. Feature PRs target this. Pushing here triggers a release-candidate PR to `release`. |
| `release`| Production branch. Merging the release-candidate PR here runs deployment and publishes the release. |

The `release` branch is created automatically on the first run of **Prepare Release** if it does not exist.

## Workflows

### Start Pull Request

- **Trigger:** Issue assigned
- **Behavior:** Creates a branch and pull request linked to the issue (skipped for issues labeled `idea` or `epic`)

### Run Tests

- **Trigger:** Push to `main`, or pull request with `ci-testing` label (e.g. when review is requested)
- **Behavior:** Runs build and tests (replace placeholder step with your real test commands)

### Prepare Release

- **Trigger:** Push to `main`
- **Behavior:** Ensures `release` exists; opens/updates a release-candidate PR from `main` to `release` using [git-pr-release](https://github.com/motemen/git-pr-release) (PRs must have label `release-candidate`)

### Release

- **Trigger:** Merge of a PR into `release`
- **Behavior:** Runs deployment, then drafts and publishes a GitHub release with CalVer version and changelog from [release-drafter](https://github.com/release-drafter/release-drafter)

## Issue types and release notes

Release notes are generated from PR labels:

- `addition` → Addition
- `modification` → Modification
- `refactoring` → Refactoring
- `fix` → Fix

Use the matching issue template so PRs get the right label when created from an issue.

## Setup

1. Use this repo as a template or copy the `.github/` directory into your project.
2. In **Run Tests**, replace the placeholder step with your real build/test commands.
3. In **Release**, replace the deployment placeholder with your deployment steps.
4. If your default branch is not `main`, update the branch names in the workflows accordingly.

## License

See [LICENSE](LICENSE) if present.
