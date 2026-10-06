import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllGuides, GUIDE_TOPICS } from "@/lib/guides";
import { PageHero, PageShell } from "@/components/page-bits";
import { GuidesExplorer } from "./guides-explorer";

export const metadata: Metadata = {
  title: "Free Claude Code guides from the reels",
  description:
    "Every reel on @kaiships.ai has a written guide: the exact commands, the links, and an honest note on what doesn't work.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  const guides = getAllGuides();
  const cards = guides.map(({ slug, title, keyword, topic, summary, minutes, date }) => ({
    slug, title, keyword, topic, summary, minutes, date,
  }));
  return (
    <PageShell>
      <PageHero
        eyebrow="Guides"
        title={`${guides.length} Claude Code`}
        accent="setups from the reels."
        sub="Every reel on @kaiships.ai has a written guide here: the exact commands, the links, and an honest note on what doesn't work. Search the keyword from a reel."
      />
      <div className="mt-10">
        <Suspense fallback={null}>
          <GuidesExplorer guides={cards} topics={GUIDE_TOPICS} />
        </Suspense>
      </div>
    </PageShell>
  );
}
