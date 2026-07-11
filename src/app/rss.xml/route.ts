import { siteConfig } from "@/lib/site.config";
import { getAllPosts, getAllResources } from "@/lib/content";

export const dynamic = "force-static";

function esc(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function GET() {
  const items = [
    ...getAllPosts().map((p) => ({
      title: p.title,
      description: p.description,
      url: `${siteConfig.url}/blog/${p.slug}`,
      date: p.date,
    })),
    ...getAllResources().map((r) => ({
      title: r.title,
      description: r.description,
      url: `${siteConfig.url}/resources/${r.slug}`,
      date: r.date,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(siteConfig.name)} — ship log &amp; library</title>
    <link>${siteConfig.url}</link>
    <description>${esc(siteConfig.bio)}</description>
    <language>en</language>
    ${items
      .map(
        (i) => `<item>
      <title>${esc(i.title)}</title>
      <link>${i.url}</link>
      <guid>${i.url}</guid>
      <pubDate>${new Date(i.date).toUTCString()}</pubDate>
      <description>${esc(i.description)}</description>
    </item>`,
      )
      .join("\n    ")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
