import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getAllGuides, getGuide } from "@/lib/guides";
import { siteConfig } from "@/lib/site.config";
import { GateCard, LockedBody, LockedTag, UnlockProvider } from "./unlock";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.summary,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: {
      type: "article",
      title: g.title,
      description: g.summary,
      url: `${siteConfig.url}/guides/${g.slug}`,
      images: ["/opengraph-image.jpg"],
    },
  };
}

const prose =
  "prose prose-stone max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:text-accent-ink prose-code:rounded prose-code:bg-paper-2 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:before:content-none prose-code:after:content-none";

const num = (i: number) => String(i + 1).padStart(2, "0");

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const all = getAllGuides().filter((x) => x.slug !== g.slug);
  const next = [...all.filter((x) => x.topic === g.topic), ...all.filter((x) => x.topic !== g.topic)].slice(0, 3);
  const more = g.sections.length - 1;

  return (
    <article className="pt-32 pb-24 sm:pt-36">
      <UnlockProvider>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link href="/guides" className="font-mono text-xs text-ink-2 transition-colors hover:text-accent-ink">
            ← all guides
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-ink px-2.5 py-1 font-mono text-xs font-bold tracking-[0.18em] text-ochre">
              {g.keyword}
            </span>
            <span className="text-sm text-ink-2">{g.topic}</span>
          </div>
          <h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">{g.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">{g.summary}</p>
          <p className="mt-3 font-mono text-xs text-ink-2">
            {g.minutes} min read · {g.sections.length} sections
            {g.reel ? (
              <>
                {" · "}
                <a href={g.reel} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  Watch the reel ↗
                </a>
              </>
            ) : null}
          </p>

          <nav aria-label="Contents" className="mt-8 rounded-2xl border-2 border-ink bg-cream p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-ink">Contents</p>
            <ol className="mt-3 space-y-1.5 text-base text-ink">
              {g.sections.map((s, i) => (
                <li key={s.title}>
                  <span className="font-mono text-xs text-ink-2">{num(i)}</span> {s.title}
                  {i > 0 ? <LockedTag /> : null}
                </li>
              ))}
            </ol>
          </nav>

          {g.intro ? (
            <div className={`${prose} mt-10`}>
              <MDXRemote source={g.intro} />
            </div>
          ) : null}

          <section className="mt-10">
            <h2 className="text-3xl font-medium tracking-tight text-ink">
              <span className="mr-2 font-mono text-base text-ink-2">{num(0)}</span>
              {g.sections[0].title}
            </h2>
            <div className={`${prose} mt-4`}>
              <MDXRemote source={g.sections[0].body} />
            </div>
          </section>

          <GateCard slug={g.slug} more={more} />

          <LockedBody>
            {g.sections.slice(1).map((s, i) => (
              <section key={s.title} className="mt-12">
                <h2 className="text-3xl font-medium tracking-tight text-ink">
                  <span className="mr-2 font-mono text-base text-ink-2">{num(i + 1)}</span>
                  {s.title}
                </h2>
                <div className={`${prose} mt-4`}>
                  <MDXRemote source={s.body} />
                </div>
              </section>
            ))}
            {g.school ? (
              <aside className="mt-14 rounded-2xl border-[2.5px] border-ink bg-cream p-6 shadow-[4px_5px_0_var(--ink)]">
                <h2 className="text-xl font-semibold text-ink">Go deeper in Kaiships School — Module {g.school}</h2>
                {g.schoolLine ? <p className="mt-2 text-base text-ink-2">{g.schoolLine}</p> : null}
                <Link href="/school" className="mt-3 inline-block font-extrabold text-accent-ink underline underline-offset-2">
                  See the School →
                </Link>
              </aside>
            ) : null}
            {next.length ? (
              <section className="mt-14">
                <h2 className="text-2xl font-medium text-ink">Read next</h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-3">
                  {next.map((n) => (
                    <li key={n.slug}>
                      <Link href={`/guides/${n.slug}`} className="sketch flex h-full flex-col gap-1 p-4 hover:-translate-y-1">
                        <span className="font-mono text-xs font-bold tracking-[0.18em] text-ink-2">{n.keyword}</span>
                        <span className="font-extrabold text-ink">{n.title}</span>
                        <span className="text-sm text-ink-2">{n.minutes} min read</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </LockedBody>
        </div>
      </UnlockProvider>
    </article>
  );
}
