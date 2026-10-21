/**
 * Product facts for the site. Build-time only: docs and changelog are read from
 * content/products/<slug>/ (written by `pnpm sync:products`). Server code only.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getProducts } from "./products-data";

export { getProducts, getProduct, formatPrice } from "./products-data";
export type { Product, Tier } from "./products-data";

const DIR = path.join(process.cwd(), "content/products");
const GROUPS = ["Start", "Make better reels", "Help"];

export type DocMeta = { slug: string; title: string; description: string; group: string; order: number };
export type Doc = DocMeta & { body: string };
export type ChangelogEntry = { product: string; slug: string; version: string; date: string; items: string };

function readDoc(slug: string, file: string): Doc {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, slug, "docs", file), "utf8"));
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title ?? file),
    description: String(data.description ?? ""),
    group: String(data.group ?? "Help"),
    order: Number(data.order ?? 99),
    body: content.trim(),
  };
}

export function getDocs(slug: string): DocMeta[] {
  const dir = path.join(DIR, slug, "docs");
  if (!fs.existsSync(dir)) return [];
  const g = (x: string) => (GROUPS.indexOf(x) + 1 || 99);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f): DocMeta => {
      const d = readDoc(slug, f);
      return { slug: d.slug, title: d.title, description: d.description, group: d.group, order: d.order };
    })
    .sort((a, b) => g(a.group) - g(b.group) || a.order - b.order);
}

export function getDoc(slug: string, docSlug: string): Doc | null {
  const file = `${docSlug}.md`;
  if (!/^[a-z0-9-]+$/.test(docSlug) || !fs.existsSync(path.join(DIR, slug, "docs", file))) return null;
  return readDoc(slug, file);
}

/** Both repos' CHANGELOG.md, headings `## <version> · YYYY-MM-DD`, merged newest first. */
export function getChangelog(): ChangelogEntry[] {
  const out: ChangelogEntry[] = [];
  for (const p of getProducts()) {
    const file = path.join(DIR, p.slug, "CHANGELOG.md");
    if (!fs.existsSync(file)) continue;
    const parts = fs.readFileSync(file, "utf8").split(/^## /m).slice(1);
    for (const part of parts) {
      const [head, ...rest] = part.split("\n");
      const m = head.match(/^(.*?)\s*·\s*(\d{4}-\d{2}-\d{2})\s*$/);
      if (!m) continue;
      out.push({ product: p.name, slug: p.slug, version: m[1].trim(), date: m[2], items: rest.join("\n").trim() });
    }
  }
  return out.sort((a, b) => b.date.localeCompare(a.date));
}
