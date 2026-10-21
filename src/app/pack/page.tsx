import type { Metadata } from "next";
import { PackForm } from "@/components/pack-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Get the free Claude Code Starter PACK",
  description:
    "A curated pack — a starter CLAUDE.md, a model-routing config that cuts your bill, and 18 tested skills + 4 subagents that work together. Free. No slop.",
  alternates: { canonical: "/pack" },
};

const REPO_URL = "https://github.com/Kaiships-ai/claude-code-starter-pack";

const proofBlocks = [
  {
    eyebrow: "what's in it",
    title: "18 skills and 4 subagents, built to run together",
    body: "The core: a starter CLAUDE.md and a model-routing config that cuts your bill. Around it, 18 tested skills — systems, testing, code quality, design, writing & marketing, PM, token-saving — plus 4 subagents wired to work as one setup.",
  },
  {
    eyebrow: "who it's for",
    title: "Solo builders running Claude Code",
    body: "You want a working setup, not hype. Drop the files in, read every line first, ship the same day.",
  },
  {
    eyebrow: "who made it",
    title: "Build-in-public, verify-everything",
    body: "Everything in the pack is real, tested on a real product, and credited — sources listed in the NOTICES file in the repo.",
    link: { label: "See the credits ↗", href: REPO_URL },
  },
];

export default function PackPage() {
  return (
    <div className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
      <div
        aria-hidden
        className="glow absolute -top-24 right-[-10%] h-96 w-96 rounded-full"
      />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <div className="animate-enter flex flex-col items-start gap-5">
          <p className="rounded-full border border-line bg-bg px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            free / claude code starter pack
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-ink sm:text-6xl">
            The Claude Code setup a real builder{" "}
            <span className="text-accent">
              actually runs.
            </span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            A curated pack — a starter CLAUDE.md, a model-routing config that
            cuts your bill, and 18 tested skills + 4 subagents that work
            together. Free. No slop.
          </p>
          <div className="w-full max-w-xl">
            <PackForm />
          </div>
        </div>

        <div className="mt-20 space-y-5">
          {proofBlocks.map((block, i) => (
            <Reveal key={block.eyebrow} delay={i * 0.05}>
              <section className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {"//"} {block.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-xl font-bold text-ink sm:text-2xl">
                  {block.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {block.body}
                </p>
                {block.link ? (
                  <a
                    href={block.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-4"
                  >
                    {block.link.label}
                  </a>
                ) : null}
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
