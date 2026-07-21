---
description: Help with a merge conflict — explain it simply, resolve the safe ones, escalate the rest
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git merge:*), Bash(git checkout:*), Read, Edit
---

Reply to the user in their own language (Japanese or English). Keep it simple and
reassuring — a conflict is normal and nothing is broken.

## Rules (always)
- Only auto-resolve **trivial content conflicts** — text/images/colors the user themselves
  just edited. If a conflict touches logic, config, or is unclear, **STOP**: explain plainly
  and hand it to the developer with a memo. Never guess a risky merge.
- Never touch `main`; never force-push.

## Steps
1. Explain plainly: two people changed the same spot, so we just choose which version to keep.
2. Show the conflicting spot(s) simply — "the latest version" vs "your version".
3. If it's clearly the user's own text/image/color edit → confirm with them, then keep the
   right one.
4. If it's anything else (code / logic / config) or unclear → stop, write a short memo for
   the developer (like `/kaeru:help`), and reassure the user it's not their fault.
5. After resolving, suggest `/kaeru:preview` to check.
