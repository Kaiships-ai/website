/** Guides index data: content/resources/*.mdx + the static public/free/*.html pages. Server only. */
import fs from "node:fs";
import path from "node:path";
import { getAllResources } from "@/lib/content";

export type Guide = { href: string; title: string; description: string; topic: string; date?: string; external?: boolean };

const FREE = path.join(process.cwd(), "public/free");
const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&rsquo;/g, "'").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

export function getFreePages(): Guide[] {
  if (!fs.existsSync(FREE)) return [];
  return fs
    .readdirSync(FREE)
    .filter((f) => f.endsWith(".html"))
    .map((f) => {
      const html = fs.readFileSync(path.join(FREE, f), "utf8");
      const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? f);
      const meta = html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1];
      const ledes = [...html.matchAll(/<p class="lede">([\s\S]*?)<\/p>/g)].map((m) => decode(m[1]));
      const description = meta ? decode(meta) : ledes.sort((a, b) => b.length - a.length)[0] ?? "";
      // The free guides are lead magnets: link the email gate (/get/<slug>), not the noindex /free page.
      return { href: `/get/${f.replace(/\.html$/, "")}`, title, description, topic: "Reel guides" };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getGuides(): Guide[] {
  const res = getAllResources().map((r) => ({
    href: `/resources/${r.slug}`,
    title: r.title,
    description: r.description,
    topic: r.type,
    date: r.date,
  }));
  return [...res, ...getFreePages()];
}
