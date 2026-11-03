import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getAllResources, getResource } from "@/lib/content";
import { siteConfig } from "@/lib/site.config";
import { Prompt } from "@/components/prompt";
import { Callout } from "@/components/callout";
import { PackCta } from "@/components/pack-cta";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return getAllResources().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const res = getResource(slug);
  if (!res) return {};
  return {
    title: res.title,
    description: res.description,
    alternates: { canonical: `/resources/${res.slug}` },
    openGraph: {
      type: "article",
      title: res.title,
      description: res.description,
      url: `${siteConfig.url}/resources/${res.slug}`,
    },
  };
}

const mdxComponents = { Prompt, Callout, PackCta };

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = getResource(slug);
  if (!res) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: res.title,
    description: res.description,
    datePublished: res.date,
    author: { "@type": "Person", name: "Kai", url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/resources/${res.slug}`,
  };
  const faqLd = res.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: res.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <article className="pt-32 pb-24 sm:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          href="/resources"
          className="font-mono text-xs text-ink-2 transition-colors hover:text-accent-ink"
        >
          ← all resources
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge tone="accent">{res.type}</Badge>
          <Badge>{res.tool}</Badge>
          <span className="font-mono text-xs text-ink-2">
            {res.readTime} min ·{" "}
            <time dateTime={res.date}>{res.date}</time>
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
          {res.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">
          {res.description}
        </p>

        <div className="prose prose-stone mt-10 max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:text-accent-ink prose-code:rounded prose-code:bg-paper-2 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:before:content-none prose-code:after:content-none">
          <MDXRemote source={res.content} components={mdxComponents} />
        </div>

        {res.faq?.length ? (
          <section className="mt-14 border-t border-line pt-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-ink">
              {"//"} faq
            </h2>
            <dl className="mt-6 space-y-6">
              {res.faq.map((f) => (
                <div key={f.q}>
                  <dt className="font-medium text-ink">{f.q}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink-2">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
      </div>
    </article>
  );
}
