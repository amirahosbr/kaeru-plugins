---
description: Cut a release using this repo's flow (main → release-candidate PR → release branch → published release)
allowed-tools: Bash(gh pr list:*), Bash(gh pr view:*), Bash(gh release list:*), Bash(gh release view:*), Bash(git log:*), Read
---

# /octo:release

Helps cut a release. The workflows do the heavy lifting — this command shows the state and
guides the next step.

## The flow
`main` → **Prepare Release** opens a release-candidate PR → merge it into `release` →
**Release** deploys and publishes a CalVer GitHub release (notes via release-drafter).

## Steps
1. Show what's pending: recent merges to `main` not yet released (`git log`), and any open
   release-candidate PR (`gh pr list --label release-candidate`).
2. Explain the state in plain words.
3. If a release-candidate PR is open and looks good, guide the user to review and merge it —
   the Release workflow publishes automatically.
4. If none exists, remind them that pushing to `main` triggers Prepare Release to open one.

Don't force anything manually; let the workflows run.

## Plain-language notes for makers

Before the release-candidate PR is merged, draft the public notes — the text that
lands on the GitHub Release and, from there, on the download page and the
"What's new" list. Their reader is the person the product is for: someone who
makes things and does not read code. Write in the same voice as the landing
page, not in the voice of a changelog.

Take the `[Unreleased]` section of `CHANGELOG.md` as the source (or the merged
PR titles if there is none), and rewrite each item so that it:

- **Leads with what changed for the person**, as one sentence they could say
  back to a friend: "Kaeru now reads replies aloud in your own voice." Not
  "Add ElevenLabs TTS provider."
- **Names things by what they do**, never by their part in the code. No file
  paths, no module names, no commit words (`fix`, `refactor`, `feat`), no
  vendor jargon unless the person chose that vendor in Settings.
- **Says where to find it** when it is a setting or a button: "Settings › AI ›
  Spoken replies".
- **Keeps fixes short and honest**: "The project menu no longer opens in the
  corner." A fix needs no apology and no explanation of the cause.
- **Drops what makers cannot see**: internal refactors, test changes, CI. If a
  release is only those, say so in one line rather than inventing news.
- **Groups as New / Better / Fixed**, in that order, and stays under about ten
  lines. A release with thirty items has three that matter; lead with those.
- **Ends with the ship date** on its own line, `_Shipped YYYY-MM-DD._`, which the
  download page reads.

Show the draft to the user and let them edit before anything is published.
The draft is the release body; the `CHANGELOG.md` entry stays as written by the
person who made the change.

