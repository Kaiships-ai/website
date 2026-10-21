import type { Metadata } from "next";
import { getGuides } from "@/components/content/guides-data";
import { GuidesGrid } from "@/components/content/guides-grid";
import { PageHeader } from "@/components/content/bits";
import { JsonLd } from "@/components/content/json-ld";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Free Claude Code guides",
  description:
    "Free guides for Claude Code: skills, agents, CLAUDE.md systems and the guide behind every @kaiships.ai reel. Each one tested on a real product first.",
  path: "/guides",
  section: "guides",
});

export default function GuidesPage() {
  const guides = getGuides();
  const topics = [...new Set(guides.map((g) => g.topic))];
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <JsonLd data={breadcrumbLd([{ name: "Guides", path: "/guides" }])} />
      <PageHeader center eyebrow="Guides" title="Free guides for Claude Code." sub="Skills, agents and setups I use every day, plus the guide behind each reel. Free. Some guides ask for your email so the next one reaches you." />
      <div className="mt-14">
        <GuidesGrid guides={guides} topics={topics} />
      </div>
    </div>
  );
}
