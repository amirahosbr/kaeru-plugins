# Design system — kaeru

Two layers (from the `design-styles` skill), owned in-repo.

## 1. Token theme (stack-agnostic)

- Location: `src/app/globals.css` — `:root` (light) + `.dark` blocks, values in **oklch**.
- Mapping: `@theme inline` exposes tokens as Tailwind utilities (`bg-primary`,
  `text-muted-foreground`, `border-border`, `font-sans`, `rounded-lg`…).
- Dark mode: `@custom-variant dark (&:is(.dark *))`, toggled by `next-themes` on `<html>`.

**Palette** — warm-neutral base + deep **jade** primary (kaeru 蛙, hue ~165).
Charts + sidebar tokens included. Re-theme by editing token *values* only; names stay fixed.

### Rules

- **oklch always.** Paste tweakcn exports verbatim. Convert any Figma hex at the
  boundary and keep the hex as a comment.
- **Reference tokens, never hardcode.** No raw oklch/hex or `bg-gray-100` in components.
- **Semantic tokens only in `ui/` primitives** so they survive `.dark` / re-theming.
- **Tailwind-first.** Keyframes go in `@theme` and are used via `animate-*`.

## 2. Reusable UI — shadcn, manually installed

- Location: `src/components/ui/` — **owned** source (not a black-box dep).
- `cva` variants colocated per component; no central styles file.
- `cn()` helper in `src/libs/utils.ts` (`twMerge(clsx(...))`).
- Deps: `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`,
  `@radix-ui/react-slot`, `tw-animate-css`.
- Add more primitives by copying shadcn/ui React source in and re-pointing imports to
  `@/libs/utils` + these tokens. You own them — rewrite foreign tokens/radii.

## Animation

- GSAP (+ ScrollTrigger) is the animation plugin when motion is needed — **not yet installed**;
  add it when a design calls for it. Keep static styling in Tailwind.
- Lenis smooth-scroll only if a design explicitly asks.
