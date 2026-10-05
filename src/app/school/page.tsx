import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { PageShell, PageHero, SectionTitle, card, Badge2 } from "@/components/page-bits";
import { siteConfig } from "@/lib/site.config";
import { school } from "@/lib/offers";

const title = `${school.name}: ${school.tagline}`;
const description =
  "A 6-module course, the Reel Kit and 9 Claude Code skills for one price. One-time, no subscription, 14-day refund. Module 1 is free to read.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/school" },
  openGraph: { title, description, url: `${siteConfig.url}/school`, images: ["/opengraph-image.jpg"] },
};

const rows = [
  ["Price", "One-time $79", "Monthly fee"],
  ["Access", "Yours to keep", "Ends when you stop paying"],
  ["Try first", "Module 1 is free to read", "Depends on the course"],
  ["Refund", "14 days", "Depends on the course"],
  ["Lesson list", "Public, on this page", "Depends on the course"],
];

export default function SchoolPage() {
  const kit = siteConfig.reelKit;
  const { stats } = kit;
  const quotes = kit.users.slice(0, 3);
  const totalMin = school.modules.reduce((a, m) => a + m.minutes, 0);
  return (
    <PageShell>
      <PageHero eyebrow="Course" title="Kaiships" accent="School." sub={school.tagline}>
        <p className="flex flex-wrap items-baseline gap-x-3">
          <span className="marker text-5xl text-ink">{school.price}</span>
          <span className="font-mono text-xs text-ink-2">{school.priceNote}</span>
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href={school.checkout} variant="accent">Join {school.name} · {school.price}</Button>
          <Button href="/school/module-1" variant="ghost">Read module 1 free</Button>
        </div>
      </PageHero>

      <section className="mt-16" aria-labelledby="stack">
        <SectionTitle id="stack">What you get</SectionTitle>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {school.stack.map((s) => (
            <li key={s.item} className={card}>
              <span className="text-lg font-extrabold text-ink">{s.item}</span>
              <span className="mt-auto font-mono text-sm text-accent-ink">{s.value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="modules">
        <SectionTitle id="modules">6 modules</SectionTitle>
        <p className="mt-2 text-base text-ink-2">{totalMin} minutes in total. Every lesson is listed here.</p>
        <ol className="mt-6 grid gap-6 md:grid-cols-2">
          {school.modules.map((m) => (
            <li key={m.n}>
              <Reveal className="h-full">
                <div className={card}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2">
                      Module {m.n} · {m.minutes} min
                    </span>
                    {"free" in m && m.free ? <Badge2>FREE</Badge2> : null}
                  </div>
                  <h3 className="text-xl font-extrabold text-ink">{m.title}</h3>
                  <p className="text-base text-ink-2">{m.summary}</p>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-ink-2">
                    {m.lessons.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                  {"free" in m && m.free ? (
                    <Link href="/school/module-1" className="mt-auto pt-2 text-sm font-extrabold text-accent-ink underline underline-offset-2">
                      Read module 1 free →
                    </Link>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2" aria-labelledby="fit">
        <div className={card}>
          <h2 id="fit" className="marker text-2xl text-ink">Who it&apos;s for</h2>
          <p className="text-base text-ink-2">
            AI builders who want to post animated faceless reels and sell one digital product.
          </p>
        </div>
        <div className={card}>
          <h2 className="marker text-2xl text-ink">Who it&apos;s not for</h2>
          <p className="text-base text-ink-2">
            People who want a done-for-you service, or guaranteed income. The Reel Kit needs a Mac.
          </p>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="proof">
        <SectionTitle id="proof">Proof from the Reel Kit</SectionTitle>
        <p className="mt-2 font-mono text-xs text-ink-2">
          Instagram numbers on {stats.date}. These quotes are from Reel Kit early users, not School students.
        </p>
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
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent-ink">Reel Kit early users</p>
        <ul className="mt-3 grid gap-4 md:grid-cols-3">
          {quotes.map((u) => (
            <li key={u.handle} className={card}>
              <p className="text-base leading-relaxed text-ink">&ldquo;{u.text}&rdquo;</p>
              <p className="mt-auto font-mono text-xs text-ink-2">
                {u.name} · @{u.handle}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="guarantee">
        <div className="sketch-ink flex flex-col gap-3 p-7">
          <h2 id="guarantee" className="marker text-3xl text-ochre">Guarantee</h2>
          <p className="max-w-2xl text-base leading-relaxed text-cream/90">{school.guarantee}</p>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="compare">
        <SectionTitle id="compare">School vs a $49/month course membership</SectionTitle>
        <div className="mt-6 overflow-x-auto rounded-2xl border-[2.5px] border-ink bg-cream shadow-[4px_5px_0_var(--ink)]">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead>
              <tr className="border-b-2 border-ink font-mono text-xs uppercase tracking-[0.15em] text-ink-2">
                <th className="p-4" />
                <th className="p-4 text-ink">{school.name}</th>
                <th className="p-4">Typical membership</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, a, b]) => (
                <tr key={k} className="border-b border-line last:border-0">
                  <th className="p-4 font-mono text-xs uppercase tracking-[0.15em] text-ink-2">{k}</th>
                  <td className="p-4 font-semibold text-ink">{a}</td>
                  <td className="p-4 text-ink-2">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="faq">
        <SectionTitle id="faq">Questions</SectionTitle>
        <div className="mt-6 flex max-w-3xl flex-col gap-4">
          {school.faq.map((f) => (
            <details key={f.q} className="sketch group px-6 py-4">
              <summary className="cursor-pointer list-none text-lg font-extrabold text-ink">
                {f.q}
                <span aria-hidden className="float-right text-accent-ink transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-base leading-relaxed text-ink">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-16 flex flex-col items-start gap-4">
        <SectionTitle>Ready?</SectionTitle>
        <p className="font-mono text-xs text-ink-2">{school.price} · {school.priceNote}</p>
        <div className="flex flex-wrap gap-3">
          <Button href={school.checkout} variant="accent">Join {school.name} · {school.price}</Button>
          <Button href="/school/module-1" variant="ghost">Read module 1 free</Button>
        </div>
      </section>
    </PageShell>
  );
}
