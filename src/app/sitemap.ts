import type { MetadataRoute } from "next";
import { getAllPosts, getAllResources } from "@/lib/content";
import { getChangelog } from "@/lib/products";
import { allDocs } from "@/components/content/docs-data";
import { abs } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().slice(0, 10);
  const lastRelease = getChangelog()[0]?.date ?? now;
  const e = (path: string, priority: number, lastModified = now, changeFrequency: "weekly" | "monthly" = "weekly") => ({
    url: abs(path),
    lastModified,
    changeFrequency,
    priority,
  });
  return [
    e("/", 1),
    ...["/guides", "/showcase", "/pack", "/about", "/blog"].map((p) => e(p, 0.8)),
    e("/changelog", 0.7, lastRelease),
    ...["/privacy", "/terms"].map((p) => e(p, 0.3, now, "monthly")),
    ...allDocs().map((d) => e(`/docs/${d.product}/${d.slug}`, 0.7, lastRelease)),
    ...getAllResources().map((r) => e(`/resources/${r.slug}`, r.popular ? 0.8 : 0.6, r.date, "monthly")),
    ...getAllPosts().map((p) => e(`/blog/${p.slug}`, 0.5, p.date, "monthly")),
  ];
}
