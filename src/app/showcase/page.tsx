import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "@/lib/site.config";
import { ShowcaseGrid, type Reel } from "@/components/content/showcase-grid";
import { PageHeader } from "@/components/content/bits";
import { JsonLd } from "@/components/content/json-ld";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Showcase · reels made with Studio",
  description:
    "Reels made with the Kaiships Studio engine and posted on @kaiships.ai, with their Instagram view counts. Made a reel with Studio? Share it in our Discord.",
  path: "/showcase",
  section: "showcase",
});

const pub = (p: string) => (fs.existsSync(path.join(process.cwd(), "public", p)) ? `/${p}` : null);

export default function ShowcasePage() {
  const reels: Reel[] = siteConfig.studio.reels.map((r) => ({
    id: r.id ?? r.label,
    label: r.label,
    url: r.url,
    views: r.views,
    poster: r.id ? pub(`reel-kit/video/${r.id}.jpg`) : null,
    video: r.id ? pub(`reel-kit/video/${r.id}.mp4`) : null,
  }));
  const discord = (siteConfig.footer.cols as readonly { links: readonly { label: string; href: string }[] }[]).flatMap((c) => c.links).find((l) => l.label === "Discord")?.href;
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <JsonLd data={breadcrumbLd([{ name: "Showcase", path: "/showcase" }])} />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader eyebrow="Showcase" title="Made with Studio." sub="Reels from the Studio Reel engine, posted on @kaiships.ai. One prompt each." />
        {discord ? (
          <a href={discord} target="_blank" rel="noopener noreferrer" className="w-fit shrink-0 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-on hover:opacity-90">
            Submit your reel on Discord ↗
          </a>
        ) : null}
      </div>
      <div className="mt-14">
        <ShowcaseGrid reels={reels} source="Instagram, Oct 20, 2026" />
      </div>
    </div>
  );
}
