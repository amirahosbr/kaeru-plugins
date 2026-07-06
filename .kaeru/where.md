# Kaeru repo map — kaeru (Next.js)

> Written by `/kaeru:setup`. Per-repo; the plugin commands read this. Edit only VALUES,
> never token names or structure.

- **UI text (i18n):** `messages/ja.json` (Japanese, primary), `messages/en.json` (English).
  Edit **both** for shared copy; `ja` is what PMs care about first.
- **Text inside components:** `src/components/*.tsx`, `src/app/[locale]/**`.
- **Images / static assets:** `public/`
- **Colors (design tokens):** `guidelines/design-system.md` + the oklch CSS variables — **values only**.
- **Dev server:** `bun dev` → http://localhost:3000
- **Package manager:** bun
- **PR base branch:** `main`
