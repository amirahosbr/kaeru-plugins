# Kaeru — Ideas Backlog (ambitious / future)

> The "cracked, sexy, out-of-box" ideas from the brainstorm. All build on the *boring
> backbone* (PR + preview + guardrail). Don't jump to these before the basic flow works
> with the 2 PMs. Ranked roughly by how compelling vs. how fragile.

## Input surfaces — how the PM expresses a change

**1. Kaeru as a "virtual CMS over code" — auto-derived manifest ⭐ (top pick)**
At setup, the agent **scans the repo and auto-generates an "editable manifest"** — a map of
every safe-to-edit text/image/color, with human Japanese labels (「トップの見出し」,「会社ロゴ」).
PMs edit against that manifest (friendly form), never touching raw `.vue`. The manifest is
an **AI-generated guardrail**. Gives a CMS experience **without migrating content to a CMS**.
Potential real product: *"turn any hardcoded codebase into a non-tech-friendly editable
surface, without a rewrite."* Solves Amirah's actual reality (hardcoded, not CMS).

**2. Point-and-speak WYSIWYG on the live site**
Browser overlay on staging. PM **clicks an element, speaks Japanese** ("make this bigger,
swap this image") → agent maps DOM→source (source maps / component attribution) → edits code
→ hot-updates preview → PR on confirm. Figma-comments × codegen × voice. The Vercel toolbar
is the seed. *Catch:* best for visible visual changes; hidden logic less so — but perfect for
text/image/color/layout.

**3. Sandbox-per-edit — zero standing infra**
Each edit request spins an **ephemeral cloud sandbox** (CF Sandbox / E2B / Daytona / Modal),
does the work, sends a preview, destroys it. Pay per-second, not per-seat. The technical
enabler behind everything at scale.

**4. LINE-first / phone-first / voice-first**
PM never opens a laptop. Sends a **Japanese voice message in LINE** (「採用ページのボタン、青にして」)
→ backend agent clone→edit→ephemeral preview→sends a screenshot back (「こう変わります。OK?」)
→ tap OK → PR. LINE is the Japanese non-tech home turf; smallest possible gap. *Catch:* less
visibility mid-process; LINE bot setup is some work.

**5. "Time machine" review for the dev**
Every PR auto-generates a **before/after visual** (side-by-side screenshots + a short GIF) +
an **AI risk score**. Review *pictures* in 5 seconds, not code. Across 20 repos → one person
scales to maintain everything.

**6. Kaeru learns patterns**
Remembers each staff member's style + each client's brand rules. Over time it pre-empts:
*"Last time you changed the hero you also updated the OG image — do the same?"* Agentic,
personal, gap keeps shrinking.

**Rejected as a backbone: screenshot + annotation → agent** — most impressive in a demo,
least consistent in production. Not the tulang belakang.

## Recommended combination to chase

**#1 (auto-derived manifest) + #5 (time-machine review).**
- #1 solves the *real* reality (hardcoded, not CMS) in a way nobody does well yet.
- #5 makes the *developer* scale.
- Together = a sellable product: *"Kaeru: let anyone safely edit a dev-managed website —
  the dev reviews pixels, not code."* The Japanese wedge (LINE + language) sharpens it.

#2 and #4 are sexy but fragile/expensive to prove first. #3 is the behind-the-scenes enabler
once you scale.

## Reference: how Scrimba-style interactive learning works (for `/learn`)

- Scrimba isn't video — it records **code as data** (keystrokes/cursor/text) + audio and
  *replays* it, so you can pause and edit in a real in-browser editor.
- Runs frontend code in the browser (the browser is the runtime); **WebContainers**
  (StackBlitz) run full Node.js in-browser via WASM — can even run Nuxt in a browser.
- **But not right for Kaeru's work:** WebContainers are for *learning/prototyping*, not for
  a CLI agent + git + real repo + PR with real credentials. Kaeru's real work needs a real
  environment (sandbox/local). Scrimba's model is only inspiration for a polished `/learn`
  experience later — the `/learn` command already covers the goal at zero cost.
