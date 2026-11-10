// Local check: the CGU and CGV served here are byte-identical to their
// sources in the app repository. The app asks users to accept these two texts
// by SHA-256, so a drift here would show a text nobody accepted.
//
// Only the CGU and CGV are checked. The mentions légales are excluded on
// purpose: their Article 2 names the host. This site moves to GitHub Pages
// while the app stays on its own server, so the site's copy will name a
// different host than the app's copy, and a byte comparison would always
// fail. They are still copied from the app repository; review them by hand.
//
// The app repository is private and not part of this one: give its local path
// in LPBIA_REPO. The file mapping and the source commit are in src/legal/SOURCE.
// Not run in CI, which has no checkout of the app repository.
//
//   LPBIA_REPO=/path/to/app/repository pnpm check:legal
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const CHECKED = ["cgu.md", "cgv.md"];

const repoEnv = process.env.LPBIA_REPO;
if (!repoEnv) {
  console.error("check:legal: set LPBIA_REPO to the local path of the app repository");
  process.exit(2);
}
const repo = resolve(repoEnv);
if (!existsSync(repo)) {
  console.error(`check:legal: LPBIA_REPO not found: ${repo}`);
  process.exit(2);
}

// src/legal/SOURCE: "commit <sha>" and "<local file> <path in the app repository>" lines.
const sourceLines = readFileSync("src/legal/SOURCE", "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"));
const commit = sourceLines.find((line) => line.startsWith("commit "))?.slice("commit ".length) ?? "unknown";
const mapping = new Map(
  sourceLines
    .filter((line) => !line.startsWith("commit "))
    .map((line) => /** @type {[string, string]} */ (line.split(/\s+/, 2))),
);

const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
let failed = false;
console.log(`source commit recorded in src/legal/SOURCE: ${commit}`);
for (const local of CHECKED) {
  const source = mapping.get(local);
  if (!source) {
    console.error(`check:legal: ${local} has no source line in src/legal/SOURCE`);
    process.exit(2);
  }
  const a = sha256(`src/legal/${local}`);
  const b = sha256(resolve(repo, source));
  const ok = a === b;
  failed ||= !ok;
  console.log(`${ok ? "ok  " : "DIFF"} src/legal/${local}  ${a.slice(0, 16)}  ${source}  ${b.slice(0, 16)}`);
}
if (failed) {
  console.error("check:legal: copy the sources again (see README) and update the commit in src/legal/SOURCE");
  process.exit(1);
}
