---
description: 変更をレビューに出す（PRを作成。マージはしない）
allowed-tools: Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(git branch:*), Bash(gh pr create:*)
---

## ⚠️ ルール（必ず守る）
- ユーザーとは**日本語**で会話する。専門用語は避ける。
- **自分でマージしない**（レビュー・マージは Amirah さん）。
- `main` へ直接 push しない。PR の base は必ず `main`。

## 手順
1. 変更内容を確認し、日本語でわかりやすいコミットメッセージを作る。
2. `git add -A && git commit`。
3. `git push -u origin <現在のブランチ>`。
4. `gh pr create --base main`（タイトル・本文は日本語で、何を変更したかを簡潔に）。**マージは絶対にしない。**
5. 作成された PR の URL を伝え、こう案内する:
   「Amirah さんがレビューします。Vercel のプレビューURLは PR に表示されます。」
