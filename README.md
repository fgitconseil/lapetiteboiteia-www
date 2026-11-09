# lapetiteboiteia-www

The public landing of La Petite Boîte IA, for `www.lapetiteboiteia.fr`
(register line D329). A static Astro site: the build is plain HTML, CSS,
fonts and one first-party script in `dist/`. No analytics, no cookies, no
third-party request, so no cookie banner.

## Contents

| Path | What |
| --- | --- |
| `src/pages/index.astro` | The landing, ported from the app repository's landing template |
| `src/data/landing.ts` | Its copy, verbatim |
| `src/pages/legal/[slug].astro` | `/legal/cgu`, `/legal/cgv`, `/legal/mentions-legales`, in the app shell they had (logo, signature, legal links) |
| `src/pages/404.astro` | The 404 page, built as `dist/404.html` |
| `src/config.ts` | `SITE_URL` and `APP_URL` (« Se connecter »), the only absolute URLs of the site |
| `src/legal/*.md` | Copies of the app repository's legal texts, unchanged |
| `src/legal/SOURCE` | Where each copy comes from in the app repository, and the source commit. Never rendered |
| `src/styles/tokens.css` | Design tokens, charter v4, shadcn names, light theme only, versioned. Copied into the app repository |
| `src/styles/fonts.css`, `public/fonts/` | Self-hosted fonts (DM Sans, Bricolage Grotesque, Instrument Serif), SIL OFL 1.1 |
| `public/scripts/hub.js` | The "Comment ça marche" animation. Optional: the page is complete without it |
| `design/og-image.svg`, `public/og-image.png` | The 1200x630 sharing image: SVG source, PNG export |

The legal texts are owned by the app repository. To update them, copy the
files again:

    export LPBIA_REPO=/path/to/app/repository
    for f in cgu cgv mentions-legales; do
      cp "$LPBIA_REPO/legal/lpbia-$f.md" src/legal/$f.md
    done

then update the commit in `src/legal/SOURCE` and run `pnpm check:legal`. It
compares the SHA-256 of the CGU and CGV with their sources in `LPBIA_REPO`.
The mentions légales are left out on purpose: they name the site's host, and
that line will differ from the app's copy. Local only: CI has no checkout of
the app repository.

The og:image is exported from `design/og-image.svg` with a headless browser
(Chromium through Playwright, run from outside this repository, no
dependency here): load the SVG in a 1200x630 page with the three
`public/fonts/` files declared by `@font-face`, wait for `document.fonts`,
screenshot to `public/og-image.png`.

## Build

Node 22.22 or later (`.nvmrc`) and pnpm 10.34.9 (`packageManager`, via
`corepack enable`).

    export ASTRO_TELEMETRY_DISABLED=1   # Astro CLI telemetry off
    pnpm install --frozen-lockfile
    pnpm check                          # astro check + strict type check of hub.js
    pnpm build                          # writes dist/

CI (`.github/workflows/ci.yml`) runs the same three steps on every push, and
fails if a built page references an origin other than the site, the app and
the booking link. It does not deploy.

## Hosting

Not deployed yet. The hosting section is written with the deployment.
