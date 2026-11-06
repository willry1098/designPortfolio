# designPortfolio

William Ryan's design portfolio: https://willry1098.github.io/designPortfolio/

React 18 + Vite + Tailwind, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Develop

```bash
npm install
npm run dev         # local dev server
npm run lint        # must pass: CI runs it before deploying
npm run typecheck   # must pass: CI runs it before deploying
npm run build       # production build into dist/
```

Local dev needs a `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (used by the D&D map pages).

## Where content lives

- **Project case studies:** `src/data/projectsData.ts`
- **Bookshelf:** `src/data/booksData.ts`, synced from a Google Sheet with `python3 customScripts/update_bookshelf.py`
- **Steam "recently played":** `public/steam-games.json`, refreshed every 6 hours by `.github/workflows/update-steam-games.yml`
- **Images, PDFs, video:** `public/`

See `CLAUDE.md` for architecture notes and conventions.
