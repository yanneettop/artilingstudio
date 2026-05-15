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

## Quote form backend setup

The quote form posts to the Cloudflare Pages Function at `/api/quote`.

### Required Cloudflare Pages environment variables

Set these in the Cloudflare Pages project settings:

- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `QUOTE_TO_EMAIL`
- `QUOTE_FROM_EMAIL`
- `ALLOWED_ORIGIN`
- `R2_PUBLIC_BASE_URL` (optional)

`ALLOWED_ORIGIN` should be the production origin, for example:

```text
https://www.artilingstudio.co.uk
```

If `ALLOWED_ORIGIN` is missing, the Function will not hard-fail local/dev requests, but production should set it.

### Required R2 binding

Create an R2 bucket for quote uploads and bind it to the Pages project as:

```text
QUOTE_UPLOADS
```

Uploaded objects use this key format:

```text
quotes/artiling/YYYY-MM-DD/submission-id/sanitized-original-filename
```

### Required Turnstile setup

Create a Cloudflare Turnstile widget for the site and replace the placeholder site key in:

```text
quote/index.html
```

Placeholder to replace:

```text
1x00000000000000000000AA
```

Also set the matching secret key as `TURNSTILE_SECRET_KEY` in Cloudflare Pages.

### Required Resend setup

In Resend:

1. Verify the sending domain.
2. Add the required DNS records.
3. Create an API key.
4. Set `RESEND_API_KEY` in Cloudflare Pages.
5. Set `QUOTE_FROM_EMAIL` to an approved sender on the verified domain.
6. Set `QUOTE_TO_EMAIL` to the inbox that should receive quote requests.

The Function stores images in R2 and includes object keys or public links in the email. It does not attach uploaded images.

### Testing steps

After deployment, test:

1. Submit the quote form without photos.
2. Submit with one JPG.
3. Submit with multiple photos.
4. Try a file over 10MB and confirm it is rejected.
5. Try more than 6 files and confirm they are rejected.
6. Try missing required fields and confirm the form blocks submission.
7. Confirm successful submissions redirect to `/thank-you/`.
8. Confirm the `quote_form_submit` analytics event fires only after a successful backend response.

### Local testing notes

For static preview only, any static server still works:

```bash
python -m http.server 8080
```

To test the Pages Function locally, use Cloudflare's Pages dev tooling with the required environment variables and R2 binding configured. The backend depends on Cloudflare runtime bindings and will not run through a plain static file server.
