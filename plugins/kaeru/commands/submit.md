---
description: Submit the change for review — open a pull request (never merges)
allowed-tools: Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(git branch:*), Bash(git diff:*), Bash(gh pr create:*), Bash(gh repo view:*)
---

Reply to the user in their own language (Japanese or English). Keep it simple and
non-technical.

## Rules (always)
- Never merge yourself — the developer reviews and merges.
- Never push directly to `main`. The PR base is always `main`.

## Before submitting

Run the `/kaeru:check` checks first — all of them, not only lint and type-check: the
browser console on the changed pages, clicking what changed, and the two questions about
anything that runs on the server. Show its table.

If anything fails or comes back ⚠️, **stop** — don't commit. Explain it plainly and suggest
`/kaeru:fix`. The person can overrule you and submit anyway, and that is their call to make,
but it is made knowingly rather than by not being told.

This runs here as well as in its own command on purpose: the check that only happens when
somebody remembers to ask for it is the check that stops happening. (If the repo has octo's
git hooks installed, lint and type-check run on commit/push too.)

Carry anything `/kaeru:check` left as "not sure about" into the PR body — see **Writing the
pull request** below.

## Steps
1. Review the change and write a clear commit message.
2. `git add -A && git commit`.
3. `git push -u origin <current-branch>`.
4. Open the PR with `gh pr create --base main`, using the title and body described below.
   **Never merge.**
5. Give the user the PR URL and tell them: the developer will review it, and the Vercel
   preview URL will appear as a comment on the PR.

## Writing the pull request

The person who approves this is often reading it on a phone, and may not read code. The PR
has to be understandable on its own. Write the title and body **in the user's own language**
— the same language-mirroring rule as the reply.

### Title

Plain language, what changed — `トップページの見出しを変更`, not `fix(home): update h1 copy`.
No conventional-commit prefix, no file paths: this is a client's website, not a versioned
package.

### Body

Pass it as a single quoted multi-line `--body "…"` string (no command substitution, no
temp files — that keeps it inside this command's allowed tools). Shape, Japanese shown:

```markdown
## 何を変えたか
<one sentence, in the user's own words. No jargon, no file paths.>

## 確認する
📄 <page path, e.g. /about>
▶ プレビュー: このPRの下のコメントに表示されます（Vercel）

## 変更前 → 変更後
<per the table below>

## 気になっているところ
<only when /kaeru:check left notes, or the person says they are unsure. One line each,
in their own words. Leave the whole section out when there is nothing — an empty
heading reads as "I checked and found nothing", which is a different claim.>

---
<details><summary>技術的な詳細（開発者向け）</summary>

- ブランチ: `<branch>`
- 変更ファイル: `<n>` 件
- `<path/to/file.tsx>`

</details>
```

English mirrors it: **What changed / Check it / Before → After / What I'm unsure about /
Technical details**.

A doubt written down is worth more to a reviewer than a confident silence: it points them
at the one part that needs their judgement instead of making them find it.

### What goes in 変更前 → 変更後

| Edit type | Show |
|---|---|
| text | Both strings, quoted — **変更前:**「old」 / **変更後:**「new」 |
| color | The token name and both values — `--brand: #1B7F5A → #14654A` |
| image | Both images, embedded (see below) — never just filenames |

For images, use absolute URLs — relative paths do **not** render in a PR body. Get the repo
with `gh repo view --json nameWithOwner -q .nameWithOwner`, then:

- 変更前 — `![変更前](https://github.com/<owner>/<repo>/raw/main/<path>)`
- 変更後 — `![変更後](https://github.com/<owner>/<repo>/raw/<branch>/<path>)`

On a **private** repo GitHub will not render those for the reviewer. Then name the file
instead and add one line: 「画像は「Files changed」タブで見比べられます」.

### Never put in the body

- **A raw diff, a patch, or unified-diff output.** Showing one to a non-technical reader is
  a product failure. The real diff stays one tap away in the Files tab.
- **A preview URL.** It does not exist yet at `gh pr create` time — the Vercel bot posts it
  as a comment after the PR opens. Point at the comment; never invent a URL.
- **Anything technical outside the collapsed `<details>`** — branch names, file paths, and
  file counts live in there, present for the developer and invisible by default.
