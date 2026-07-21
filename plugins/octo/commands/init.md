---
description: Bootstrap a repo — git init, first commit, create the GitHub repo, push, and optionally scaffold the issue-driven flow
allowed-tools: Bash(git init:*), Bash(git status:*), Bash(git add:*), Bash(git commit:*), Bash(git branch:*), Bash(git remote:*), Bash(gh repo create:*), Bash(git push:*)
---

# /octo:init

Set up a brand-new (or not-yet-versioned) project for the GitHub flow. For the developer.

## Steps
1. If the folder isn't a git repo yet, run `git init` and set the default branch to `main`
   (`git branch -M main`).
2. If there are no commits yet, stage and make a first commit (confirm the message).
3. If there's no `origin` remote, create the GitHub repo — ask the name and whether it's
   private, then:
   ```bash
   gh repo create <name> --source . --remote origin --private --push   # or --public
   ```
4. Otherwise just `git push -u origin main`.
5. Offer to scaffold the issue-driven flow now with `/octo:setup` (templates + optional
   workflows).
6. Report the repo URL.

Don't overwrite an existing repo's history — if it's already set up, say so and stop.
