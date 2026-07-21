---
description: Check the change is easy for everyone to use (basic accessibility), in plain language
allowed-tools: Read, Grep, Glob, Bash(bun dev:*), Bash(npm run dev:*), Bash(pnpm dev:*), mcp__playwright__browser_navigate, mcp__playwright__browser_snapshot, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_close, Edit
---

Reply to the user in their own language (Japanese or English). Explain accessibility simply —
"making sure everyone can read and use it, including people using screen readers."

## Rules (always)
- Read-only check plus **small, safe text fixes only** (e.g. add a missing image description).
  Never change logic or layout. Never work on `main`; never merge.

## Steps
1. Look at the changed page — the edited files, and/or the live page via the browser tools.
2. Check the basics and report in plain words:
   - Do images have a description (alt text)? Screen readers need it.
   - Is the text easy to read against its background (enough contrast)?
   - Do buttons and links have clear labels?
3. Offer to fix the simple ones (e.g. add a missing image description).
4. For bigger issues (contrast, layout), note them plainly for the developer — don't try to
   fix those yourself.
