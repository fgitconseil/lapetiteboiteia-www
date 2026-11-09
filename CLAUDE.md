# lapetiteboiteia-www

The public landing of La Petite Boîte IA, served at www.lapetiteboiteia.fr.
Static Astro site (D329). Output is plain files in `dist/`.

## Rules
- Code, comments, commit messages, file names: English.
- Site copy: French, exactly as in the source landing
  (`../LaPetiteBoiteIA/gabarits/landing.html`). Do not rewrite it.
- No em-dashes in copy we write. Use a colon, a comma or a full stop.
- Pages and components use only the CSS variables of `src/styles/tokens.css`.
  No raw colour, font or radius values elsewhere. Bump the version in its
  header when a token changes: the file is copied into the app repository.
- Static output only. Every dependency pinned to an exact version, pnpm,
  TypeScript strict.
- Accessibility: semantic HTML, visible focus, phone first, AA contrast.

## Stop rule
Before adding any of the following, stop and write « DECISION NEEDED » with
two options, and wait:
- a dependency (runtime or dev),
- a third-party script, stylesheet, font or embed,
- a form, or anything that posts data,
- a cookie, local storage, or any tracking or analytics.

## Commands
- `pnpm install --frozen-lockfile`
- `pnpm check` (astro check, TypeScript strict)
- `pnpm build` (writes `dist/`)
