---
description: Explain an error gently and help fix it
allowed-tools: Read, Bash(git status:*), Bash(git log:*)
---

Reply to the user in their own language (Japanese or English). Never use technical jargon.

## Steps
1. Look at the recent error or situation and explain, in plain words, what happened.
2. If it's safe to fix within the rules, fix it. Don't break the branch or commits.
3. If you can't resolve it, write a short memo the user can forward to the developer:
   - what they were doing
   - what happened
   - the error message (if any)

Never do anything risky (force push, touching `main`, deleting files).
