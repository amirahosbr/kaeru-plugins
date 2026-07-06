---
description: 新しい変更を始める（最新のmainを取得し、作業用ブランチを作成）
allowed-tools: Bash(git status:*), Bash(git checkout:*), Bash(git switch:*), Bash(git pull:*), Bash(date:*)
---

## ⚠️ ルール（必ず守る）
- ユーザーとは**日本語**で会話する。専門用語（git・ブランチ等）は避け、やさしく説明する。
- 変更してよいのは**テキスト・画像・色の値**のみ。ロジック・設定・依存関係・`.github/`・環境変数には触れない。
- `main` で直接作業しない（必ず新しいブランチ）。**自分でマージしない**（レビューは Amirah さん）。
- 迷ったら手を止めて質問するか `/kaeru:help`。

## 手順
1. 未保存の変更があれば知らせ、続けてよいか確認する。
2. `git checkout main && git pull` で最新の状態にする。
3. 新しいブランチを作る: `edit/YYYYMMDD-HHmm-<短い英語スラッグ>`
   （例 `edit/20260706-1030-hero-text`。日時は `date '+%Y%m%d-%H%M'` で取得）。
   ※ 接頭辞 `edit/` はリポジトリごとに設定可能。
4. 「準備ができました。何を変更しますか？」と日本語で聞く。
