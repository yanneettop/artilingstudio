# Artiling Studio

Static marketing site for Artiling Studio — bespoke porcelain sinks and premium tiling, London.

## Structure

```
/
├── index.html              # Home page
├── projects/index.html     # Projects index (clean URL: /projects)
├── assets/
│   ├── css/styles.css
│   ├── js/                 # main.js, portfolio-data.js, projects.js
│   └── images/             # Site images (hero, logos, portfolio)
├── public/projects/        # Per-project media (cover, gallery, details)
└── src/data/               # Unused TS source (portfolioData.ts)
```

## Local preview

Any static server works, e.g.:

```bash
npx serve .
# or
python -m http.server 8080
```

Then open http://localhost:8080.

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In Cloudflare Pages, connect the repo.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
4. Deploy.

Clean URLs (e.g. `/projects`) resolve automatically via `projects/index.html`.
