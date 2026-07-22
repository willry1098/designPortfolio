# PROJECT: William's Design Portfolio

## 1. Stack & Architecture
- **Plain React 18 + Vite** (bootstrapped from Bolt.new's `vite-react-typescript-starter`). Not Next.js — no `app/`/`pages/` dir, no SSR.
- **Routing:** `react-router-dom` v7, classic `<BrowserRouter>` + `<Routes>` in [src/App.tsx](src/App.tsx). Routes: `/`, `/projects`, `/gallery`, `/projects/:id`, `/about`, `/bookshelf`, `/map`, `/city-manager`.
- **Deploy:** GitHub Pages via [.github/workflows/deploy.yml](.github/workflows/deploy.yml) (`npm ci && npm run build` with `GITHUB_PAGES=true`, no lint/typecheck/test gate). `vite.config.ts` switches `base` between `/` and `/designPortfolio/` off that env var.
- **Backend:** Supabase (`@supabase/supabase-js`) for a `cities` table (D&D interactive map feature) + one Supabase Edge Function ([supabase/functions/steam-games/index.ts](supabase/functions/steam-games/index.ts)) proxying the Steam API. Everything else (project case studies) is static content in [src/data/projectsData.ts](src/data/projectsData.ts) — this file is the de facto CMS.
- **No animation library, no UI-primitive library** (no Framer Motion/GSAP, no Radix/shadcn). Motion = Tailwind `transition-*`/`animate-*` utilities + CSS `@keyframes` in [src/index.css](src/index.css) + manual `setTimeout` state. Icons = `lucide-react` only.
- **State:** local `useState`/`useEffect` only, no Redux/Zustand/Context.

## 2. Design System & Styling
- **Tailwind CSS**, utility classes inline in JSX. No CSS Modules, no styled-components. Config: [tailwind.config.js](tailwind.config.js) only extends `colors` — spacing/radii/type scale are all stock Tailwind, chosen ad hoc per component.
- **Brand palette** (semantic names, not numbered scales):

| Token | Value | Use |
|---|---|---|
| `deep-indigo` | `rgb(28, 28, 69)` | Primary dark / heading text |
| `soft-white` | `rgb(245, 245, 250)` | Light background/text |
| `signal-blue` | `rgb(72, 120, 255)` | Accent / CTA / links |
| `slate-gray` | `rgb(96, 105, 130)` | Secondary/body text |
| `tech-teal` | `rgb(0, 175, 175)` | Secondary accent |
| `warm-sand` | `rgb(220, 190, 160)` | Sparingly-used secondary accent |

- **Typography:** `Inter` declared first in the font stack in `index.css`, but **not actually loaded** anywhere (no `<link>`/`@font-face`) — it silently falls back to system fonts unless Inter happens to be installed locally. Fix this if true Inter rendering matters.
- **No dark mode** — single light theme (the map viewer's `bg-slate-900` is a one-off, not a real theme system).
- **No shared UI primitives.** No `Button`/`Card`/`Container`/`Layout` components exist. Every page reimplements its own nav header, buttons, and cards — the sticky nav (logo + work/about/bookshelf links) is duplicated near-verbatim across `Landing.tsx`, `ProjectsPage.tsx`, `AboutPage.tsx`, `Bookshelf.tsx`, `ProjectsGallery.tsx`, `ProjectDetailPage.tsx`. **This is the top candidate for refactoring** if asked to reduce duplication.
- Two locally-scoped, non-shared sub-components worth knowing about: `ImageCarousel` and `PlayerTabs`, both defined inline at the bottom of `ProjectDetailPage.tsx`.

## 3. Code Conventions
- **TypeScript strict mode is on** (`tsconfig.app.json`), but `ProjectDetailPage.tsx` has known type-safety gaps: `(project as any).headerQuote`, and its `renderSection` switch handles section `type`s (`'pdf'`, `'pdfSplit'`, `'carousel'`, `'playerTabs'`, `'imageWithDisclaimer'`) that aren't in the `ProjectSection` union declared in `projectsData.ts`. Be aware of this drift when touching project-detail rendering — don't assume the interface is authoritative.
- **Interfaces**, not `type`, for data shapes (`Project`, `ProjectSection`, `City`, `Book`, `SteamGame`).
- Components: functional, typed `React.FC` (mostly — `Footer.tsx` omits the annotation). Files: PascalCase for components, camelCase for data/lib files.
- **Always `export default`** — no named exports, no barrel `index.ts` files anywhere.
- `src/components/` is **flat, no subfolders**, even for large files (`ProjectDetailPage.tsx` is 634 lines and inlines its sub-components rather than splitting them out). Match this flat style unless asked to restructure.
- Imports are relative; no path aliases configured.
- Asset paths: use `getAssetPath()` from [src/lib/assets.ts](src/lib/assets.ts) (prefixes `import.meta.env.BASE_URL`, passes through `http` URLs) — this is the correct pattern, though several existing components inline `` `${import.meta.env.BASE_URL}...` `` instead. Prefer `getAssetPath()` in new code.

## 4. Dev Workflow
```bash
npm run dev         # vite dev server
npm run build       # production build → dist/
npm run preview     # preview the build
npm run lint        # eslint .
npm run typecheck   # tsc --noEmit -p tsconfig.app.json
```
- **No test framework** is set up (no Jest/Vitest/Playwright) — don't assume test infrastructure exists.
- ESLint 9 flat config ([eslint.config.js](eslint.config.js)): typescript-eslint recommended + react-hooks recommended + react-refresh (`allowConstantExport: true`). No Prettier — formatting is manual/unenforced.
- Package manager: **npm** (`package-lock.json` present, CI uses `npm ci`).

## 5. Repo Hygiene Notes (fix opportunistically, don't block on)
- **No `.gitignore` exists.** `dist/` (build output) and `.env` (Supabase URL + anon key) are both committed to git. The anon key is a Supabase publishable key (safe by design under RLS), but the `.env` file itself and `dist/` shouldn't be tracked — flag this if doing repo cleanup.
- Stray backup files checked into `src/`: `App.tsx.backup`, `data/projectsData.ts.backup`.
- `.DS_Store` files are committed in multiple directories.

## 6. Working Guidelines
- Match the existing **flat-file, no-abstraction** style by default — this codebase deliberately has no component library or shared layout. Don't introduce Redux/Context/a UI kit/animation library unless explicitly asked.
- When duplication (nav header, card markup) needs fixing, ask before extracting shared components — it's a real pattern across the codebase, not an accident, and a refactor touches every page.
- No CI quality gates exist (lint/typecheck/test aren't run in the deploy workflow) — run `npm run lint` and `npm run typecheck` locally yourself after changes since nothing else will catch issues before deploy.
