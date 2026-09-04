// Runs automatically after `next build` (see package.json "postbuild").
// Next's `output: "standalone"` produces a self-contained .next/standalone/
// with a minimal server.js + only the node_modules it actually needs, but it
// does NOT copy `public/` or `.next/static/` into that folder — Next expects
// you to do that yourself before deploying. This script does exactly that,
// cross-platform (fs.cpSync works the same on Windows and the Linux host),
// so `npm run build` alone produces a folder ready to upload/run as-is.
import { cpSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const standaloneDir = path.join(root, ".next", "standalone");

if (!existsSync(standaloneDir)) {
  console.warn(
    '[copy-standalone-assets] .next/standalone not found — did next.config.ts set output: "standalone"? Skipping.'
  );
  process.exit(0);
}

const copies = [
  { from: path.join(root, "public"), to: path.join(standaloneDir, "public") },
  { from: path.join(root, ".next", "static"), to: path.join(standaloneDir, ".next", "static") },
];

for (const { from, to } of copies) {
  if (!existsSync(from)) continue;
  cpSync(from, to, { recursive: true });
  console.log(`[copy-standalone-assets] copied ${path.relative(root, from)} -> ${path.relative(root, to)}`);
}

console.log("[copy-standalone-assets] done. Deployable app: .next/standalone/ (startup file: server.js)");
