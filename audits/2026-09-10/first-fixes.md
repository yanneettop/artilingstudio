# First audit fixes — 10 September 2026

Implemented locally; not deployed.

- Quote form reads `material` and legacy `style` query parameters into an editable optional field. The API includes it in plain text and escaped HTML email.
- Material cards now send the displayed material title. Fixed Ceppo di Gré and omit filter categories with no materials.
- Added Studio to the shared mobile navigation.
- Improved footer legal, cookie and credit text contrast.
- Added Cloudflare Pages 301 rules for `/portfolio` and `/large-format-tiling`, with and without trailing slashes. Local Python preview does not emulate these rules; verify HTTP status after deployment.
- Added 190 responsive WebP files for 50 portfolio images. Largest gallery variants total 5,626,010 bytes versus 67,774,506 original bytes (91.7% smaller). This is aggregate image size, not a measured page transfer or PageSpeed score.
- Cards use responsive images; small screens omit hover images. Lightbox thumbnails use 240px images, with gallery images selected on demand. Original images retained.
- Projects hero preload and fallback now use the existing 66,476-byte WebP instead of a 2,200,191-byte PNG.
- Gallery dialog containers use div rather than aside.

Validation: quote tests pass (6 scenarios plus parent test); production build and verification pass (107 asset hashes); all 190 generated image paths exist in dist. Browser checked new and legacy quote parameters, material filtering and spelling, Studio mobile navigation, all 13 Projects dialogs, Soft Stone next-image navigation, homepage gallery, mobile responsive sources and absent hover images, and computed footer legal text colour. No real email submitted.

Regenerate image derivatives with Python + Pillow using `scripts/optimize-project-images.py` after editing portfolio image sources. Load `project-image-manifest.js` before `portfolio-data.js`. Run `npm run build:tile-library` after TypeScript material changes, then `npm run build` and `npm run verify`.

Pre-existing changes, including the unpublished bespoke-bathroom-basins page and its build/sitemap entries, remain in the workspace and are included by the existing build configuration. Review deployment scope before publishing. Live redirect checks and a new PageSpeed measurement remain pending deployment.
