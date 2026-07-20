import { siteConfig } from "@/lib/site.config";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";

/** Slim home teaser for the paid Kit — full offer lives at /kit. */
export function Kit() {
  const { kit } = siteConfig;
  return (
    <section id="kit" className="scroll-mt-24 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-white p-7 shadow-[0_1px_2px_rgba(20,18,16,0.04)] sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="accent">{kit.price} one-time</Badge>
                <span className="font-mono text-xs text-ink-2">rung 1</span>
              </div>
              <h2 className="mt-4 text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                {kit.name}
                {": "}
                <em className="font-serif italic text-accent-ink">
                  ideate → render → publish.
                </em>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                Got the PACK? This is the whole machine — carousels, reels,
                and Instagram publishing running on your own machine. No
                subscription.
              </p>
            </div>
            <div className="shrink-0">
              <Button href={kit.pageCta.href} variant="primary">
                {kit.pageCta.label} →
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
