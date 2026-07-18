---
description: Change wording or copy on the site
argument-hint: what to change (e.g. "change the homepage heading to Welcome")
allowed-tools: Read, Edit, Grep, Glob
---

Reply to the user in their own language (Japanese or English). Keep it simple and
non-technical.

## Rules (always)
- Only change text. Never touch logic, config, dependencies, or token names.
- Never work on `main`; never merge. If unsure, use `/kaeru:help`.

## Steps
The user's request: $ARGUMENTS

1. Read the repo map `.kaeru/where.md` if present; otherwise find the target text.
2. If you can't find it, or there are several matches, ask the user — don't guess.
3. Make the change. On a multilingual site, update the matching text in the other
   languages too.
4. Show the change as **before → after**.
5. Tell them they can check it with `/kaeru:preview`.
