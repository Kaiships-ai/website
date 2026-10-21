import Image from "next/image";
import { siteConfig } from "@/lib/site.config";
import { Button } from "@/components/ui/button";
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

const wrap = "mx-auto max-w-[1200px] px-4 sm:px-6";

/** Section header: mono eyebrow "0N — Name" + display h2 + one muted line. */
function Head({ n, name, title, sub, center = true }: { n: string; name: string; title: React.ReactNode; sub?: React.ReactNode; center?: boolean }) {
  return (
    <div className={`flex max-w-[720px] flex-col gap-4 ${center ? "mx-auto items-center text-center" : ""}`}>
      <p className="eyebrow">
        {n} — {name}
      </p>
      <h2 className="font-display text-[clamp(1.9rem,4vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-ink">{title}</h2>
      {sub ? <p className="text-[17px] leading-relaxed text-muted">{sub}</p> : null}
    </div>
  );
}

function Section({ id, sunk = false, children, className = "" }: { id?: string; sunk?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-20 py-[72px] lg:py-28 ${sunk ? "border-y border-line bg-sunk" : ""} ${className}`}>
      <div className={wrap}>{children}</div>
    </section>
  );
}

const cardCls = "rounded-card border border-line bg-surface p-6 shadow-card";

function ProButton({ className = "", label = `Buy Pro PreOrder · ${pro.price}` }: { className?: string; label?: string }) {
  return (
    <Button href={pro.checkout} variant="accent" className={className}>
      {label}
    </Button>
  );
}

const crew: [string, string][] = [
  ["Writer", "Script + hook."],
  ["Narrator", "Voiceover in one take."],
  ["Painter", "Painted scenes with Clawd."],
  ["Captions", "Word-locked captions."],
  ["Composer", "Music + SFX."],
  ["Reviewer", "Self-review, hook ≥ 8/10."],
];
const steps = crew.map(([, d]) => d.replace(/\.$/, ""));

function Orbit() {
  return (
    <svg aria-hidden viewBox="0 0 1200 600" className="pointer-events-none absolute left-1/2 top-10 -z-10 w-[1400px] max-w-none -translate-x-1/2 text-line-strong" fill="none">
      <ellipse cx="600" cy="300" rx="560" ry="200" stroke="currentColor" strokeDasharray="2 8" />
      <ellipse cx="600" cy="300" rx="380" ry="130" stroke="currentColor" opacity="0.6" />
      <circle cx="1040" cy="176" r="7" className="fill-accent-soft" stroke="none" />
    </svg>
  );
}

/* 1 · Hero: chip + centred title + terminal window + 3 cards. */
export function StudioHero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-[72px] lg:pt-40 lg:pb-28">
      <Orbit />
      <div className={`${wrap} flex flex-col items-center gap-6 text-center`}>
        <div className="flex flex-wrap justify-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em]">
          <span className="rounded-full border border-line-strong bg-surface px-3 py-1 text-ink">Kaiships Studio</span>
          <span className="rounded-full bg-accent-wash px-3 py-1 text-accent">PreOrder price</span>
        </div>
        <h1 className="max-w-[920px] font-display text-[clamp(2.5rem,6.4vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
          Type one prompt. <span className="text-accent">Get a hand-painted reel.</span>
        </h1>
        <p className="max-w-xl text-[17px] leading-relaxed text-muted sm:text-lg">
          Claude writes, voices, paints, captions and scores the reel. You get a 1080×1920 MP4.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ProButton />
          <Button href="#buy" variant="ghost">
            See plans
          </Button>
        </div>
        <div className="mt-6 w-full max-w-[780px] text-left">
          <TerminalPlayer
            title="claude · studio-reel"
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
            <div key={t} className={`${cardCls} text-left`}>
              <h3 className="font-display text-[18px] font-bold text-ink">{t}</h3>
              <p className="mt-1 text-[15px] text-muted">{d}</p>
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
    <Section sunk>
      <Head n="01" name="The crew" title="One prompt, the whole studio gets to work" sub="A 30-second reel renders in a few minutes, longer on a laptop without a GPU." />
      <div className="mt-14 grid items-start gap-6 lg:grid-cols-[5fr_7fr]">
        <div className="rounded-card-lg border border-space-line bg-space p-6 font-mono text-[13px] leading-7 text-space-ink shadow-card">
          <p className="text-accent-soft">&gt; Make a reel: why the sky is blue</p>
          {steps.map((s) => (
            <p key={s} className="text-space-muted">
              <span className="text-[#7fd3a3]">✓</span> {s}
            </p>
          ))}
          <p className="mt-2 text-space-ink">reel.mp4 · 1080×1920 · 33 s</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {crew.map(([c, d], i) => (
            <div key={c} className={`${cardCls} flex flex-col gap-1.5 p-5`}>
              <span className="font-mono text-[12px] text-accent">0{i + 1}</span>
              <h3 className="font-display text-[18px] font-bold text-ink">{c}</h3>
              <p className="text-[14px] text-muted">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* 3 · Three pains. */
export function StudioPain() {
  return (
    <Section>
      <Head n="02" name="The problem" title="Reels look great. Making them eats your day." />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {["Filming takes hours", "Editing apps are hard", "Templates all look the same"].map((p) => (
          <div key={p} className={`${cardCls} flex items-center gap-4 p-5`}>
            <span aria-hidden className="grid size-9 flex-none place-items-center rounded-full bg-accent-wash text-accent">
              ✕
            </span>
            <h3 className="font-display text-[18px] font-bold text-ink">{p}</h3>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* 4 · What's inside. */
export function StudioInside() {
  return (
    <Section sunk>
      <Head n="03" name="What's inside" title="One studio, two plans" />
      <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2">
        <div className={cardCls}>
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">Starter + Pro</p>
          <h3 className="mt-2 font-display text-[20px] font-bold text-ink">Studio Reel</h3>
          <p className="mt-1 text-[15px] leading-relaxed text-muted">Watercolour reel engine + /make-reel + 3 examples.</p>
        </div>
        <div className={cardCls}>
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">Pro</p>
          <h3 className="mt-2 font-display text-[20px] font-bold text-ink">Studio writing skills</h3>
          <p className="mt-1 text-[15px] leading-relaxed text-muted">Hook + script, caption + CTA, viral radar, week plan.</p>
        </div>
      </div>
    </Section>
  );
}

/* 5 · Video grid with view counts. */
export function StudioReels() {
  return (
    <Section id="showcase">
      <Head n="04" name="Proof" title="Reels made entirely with Kaiships Studio" sub="No camera, no editing app. Views from Instagram, Oct 20, 2026." />
      <div className="mx-auto mt-14 grid max-w-[900px] gap-6 sm:grid-cols-3">
        {studio.reels.map((r, i) => (
          <figure key={i} className="mx-auto w-full max-w-[280px] overflow-hidden rounded-card-lg border border-line bg-surface shadow-card">
            {r.id ? (
              <PhoneVideo src={`/reel-kit/video/${r.id}.mp4`} poster={`/reel-kit/video/${r.id}.jpg`} label={`Reel: ${r.label}`} />
            ) : (
              <div className="grid aspect-[9/16] place-items-center bg-space text-4xl text-space-ink">▶</div>
            )}
            <figcaption className="flex flex-col gap-1 p-4">
              <h3 className="text-[15px] font-semibold leading-snug text-ink">{r.label}</h3>
              <p className="font-mono text-[12px] text-muted">
                {r.views} views
                {r.url ? (
                  <>
                    {" · "}
                    <a className="text-accent underline-offset-4 hover:underline" href={r.url} target="_blank" rel="noopener noreferrer">
                      Watch on Instagram
                    </a>
                  </>
                ) : null}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

/* 6 · Real accounts. */
export function StudioAccounts() {
  return (
    <Section sunk>
      <Head n="05" name="Accounts" title="Real accounts built with it" sub="Numbers from the Instagram API, Oct 20, 2026." />
      <div className="mx-auto mt-14 grid max-w-[720px] gap-4 sm:grid-cols-3">
        <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className={`${cardCls} flex flex-col justify-center gap-1 transition-colors hover:border-line-strong`}>
          <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">Instagram</span>
          <span className="font-display text-[20px] font-bold text-ink">@kaiships.ai</span>
        </a>
        {[
          ["1,189", "followers · IG Oct 20"],
          ["486K", "reel views · IG Oct 20"],
        ].map(([v, k]) => (
          <div key={k} className={cardCls}>
            <p className="font-display text-[36px] font-bold leading-none tracking-[-0.02em] text-ink">{v}</p>
            <p className="mt-2 font-mono text-[12px] text-muted">{k}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* 7 · Quote wall, 3 columns. */
export function StudioUsers() {
  return (
    <Section id="users">
      <Head n="06" name="Users" title="What users say" />
      <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {kit.users.map((u) => (
          <figure key={u.handle} className={`${cardCls} mb-4 break-inside-avoid`}>
            <blockquote className="text-[16px] leading-relaxed text-ink">&ldquo;{u.text}&rdquo;</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <Image src={`/reel-kit/users/${u.img}.jpg`} alt={`${u.name}'s profile photo`} width={40} height={40} className="size-10 rounded-full border border-line" />
              <span>
                <span className="block text-[14px] font-semibold text-ink">{u.name}</span>
                <a className="text-[13px] text-muted hover:text-ink" href={`https://instagram.com/${u.handle}`} target="_blank" rel="noopener noreferrer">
                  @{u.handle}
                </a>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function Check({ t, dark = false }: { t: string; dark?: boolean }) {
  return (
    <li className="flex gap-3 text-[15px]">
      <span aria-hidden className={dark ? "text-accent-soft" : "text-ok"}>
        ✓
      </span>
      {t}
    </li>
  );
}

/* 8 · Pricing: Starter / Pro, Pro card navy. */
export function StudioPricing() {
  return (
    <section id="buy" className="scroll-mt-20 border-y border-line bg-sunk py-[72px] lg:py-28">
      <div id="pricing" className={wrap}>
        <Head n="07" name="Pricing" title="Pay once, use forever" sub="Today's Pro price is the PreOrder price." />
        <div className="mx-auto mt-14 grid max-w-[880px] gap-4 md:grid-cols-2">
          <div className={`${cardCls} flex flex-col gap-4 p-7`}>
            <h3 className="font-display text-[22px] font-bold text-ink">{starter.name}</h3>
            <p className="flex items-baseline gap-2">
              <span className="font-display text-[44px] font-bold leading-none tracking-[-0.02em] text-ink">{starter.price}</span>
              <span className="text-[14px] text-muted">{starter.sub}</span>
            </p>
            <Button href={starter.checkout} variant="ghost" className="w-full">
              Choose Starter
            </Button>
            <ul className="mt-2 flex flex-col gap-2.5 text-ink">
              {starter.items.map((t) => (
                <Check key={t} t={t} />
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 rounded-card-lg border border-space-line bg-space p-7 text-space-ink shadow-card">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-[22px] font-bold text-space-ink">{pro.name}</h3>
              <span className="rounded-full border border-accent-soft/50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-soft">PreOrder price</span>
            </div>
            <p className="flex items-baseline gap-2">
              <span className="font-display text-[44px] font-bold leading-none tracking-[-0.02em] text-space-ink">{pro.price}</span>
              <span className="text-[14px] text-space-muted">Price after PreOrder: {pro.after}</span>
            </p>
            <ProButton label="Buy Pro PreOrder" className="w-full" />
            <ul className="mt-2 flex flex-col gap-2.5">
              {pro.items.map((t) => (
                <Check key={t} t={t} dark />
              ))}
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-[720px] text-center text-[14px] leading-relaxed text-muted">
          Starter: download link by email. Pro: an invite to the private GitHub repo, and <code className="font-mono text-ink">git pull</code> gets every new skill. All 4 Pro skills ship by Nov 10, 2026, one a week.
        </p>
        <p className="mx-auto mt-3 max-w-[720px] text-center text-[15px] font-semibold text-ink">
          Won&apos;t run? DM me, I fix it with you. Still stuck in 14 days → full refund.
        </p>
      </div>
    </section>
  );
}

/* 9 · Commitments. */
export function StudioCommitments() {
  return (
    <Section>
      <Head n="08" name="Commitments" title="Kai's commitments" />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {["14-day refund", "The version you bought is yours", "Runs on your machine"].map((t, i) => (
          <div key={t} className={cardCls}>
            <span className="font-mono text-[12px] text-accent">0{i + 1}</span>
            <h3 className="mt-2 font-display text-[18px] font-bold text-ink">{t}</h3>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* 10 · FAQ, one column. */
export function StudioFaq() {
  return (
    <Section id="faq" sunk>
      <Head n="09" name="FAQ" title="Frequently asked questions" />
      <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-3">
        {studioFaq.map((f) => (
          <details key={f.q} className="group rounded-card border border-line bg-surface">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 text-[16px] font-semibold text-ink">
              {f.q}
              <span aria-hidden className="text-xl text-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
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
    <Section>
      <Head n="10" name="Requirements" title="What your machine needs" />
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {reqs.map(([t, d]) => (
          <div key={t} className={`${cardCls} p-5`}>
            <h3 className="font-display text-[18px] font-bold text-ink">{t}</h3>
            {d ? <p className="mt-1 text-[15px] text-muted">{d}</p> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* 12 · Install steps. */
export function StudioInstall() {
  const code = "rounded-md bg-sunk px-1.5 py-0.5 font-mono text-[13px] text-ink";
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
    <Section sunk>
      <Head n="11" name="Install" title="Install in a few minutes" />
      <ol className="mx-auto mt-14 grid max-w-[1000px] gap-4 md:grid-cols-3">
        {items.map((c, i) => (
          <li key={i} className={`${cardCls} flex items-start gap-4 p-5 text-[15px] leading-relaxed text-ink`}>
            <span className="grid size-8 flex-none place-items-center rounded-full border border-line-strong font-mono text-[13px] text-accent">{i + 1}</span>
            <span>{c}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* 13 · Final CTA. */
export function StudioFinal() {
  return (
    <section className="relative isolate overflow-hidden py-[72px] lg:py-28">
      <Orbit />
      <div className={`${wrap} flex flex-col items-center gap-6 text-center`}>
        <p className="eyebrow">12 — Get started</p>
        <h2 className="max-w-[760px] font-display text-[clamp(2.1rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-ink">
          Get Pro at the <span className="text-accent">PreOrder price.</span>
        </h2>
        <p className="text-[17px] text-muted">Pay once. {pro.after} after PreOrder.</p>
        <ProButton />
        <ul className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[12px] text-muted">
          <li>✓ 14-day refund</li>
          <li>✓ Runs on your machine</li>
          <li>✓ The version you bought is yours</li>
        </ul>
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
      { "@type": "Offer", name: starter.productName, price: starter.priceValue, priceCurrency: "USD", url: starter.checkout, availability: "https://schema.org/InStock" },
      { "@type": "Offer", name: pro.productName, price: pro.priceValue, priceCurrency: "USD", url: pro.checkout, availability: "https://schema.org/PreOrder" },
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
