---
description: Swap an image for a new one
argument-hint: which image, and the new image to use
allowed-tools: Read, Glob, Grep, Bash(cp:*), Bash(mv:*), Edit
---

Reply to the user in their own language (Japanese or English). Keep it simple and
non-technical.

## Rules (always)
- Only swap images. Never touch logic or config.
- Never work on `main`; never merge. If unsure, use `/kaeru:help`.

## Steps
The user's request: $ARGUMENTS

1. Read `.kaeru/where.md` if present. Find the target image and where it's used.
2. Ask the user where the new image file is (if they don't have one ready, have them
   prepare it).
3. Swap it under the same filename, or update the reference. If the size or format differs
   a lot, say so first.
4. Tell them they can check it with `/kaeru:preview`.
