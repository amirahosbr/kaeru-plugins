# Spec — kaeru-review: one place where makers see every review

- **Status:** Draft v1 · 2026-09-24
- **Owner:** amirahosbr
- **Touches:** `plugins/octo` (new `/octo:report`, `/octo:share`), `plugins/kaeru` (new
  `/kaeru:apply-review`, `/kaeru:submit` base-branch fix), new private repo **`kaeru-review`**
  (Cloudflare portal)

---

## 1. Problem

Makers (non-technical people shipping client tickets with a coding agent) open PRs; the
developer reviews and sanity-tests them. The review has to reach the maker in a form they can
act on. Today that means:

1. **PDFs passed around in Slack.** Every addition is a new file; the maker has to work out
   which one is current. Two languages mean two files.
2. **Reviews are scattered per project.** Nothing shows a maker "everything waiting for me,
   across every repo I work on".
3. **The maker's agent can't use the review.** A PDF is for people; the maker's Claude Code
   needs text it can work through item by item.
4. **The developer rebuilds the same thing by hand each time**: diff → sanity test →
   screenshots → report → plain-language version → Slack.

A real review session (private repo, six PRs from one maker) showed which output makers
actually need. That output is the reference layout for this spec (§5.3).

## 2. Goals

- **G1: one permanent link per review.** Updates happen in place with a visible change log.
  Nobody re-sends files.
- **G2: one home for all reviews**, grouped by org → project → PR. A viewer sees only the
  projects they have access to.
