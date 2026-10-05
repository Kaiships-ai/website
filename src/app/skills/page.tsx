import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { PageShell, PageHero, SectionTitle, card, Badge2 } from "@/components/page-bits";
import { GiftForm } from "@/app/get/[slug]/gift-form";
import { getMagnet } from "@/lib/magnets";
import { siteConfig } from "@/lib/site.config";
import { school, library, skills } from "@/lib/offers";

const title = "Skill Library: 9 Claude Code skills for running a business";
const description =
  "The Claude Code skills I use to run kaiships.ai. Get 3 free, or all 9 for one payment.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/skills" },
  openGraph: { title, description, url: `${siteConfig.url}/skills`, images: ["/opengraph-image.jpg"] },
};

const install = [
  { t: "Unzip", d: "Open the download from Polar and unzip it." },
  { t: "Copy the folders", d: "Put the skill folders into ~/.claude/skills." },
  { t: "Ask in plain words", d: "Open Claude Code and say what you want, like \"weekly review\". Claude picks the skill." },
];

export default function SkillsPage() {
  const m = getMagnet("skills");
  return (
    <PageShell>
      <PageHero
        eyebrow="Skill Library"
        title="9 Claude Code skills,"
        accent="used daily."
        sub={`${library.tagline} Three are free. All nine are ${library.price}, one time.`}
      />

      <section id="free" className="mt-12 scroll-mt-24">
        <div className={`${card} max-w-xl`}>
          <Badge2>FREE</Badge2>
          <h2 className="marker text-2xl text-ink">
            {m?.heading ?? "3 free starter skills"}
          </h2>
          <p className="text-base text-ink-2">{m?.blurb}</p>
          {m ? (
            <GiftForm slug={m.slug} url={m.url} cta={m.cta} button={m.button} hideKitLine={m.hideKitLine} />
          ) : null}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="all">
        <SectionTitle id="all">All 9 skills</SectionTitle>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <li key={s.name}>
              <Reveal className="h-full">
                <div className={card}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-ink-2">{s.name}</span>
                    {s.tier === "free" ? <Badge2>FREE</Badge2> : <Badge2 tone="pro">PRO</Badge2>}
                  </div>
                  <h3 className="text-lg font-extrabold text-ink">{s.title}</h3>
                  <p className="text-base text-ink-2">{s.oneLiner}</p>
                  <p className="mt-auto font-mono text-xs text-accent-ink">Say: &ldquo;{s.triggers[0]}&rdquo;</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="buy">
        <div className="sketch-ink flex flex-col items-start gap-4 p-7">
          <h2 id="buy" className="marker text-3xl text-ochre">{library.name}</h2>
          <p className="flex flex-wrap items-baseline gap-x-3">
            <span className="marker text-4xl text-cream">{library.price}</span>
            <span className="font-mono text-xs text-cream/70">{library.priceNote}</span>
          </p>
          <Button href={library.checkout} variant="accent">Buy the library · {library.price}</Button>
          <Link href="/school" className="text-sm font-extrabold text-cream underline underline-offset-2">
            or get all 9 inside {school.name} ({school.price}) →
          </Link>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="install">
        <SectionTitle id="install">How to install</SectionTitle>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {install.map((s, i) => (
            <li key={s.t} className={card}>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2">Step {i + 1}</span>
              <h3 className="text-lg font-extrabold text-ink">{s.t}</h3>
              <p className="text-base text-ink-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
