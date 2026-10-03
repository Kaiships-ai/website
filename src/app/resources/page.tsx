import type { Metadata } from "next";
import { getAllResources } from "@/lib/content";
import { ResourcesExplorer } from "@/components/resources-explorer";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Free Claude Code skills, agents & systems",
  description:
    "Every skill, agent, and CLAUDE.md system I ship — free, installable, and tested on a real product before release. The full PACK bundle ships by email.",
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
            Free resources
          </p>
          <h1 className="marker max-w-3xl text-4xl text-ink sm:text-6xl">
            Free guides, skills &{" "}
            <span className="marker-pop">systems.</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink-2">
            Always free. Always installable. Tested on a real product before it
            ships — with the failure modes documented, not hidden.
          </p>
        </Reveal>
        <section className="mt-12" aria-labelledby="from-reels">
          <h2 id="from-reels" className="marker text-3xl text-ink sm:text-4xl">
            From the reels
          </h2>
          <p className="mt-2 text-base text-ink-2">
            The guide behind each reel. Same file you get when you comment the keyword.
          </p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.magnets.map((m) => (
              <li key={m.keyword}>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sketch flex h-full flex-col gap-2 p-5 transition-transform hover:-translate-y-1"
                >
                  <span className="w-fit rounded-md bg-ink px-2.5 py-1 text-xs font-extrabold tracking-[0.18em] text-ochre">
                    {m.keyword}
                  </span>
                  <span className="text-lg font-extrabold text-ink">{m.title}</span>
                  <span className="text-base text-ink-2">{m.desc}</span>
                  <span className="mt-auto pt-2 text-sm font-extrabold text-accent-ink">Open the guide ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <div className="mt-16">
          <h2 className="marker mb-6 text-3xl text-ink sm:text-4xl">Deep dives</h2>
          <ResourcesExplorer resources={resources} />
        </div>
      </div>
    </div>
  );
}
