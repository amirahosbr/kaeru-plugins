# Kaeru — Architecture & Stack

> Stack decisions from the brainstorm. See `decisions.md` for the *why* in one line each.

## Guiding principles

- **Don't build the agent from scratch.** Kaeru = Claude Agent SDK + guardrails +
  friendly surface. The agent brain already exists — wrap it, don't reinvent it.
- **Kaeru is fully decoupled from client projects.** It edits client repos via git +
  agent. Client sites are Nuxt/Vue; Kaeru itself is Next/React. They never share code —
  they only "talk" through git + sandbox. Client framework does **not** dictate Kaeru's.
- **On-demand, not always-on.** Dev environments need to be *persistent* (state survives
  between sessions, like a laptop) but not *always-on*. Scale-to-zero: idle ≈ $0 compute.
- **Headless sandbox.** PMs never see an IDE/terminal/file tree — that's the fear we're
  removing. They see only a **chat box + an iframe preview** of the live site. The
  sandbox runs `npm run dev` server-side, invisibly.
- **Ship speed > hype.** Prove the boring backbone (PR + preview + guardrail) before
  layering on the sexy stuff.

## The flow (product form)

```
PM asks for a change (LINE / chat, in Japanese)
   → Kaeru (Next.js)
   → Agent SDK + headless sandbox: edits the client Nuxt repo + runs dev server
   → preview back to PM to confirm ("こう変わります。OK?")
   → agent opens a PR on GitHub (with Vercel preview URL)
   → Amirah reviews via Slack + preview → merge
   → production (VPS)
```

Two preview layers, both visual, no diff for the PM:
1. **Before push** → local/sandbox dev server (hot reload) — PM self-confirms.
2. **After push** → Vercel preview URL in the PR — dev confirms before merge.

## Chosen stack (product)

Decision locked in the brainstrom: **Next.js**.

| Layer | Choice | Notes |
|-------|--------|-------|
| Frontend / product UI | **Next.js (React)** | Full-stack in one; API routes for orchestration; Vercel AI SDK is Next-native; agent-UI ecosystem (assistant-ui, shadcn/ui) is React-first. No SSR needed for the internal app — CSR is fine. |
| Agent brain | **Claude Agent SDK (TS)** + Claude API | Already knows git, files, tools, PR. **The only hard recurring cost = Claude API tokens per edit.** |
| Sandbox (edit + dev server + hide secrets) | **Cloudflare Sandbox SDK** (preferred) — or E2B / Daytona | CF Sandbox SDK: full Linux containers, git/bash/dev servers, secret injection via egress proxy so the agent never sees raw tokens. Scale-to-zero. |
| Durable orchestration | **Cloudflare Workflows** (or Trigger.dev / Inngest) | Long-running "clone → edit → preview → PR" jobs. Don't force into a plain serverless function that times out. Hibernate while waiting = free. |
| DB / state / audit | **Cloudflare D1 / Hyperdrive** (or Neon / Supabase) | Store manifest, users, change history. |
| Storage (screenshots, assets) | **Cloudflare R2** | S3-compatible, no egress fee. |
| Git & preview | **Octokit** (GitHub API) + **Vercel** (preview per PR) | |
| Channels | **Slack Bolt SDK** (dev review) + **LINE Messaging API** (PM, phone-first) | LINE is where Japanese non-tech users live. |
| Visual before/after | **Playwright** | Auto screenshot before/after for fast pixel review. |
| Auth / multi-tenant | **WorkOS** or **Clerk** | Sub-companies = separate orgs/tenants. |

Client sites stay **Nuxt/Vue**, decoupled.

## Platform verdict: Cloudflare vs AWS vs lean

- **Cloudflare** — best fit for Kaeru 2026. Sandbox SDK + Workflows + R2 cover the hardest
  parts (agent code-exec, hide secrets, durable jobs) on one low-ops platform. Amirah
  already has CF connected (D1, KV, R2, Workers, Hyperdrive). **Preferred if going
  single-platform.** Caveat: some CF primitives are new (2025–26), less battle-tested;
  vendor lock-in to CF primitives.
- **AWS** — most powerful/scalable but heaviest ops, most confusing billing, and you
  assemble the sandbox layer yourself (Fargate/Firecracker + Step Functions). Only worth
  it if already an AWS shop or enterprise/compliance forces it. Overkill for 2 PMs.
- **Lean modern** (Vercel + Neon + Trigger.dev + E2B) — fastest to prototype if already
  comfortable with those tools.

## Cost model (2 PMs, occasional edits)

- **No platform gives on-demand dev environments for free** — real CPU/RAM (npm install,
  Nuxt dev server) always costs money, everywhere. What saves you is **low volume**.
- CF **Workers Paid = $5/mo flat floor** (required for Containers/Sandbox), then
  usage-based per 10ms of active container time. Idle ≈ $5 (scale-to-zero).
- **Claude API tokens = the real variable cost**, per edit — not infra.
- For prototyping at literally $0: run the agent + sandbox **locally** on the laptop
  during dev; move to Cloudflare only when the PMs start using it.

## What NOT to do

- **Don't embed a full IDE / VS Code web / Codespaces UI** in the product — that re-adds
  every fear (file tree, terminal, panels). Sandbox must be invisible.
- **Don't use Claude Artifacts as the preview** — Artifacts run standalone HTML/React in
  an isolated sandbox: no Node, no SSR, no microCMS fetch, no real Nuxt build. It can only
  show a *mockup*, which is dangerous (PM approves something that differs from live). Use
  the real Nuxt dev server (hot reload) instead. Artifacts *are* fine for a plain-language
  "before → after" card (e.g. 「Welcome」→「ようこそ」) — not for full-page preview.
- **Don't self-host your own Codespaces on a VPS** — overengineered; you become ops +
  security + single-point-of-failure for a few dollars saved.
- **Don't run dev on Vercel/Cloudflare Workers serverless** — those are for *serving*, not
  *developing* (no persistent filesystem/terminal). Sandboxes need a real OS.
