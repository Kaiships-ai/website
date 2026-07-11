import { siteConfig } from "@/lib/site.config";
import { Button } from "@/components/ui/button";
import { TerminalPlayer } from "@/components/terminal-player";
import { Reveal } from "@/components/reveal";
import type { TermLine } from "@/components/terminal";

export function Hero() {
  const { hero } = siteConfig;
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        aria-hidden
        className="glow absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full"
      />
      <div
        aria-hidden
        className="glow absolute bottom-[-20%] left-[-15%] h-[420px] w-[420px] rounded-full opacity-60"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal className="flex flex-col items-start gap-6">
          <p className="rounded-full border border-line bg-paper px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2">
            {hero.eyebrow}
          </p>
          <h1 className="text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {hero.h1Plain}
            <br />
            <em className="font-serif italic text-accent-ink">
              {hero.h1Accent}
            </em>
            <span
              aria-hidden
              className="cursor-blink ml-2 inline-block h-[0.85em] w-[0.45em] translate-y-[0.08em] bg-accent"
            />
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-ink-2">
            {hero.sub}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href={hero.primaryCta.href} variant="accent" magnetic>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <p className="font-mono text-xs text-ink-2">
            <span className="text-success-ink">✓</span> tested on a real
            product&ensp;
            <span className="text-success-ink">✓</span> installable files&ensp;
            <span className="text-success-ink">✓</span> built in public
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <TerminalPlayer
            title={hero.terminal.title}
            command={hero.terminal.command}
            lines={hero.terminal.lines as unknown as TermLine[]}
            prompt={hero.terminal.prompt}
          />
        </Reveal>
      </div>
    </section>
  );
}
