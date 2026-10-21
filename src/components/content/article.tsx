import Link from "next/link";
import type { ReactNode } from "react";
import { Markdown, proseClass } from "./markdown";
import { Chip, Cover, StudioCta } from "./bits";
import { Prompt } from "@/components/prompt";
import { Callout } from "@/components/callout";
import { PackCta } from "@/components/pack-cta";

const mdx = { Prompt, Callout, PackCta };

export function ArticleView(o: {
  back: { href: string; label: string };
  chips: string[];
  date: string;
  readTime: number;
  title: string;
  description: string;
  content: string;
  after?: ReactNode;
  related: { href: string; title: string; topic: string }[];
}) {
  return (
    <article className="mx-auto w-full max-w-[760px] px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <Link href={o.back.href} className="font-mono text-xs text-muted hover:text-accent">← {o.back.label}</Link>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {o.chips.map((c, i) => <Chip key={c} accent={i === 0}>{c}</Chip>)}
        <span className="font-mono text-xs text-muted">{o.readTime} min · <time dateTime={o.date}>{o.date}</time></span>
      </div>
      <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl">{o.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{o.description}</p>
      <div className={proseClass + " mt-10 sm:prose-lg"}>
        <Markdown source={o.content} mdx components={mdx} />
      </div>
      {o.after}
      {o.related.length ? (
        <section className="mt-16 border-t border-line pt-10" aria-labelledby="related">
          <h2 id="related" className="font-display text-2xl font-bold tracking-tight text-ink">Related guides</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {o.related.map((r, i) => (
              <li key={r.href}>
                <Link href={r.href} className="group flex flex-col gap-3">
                  <Cover topic={r.topic} title={r.title} tone={i} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <StudioCta />
    </article>
  );
}
