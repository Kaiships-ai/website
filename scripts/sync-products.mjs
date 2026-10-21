#!/usr/bin/env node
// Pull every product fact from its repo + Polar into content/products/<slug>/.
// ARCHITECTURE rule 4: the website reads, never copies by hand. Run: pnpm sync:products
// Preview unmerged repo changes: pnpm sync:products --local[=<dir>] reads <dir>/<repo name>
// (default ~/Desktop/kaiships) instead of GitHub main. Release PRs always use the GitHub run.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const products = JSON.parse(fs.readFileSync(path.join(root, "products.json"), "utf8"));
const localArg = process.argv.find((a) => a === "--local" || a.startsWith("--local="));
const localDir = localArg && (localArg.split("=")[1] || path.join(os.homedir(), "Desktop/kaiships"));

const gh = (args, raw = true) =>
  execFileSync("gh", ["api", ...(raw ? ["-H", "Accept: application/vnd.github.raw"] : []), ...args], {
    maxBuffer: 64 * 1024 * 1024,
  });
const write = (file, data) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
};

const index = {};
for (const p of products) {
  const dir = path.join(root, "content/products", p.slug);
  const repoDir = localDir && path.join(localDir, p.repo.split("/")[1]);
  if (repoDir && !fs.existsSync(repoDir)) throw new Error(`--local: no clone at ${repoDir}`);
  const get = (f) => (repoDir ? fs.readFileSync(path.join(repoDir, f)) : gh([`repos/${p.repo}/contents/${f}`]));

  const product = JSON.parse(get("product.json").toString());
  write(path.join(dir, "product.json"), JSON.stringify(product, null, 2) + "\n");
  write(path.join(dir, "CHANGELOG.md"), get("CHANGELOG.md"));

  // docs/*.md + images they reference (relative paths only). Old docs are removed first.
  fs.rmSync(path.join(dir, "docs"), { recursive: true, force: true });
  const list = repoDir
    ? fs.readdirSync(path.join(repoDir, "docs"), { withFileTypes: true }).map((d) => ({ name: d.name, type: d.isFile() ? "file" : "dir" }))
    : JSON.parse(gh([`repos/${p.repo}/contents/docs`], false).toString());
  const mds = list.filter((f) => f.type === "file" && f.name.endsWith(".md"));
  for (const f of mds) {
    const md = get(`docs/${f.name}`).toString();
    write(path.join(dir, "docs", f.name), md);
    for (const [, ref] of md.matchAll(/\]\(([^)\s]+\.(?:png|jpe?g|gif|webp|svg))\)/gi)) {
      if (/^(https?:)?\/\//.test(ref) || ref.startsWith("/")) continue;
      const rel = path.posix.normalize(path.posix.join("docs", ref));
      write(path.join(dir, rel), get(rel));
    }
  }

  // Price: Polar owns it.
  const polarFile = path.join(dir, "polar.json");
  if (process.env.POLAR_ACCESS_TOKEN) {
    const res = await fetch(`https://api.polar.sh/v1/products/${p.polarProductId}`, {
      headers: { Authorization: `Bearer ${process.env.POLAR_ACCESS_TOKEN}` },
    });
    if (!res.ok) throw new Error(`Polar ${p.slug}: HTTP ${res.status}`);
    const j = await res.json();
    const price = (j.prices || []).find((x) => !x.is_archived && x.price_amount != null) || {};
    write(
      polarFile,
      JSON.stringify(
        { name: j.name, price_amount: price.price_amount, currency: price.price_currency, fetched_at: new Date().toISOString().slice(0, 10) },
        null,
        2,
      ) + "\n",
    );
  } else {
    console.warn(`⚠ POLAR_ACCESS_TOKEN not set: kept existing ${path.relative(root, polarFile)}`);
    if (!fs.existsSync(polarFile)) throw new Error(`missing ${polarFile}`);
  }

  index[p.slug] = { product, polar: JSON.parse(fs.readFileSync(polarFile, "utf8")) };
  console.log(`✓ ${p.slug} v${product.version}: ${mds.length} docs`);
}
// One file the client-safe products-data.ts imports.
write(path.join(root, "content/products/index.json"), JSON.stringify(index, null, 2) + "\n");
