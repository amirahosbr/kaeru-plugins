---
description: Preview the change locally — start the dev server and show the rendered page
allowed-tools: Bash(bun dev:*), Bash(bun run dev:*), Bash(npm run dev:*), Bash(pnpm dev:*), Bash(open:*), mcp__playwright__browser_navigate, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_snapshot, mcp__playwright__browser_close
---

Reply to the user in their own language (Japanese or English). Keep it simple and
non-technical.

## Rules (always)
- This command only **previews** — it never changes the site, commits, or pushes.

## Steps
1. Start the dev server in the background using the "dev server" command from
   `.kaeru/where.md` (default `bun dev`).
2. Using the browser tools (Playwright), open the changed page (default http://localhost:3000).
3. **Take a screenshot and show the user the result**, then ask them to confirm it looks right.
4. If they're happy, tell them they can submit for review with `/kaeru:submit`. If they want
   changes, ask and make them.
5. If they'd like to look in their own browser too, open the URL with `open`.

If an error appears, point them to `/kaeru:help`.
