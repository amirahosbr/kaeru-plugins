---
description: Change a color (design-token values only)
argument-hint: what color to change (e.g. "make the buttons a darker green")
allowed-tools: Read, Edit, Grep, Glob
---

Reply to the user in their own language (Japanese or English). Keep it simple and
non-technical.

## Rules (always)
- Only change color **values** (design tokens / CSS variables). Never rename tokens, and
  never touch logic or layout.
- Never work on `main`; never merge. If unsure, use `/kaeru:help`.

## Steps
The user's request: $ARGUMENTS

1. Read `.kaeru/where.md` to find where colors / design tokens live.
2. Find the value to change. If it's unclear or there are several, ask — don't guess.
3. Change the **value only**. Show it as **before → after** (name the color).
4. Tell them they can check it with `/kaeru:preview`.
