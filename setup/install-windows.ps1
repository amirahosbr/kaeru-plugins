# Kaeru — PM environment setup (Windows)
# Idempotent: skips anything already installed. Run in PowerShell.
$ErrorActionPreference = "Stop"
function Have($c){ [bool](Get-Command $c -ErrorAction SilentlyContinue) }

if(-not (Have winget)){ Write-Host "winget が必要です (Windows 10/11 に標準搭載)。Microsoft Store から 'App Installer' を入れてください。"; exit 1 }

# 1) git, gh, node, Windows Terminal (via winget)
if(-not (Have git))   { winget install --id Git.Git -e --source winget } else { Write-Host "git OK" }
if(-not (Have gh))    { winget install --id GitHub.cli -e }               else { Write-Host "gh OK" }
if(-not (Have node))  { winget install --id OpenJS.NodeJS.LTS -e }        else { Write-Host "node OK" }
if(-not (Have wt))    { winget install --id Microsoft.WindowsTerminal -e } else { Write-Host "Windows Terminal OK" }

# 2) bun
if(-not (Have bun))   { powershell -c "irm bun.sh/install.ps1 | iex" } else { Write-Host "bun OK" }

# 3) Claude Code
if(-not (Have claude)){ npm install -g @anthropic-ai/claude-code } else { Write-Host "Claude Code OK" }

# 4) Playwright browser (プレビュー用) — no API key
Write-Host "プレビュー用ブラウザ (Chromium) を導入…"
npx --yes playwright install chromium

Write-Host "`n※ 一部のツールは新しいターミナルを開くと有効になります。"
Write-Host "`nセットアップ完了！ 次の2つだけ手動でログインしてください:"
Write-Host "  1) claude を起動して /login （Claude のサブスクでログイン）"
Write-Host "  2) gh auth login （ブラウザで GitHub にログイン）"