- **G3: access for people from more than one company** (e.g. the client company and the
  developer's company) without asking them to create accounts. Login with email only.
- **G4: one review, two audiences.** A maker view (plain language, JA/EN toggle, before/after,
  simplified code) and a developer view (full evidence, full diff), both built from the
  same data.
- **G5: the maker's agent can apply the review.** `/kaeru:apply-review` reads the same data and
  walks the maker through each fix.
- **G6: the developer publishes with one command.** No hand-built HTML, no manual uploads.

## 3. Non-goals

- **Not a ticket tracker.** GitHub Issues and PRs remain the source of truth for work items and
  status. The portal *shows* status; it never stores it and never mirrors it into its own
  database. (We looked at Jira/Linear clones like Plane, Taiga and OpenProject and rejected them:
  a second tracker means double entry and drift, and none of them run on Workers.)
- **No merging, approving or commenting on GitHub from the portal.** It is read-only for makers.
- **No automated sanity testing in phase 1.** `/octo:sanity` comes later (§9). Phase 1 publishes
  results the developer already produced.

## 4. Users

| Role | Example | Needs |
|---|---|---|
| **Developer / reviewer** | amirahosbr | Publish a review in one command, update it, notify people. |
| **Maker** | a client-side staff member using Claude Code | See what's waiting for them, understand it without reading code, hand the fixes to their agent. |
| **Observer** | a manager on either side | Read-only overview of review status across projects. |

Makers may write in Japanese or English. Every maker-facing surface follows the viewer's
language: the page toggle, and the agent replying in the language the maker writes in.

## 5. Design

### 5.1 Architecture

```
reviewer's machine                                  Cloudflare (kaeru-review)
┌───────────────────────────┐   publish (service   ┌──────────────────────────────┐
│ /octo:report              │   token, HTTPS)      │ Access  (email OTP, per-app) │
│   └─ review.json + assets ├─────────────────────▶│   │                          │
│ /octo:share               │                      │ Worker  ─ authz by project   │
│   └─ Slack (link + note)  │                      │   ├─ R2   review data/assets  │
└───────────────────────────┘                      │   └─ GitHub API (PR status,   │
                                                   │        cached 60 s)           │
maker's machine                                    └──────────────┬───────────────┘
┌───────────────────────────┐   GET review.json (maker's          │
│ /kaeru:apply-review <url> │◀── service token or browser) ───────┘
└───────────────────────────┘
```

### 5.2 Data contract: `review.json` (the one source)

Every surface is rendered from this file: the maker page, the developer page, the PR-comment
markdown, and the optional PDF. Versioned with `schema`.

```jsonc
{
  "schema": "kaeru-review/1",
  "org": "acme", "repo": "website", "pr": 42,
  "version": 2,                               // bumped on every publish
  "log": [                                    // newest first; shown as 更新履歴 / Change log
    { "v": 2, "at": "2026-09-25T10:00+08:00", "note": { "ja": "…", "en": "…" } },
    { "v": 1, "at": "2026-09-24T09:30+08:00", "note": { "ja": "初版", "en": "First version" } }
  ],
  "verdict": "changes_requested",             // ready | changes_requested | suggestions | pending
  "summary": { "ja": "…", "en": "…" },
  "glance": { "visitors": {…}, "google": {…}, "size": { "files": 2, "add": 40, "del": 5 } },
  "items": [                                  // one per thing the maker should know or do
    {
      "id": "42-nested-p",
      "since": 1,                             // version that introduced it → NEW badge when == version
      "severity": "required",                 // required | recommended | info
      "status": "open",                       // open | fixed | wont_fix (set by reviewer)
      "title":  { "ja": "…", "en": "…" },
      "why":    { "ja": "…", "en": "…" },     // plain language, analogy allowed
      "prompt": { "ja": "…", "en": "…" },     // paste-ready for the maker's agent
      "check":  { "ja": "…", "en": "…" }      // how the maker verifies it's fixed
    }
  ],
  "visual":   [ { "kind": "pair", "before": "assets/…png", "after": "assets/…png",
                  "caption": {…}, "same": false },
                { "kind": "listdiff", "rows": [ { "label": "…", "keep": [...], "gone": [...] } ] } ],
  "words":    [ { "kind": "textdiff", "label": {…}, "before": "…", "after": "…",
                  "parts": [ { "k": {…}, "v": "…" } ] },
                { "kind": "behaviour", "rows": [ { "do": {…}, "before": {…}, "after": {…}, "ok": true } ] } ],
  "code":     [ { "file": "…", "summary": {…},
                  "lines": [ { "sign": "-", "code": "…", "note": {…} } ] } ],
  "hidden":   { "formatting_only": 2 },
  "evidence": { "http": [...], "lint": {...}, "hydration": {...}, "diff": "assets/full.diff" }  // developer view only
}
```

Rules:
- **No secrets and no environment URLs with tokens** in `review.json` or its assets.
- Text fields that makers see are always `{ ja, en }`. The renderer falls back to whichever
  exists.
- `items[].prompt` must be self-contained: file paths, exact change, "change nothing else",
  and how to verify.

### 5.3 Maker view (reference layout)

This is the layout validated in the review session. Order matters: a maker should understand
the change from ① and ② alone.

1. **Header bar:** org/repo · PR · version chip · 日本語 / English toggle (remembered per
   viewer; `#ja` / `#en` deep link).
2. **Change log (更新履歴)**, with the newest version marked. Items where `since == version`
   get a **NEW** badge wherever they appear.
3. **At a glance:** one row per PR: what visitors see, what Google sees, code size.
4. **What to do:** items sorted required → recommended → info. Each item has: what's good,
   what to change, why (plain), a prompt with a copy button, and how to check.
5. **① Visual:** full-width before/after screenshots. A **"no visual change ✅" badge** when
   pixels match. A `listdiff` grid for list-like changes (links, menus, cards): kept items in
   green, removed items struck through in red.
6. **② Words and behaviour:** a token-level text diff (split on punctuation and particles, never
   per character; per-character diffs are unreadable for Japanese), a breakdown of how the new
   title is built, a search-result preview, and "if you do X → before → after" tables with ✅/⚠️.
7. **③ Code (key lines only):** per file, a one-line plain summary, then only the key `−`/`+`
   lines, each with a note. Formatting-only hunks are collapsed into "N formatting-only changes
   (hidden)".

The developer view adds the evidence tables, the full coloured diff, and lint and hydration
results.

### 5.4 Portal: `kaeru-review` (Cloudflare)

**Stack:** Workers (static rendering from `review.json`, no framework needed) · R2 · Cloudflare
Access (Zero Trust Free: up to 50 users) · GitHub API with a fine-grained read-only token
(Worker secret).

**URLs**

```
/                                   → "Waiting for you": every review you can see, grouped by org → project
/<org>/<repo>/                      → reviews for one project (open first, then merged)
/<org>/<repo>/pr/<n>                → maker view (latest version)
/<org>/<repo>/pr/<n>/dev            → developer view
/<org>/<repo>/pr/<n>/v/<k>          → a past version (read-only)
/<org>/<repo>/pr/<n>/review.json    → raw data (for /kaeru:apply-review)
/api/publish                        → POST, service token only
```

**Access and authorisation (two layers)**
1. **Edge (Cloudflare Access):** one Access application over the whole hostname. The policy
   lets in listed email **domains** (both companies) plus individual emails. Login is a
   one-time PIN sent by email, so nobody needs a Cloudflare account. `/api/publish` uses a
   separate policy that accepts **service tokens** only.
2. **Worker (per project):** the Worker verifies the `Cf-Access-Jwt-Assertion` JWT against the
   team's certs and `aud`, then reads the email and filters by `projects.json` in R2:

```jsonc
{ "acme/website": { "viewers": ["@client.example", "dev@agency.example"],
                    "makers":  ["maker@client.example"] } }
```

   The index page lists only projects the viewer matches. A request for a project the viewer
   doesn't match returns 404, not 403, so project names don't leak.

**Storage layout (R2)**

```
projects.json
<org>/<repo>/pr/<n>/latest            → "3"
<org>/<repo>/pr/<n>/v/<k>/review.json
<org>/<repo>/pr/<n>/v/<k>/assets/*    (screenshots, full.diff)
```

**Status:** the PR state (open / merged / closed) and CI checks come from GitHub at request time,
cached for 60 s. The reviewer's `verdict` and `items[].status` come from `review.json`. The
index shows both, e.g. `要修正 · open`.

### 5.5 Plugin commands

| Command | Plugin | Behaviour |
|---|---|---|
| `/octo:report <pr…>` | octo | Builds `review.json` + assets from the current review (diffs, notes, screenshots already in the session). Renders the maker and developer HTML locally for a preview. Publishes to the portal after an explicit yes. Re-running it on an existing PR bumps `version` and asks for a change-log note. Saves a copy under the reviewer's notes folder (configurable). |
| `/octo:share <pr…>` | octo | Posts to Slack: the first time, a message with the link and a one-line summary per PR; later, a **thread reply** on the same message with the change-log note and the same link. **Always confirms the destination** (channel, DM to a person, or DM to self for a preview). The default channel per project is set in config. |
| `/kaeru:apply-review <url or pr>` | kaeru | Fetches `review.json`. Lists open `required` then `recommended` items in the maker's language. For each item: explains it, runs the prompt, runs the check, and shows the result. Commits to the **same PR branch**, pushes, then tells the maker to let the reviewer know. Never marks items as fixed; only the reviewer does. |
| `/kaeru:submit` (fix) | kaeru | Reads **PR base branch** from `.kaeru/where.md` instead of hard-coding `main`. Some repos use `development` as trunk. |

Config (`.kaeru/review.json`, per repo, committed; no secrets):

```jsonc
{ "portal": "https://review.<domain>", "slack_channel": "C0…", "notes_dir": "~/Developer/NOTES/<repo>" }
```

The publish service-token pair lives in the reviewer's keychain or environment, never in the
repo.

## 6. Flow

```
maker     /kaeru:submit ─────────────────────────────▶ PR (base from where.md)
reviewer  review + sanity → /octo:report → portal v1 → /octo:share (Slack, new message)
maker     opens link → reads JA page → /kaeru:apply-review → pushes to the same PR
reviewer  re-test → /octo:report (v2, note "fixed ✅") → /octo:share (thread reply)
maker     sees v2 with NEW badges → done
```

## 7. Security

- Private-repo code excerpts and client data sit behind Access. **The portal repo must be
  private.** The public `kaeru-plugins` repo holds only the plugin commands and a schema, never
  real review data.
- The publish endpoint accepts service tokens only. The token is scoped to that one Access
  application.
- The Worker never logs `review.json` contents or viewer emails beyond Cloudflare's defaults.
- GitHub token: fine-grained, read-only, limited to the repos listed in `projects.json`.

## 8. Acceptance criteria (phase 1)

- [ ] A maker from company A and a maker from company B can both log in with an email OTP and
      see only their own projects on `/`.
- [ ] A viewer without access to a project gets 404 for its pages and `review.json`.
- [ ] `/octo:report` on an existing PR produces `version + 1`. The link is unchanged, the change
      log shows the new entry, and new items carry NEW.
- [ ] The maker page passes at 390 px width, in both themes and both languages, without
      horizontal scroll.
- [ ] `/octo:share` posts a thread reply, not a new message, on the second publish.
- [ ] `/kaeru:apply-review` completes a `required` item end to end on a test repo and pushes to
      the PR branch.
- [ ] `/kaeru:submit` opens the PR against `development` when `where.md` says so.

## 9. Phases

| Phase | Scope |
|---|---|
| **P1: portal + publish** | `kaeru-review` repo: Worker, R2, Access, `projects.json` authz, maker/dev renderer, index. `/octo:report` (publish) and `/octo:share`. `review.json` schema v1. `/kaeru:submit` base-branch fix. |
| **P2: maker loop** | `/kaeru:apply-review`. Copy buttons for prompts. Item status set by the reviewer. |
| **P3: automation** | `/octo:sanity` (worktree per PR, combined-merge test, HTTP matrix from the PR's own verification table, hydration check, before/after screenshots, a `listdiff` computed from the DOM, formatting-only detection by formatting both sides and comparing). `/octo:review-prs --author`. PDF export on demand. |

## 10. Open questions

1. **Hostname:** `review.<company-domain>`, or a subdomain on another zone? (A custom domain is
   recommended over `workers.dev` for a clean Access app.)
2. **Cloudflare account:** the developer's company account, or a dedicated one?
3. **Email domains** to allow for each company.
4. **Should makers see the developer view?** Default: no, unless they're listed as `viewers`
   with `dev: true`.
5. **Retention:** keep every version forever, or prune versions of merged PRs after N days?
6. **Portal name:** `kaeru-review` (proposed).
