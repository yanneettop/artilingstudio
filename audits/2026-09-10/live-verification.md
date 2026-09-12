# Live verification — 10 September 2026

The deployed Projects page serves the new responsive WebP assets and corrected hero image. Both `/portfolio/` and `/large-format-tiling/` return HTTP 301 to the expected canonical destinations.

Browser checks passed: all 13 project galleries open with optimized assets; Soft Stone next-image control advances to 02/07; both material and legacy style parameters populate the quote field; clicking a material card leads to the populated quote form; Ceppo di Gré displays correctly; empty Outdoor filter is absent; Stone Effect shows matching materials. No live email was submitted. Mobile menu was verified locally in the previous round, but the live viewport override did not take effect reliably, so this round does not establish a fresh live mobile-menu result.

PageSpeed report: https://pagespeed.web.dev/analysis/https-www-artilingstudio-co-uk-projects/i5epx1scbv?form_factor=mobile

| Metric | Mobile | Desktop |
| --- | --- | --- |
| Performance | 94 | 91 |
| Accessibility | 96 | 96 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 1.3s | 0.3s |
| LCP | 2.5s | 0.5s |
| TBT | 0ms | 20ms |
| CLS | 0 | 0 |
| Speed Index | 4.7s | 4.0s |

Single lab run, 10 September 2026 at 20:20 BST, Lighthouse 13.4.1. No field data available. Earlier recorded performance was 69 mobile / 88 desktop, with mobile LCP 13.2s. Scores vary between runs and are not ranking guarantees.

Remaining findings: low contrast on FAQ and Process section labels and process numbers; render-blocking requests; approximately 50KiB unused CSS on mobile; non-composited animations. These are follow-up opportunities, not changes implemented in this verification round. Live image status results are recorded separately in live-image-check.json.
