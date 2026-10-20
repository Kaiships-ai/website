import Image from "next/image";
import { siteConfig } from "@/lib/site.config";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { TerminalPlayer } from "@/components/terminal-player";
import { PhoneVideo, StickyBuy } from "@/components/sections/reel-kit-client";

/* Kaiships Studio sales page. Block order + copy = website-wireframe.html (home:A),
   layout mirrors agentkit.best/reelcrew. Text in [brackets] is a placeholder Kai fills. */

const kit = siteConfig.reelKit;
const studio = siteConfig.studio;
const { starter, pro } = studio;

// Six questions picked in the wireframe, answers from the live FAQ.
export const studioFaq = [
  { q: "Do I need to code?", a: kit.faq[0].a },
  { q: "Do I need API keys?", a: kit.faq[1].a },
  { q: "Does it run on Windows?", a: kit.faq[2].a },
  { q: "How long does one reel take?", a: kit.faq[3].a },
  { q: "Can I change the style or character?", a: kit.faq[4].a },
  { q: "What happens after I pay?", a: kit.faq[5].a },
];

const wrap = "mx-auto max-w-6xl px-4 sm:px-6";

function H2({ children, sub }: { children: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
      <h2 className="marker text-[clamp(1.9rem,4.8vw,3.2rem)] text-ink">{children}</h2>
      {sub ? <p className="text-lg text-ink-2">{sub}</p> : null}
    </Reveal>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-sm font-extrabold uppercase tracking-[0.22em] text-accent-ink">{children}</p>
  );
}

function ProButton({ className = "", label = `Buy Pro PreOrder · ${pro.price}` }: { className?: string; label?: string }) {
  return (
    <Button href={pro.checkout} variant="accent" magnetic className={className}>
      {label}
    </Button>
  );
}

const crew = ["Writer", "Narrator", "Painter", "Captions", "Composer", "Reviewer"];
const steps = [
  "Script + hook",
  "Voiceover",
  "Painted scenes, Clawd",
  "Word-locked captions",
  "Music + SFX",
  "Self-review, hook ≥ 8/10",
];

