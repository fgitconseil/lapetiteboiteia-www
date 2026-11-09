// @ts-check
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/config.ts";

// Static output only: plain files in dist/, served as is by a static host.
export default defineConfig({
  site: SITE_URL,
  output: "static",
  // /legal/cgu is built as legal/cgu.html and linked without a trailing
  // slash, as on the old site. No redirect needed.
  trailingSlash: "never",
  build: {
    format: "file",
    // Keep stylesheets and the hub script as files, not inlined, so a strict
    // Content-Security-Policy can be set without hashes.
    inlineStylesheets: "never",
  },
  devToolbar: { enabled: false },
  markdown: {
    // DEPRECATED in Astro 7, removed in Astro 8: move both flags to a
    // processor before upgrading to Astro 8 (needs @astrojs/markdown-satteri,
    // a new dependency; decision of 2026-11-09, option A, linked to D329).
    // Legal texts are rendered verbatim: no curly quotes, no dash rewriting.
    smartypants: false,
    // Same as the app (commonmark, no linkify): no autolinked bare domains.
    gfm: false,
  },
});
