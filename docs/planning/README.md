# Planning

Roadmap and design docs for **Kaeru**. Shared source of truth for *what* we're building
and *why*, for both humans and agents.

## Docs

| Doc | What's in it |
|-----|--------------|
| [`overview.md`](./overview.md) | The name, the problem, users, the content/code split, product vision. **Start here.** |
| [`architecture.md`](./architecture.md) | Stack decisions, the product flow, Cloudflare-native backend, cost model, anti-patterns. |
| [`roadmap.md`](./roadmap.md) | Phases 0–4, the Kaeru kit contents, the review flow. |
| [`decisions.md`](./decisions.md) | One-line decision log + open questions + market note. |
| [`ideas-backlog.md`](./ideas-backlog.md) | Ambitious/future ideas (auto-manifest, point-and-speak, LINE-first, time-machine review…). |

## TL;DR

**Kaeru** lets non-tech Japanese PMs make small edits (text/image/color/layout) to
hardcoded Nuxt client sites **safely** — the agent hides git, opens a PR, and the developer
reviews the *rendered* result before merging. News content stays in microCMS; everything
else is Kaeru's job. MVP = a repo kit (guardrails + slash commands + PR + Vercel preview);
the ambitious form is this **Next.js** product (chat + live preview, headless sandbox,
Slack/LINE). Prove it with 2 PMs on one pilot repo, then scale.

## Source

Extracted from a Claude **cowork** (desktop) brainstorm session, 2026 — distilled here so
the planning survives outside chat history. Not verbatim; condensed into structured docs.
Open questions are tracked in `decisions.md`.
