import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { getAllGuides } from "@/lib/guides";
import { Reveal } from "@/components/reveal";
import { HashRedirect } from "@/components/hash-redirect";
import { card, SectionTitle } from "@/components/page-bits";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name}: free Claude Code guides` },
  description:
    "Every reel on @kaiships.ai has a written guide: the exact commands, the links, and an honest note on what doesn't work.",
  alternates: { canonical: "/" },
  openGraph: { images: ["/opengraph-image.jpg"] },
};

const paths = [
  { href: "/reel-kit", title: "Make reels without filming", line: "One prompt, Claude makes the whole reel." },
  { href: "/guides?topic=Claude%20Code", title: "Get more out of Claude Code", line: "Setups, commands and settings, step by step." },
  { href: "/guides?topic=Free%20tools", title: "Find free tools that do the job", line: "Tools that cost nothing, with links and limits." },
];

const btn =
  "inline-flex items-center justify-center rounded-xl border-[2.5px] border-ink px-5 py-3 text-base font-extrabold shadow-[3px_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5";

export default function Home() {
  const guides = getAllGuides();
  const latest = guides.slice(0, 6);
  const n = guides.length;
  const s = siteConfig.reelKit.stats;
  return (
    <div className="relative overflow-hidden pt-32 pb-16 sm:pt-36">
      <HashRedirect />
      <div aria-hidden className="glow absolute -top-24 right-[-10%] h-96 w-96 rounded-full" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-20 px-4 sm:px-6">
        <Reveal className="flex flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-ink">Free guides from the reels</p>
          <h1 className="marker max-w-3xl text-4xl text-ink sm:text-6xl">
            {n >= 10 ? `${n} ` : ""}Claude Code setups you can <span className="marker-pop">use tonight.</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink-2">
            Every reel on @kaiships.ai has a written guide here: the exact commands, the links, and an honest note on what doesn&apos;t work.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/guides" className={`${btn} bg-ochre text-ink`}>Browse the guides</Link>
            <Link href="/school" className={`${btn} bg-cream text-ink`}>See Kaiships School</Link>
          </div>
          <p className="text-sm text-ink-2">Free for one email.</p>
        </Reveal>

        <section aria-labelledby="want">
          <SectionTitle id="want">What do you want to do?</SectionTitle>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {paths.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={`${card} transition-transform hover:-translate-y-1`}>
                  <span className="text-lg font-extrabold text-ink">{p.title}</span>
                  <span className="text-base text-ink-2">{p.line}</span>
                  <span className="mt-auto pt-2 font-mono text-xs uppercase tracking-[0.15em] text-accent-ink">Open →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="latest">
          <SectionTitle id="latest">Latest guides</SectionTitle>
          {latest.length > 0 && (
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {latest.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`} className={`${card} transition-transform hover:-translate-y-1`}>
                    <span className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
                      <span className="rounded-md bg-ink px-2.5 py-1 text-ochre">{g.keyword}</span>
                      <span className="text-ink-2">{g.topic}</span>
                    </span>
                    <span className="text-lg font-extrabold text-ink">{g.title}</span>
                    <span className="mt-auto pt-2 font-mono text-xs uppercase tracking-[0.15em] text-accent-ink">{g.minutes} min read →</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-6">
            <Link href="/guides" className="font-extrabold text-ink underline underline-offset-4">All guides →</Link>
          </p>
        </section>

        <section aria-labelledby="proof" className={`${card} !h-auto`}>
          <h2 id="proof" className="text-xl font-extrabold text-ink">The reels behind the guides</h2>
          <dl className="grid gap-4 sm:grid-cols-3">
            {[
              [s.followers, "followers"],
              [s.bestViews, "views on the best reel"],
              [s.bestSaves, "saves on the best reel"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="text-3xl font-extrabold text-ink">{v}</dt>
                <dd className="text-sm text-ink-2">{l}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-ink-2">Instagram, {s.date}</p>
        </section>

        <section aria-labelledby="school" className="flex flex-col gap-3">
          <SectionTitle id="school">Kaiships School</SectionTitle>
          <p className="max-w-xl text-base text-ink-2">The whole system: 6 modules, the Reel Kit and 9 Claude Code skills.</p>
          <p>
            <Link href="/school" className={`${btn} bg-cream text-ink`}>See Kaiships School</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
