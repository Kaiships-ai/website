import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Button } from "@/components/ui/button";
import { PackForm } from "@/components/pack-form";
import { Reveal } from "@/components/reveal";
import { PhoneVideo, PromptPicker, StickyBuy } from "@/components/sections/reel-kit-client";

const kit = siteConfig.reelKit;

function Spark({ className = "", color = "var(--ochre)" }: { className?: string; color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={`absolute ${className}`}>
      <path
        d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z"
        fill={color}
        stroke="var(--ink)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-sm font-extrabold uppercase tracking-[0.22em] text-accent-ink ${className}`}>
      {children}
    </p>
  );
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`marker max-w-4xl text-[clamp(2rem,5.4vw,3.8rem)] text-ink ${className}`}>{children}</h2>
  );
}

function Kai({ pose, className = "", priority = false }: { pose: string; className?: string; priority?: boolean }) {
  return (
    <Image
      src={`/reel-kit/kai-${pose}.png`}
      alt=""
      width={500}
      height={900}
      priority={priority}
      className={`pointer-events-none h-auto select-none ${className}`}
    />
  );
}

function BuyButton({ className = "" }: { className?: string }) {
  return (
    <Button href={kit.checkout} variant="accent" magnetic className={className}>
      Get the Reel Kit · {kit.price}
    </Button>
  );
}

function BuyPromise({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm leading-relaxed ${className}`}>
      Instant download via Polar. Won&apos;t run? DM me and I&apos;ll fix it with you. Still stuck within 14
      days, full refund.
    </p>
  );
}

/* 1 · Hero: the pain on the left, the kit's own output playing on the right. */
export function KitHero() {
  const s = kit.stats;
  return (
    <section className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20">
      <Spark className="right-[4%] top-28 h-10 w-10" />
      <Spark className="left-[46%] top-40 hidden h-5 w-5 lg:block" color="var(--rose)" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-enter flex flex-col items-start gap-6">
          <Eyebrow>One reel eats your whole day?</Eyebrow>
          <h1 className="marker text-[clamp(2.5rem,6.2vw,4.4rem)] text-ink">
            One prompt.
            <br />
            <span className="marker-pop">A finished reel.</span>
          </h1>
          <div className="relative mx-auto w-full max-w-[260px] lg:hidden">
            <PhoneVideo
              src={kit.example.video}
              poster={kit.example.poster}
              label="The kit's bundled example reel, rendered untouched"
              sound
            />
            <div className="stamp absolute -left-8 top-6 bg-cream px-3 py-1.5 text-center text-xs font-extrabold leading-tight shadow-[3px_3px_0_var(--ink)]">
              Made by the kit.
              <br />
              Untouched.
            </div>
            <p className="mt-3 text-center text-xs font-semibold text-ink-2">
              The kit&apos;s own {kit.example.length} example, rendered on my Mac in {kit.example.renderTime}.
            </p>
          </div>
          <p className="max-w-xl text-xl font-semibold leading-relaxed text-ink">
            The {kit.name} has Claude make the whole reel for you: script, voiceover, painted animation, captions
            and music. No camera. No editing app.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <BuyButton />
            <Button href="#prompt" variant="ghost">
              See the prompt
            </Button>
          </div>
          <p className="text-base text-ink-2">
            <s>{kit.listPrice}</s> <b className="text-ink">{kit.price}</b> launch price · pay once · unlimited
            videos
          </p>
          {/* The 3 most common questions from the FAQ, answered next to the buy button. */}
          <ul className="flex flex-col gap-2 text-base text-ink">
            {[
              "No coding: unzip, open in Claude Code, paste a prompt.",
              "Nothing to pay for beyond Claude: free voiceover, music made on your machine.",
              "Tested on Mac. Won't run? I fix it with you, or a full refund in 14 days.",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <span aria-hidden className="font-extrabold text-sap">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
          <dl className="mt-2 grid w-full max-w-xl grid-cols-3 gap-3">
            {[
              [s.bestViews, "views on my best reel"],
              [s.bestSaves, "saves on it"],
              [s.followers, "followers, from 26 on Sep 27"],
            ].map(([n, l]) => (
              <div key={l} className="sketch px-3 py-3 !shadow-[4px_5px_0_var(--clay-lt)]">
                <dt className="sr-only">{l}</dt>
                <dd className="m-0">
                  <span className="block text-2xl font-extrabold text-ink sm:text-3xl">{n}</span>
                  <span className="block text-xs leading-snug text-ink-2 sm:text-sm">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-enter-late relative mx-auto hidden w-full max-w-[330px] lg:block">
          <PhoneVideo
            src={kit.example.video}
            poster={kit.example.poster}
            label={`The kit's bundled example reel, rendered untouched`}
            sound
          />
          <div className="stamp absolute -left-10 top-10 bg-cream px-4 py-2 text-center text-sm font-extrabold leading-tight shadow-[3px_3px_0_var(--ink)] sm:-left-20">
            Made by the kit.
            <br />
            Untouched.
          </div>
          <p className="mt-5 text-center text-sm font-semibold text-ink-2">
            The kit&apos;s own {kit.example.length} example, rendered on my Mac in {kit.example.renderTime}.
          </p>
          <Kai pose="present" priority className="bob absolute -bottom-6 -right-24 hidden w-28 lg:block" />
        </div>
      </div>
    </section>
  );
}

