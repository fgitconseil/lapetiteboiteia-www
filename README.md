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
the booking link. On `main` it then deploys to GitHub Pages (below).

## Hosting on GitHub Pages

The workflow builds on every push, and on `main` deploys `dist/` to GitHub
Pages (source "GitHub Actions"), one deploy at a time. Until a custom domain
is set, the site answers at `https://fgitconseil.github.io/lapetiteboiteia-www/`.
Under that project path the styles, fonts and links break, because every URL is
root-relative: expected, the site is built for a domain root.

GitHub Pages sets no HTTP headers of ours, so the Content-Security-Policy is a
`<meta>` tag in `src/layouts/Base.astro` (same origin only).

### Prerequisites

- **The app answers at `APP_URL`** (`https://app.lapetiteboiteia.fr/`, in
  `src/config.ts`). « Se connecter » points there, and today's app on `www`
  stops being reachable at step 2. `www` does not switch before that.
- **Domain verified at organization level**, before any custom domain is set,
  so no other GitHub account can claim it: organization **Settings** →
  **Pages** → **Add a domain** → `lapetiteboiteia.fr`, then a DNS TXT record
  named `_github-pages-challenge-fgitconseil.lapetiteboiteia.fr` with the value
  GitHub shows, then **Verify**. Keep the TXT record afterwards.

### Step 1: preview.lapetiteboiteia.fr

| Record | Name | Value |
| --- | --- | --- |
| CNAME | `preview` | `fgitconseil.github.io` |

Then repository **Settings** → **Pages** → **Custom domain**:
`preview.lapetiteboiteia.fr`, **Save**, wait for the DNS check and the
certificate (the check mark), then tick **Enforce HTTPS**. The option can take
up to 24 hours to appear. Nothing else changes: `www` and the other names keep
pointing at the current server.

### Step 2: www and apex

Once the page is validated on `preview` and the app answers at `APP_URL`:

| Record | Name | Value |
| --- | --- | --- |
| CNAME | `www` | `fgitconseil.github.io` (replaces the record to the current server) |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

Remove every other A, AAAA, ALIAS or ANAME record on `@`: an extra one blocks
the certificate. Then set the custom domain to `www.lapetiteboiteia.fr`
(a site has one custom domain, so `preview` stops serving; delete its CNAME),
wait for the certificate, and tick **Enforce HTTPS**. GitHub then redirects
`lapetiteboiteia.fr` to `www.lapetiteboiteia.fr` by itself. DNS changes can
take up to 24 hours to propagate.

Values from GitHub's documentation, "Managing a custom domain for your GitHub
Pages site" and "Verifying your custom domain for GitHub Pages"; check them
again on the day.

### The other domain names

Today these names answer 301 to `https://www.lapetiteboiteia.fr` (path kept)
from the app's server:

- `lapetiteboiteia.fr`: handled by GitHub at step 2 (apex records above).
- `www.lapetiteboiteia.com`, `lapetiteboiteia.com`,
  `www.lapetiteboiteia.net`, `lapetiteboiteia.net`: their redirect moves to
  the registrar (permanent web forwarding to `https://www.lapetiteboiteia.fr`,
  path kept if offered). Check that the registrar's forwarding answers over
  HTTPS too; if it does not, those names lose HTTPS.
