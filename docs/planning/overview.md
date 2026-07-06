# Kaeru — Overview

> Extracted from a Claude cowork brainstorm (2026). This captures *what* Kaeru is
> and *why*. See `architecture.md`, `roadmap.md`, `decisions.md`, `ideas-backlog.md`.

## The name

**Kaeru（カエル）** — chosen because it carries three meanings at once, and reads
friendly (not technical) to a Japanese non-tech user:

- **変える** — to change / edit
- **帰る** — to return (a PR comes *back* for review)
- **蛙** — frog (cute mascot)

Product-facing name = **Kaeru**. Original working repo name was `nuxt-vibecode-kit`.

## The problem

Amirah (Malaysia) maintains client websites. Two **PMs / business-side people in
Japan** (limited English) constantly need *small* changes to those sites — change a
sentence, swap an image, tweak a color, minor layout — and today Amirah has to do
every one of these herself. It's a drag, and the language + timezone gap makes
hand-holding hard.

Goal: let the non-tech PMs make those small edits **themselves, safely**, while the
developer keeps final control by **reviewing a PR** before anything ships.

## Users

- **Non-tech PMs (Japan)** — make edits. Never see git, IDE, or code if avoidable.
  Everything in **Japanese**.
- **Developer (Amirah)** — reviews and merges. Wants to review the *rendered result*
  (pixels), not diffs, ideally from Slack / phone.

## Key domain facts

- Client sites are **Nuxt (Vue)** — some plain CSS, some Tailwind. (2 Nuxt projects today.)
- Sites connect to **microCMS** (a Japanese headless CMS) — but **only the news pages**
  come from CMS. **Everything else is hardcoded** in the codebase.
- **No staging today** — Amirah deploys manually to Vercel; prod runs on a **VPS**.

## The core split (most important decision)

Two problems, not one:

1. **Content edits (news)** → route to the **microCMS UI** (already Japanese, safe,
   free, zero git). PMs edit there directly. No Kaeru needed.
2. **Code / layout edits (everything hardcoded)** → this is Kaeru's job:
   guardrails + slash commands + PR + preview.

Don't force everything through code. Let microCMS own content; Kaeru owns code.

## Product vision (north star)

> Non-tech staff never see code, repo, IDE, or git. They just say what they want, in
> Japanese, from their phone. The site changes safely. The developer reviews pixels,
> not diffs.

## Two shapes of "Kaeru"

This is the ambiguity to keep straight as the project evolves:

1. **Kaeru as a repo kit** (MVP, near-term) — a set of guardrails you drop into each
   client repo: `CLAUDE.md` (Japanese rules), slash commands (`/start`, `/edit-text`,
   `/edit-image`, `/edit-color`, `/submit`, `/help`, `/learn`), PR flow, Vercel preview.
2. **Kaeru as a product** (ambitious, later) — a standalone **Next.js** app: a chat +
   live-preview surface where PMs speak (Japanese/LINE), a headless agent edits the
   client repo in a sandbox, opens a PR, and the dev reviews via Slack + preview.
   *This repo is that product.*

MVP = productize the kit with a thin wrapper. Prove it with the 2 PMs first, then scale.
