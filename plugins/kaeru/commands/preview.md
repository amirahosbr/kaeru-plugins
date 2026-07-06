---
description: 変更をローカルで確認する（開発サーバーを起動し、画面を見せて確認）
allowed-tools: Bash(bun dev:*), Bash(bun run dev:*), Bash(npm run dev:*), Bash(pnpm dev:*), Bash(open:*), mcp__playwright__browser_navigate, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_snapshot, mcp__playwright__browser_close
---

ユーザーとは**日本語**で会話する。専門用語は避ける。

## 手順
1. `.kaeru/where.md` の「dev server」コマンドで開発サーバーをバックグラウンド起動する
   （記載がなければ `bun dev`）。
2. ブラウザ操作ツール（Playwright）で、変更したページを開く（既定 http://localhost:3000）。
3. **スクリーンショットを撮り、変更後の見た目をユーザーに見せて**
   「こう変わりました。よろしいですか？」と確認する。
4. OK なら「`/kaeru:submit` でレビュー依頼できます」と案内。
   直したい所があれば聞いて対応する。
5. ユーザーが自分のブラウザでも見たい場合は `open` で URL を開く。

エラーが出たら `/kaeru:help` を案内する。