/* 2 · The pain, spelled out. */
export function KitPain() {
  return (
    <section className="bg-paper-2/70 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[1fr_0.9fr]">
        <Reveal className="relative">
          <ul className="flex flex-col gap-4">
            {kit.pains.map((p) => (
              <li key={p} className="sketch flex items-center gap-4 px-5 py-4 text-lg font-semibold text-ink">
                <span
                  aria-hidden
                  className="grid h-9 w-9 flex-none place-items-center rounded-full border-[2.5px] border-ink bg-accent-hover text-lg font-extrabold leading-none text-cream"
                >
                  ✕
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="relative flex flex-col gap-4">
          <p className="text-3xl font-extrabold leading-snug text-ink">
            So the idea stays
            <br />
            in your notes.
          </p>
          <p className="marker marker-pop w-fit text-[clamp(1.9rem,3.8vw,2.8rem)]">And you don&apos;t post.</p>
          <Kai pose="shrug" className="hidden w-28 md:absolute md:-top-24 md:right-2 md:block" />
        </Reveal>
      </div>
    </section>
  );
}

/* 3 · The prompt, and what happens after it. */
export function KitHow() {
  const steps = [
    { n: "0", t: "1 prompt", d: "You type the topic. That's your part." },
    { n: "36 min", t: "first render", d: "Script, voice, animation, captions, music." },
    { n: "70 min", t: "done", d: "0 edits from me." },
  ];
  return (
    <section id="prompt" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>What I do instead</Eyebrow>
          <H2>
            I type <span className="marker-pop">one prompt.</span>
            <br />
            Claude ships the reel.
          </H2>
          <p className="max-w-2xl text-lg text-ink">
            Pick one. These are the prompts from the kit&apos;s README, word for word.
          </p>
        </Reveal>
        <div className={`mt-8 grid items-start gap-10 ${kit.promptReel ? "lg:grid-cols-[1.3fr_0.7fr]" : ""}`}>
          <Reveal>
            <PromptPicker prompts={kit.prompts} />
          </Reveal>
          {kit.promptReel ? (
            <Reveal className="mx-auto w-full max-w-[260px]">
              <PhoneVideo
                src={kit.promptReel.video}
                poster={kit.promptReel.poster}
                label="The reel the kit made from the 'A topic' prompt"
                sound
              />
              <p className="mt-4 text-center text-sm font-semibold text-ink-2">
                Made by the kit from the &ldquo;A topic&rdquo; prompt. {kit.promptReel.note}
              </p>
            </Reveal>
          ) : null}
        </div>
        <Reveal className="relative mt-14">
          <p className="mb-6 text-lg font-extrabold text-ink">My last Instagram reel (a longer build on the in-house engine), from the logs:</p>
          <div aria-hidden className="absolute left-4 right-4 top-[6.6rem] hidden h-3 rounded-full border-2 border-ink bg-accent md:block" />
          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.t} className="relative flex flex-col gap-2">
                <p className="text-4xl font-extrabold text-ink">{s.n}</p>
                <span aria-hidden className="hidden h-6 w-6 rounded-full border-2 border-ink bg-ink md:block" />
                <p className="mt-2 text-xl font-extrabold text-ink">{s.t}</p>
                <p className="text-base text-ink-2">{s.d}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/* 4 · Three ways to get a reel. Qualitative on purpose: no invented prices. */
export function KitCompare() {
  const cols = [
    {
      h: "Film it yourself",
      rows: ["Your whole day, every reel", "Camera, lights, editing app", "Looks different every time"],
      tone: "bg-cream",
    },
    {
      h: "Hire an editor",
      rows: ["Pay again for every video", "Wait for drafts, send notes", "Their style, their schedule"],
      tone: "bg-cream",
    },
    {
      h: "Template apps",
      rows: ["You still record and edit", "Same templates everyone uses", "Your voice, your timing"],
      tone: "bg-cream",
    },
    {
      h: "Reel Kit",
      rows: [`${kit.price} once, unlimited reels`, "One prompt, no camera", "Same hand-drawn look every time"],
      tone: "bg-ink text-cream",
    },
  ];
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex items-end justify-between gap-6">
          <H2>Four ways to get a reel.</H2>
          <Kai pose="celebrate" className="hidden w-24 sm:block" />
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cols.map((c, i) => (
            <Reveal
              key={c.h}
              className={`${i === 3 ? "sketch-ink" : "sketch"} relative flex flex-col gap-4 p-6 ${c.tone}`}
            >
              <h3 className={`marker text-2xl ${i === 3 ? "text-ochre" : "text-ink"}`}>{c.h}</h3>
              <ul className="flex flex-col gap-3 text-base">
                {c.rows.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span aria-hidden className={`font-extrabold ${i === 3 ? "text-sap" : "text-accent-hover"}`}>
                      {i === 3 ? "✓" : "✕"}
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 4b · Everything one prompt does, one line each (Blotato-style feature grid). */
export function KitFeatures() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>What one prompt does</Eyebrow>
          <H2>
            Six jobs. <span className="marker-pop">Zero of them yours.</span>
          </H2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kit.features.map((f, i) => (
            <div key={f.t} className="sketch flex flex-col gap-2 p-6">
              <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-accent-ink">
                {String(i + 1).padStart(2, "0")} · {f.k}
              </span>
              <h3 className="text-2xl font-extrabold leading-tight text-ink">{f.t}</h3>
              <p className="text-base text-ink-2">{f.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-ink-2">Works with</span>
          {kit.worksWith.map((w) => (
            <span key={w} className="rounded-xl border-2 border-ink bg-cream px-3.5 py-1.5 text-sm font-extrabold text-ink">
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 9b · Founder story: why this exists. */
export function KitFounder() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[0.55fr_1.45fr]">
        <div className="relative mx-auto w-full max-w-[240px]">
          <Kai pose="wave" className="bob w-full" />
        </div>
        <div className="flex flex-col gap-5">
          <Eyebrow>Why this exists</Eyebrow>
          <H2>
            I built it because <span className="marker-pop">I needed it.</span>
          </H2>
          <div className="flex flex-col gap-4 text-lg leading-relaxed text-ink">
            {kit.founder.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <dl className="grid grid-cols-3 gap-3">
            {[
              [kit.stats.bestViews, "views on a reel I never filmed"],
              [kit.stats.followers, "followers, from 26 on Sep 27"],
              ["12:42", "prompt to finished reel"],
            ].map(([n, l]) => (
              <div key={l} className="sketch px-3 py-3 !shadow-[4px_5px_0_var(--clay-lt)]">
                <dt className="sr-only">{l}</dt>
                <dd className="m-0">
                  <span className="block text-2xl font-extrabold text-ink sm:text-3xl">{n}</span>
                  <span className="block text-xs leading-snug text-ink-2 sm:text-sm">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-4">
            <BuyButton />
            <a className="squiggle text-lg font-semibold text-ink" href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer">
              @kaiships.ai on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 5 · Real reels from the account, playing. */
export function KitShowcase() {
  return (
    <section id="showcase" className="scroll-mt-20 bg-paper-2/70 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Showcase</Eyebrow>
          <H2>
            Reels made this way.
            <br />
            <span className="marker-pop">Nobody filmed them.</span>
          </H2>
          <p className="max-w-2xl text-lg text-ink">
            Posted on @kaiships.ai, made with the in-house engine the kit was built from. Views and saves from
            Instagram, {kit.stats.date}.
          </p>
        </Reveal>
      </div>
      <div className="no-bar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:px-6 lg:mx-auto lg:max-w-6xl lg:grid lg:grid-cols-5 lg:overflow-visible">
        {kit.reels.map((r) => (
          <figure key={r.id} className="w-[62vw] max-w-[240px] flex-none snap-center lg:w-auto lg:max-w-none">
            <PhoneVideo
              src={`/reel-kit/video/${r.id}.mp4`}
              poster={`/reel-kit/video/${r.id}.jpg`}
              label="A reel posted on @kaiships.ai"
            />
            <figcaption className="mt-4 text-center">
              <span className="block text-xl font-extrabold text-ink">{r.views} views</span>
              <span className="block text-sm text-ink-2">{r.saves} saves</span>
              <a className="squiggle mt-1 inline-block text-sm font-semibold text-ink" href={r.url} target="_blank" rel="noopener noreferrer">
                Watch on Instagram
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* 6 · Early users: one featured buyer quote, then equal cards pinned like notes. */
type User = (typeof kit.users)[number];

function UserCard({ u, featured = false, tilt = 0 }: { u: User; featured?: boolean; tilt?: number }) {
  return (
    <figure
      style={{ rotate: `${tilt}deg` }}
      className={`sketch relative flex h-full flex-col p-6 transition-[rotate] duration-300 hover:!rotate-0 ${
        featured ? "sm:p-9" : ""
      }`}
    >
      <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-ochre/70" />
      {"label" in u ? (
        <span className="mb-3 w-fit rounded-md bg-ink px-2.5 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-ochre">
          {u.label}
        </span>
      ) : null}
      <span aria-hidden className={`marker block leading-[0.6] text-accent ${featured ? "text-8xl" : "text-6xl"}`}>
        “
      </span>
      <blockquote
        className={`flex-1 font-semibold leading-relaxed text-ink ${featured ? "text-2xl sm:text-[1.7rem]" : "text-lg"}`}
      >
        {u.text}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t-2 border-ink/15 pt-4">
        <Image
          src={`/reel-kit/users/${u.img}.jpg`}
          alt=""
          width={64}
          height={64}
          className={`rounded-full border-2 border-ink ${featured ? "h-16 w-16" : "h-12 w-12"}`}
        />
        <span>
          <span className="block text-base font-extrabold text-ink">{u.name}</span>
          <a className="text-sm text-ink-2" href={`https://instagram.com/${u.handle}`} target="_blank" rel="noopener noreferrer">
            @{u.handle}
          </a>
        </span>
      </figcaption>
    </figure>
  );
}

export function KitUsers() {
  const [first, ...rest] = kit.users;
  const tilts = [-1.2, 0.9, -0.6, 1.1, -0.9];
  return (
    <section id="users" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-col items-start gap-4">
          <h2 className="marker sketch-ink px-7 py-4 text-[clamp(2rem,5.4vw,3.6rem)] !text-ochre">Early users</h2>
          <p className="max-w-2xl text-lg text-ink">
            What people told me after trying the kit. Tap a handle to see who they are.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal className="h-full">
            <UserCard u={first} featured tilt={-0.6} />
          </Reveal>
          <Reveal className="relative hidden flex-col items-center justify-center gap-4 lg:flex">
            <Kai pose="present" className="bob w-36" />
            <p className="text-center text-lg font-semibold text-ink">
              Early users, in their words.
              <br />
              Handles are real, go say hi.
            </p>
          </Reveal>
        </div>
        <div className="mt-10 grid auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((u, i) => (
            <Reveal key={u.handle} className="h-full">
              <UserCard u={u} tilt={tilts[i % tilts.length]} />
            </Reveal>
          ))}
          <Reveal className="h-full">
            <div className="sketch-ink flex h-full flex-col justify-center gap-5 p-7">
              <p className="marker text-3xl text-ochre">Your reel next?</p>
              <p className="text-base text-cream/85">
                Make one, send it to me on Instagram, and it might end up right here.
              </p>
              <BuyButton className="w-full" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 7 · Setup in three steps + what's inside. */
export function KitSetup() {
  return (
    <section id="kit" className="scroll-mt-20 bg-paper-2/70 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Can I run it?</Eyebrow>
          <H2>
            Install 2 apps.
            <br />
            <span className="marker-pop">Paste 1 prompt.</span>
          </H2>
        </Reveal>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {kit.setup.map((s, i) => (
            <Reveal key={s.t} className="sketch relative flex flex-col gap-3 p-6 pt-8">
              <span className="absolute -top-5 left-5 grid h-11 w-11 place-items-center rounded-full border-[2.5px] border-ink bg-ochre text-xl font-extrabold text-ink">
                {i + 1}
              </span>
              <h3 className="text-xl font-extrabold text-ink">{s.t}</h3>
              <p className="text-base leading-relaxed text-ink">{s.d}</p>
              {"links" in s ? (
                <p className="flex flex-wrap gap-3">
                  {s.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="squiggle text-base font-extrabold text-ink">
                      {l.label} ↗
                    </a>
                  ))}
                </p>
              ) : null}
            </Reveal>
          ))}
        </ol>
        <Reveal className="sketch mt-10 grid gap-6 p-7 sm:p-9 md:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <h3 className="marker text-3xl text-ink sm:text-4xl">What you get</h3>
            <Kai pose="celebrate" className="hidden w-24 md:block" />
          </div>
          <ul className="flex flex-col gap-3 text-lg text-ink">
            {kit.gets.map((g) => (
              <li key={g} className="flex gap-3">
                <span aria-hidden className="mt-0.5 text-2xl font-extrabold leading-none text-sap">
                  ✓
                </span>
                {g}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* 8 · Pricing with the promise next to the button. */
export function KitPricing() {
  return (
    <section id="pricing" className="scroll-mt-20 py-16 sm:py-24">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <Spark className="-top-4 right-6 h-9 w-9" />
        <Reveal className="sketch-ink relative px-7 py-10 sm:px-12 sm:py-14">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-clay-lt">{kit.name}</p>
          <h2 className="marker mt-3 text-[clamp(2rem,5vw,3.4rem)] text-cream">
            One prompt.
            <br />
            <span className="text-ochre">Everything shipped for you.</span>
          </h2>
          <p className="mt-6 flex items-baseline gap-4">
            <span className="text-6xl font-extrabold text-cream">{kit.price}</span>
            <span className="text-2xl text-cream/60">
              <s>{kit.listPrice}</s>
            </span>
          </p>
          <p className="mt-2 text-base text-cream/80">Launch price. Pay once, make as many reels as you want.</p>
          <div className="mt-8">
            <BuyButton className="!shadow-[4px_5px_0_var(--ochre)]" />
          </div>
          <BuyPromise className="mt-5 max-w-md text-cream/85" />
          <div className="stamp absolute -right-3 -top-8 hidden rotate-6 bg-cream px-4 py-3 text-center text-sm font-extrabold leading-tight sm:block">
            14-day
            <br />
            refund
          </div>
          <Kai pose="thumbsup" className="absolute -bottom-6 right-4 hidden w-28 sm:block" />
        </Reveal>
      </div>
    </section>
  );
}

/* 9 · Lead capture for people not ready to buy. */
export function KitFree() {
  return (
    <section id="free" className="scroll-mt-20 bg-paper-2/70 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 md:grid-cols-2">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Not ready to buy?</Eyebrow>
          <h2 className="marker text-[clamp(1.9rem,4.6vw,3.2rem)] text-ink">
            Take the <span className="marker-pop">free stuff</span> first.
          </h2>
          <p className="text-lg text-ink">
            Leave your email and I&apos;ll send the Claude Code Starter PACK: the CLAUDE.md, skills and agents I
            install on every new machine.
          </p>
          <p className="text-lg text-ink">
            Or open any guide from my reels:{" "}
            <Link className="squiggle font-semibold" href="/resources">
              all free resources
            </Link>
            .
          </p>
        </Reveal>
        <Reveal className="sketch p-6 sm:p-8">
          <PackForm />
        </Reveal>
      </div>
    </section>
  );
}

/* 10 · FAQ + who is behind it. */
export function KitFaq() {
  return (
    <section id="faq" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <h2 className="marker text-[clamp(1.9rem,4.6vw,3.2rem)] text-ink">Questions</h2>
          <div className="mt-8 flex flex-col gap-4">
            {kit.faq.map((f) => (
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
        <aside className="sketch-ink flex h-fit flex-col gap-4 p-7 lg:sticky lg:top-24">
          <p className="marker text-3xl text-ochre">Still unsure?</p>
          <p className="text-base leading-relaxed text-cream/85">
            DM me on Instagram with your question. I read every one.
          </p>
          <a
            className="w-fit rounded-xl border-2 border-cream px-4 py-2 text-sm font-extrabold text-cream"
            href={siteConfig.socials.instagramDm}
            target="_blank"
            rel="noopener noreferrer"
          >
            DM @kaiships.ai ↗
          </a>
          <BuyButton className="w-full !shadow-[4px_5px_0_var(--ochre)]" />
          <BuyPromise className="text-cream/70" />
        </aside>
      </div>
    </section>
  );
}

export function KitStickyBuy() {
  return <StickyBuy href={kit.checkout} price={kit.price} />;
}
