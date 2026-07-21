import { siteConfig } from "@/lib/site.config";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function Community() {
  const { community } = siteConfig;
  return (
    <section id="community" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={community.eyebrow}
          title={community.title}
          titleAccent={community.titleAccent}
          sub={community.sub}
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <Badge tone="success">{community.free.label}</Badge>
                <span className="font-mono text-xs text-ink-2">rung 0</span>
              </div>
              <h3 className="mt-5 text-2xl font-medium tracking-tight text-ink">
                {community.free.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">
                {community.free.desc}
              </p>
              <div className="mt-6">
                <Button href={community.free.cta.href} variant="ghost">
                  {community.free.cta.label}
                </Button>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/30 bg-white p-7 shadow-[0_24px_60px_-24px_rgba(224,83,47,0.25)] sm:p-8">
              <div
                aria-hidden
                className="glow absolute -top-24 -right-24 h-64 w-64 rounded-full"
              />
              <div className="relative flex flex-wrap items-center justify-between gap-2">
                <Badge tone="accent">{community.paid.status}</Badge>
                <span className="font-mono text-xs text-ink-2">rung 2</span>
              </div>
              <h3 className="relative mt-5 text-2xl font-medium tracking-tight text-ink">
                {community.paid.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-ink-2">
                {community.paid.desc}
              </p>
              <ul className="relative mt-5 flex-1 space-y-2.5">
                {community.paid.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm text-ink">
                    <span className="font-mono text-success-ink">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="relative mt-6 flex flex-wrap items-center gap-4">
                <Button href={community.paid.cta.href} variant="accent" magnetic>
                  {community.paid.cta.label}
                </Button>
              </div>
              <p className="relative mt-4 font-mono text-[11px] leading-relaxed text-ink-2">
                {community.paid.note}
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
