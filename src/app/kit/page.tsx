import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Button } from "@/components/ui/button";
import { TerminalShell, TermLineView, type TermLine } from "@/components/terminal";
import { Reveal } from "@/components/reveal";

const { kit } = siteConfig;

export const metadata: Metadata = {
  title: `${kit.name} — ${kit.price} one-time`,
  description: kit.sub,
  alternates: { canonical: "/kit" },
};

export default function KitPage() {
  return (
    <div className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
      <div
        aria-hidden
        className="glow absolute -top-24 left-[-10%] h-96 w-96 rounded-full"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* hero */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-enter flex flex-col items-start gap-5">
            <p className="rounded-full border border-line bg-paper px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
              paid / {kit.name.toLowerCase()} — rung 1
            </p>
            <h1 className="text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">
              {kit.tagline}{" "}
              <em className="font-serif italic text-accent-ink">
                {kit.taglineAccent}
              </em>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-ink-2">
              {kit.sub}
            </p>
            <div className="flex flex-col items-start gap-1.5">
              <p className="font-mono text-sm text-ink">
                <span className="text-ink-2 line-through decoration-1">
                  {kit.regularPrice}
                </span>{" "}
                <span className="text-2xl font-semibold tracking-tight">
                  {kit.price}
                </span>{" "}
                <span className="text-ink-2">· {kit.priceNote}</span>
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
                {kit.seats}
              </p>
            </div>
          </div>
          <div className="animate-enter-late">
            <TerminalShell title={kit.terminal.title}>
              <div className="space-y-0.5">
                {kit.terminal.lines.map((l, i) => (
                  <TermLineView key={i} line={l as TermLine} />
                ))}
              </div>
            </TerminalShell>
          </div>
        </div>

        {/* included */}
        <Reveal className="mt-16">
          <section className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-ink">
              {"//"} what's included
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {kit.included.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                  <span className="font-mono text-success-ink">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* honest requirements — deliberately BEFORE the buy button */}
        <Reveal className="mt-5">
          <section className="rounded-2xl border border-amber/40 bg-amber/8 p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#92400e]">
              ⚠ {"//"} what you need — read before buying
            </p>
            <ul className="mt-4 space-y-2.5">
              {kit.need.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                  <span className="font-mono text-[#92400e]">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* buy */}
        <Reveal className="mt-10">
          <div className="flex flex-col items-start gap-4">
            <Button href={kit.checkoutUrl} variant="accent" magnetic>
              {kit.buyLabel}
            </Button>
            <p className="max-w-xl font-mono text-xs leading-relaxed text-ink-2">
              {kit.guarantee}
              {kit.roadmapUrl ? (
                <>
                  {" "}
                  <a
                    href={kit.roadmapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-ink underline underline-offset-4"
                  >
                    Public roadmap ↗
                  </a>
                </>
              ) : null}
            </p>
          </div>
        </Reveal>

        {/* ladder cross-link */}
        <Reveal className="mt-14">
          <aside className="rounded-2xl border border-line bg-paper-2 p-6">
            <p className="text-sm leading-relaxed text-ink-2">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-ink">
                {"//"} new here?{" "}
              </span>
              Start with the{" "}
              <Link
                href="/pack"
                className="font-medium text-accent-ink underline underline-offset-4"
              >
                free Starter PACK
              </Link>{" "}
              — same philosophy, zero dollars. The Kit is the whole machine
              once you've felt the workflow.
            </p>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
