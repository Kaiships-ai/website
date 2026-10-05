import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";
import { getAllPosts, getAllResources } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const statics = ["", "/pack", "/resources", "/products", "/school", "/school/module-1", "/skills", "/about", "/blog", "/privacy", "/terms"].map(
    (p) => ({
      url: `${siteConfig.url}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
    }),
  );
  const resources = getAllResources().map((r) => ({
    url: `${siteConfig.url}/resources/${r.slug}`,
    lastModified: r.date,
    changeFrequency: "monthly" as const,
    priority: r.popular ? 0.9 : 0.6,
  }));
  const posts = getAllPosts().map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...statics, ...resources, ...posts];
}
