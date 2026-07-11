import type { Metadata } from "next";
import { getAllResources } from "@/lib/content";
import { ResourcesExplorer } from "@/components/resources-explorer";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Free Claude Code skills, agents & systems",
  description:
    "Every skill, agent, and CLAUDE.md system I ship — free, installable, and tested on a real product before release. No email wall.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const resources = getAllResources();
  return (
    <div className="relative overflow-hidden pt-32 pb-24 sm:pt-36">
      <div
        aria-hidden
        className="glow absolute -top-24 right-[-10%] h-96 w-96 rounded-full"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-ink">
            {"//"} the library
          </p>
          <h1 className="max-w-3xl text-4xl font-medium tracking-tight text-ink sm:text-6xl">
            Free Claude Code skills, agents &{" "}
            <em className="font-serif italic text-accent-ink">systems.</em>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink-2">
            Always free. Always installable. Tested on a real product before it
            ships — with the failure modes documented, not hidden.
          </p>
        </Reveal>
        <div className="mt-12">
          <h2 className="sr-only">All resources</h2>
          <ResourcesExplorer resources={resources} />
        </div>
      </div>
    </div>
  );
}
