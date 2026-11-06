# PROJECT: William's Design Portfolio

Live at https://willry1098.github.io/designPortfolio/ (GitHub: `willry1098/designPortfolio`, branch `main`).

## 1. Stack & Architecture
- **Plain React 18 + Vite** (bootstrapped from Bolt.new's starter). Not Next.js — no `app/`/`pages/` dir, no SSR.
- **Routing:** `react-router-dom` v7, classic `<BrowserRouter>` + `<Routes>` in [src/App.tsx](src/App.tsx). Routes: `/`, `/projects`, `/gallery`, `/projects/:id`, `/about`, `/bookshelf`, `/map`, `/city-manager`.
- **Deploy:** GitHub Pages via [.github/workflows/deploy.yml](.github/workflows/deploy.yml): `npm ci` → `npm run lint` → `npm run typecheck` → `npm run build` (with `GITHUB_PAGES=true` and `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` from repo secrets). Runs on push to `main` and on manual dispatch. **Lint or typecheck failures block the deploy.** `vite.config.ts` switches `base` between `/` and `/designPortfolio/` off `GITHUB_PAGES`.
- **Content sources:**
  - Project case studies: static data in [src/data/projectsData.ts](src/data/projectsData.ts) — the de facto CMS.
  - Bookshelf: [src/data/booksData.ts](src/data/booksData.ts), synced from William's reading-log Google Sheet by [customScripts/update_bookshelf.py](customScripts/update_bookshelf.py) (run manually; `--backfill-covers` retries missing cover art). Don't hand-edit entries the script manages without telling William.
  - Steam "recently played": static [public/steam-games.json](public/steam-games.json), refreshed every 6 hours by [.github/workflows/update-steam-games.yml](.github/workflows/update-steam-games.yml) running [scripts/fetch-steam-games.mjs](scripts/fetch-steam-games.mjs) (`STEAM_API_KEY` secret). The script only rewrites the file when the games change; when it does, the workflow commits as `github-actions[bot]` and starts the deploy workflow itself (pushes made with `GITHUB_TOKEN` don't trigger `on: push`). Expect frequent bot commits on `main`: pull before pushing.
  - D&D interactive map: Supabase (`@supabase/supabase-js`, [src/lib/supabase.ts](src/lib/supabase.ts)) `cities` table, schema in [supabase/migrations/](supabase/migrations/). `/city-manager` edits it.
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

- **Typography:** Inter, self-hosted through `@fontsource/inter` (weights 300–700 imported in [src/main.tsx](src/main.tsx)) and first in the font stack in `index.css`.
- **No dark mode** — single light theme (the map viewer's `bg-slate-900` is a one-off, not a real theme system).
- **No shared UI primitives.** No `Button`/`Card`/`Container`/`Layout` components exist. Every page reimplements its own nav header, buttons, and cards — the sticky nav (logo + work/about/bookshelf links) is duplicated near-verbatim across `Landing.tsx`, `ProjectsPage.tsx`, `AboutPage.tsx`, `Bookshelf.tsx`, `ProjectsGallery.tsx`, `ProjectDetailPage.tsx`. **This is the top candidate for refactoring** if asked to reduce duplication.
- Two locally-scoped, non-shared sub-components worth knowing about: `ImageCarousel` and `PlayerTabs`, both defined inline at the bottom of `ProjectDetailPage.tsx`.

## 3. Code Conventions
- **TypeScript strict mode** (`tsconfig.app.json`, plus `noUnusedLocals`/`noUnusedParameters`). `npm run typecheck` passes clean — keep it that way, since CI now enforces it.
- **The `Project`/`ProjectSection` interfaces in `projectsData.ts` are authoritative** and match what `ProjectDetailPage.tsx` renders. To add a new section `type`, update the union (and any new fields) and the `renderSection` switch together. To add a new story-style phase key (like `theory` or `'meet-the-players'`), add it to `hcdPhases` in the interface, to `phaseConfig` and the `isCustomPhase` list in `renderHCDPhase`, and to the render order near the bottom of the page. No `as any` casts.
- **Interfaces**, not `type`, for data shapes (`Project`, `ProjectSection`, `Player`, `City`, `Book`, `SteamGame`).
- Components: functional, typed `React.FC`. Files: PascalCase for components, camelCase for data/lib files.
- **Always `export default`** for components — no barrel `index.ts` files. (Data files also export named helpers and types, e.g. `getProjectById`, `ProjectSection`.)
- `src/components/` is **flat, no subfolders**, even for large files (`ProjectDetailPage.tsx` is ~590 lines and inlines its sub-components rather than splitting them out). Match this flat style unless asked to restructure.
- Imports are relative; no path aliases configured.
- Asset paths: use `getAssetPath()` from [src/lib/assets.ts](src/lib/assets.ts) (prefixes `import.meta.env.BASE_URL`, passes through `http` URLs) — this is the correct pattern, though several existing components inline `` `${import.meta.env.BASE_URL}...` `` instead. Prefer `getAssetPath()` in new code.
- **Asset filenames:** lowercase/camelCase, no spaces (e.g. `pamperedChef-hero.jpg`, `chapel-row-markers-hero.jpg`). Spaces in URLs break easily.
- Strings in `projectsData.ts` are single-quoted: escape `'` as `\'`, but don't escape `"` (lint rejects `\"`).

## 4. Dev Workflow
```bash
npm run dev         # vite dev server
npm run build       # production build → dist/
npm run preview     # preview the build
npm run lint        # eslint .
npm run typecheck   # tsc --noEmit -p tsconfig.app.json
python3 customScripts/update_bookshelf.py   # sync bookshelf from the Google Sheet
```
- **Run `npm run lint` and `npm run typecheck` before pushing** — the deploy workflow runs both and won't publish if either fails.
- **No test framework** is set up (no Jest/Vitest/Playwright) — don't assume test infrastructure exists.
- ESLint 9 flat config ([eslint.config.js](eslint.config.js)): typescript-eslint recommended + react-hooks recommended + react-refresh (`allowConstantExport: true`). No Prettier — formatting is manual/unenforced.
- Package manager: **npm** (`package-lock.json` present, CI uses `npm ci`). Package name is `design-portfolio`.
- `main` gets bot commits from the Steam workflow; `git pull` before committing to avoid needless merge commits.

## 5. Repo Hygiene Notes
- `.gitignore` covers `node_modules`, `dist`, `.env`, `.DS_Store`, and the local fact-sheet link. None of those are tracked. `.env` holds the Supabase URL + anon key for local dev (a publishable key, safe under RLS); CI gets them from repo secrets.
- **`public/` images that look unused may not be.** The city banners (`bergen.png`, `cortis.png`, `galurn.png`, `lilonia.png`, `palmyra.png`, `rema.png`, `scorne.png`, `tolta.png`, `tratria.png`) aren't referenced anywhere in `src/` but are almost certainly the `banner_image` URLs stored in the Supabase `cities` table (unverified: the rows live in Supabase, not the repo). `404.html` is the GitHub Pages SPA fallback. Check both before deleting anything.
- **`public/` is large (~134 MB), which slows clones and deploys.** The biggest files are the two cookbook PDFs (~20 MB each), `chapel-demo.mp4` (~15 MB), and several 4–6 MB JPGs. Compressing them (e.g. resizing JPGs to ~2400 px wide, re-exporting PDFs at screen resolution) is the main remaining cleanup. Ask William before replacing any media.
- `sectionRefs` in `ProjectDetailPage.tsx` is still populated by `ref` callbacks but no longer read (the old side timeline nav was removed). Harmless; remove it if you're editing that area.

## 6. Working Guidelines
- Match the existing **flat-file, no-abstraction** style by default — this codebase deliberately has no component library or shared layout. Don't introduce Redux/Context/a UI kit/animation library unless explicitly asked.
- When duplication (nav header, card markup) needs fixing, ask before extracting shared components — it's a real pattern across the codebase, not an accident, and a refactor touches every page.
- Keep lint and typecheck clean; CI will refuse to deploy otherwise.
- Before changing any factual content about William, check the fact sheet (section 7).

## 7. Fact Sheet (source of truth for content about William)
- **Canonical file:** `/Users/william/Documents/ryanResume/jobSearchProject/01_Fact_Sheet.md`, shared with the resume/cover-letter project. This repo links to it with a symlink at [01_Fact_Sheet.md](01_Fact_Sheet.md) (git-ignored, local to this machine), so both projects read and update **one** document. Edit the fact sheet itself, never a copy. If the link is missing or broken, recreate it from the repo root: `ln -s ../../ryanResume/jobSearchProject/01_Fact_Sheet.md 01_Fact_Sheet.md`.
- **Read it before writing or editing any factual content about William** — project case studies in [src/data/projectsData.ts](src/data/projectsData.ts), [AboutPage.tsx](src/components/AboutPage.tsx), landing-page copy, and any date, number, title, tool, or availability claim. Skip it for pure code/styling work. (Linked rather than `@`-imported on purpose, so it isn't loaded into every session.)
- **Same rules as the resume project:** use only facts on the sheet. If copy needs a number, date, name, or claim that isn't there, ask William — don't estimate or inflate. Respect its "Don't" and "Still needed" flags.
- **If the site and the sheet disagree,** the sheet wins: tell William about the mismatch, then fix the site to match.
- **New confirmed facts go into the sheet,** under the section they belong in, stamped "(confirmed by William, <date>)" like the existing entries, with the "Last updated" date bumped.
- The sheet holds private details (phone number, notes on what William doesn't want emphasized). Don't copy its contents into repo files or commit messages beyond what the site already publishes.
