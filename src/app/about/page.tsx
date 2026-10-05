import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { PageShell, PageHero, SectionTitle, card } from "@/components/page-bits";
import { siteConfig } from "@/lib/site.config";

const title = "About Kai";
const description =
  "Product manager by day, builder at night. What kaiships.ai is, the real numbers, and how I work.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: `${siteConfig.url}/about`, images: ["/opengraph-image.jpg"] },
};

const short = [
  "Build it on a real product, not a demo.",
  "Verify every claim before it ships.",
  "Ship files you can install today.",
  "Write down what worked and what broke.",
];

export default function AboutPage() {
  const { founder, stats, users } = siteConfig.reelKit;
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title="Product manager by day,"
        accent="builder at night."
        sub="I'm Kai. I make animated reels with Claude Code and share how."
      />

      <section className="mt-12 grid gap-8 lg:grid-cols-2" aria-labelledby="story">
        <div className="flex flex-col gap-4">
          <SectionTitle id="story">The short story</SectionTitle>
          {founder.map((p) => (
            <p key={p.slice(0, 20)} className="text-base leading-relaxed text-ink-2">{p}</p>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <SectionTitle>What kaiships.ai is</SectionTitle>
          <p className="text-base leading-relaxed text-ink-2">
            One person, one Instagram account and a stack of Claude Code skills. I post faceless animated reels, give away free guides, and sell a few things for people who want to do the same: the Reel Kit, the Skill Library and the School.
          </p>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="numbers">
        <SectionTitle id="numbers">Real numbers</SectionTitle>
        <dl className="mt-6 grid grid-cols-3 gap-4">
          {[
            ["Followers", stats.followers],
            ["Best reel views", stats.bestViews],
            ["Best reel saves", stats.bestSaves],
          ].map(([k, v]) => (
            <div key={k} className={card}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-2">{k}</dt>
              <dd className="marker text-3xl text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-2xl font-mono text-xs leading-relaxed text-ink-2">
          Every number on this site comes from Instagram&apos;s API or Polar, with the date. These are from {stats.date}.
        </p>
      </section>

      <section className="mt-16" aria-labelledby="how">
        <SectionTitle id="how">How I work</SectionTitle>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.approach.steps.map((s, i) => (
            <li key={s.num}>
              <Reveal className="h-full">
                <div className={card}>
                  <span className="font-mono text-xs text-ink-2">{s.num}</span>
                  <h3 className="text-lg font-extrabold text-ink">{s.title}</h3>
                  <p className="text-base text-ink-2">{short[i]}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16" aria-labelledby="users">
        <SectionTitle id="users">Reel Kit early users</SectionTitle>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {users.slice(0, 3).map((u) => (
            <li key={u.handle} className={card}>
              <p className="text-base leading-relaxed text-ink">&ldquo;{u.text}&rdquo;</p>
              <p className="mt-auto font-mono text-xs text-ink-2">{u.name} · @{u.handle}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 flex flex-wrap gap-3">
        <Button href={siteConfig.socials.instagram} variant="accent">Follow @kaiships.ai</Button>
        <Button href={siteConfig.socials.instagramDm} variant="ghost">DM me on Instagram</Button>
      </section>
    </PageShell>
  );
}
