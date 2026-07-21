---
description: Fill in a PR's description from the actual changes, following the repo's PR template — before review/merge
allowed-tools: Bash(gh pr view:*), Bash(gh pr diff:*), Bash(gh pr list:*), Bash(gh pr edit:*), Bash(git log:*), Read
---

# /octo:fill-pr

Write a PR's description for the developer, using the repo's PR template and what actually
changed. Run it before review or merge.

## Steps
1. Identify the PR — the current branch's, or ask which one (`gh pr list`).
2. Gather the facts:
   - the diff (`gh pr diff`),
   - the commits (`git log`),
   - the linked issue, if any (`gh pr view`).
3. Read the repo's PR template — `.github/pull_request_template.md` (fall back to the
   sections already in the PR body). Typical sections: **What · Why · Testing · Notes**.
4. Fill each section concisely from the real diff:
   - **What** — what changed, in plain terms.
   - **Why** — the reason; link the issue as `Closes #<n>` if there is one.
   - **Testing** — a sensible checklist. **Be honest** — leave boxes unchecked for anything
     not actually verified; don't invent tests.
   - **Notes** — anything a reviewer should know (risks, follow-ups, screenshots).
5. Update the PR: `gh pr edit <n> --body "<filled description>"`.
6. Show the filled description and confirm with the developer.

Never fabricate testing or claims — the description must match what really happened.