/* 1 · Hero: chip + centred title + terminal window + 3 cards. */
export function StudioHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20">
      <div className={`${wrap} flex flex-col items-center gap-6 text-center`}>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="rounded-full border-2 border-ink bg-cream px-3 py-1 text-sm font-extrabold text-ink">Kaiships Studio</span>
          <span className="rounded-full border-2 border-ink bg-ochre px-3 py-1 text-sm font-extrabold text-ink">PreOrder price</span>
        </div>
        <h1 className="marker max-w-[720px] text-[clamp(2.4rem,6.2vw,4.4rem)] text-ink">
          Type one prompt. <span className="marker-pop">Get a hand-painted reel.</span>
        </h1>
        <p className="max-w-xl text-xl font-semibold leading-relaxed text-ink">
          Claude writes, voices, paints, captions and scores the reel. You get a 1080×1920 MP4.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <ProButton />
          <Button href="#buy" variant="ghost">
            See plans
          </Button>
        </div>
        <div className="mt-4 w-full max-w-[760px] text-left">
          <TerminalPlayer
            title="claude · reel-kit"
            command='claude "/make-reel why the sky is blue"'
            lines={[
              ...steps.map((t) => ({ kind: "dim" as const, text: `✓ ${t}` })),
              { kind: "ok" as const, text: "reel.mp4 · 1080×1920 · 33 s" },
            ]}
            prompt="/make-reel your topic"
          />
        </div>
        <div className="mt-4 grid w-full max-w-[900px] gap-4 sm:grid-cols-3">
          {[
            ["Ready to use", "Unzip, open in Claude Code."],
            ["Pay once", "No subscription."],
            ["Price after PreOrder", `Pro goes from ${pro.price} to ${pro.after}.`],
          ].map(([t, d]) => (
            <div key={t} className="sketch p-5 text-left">
              <h3 className="text-lg font-extrabold text-ink">{t}</h3>
              <p className="text-base text-ink-2">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 2 · One prompt, the whole crew: terminal left, 6 roles right. */
export function StudioCrew() {
  return (
    <section className="bg-paper-2/70 py-16 sm:py-24">
      <div className={wrap}>
        <H2 sub="A 30-second reel renders in a few minutes, longer on a laptop without a GPU.">One prompt, the whole studio gets to work</H2>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          <Reveal className="sketch-ink p-6 font-mono text-sm leading-7 text-cream">
            <p className="text-ochre">&gt; Make a reel: why the sky is blue</p>
            {steps.map((s) => (
              <p key={s} className="text-cream/85">
                ✓ {s}
              </p>
            ))}
            <p className="mt-2 font-extrabold text-ochre">reel.mp4 · 1080×1920 · 33 s</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {crew.map((c, i) => (
              <Reveal key={c} className="sketch flex flex-col gap-2 p-5">
                <span className="text-sm font-extrabold text-accent-ink">0{i + 1}</span>
                <h3 className="text-lg font-extrabold text-ink">{c}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 3 · Three pains. */
export function StudioPain() {
  return (
    <section className="py-16 sm:py-24">
      <div className={wrap}>
        <H2>Reels look great. Making them eats your day.</H2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["Filming takes hours", "Editing apps are hard", "Templates all look the same"].map((p) => (
            <Reveal key={p} className="sketch flex items-center gap-4 p-5">
              <span aria-hidden className="grid h-9 w-9 flex-none place-items-center rounded-full border-[2.5px] border-ink bg-accent-hover font-extrabold text-cream">
                ✕
              </span>
              <h3 className="text-lg font-extrabold text-ink">{p}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 4 · What's inside. */
export function StudioInside() {
  return (
    <section className="bg-paper-2/70 py-16 sm:py-24">
      <div className={wrap}>
        <Kicker>What&apos;s inside</Kicker>
        <div className="mt-3">
          <H2>One studio, two plans</H2>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal className="sketch flex flex-col gap-2 p-6">
            <h3 className="text-xl font-extrabold text-ink">Studio Reel</h3>
            <p className="text-base text-ink">Watercolour reel engine + /make-reel + 3 examples. Starter + Pro.</p>
          </Reveal>
          <Reveal className="sketch flex flex-col gap-2 p-6">
            <h3 className="text-xl font-extrabold text-ink">Studio writing skills</h3>
            <p className="text-base text-ink">Hook + script, caption + CTA, viral radar, week plan. Pro.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 5 · Video grid with view counts. */
export function StudioReels() {
  return (
    <section id="showcase" className="scroll-mt-20 py-16 sm:py-24">
      <div className={wrap}>
        <H2 sub="No camera, no editing app.">Reels made entirely with Kaiships Studio</H2>
        <div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-3">
          {studio.reels.map((r, i) => (
            <figure key={i} className="mx-auto w-full max-w-[240px]">
              {r.id ? (
                <PhoneVideo src={`/reel-kit/video/${r.id}.mp4`} poster={`/reel-kit/video/${r.id}.jpg`} label="A reel posted on @kaiships.ai" />
              ) : (
                <div className="sketch-ink grid aspect-[9/16] place-items-center rounded-3xl text-4xl text-cream">
                  <span>▶{r.label ? <span className="mt-2 block text-sm font-extrabold">{r.label}</span> : null}</span>
                </div>
              )}
              <figcaption className="mt-4 text-center">
                {r.id && r.label ? <p className="text-sm font-semibold text-ink-2">{r.label}</p> : null}
                <h3 className="text-xl font-extrabold text-ink">{r.views} views</h3>
                {r.url ? (
                  <a className="squiggle text-sm font-semibold text-ink" href={r.url} target="_blank" rel="noopener noreferrer">
                    Watch on Instagram
                  </a>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 6 · Real accounts. */
export function StudioAccounts() {
  return (
    <section className="bg-paper-2/70 py-16 sm:py-24">
      <div className={wrap}>
        <H2>Real accounts built with it</H2>
        <Reveal className="sketch mx-auto mt-10 flex max-w-sm flex-col items-center gap-3 p-6 text-center">
          <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-2xl font-extrabold text-ink">
            @kaiships.ai
          </a>
          <p className="text-base text-ink-2">1,189 followers · 486K reel views (Instagram, Oct 20, 2026)</p>
        </Reveal>
      </div>
    </section>
  );
}

/* 7 · Quote wall, 3 columns. */
export function StudioUsers() {
  return (
    <section id="users" className="scroll-mt-20 py-16 sm:py-24">
      <div className={wrap}>
        <H2>What users say</H2>
        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {kit.users.map((u) => (
            <figure key={u.handle} className="sketch mb-6 break-inside-avoid p-6">
              <blockquote className="text-base font-semibold leading-relaxed text-ink">&ldquo;{u.text}&rdquo;</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <Image src={`/reel-kit/users/${u.img}.jpg`} alt="" width={40} height={40} className="h-10 w-10 rounded-full border-2 border-ink" />
                <span>
                  <span className="block text-sm font-extrabold text-ink">{u.name}</span>
                  <a className="text-sm text-ink-2" href={`https://instagram.com/${u.handle}`} target="_blank" rel="noopener noreferrer">
                    @{u.handle}
                  </a>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Check({ t }: { t: string }) {
  return (
    <li className="flex gap-3 text-base">
      <span aria-hidden className="font-extrabold text-sap">
        ✓
      </span>
      {t}
    </li>
  );
}

/* 8 · Pricing: Starter / Pro, Pro card highlighted. */
export function StudioPricing() {
  return (
    <section id="buy" className="scroll-mt-20 bg-paper-2/70 py-16 sm:py-24">
      <div id="pricing" className={wrap}>
        <Kicker>Pricing</Kicker>
        <div className="mt-3">
          <H2>Pay once, use forever</H2>
        </div>
        <div className="mx-auto mt-10 grid max-w-[860px] gap-6 md:grid-cols-2">
          <Reveal className="sketch flex flex-col gap-4 p-7">
            <h3 className="text-2xl font-extrabold text-ink">{starter.name}</h3>
            <div className="text-5xl font-extrabold text-ink">{starter.price}</div>
            <p className="text-base text-ink-2">{starter.sub}</p>
            <Button href={starter.checkout} variant="ghost" className="w-full">
              Choose Starter
            </Button>
            <ul className="flex flex-col gap-2 text-ink">
              {starter.items.map((t) => (
                <Check key={t} t={t} />
              ))}
            </ul>
          </Reveal>
          <Reveal className="sketch-ink flex flex-col gap-4 p-7 text-cream">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-2xl font-extrabold text-cream">{pro.name}</h3>
              <span className="rounded-full bg-ochre px-3 py-1 text-xs font-extrabold text-ink">PreOrder price</span>
            </div>
            <div className="text-5xl font-extrabold text-cream">{pro.price}</div>
            <p className="text-base text-cream/80">Price after PreOrder: {pro.after}</p>
            <ProButton label="Buy Pro PreOrder" className="w-full !shadow-[4px_5px_0_var(--ochre)]" />
            <ul className="flex flex-col gap-2 text-cream">
              {pro.items.map((t) => (
                <Check key={t} t={t} />
              ))}
            </ul>
          </Reveal>
        </div>
        <p className="mx-auto mt-6 max-w-[860px] text-center text-sm text-ink-2">
          Starter: download link by email. Pro: an invite to the private GitHub repo, and <code>git pull</code> gets every new skill. All 4 Pro skills ship by Nov 10, 2026, one a week.
        </p>
        <p className="mx-auto mt-3 max-w-[860px] text-center text-base font-semibold text-ink">
          Won&apos;t run? DM me, I fix it with you. Still stuck in 14 days → full refund.
        </p>
      </div>
    </section>
  );
}

/* 9 · Commitments. */
export function StudioCommitments() {
  return (
    <section className="py-16 sm:py-24">
      <div className={wrap}>
        <H2>Kai&apos;s commitments</H2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["14-day refund", "The version you bought is yours", "Runs on your machine"].map((t) => (
            <Reveal key={t} className="sketch p-6 text-center">
              <h3 className="text-lg font-extrabold text-ink">{t}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 10 · FAQ, one column. */
export function StudioFaq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-paper-2/70 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <H2>Frequently asked questions</H2>
        <div className="mt-10 flex flex-col gap-4">
          {studioFaq.map((f) => (
            <details key={f.q} className="sketch group px-6 py-4">
              <summary className="cursor-pointer list-none text-lg font-extrabold text-ink">
                {f.q}
                <span aria-hidden className="float-right text-accent-ink transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-base leading-relaxed text-ink">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 11 · Machine requirements, 6 cards. */
export function StudioRequirements() {
  const reqs: [string, string?][] = [
    ["Machine", "Mac or Windows"],
    ["Claude Code", "Paid plan"],
    ["Node 18+"],
    ["Python 3", "Setup installs the voice tools into it"],
    ["Browser", "Chrome or Edge renders the frames; setup can download one"],
    ["Internet", "For the AI voice"],
  ];
  return (
    <section className="py-16 sm:py-24">
      <div className={wrap}>
        <H2>What your machine needs</H2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {reqs.map(([t, d]) => (
            <Reveal key={t} className="sketch p-5">
              <h3 className="text-lg font-extrabold text-ink">{t}</h3>
              {d ? <p className="text-base text-ink-2">{d}</p> : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 12 · Install steps. */
export function StudioInstall() {
  const code = "rounded bg-ink/10 px-1.5 py-0.5 font-mono text-sm";
  const items = [
    <>Download the zip from your Polar email</>,
    <>
      Unzip, <code className={code}>cd kaiships-reel-kit</code>, run <code className={code}>claude</code>
    </>,
    <>
      Type <code className={code}>/make-reel your topic</code>
    </>,
  ];
  return (
    <section className="bg-paper-2/70 py-16 sm:py-24">
      <div className={wrap}>
        <H2>Install in a few minutes</H2>
        <ol className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
          {items.map((c, i) => (
            <li key={i} className="sketch flex items-start gap-4 p-5 text-base text-ink">
              <b className="grid h-9 w-9 flex-none place-items-center rounded-full border-[2.5px] border-ink bg-ochre font-extrabold">{i + 1}</b>
              <span>{c}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 13 · Final CTA. */
export function StudioFinal() {
  return (
    <section className="py-20 sm:py-28">
      <div className={`${wrap} flex flex-col items-center gap-8 text-center`}>
        <h2 className="marker text-[clamp(2rem,5vw,3.6rem)] text-ink">
          Get Pro at the <span className="marker-pop">PreOrder price.</span>
        </h2>
        <ProButton />
      </div>
    </section>
  );
}

export function StudioStickyBuy() {
  return <StickyBuy href={pro.checkout} price={pro.price} />;
}

/* JSON-LD: Product with 2 Offers + FAQPage. */
export function StudioJsonLd() {
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Kaiships Studio",
    description: "Type one prompt and Claude makes a hand-painted reel: script, voiceover, painted scenes, captions and music.",
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: [
      { "@type": "Offer", name: "Kaiships Studio Starter", price: "39.99", priceCurrency: "USD", url: starter.checkout, availability: "https://schema.org/InStock" },
      { "@type": "Offer", name: "Kaiships Studio Pro (PreOrder)", price: "79.00", priceCurrency: "USD", url: pro.checkout, availability: "https://schema.org/PreOrder" },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: studioFaq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
