import { siteConfig } from "@/lib/site.config";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

const studio = siteConfig.studio;

function BuyButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <Button href={studio.checkout} variant="accent" umamiEvent="buy-click" className={className}>
      {label}
    </Button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-2">{children}</p>;
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-ink-2">{children}</p>;
}

/* 1-3 · Who it is for, what they get, the button. */
export function StudioHero() {
  return (
    <section className="pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div className="animate-enter mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 sm:px-6">
        <h1 className="marker max-w-4xl text-[clamp(2.4rem,6vw,4.4rem)] text-ink">
          You built it with Claude Code.
          <br />
          <span className="marker-pop">Nobody knows yet.</span>
        </h1>
        <p className="max-w-2xl text-xl font-semibold leading-relaxed text-ink">{studio.sub}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <BuyButton label={`Get it · ${studio.price}`} />
          <p className="text-base text-ink-2">{studio.buyNote}</p>
        </div>
      </div>
    </section>
  );
}

/* 4-5 · Proof: the real run, then the reel it made about itself. */
export function StudioProof() {
  const { tutorial } = studio;
  return (
    <section id="proof" className="scroll-mt-20 border-t border-line py-12 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 sm:px-6">
        <Label>{tutorial.label}</Label>
        {/* Full content width: the run has small terminal text. */}
        <div className="sketch-frame bg-terminal">
          <video
            controls
            playsInline
            preload="metadata"
            poster={tutorial.poster}
            className="block aspect-video w-full"
          >
            <source src={tutorial.video} type="video/mp4" />
          </video>
        </div>
        <Caption>{tutorial.caption}</Caption>
      </div>
    </section>
  );
}

/* 6-9 · Time and effort, other ways, refund, real numbers, last button. */
export function StudioFacts() {
  const { reel } = studio;
  return (
    <section className="pb-16 sm:pb-24">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 md:grid-cols-[minmax(0,320px)_1fr] md:gap-14">
        <Reveal className="mx-auto flex w-full max-w-[320px] flex-col gap-3">
          <Label>{reel.label}</Label>
          <div className="phone">
            <video
              controls
              playsInline
              preload="metadata"
              poster={reel.poster}
              className="block aspect-[9/16] w-full bg-terminal"
            >
              <source src={reel.video} type="video/mp4" />
            </video>
          </div>
          <Caption>{reel.caption}</Caption>
        </Reveal>

        <Reveal className="flex flex-col gap-6">
          <dl className="sketch flex flex-col divide-y divide-line px-6 py-2 sm:px-8">
            {studio.facts.map((f) => (
              <div key={f.k} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-accent-ink sm:pt-1">{f.k}</dt>
                <dd className="m-0 text-lg leading-relaxed text-ink">{f.t}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <BuyButton label={`Get ${studio.name} · ${studio.price}`} />
            <p className="text-base text-ink-2">{studio.buyNote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
