---
description: Check your own change before submitting — the browser, the clicking, and the questions a reviewer would ask
allowed-tools: Bash(git diff:*), Bash(git status:*), Bash(bun run:*), Bash(bun dev:*), Bash(npm run:*), Bash(pnpm:*), Read, Grep, Glob, mcp__playwright__browser_navigate, mcp__playwright__browser_console_messages, mcp__playwright__browser_snapshot, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_click, mcp__playwright__browser_close
---

Reply to the user in their own language (Japanese or English). Keep it simple and
non-technical.

## Rules (always)

- This command only **looks** — it never edits, commits, or pushes. Fixing is
  `/kaeru:fix`; submitting is `/kaeru:submit`.
- Report what you actually ran and actually saw. A check you skipped is reported as
  skipped, never as a tick. A tick nobody earned is worse than a warning, because it
  is the reviewer's time it spends.
- Never say a thing is fine because it looks fine in the code. Open it.

## Why this exists

Tests and lint catch what they were written to catch. What reaches a reviewer anyway,
every time, is the other list: a warning only the browser console shows, a button
nobody clicked after the change, something that breaks the first time it is slow or
offline. This command is that list, run before anyone else's time is spent on it.

## Steps

### 1. See what changed

`git diff main...HEAD --stat` and `git status`. List the changed files, and work out
from `.kaeru/where.md` which **pages** those files affect. If you cannot tell which
page a file belongs to, say so rather than guessing — then check the home page and
anything the user names.

### 2. Run the project's own checks

Lint, type-check and tests, using the commands in `.kaeru/where.md`. Report each as
passed, failed, or "this project has none".

### 3. Open it in a browser

This is the step that catches what the others cannot.

1. Start the dev server from `.kaeru/where.md` (default `bun dev`) in the background.
2. For each affected page: navigate to it, then read the **console messages**.
   - Report errors and warnings — hydration warnings especially, which appear only
     here and never in a URL check or a passing test.
   - Ignore noise the project already prints on an unchanged page. If unsure whether a
     message is new, open a page the change did not touch and compare.
3. **Click the thing that changed.** A new link: follow it, and say where it went. A
   new button: press it. A changed form: fill it in and submit it. Take a screenshot
   of the result and show it.

### 4. Ask the reviewer's two questions

Only when the change touches something that runs on the server, fetches data, or calls
another service — read the diff and answer honestly:

- **What happens when it fails?** If the call errors, times out, or returns nothing,
  does the page still work, or does it break? If nothing handles that, say so.
- **Does it run on every request?** If it does, and nothing remembers the answer, say
  so — that is the kind of thing that is invisible until the site is busy.

If the change is text, an image or a colour, skip this and say it does not apply.

### 5. Collect what you are unsure about

Anything you could not check, or checked and are not certain about, becomes a short
note — in the user's own words, not jargon. `/kaeru:submit` puts these in the pull
request, where they save a reviewer more time than a confident silence does.

## What to show

A short table. One line per check, a plain marker, and what you saw — never a log:

```
Before you submit

  Tests and lint ................ ✅ 3 passed
  Browser console ............... ⚠️  2 hydration warnings on /pricing
  Clicked what changed .......... ✅ the sign-in link opens /sign-in
  If it fails ................... ⚠️  nothing handles the error yet
  Runs on every request ......... ✅ the answer is remembered
  Not sure about ................ the wording on the button — worth a look

⚠️ means worth a look before you submit, not that you did something wrong.
```

Then, in one sentence each:

- **Anything ⚠️** — offer `/kaeru:fix` for the simple, safe ones, or `/kaeru:help` to
  hand it to the developer. Do not fix anything here yourself.
- **All clear** — tell them they are ready for `/kaeru:submit`.

Never end on a wall of technical output. If the user asks for the detail, show it then.
