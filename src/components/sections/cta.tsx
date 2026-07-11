import { siteConfig } from "@/lib/site.config";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function CtaBand() {
  const { ctaBand } = siteConfig;
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-terminal px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="glow absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full"
            />
            <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-terminal-muted">
              {"//"} free starter pack
            </p>
            <h2 className="relative mt-4 text-4xl font-medium tracking-tight text-terminal-fg sm:text-5xl">
              Start with the{" "}
              <em className="font-serif italic text-amber">PACK.</em>
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-terminal-muted">
              {ctaBand.sub}
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href={ctaBand.dmCta.href} variant="accent" magnetic>
                {ctaBand.dmCta.label}
              </Button>
              <Button href={ctaBand.libraryCta.href} variant="terminal">
                {ctaBand.libraryCta.label}
              </Button>
            </div>
            <p className="relative mt-6 font-mono text-xs text-terminal-muted">
              keyword:{" "}
              <span className="rounded bg-terminal-2 px-2 py-1 text-amber">
                {ctaBand.keyword}
              </span>{" "}
              · no email wall · installable in minutes
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
