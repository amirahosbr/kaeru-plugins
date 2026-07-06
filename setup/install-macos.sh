#!/usr/bin/env bash
# Kaeru — PM environment setup (macOS)
# Idempotent: skips anything already installed. Safe to re-run.
set -euo pipefail

info(){ printf "\033[1;34m▸ %s\033[0m\n" "$1"; }
ok(){   printf "\033[1;32m✓ %s\033[0m\n" "$1"; }

# 1) Homebrew (package manager)
if ! command -v brew >/dev/null 2>&1; then
  info "Homebrew を導入します…"
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  eval "$($(command -v brew || echo /opt/homebrew/bin/brew) shellenv)" || true
else ok "Homebrew"; fi

# 2) git, gh, node (via Homebrew)
for pkg in git gh node; do
  if ! command -v "$pkg" >/dev/null 2>&1; then info "$pkg を導入…"; brew install "$pkg"; else ok "$pkg"; fi
done

# 3) bun
if ! command -v bun >/dev/null 2>&1; then
  info "bun を導入…"; curl -fsSL https://bun.sh/install | bash
else ok "bun"; fi

# 4) Claude Code
if ! command -v claude >/dev/null 2>&1; then
  info "Claude Code を導入…"; npm install -g @anthropic-ai/claude-code
  # 代替: curl -fsSL https://claude.ai/install.sh | bash
else ok "Claude Code"; fi

# 5) Playwright browser (プレビュー用) — no API key
info "プレビュー用ブラウザ (Chromium) を導入…"
npx --yes playwright install chromium

echo
info "確認:"
git --version || true
gh --version 2>/dev/null | head -1 || true
node --version || true
command -v bun >/dev/null 2>&1 && bun --version || echo "bun: 新しいターミナルで有効になります"
claude --version 2>/dev/null || echo "claude: 新しいターミナルで有効になります"

echo
ok "セットアップ完了！ 次の2つだけ手動でログインしてください:"
echo "  1) claude を起動して /login （Claude のサブスクでログイン）"
echo "  2) gh auth login （ブラウザで GitHub にログイン）"
