import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, getDoc } from "@/lib/products";
import { allDocs, sidebar } from "@/components/content/docs-data";
import { DocsSidebar } from "@/components/content/docs-sidebar";
import { CopyMarkdown } from "@/components/content/copy-markdown";
import { Markdown, headings, proseClass } from "@/components/content/markdown";
import { JsonLd } from "@/components/content/json-ld";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

type P = { params: Promise<{ product: string; doc: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allDocs().map((d) => ({ product: d.product, doc: d.slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { product, doc } = await params;
  const p = getProducts().find((x) => x.slug === product);
  const d = p && getDoc(product, doc);
  if (!p || !d) return {};
  return pageMeta({
    title: `${d.title} · ${p.label} docs`,
    description: `${d.description} Kaiships Studio ${p.label} docs.`,
    path: `/docs/${product}/${doc}`,
    section: "docs",
    type: "article",
  });
}

export default async function DocPage({ params }: P) {
  const { product, doc } = await params;
  const p = getProducts().find((x) => x.slug === product);
  const d = p && getDoc(product, doc);
  if (!p || !d) notFound();

  const all = allDocs();
  const i = all.findIndex((x) => x.product === product && x.slug === doc);
  const prev = all[i - 1];
  const next = all[i + 1];
  const toc = headings(d.body);
  const path = `/docs/${product}/${doc}`;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <JsonLd
        data={breadcrumbLd([
          { name: "Docs", path: "/docs" },
          { name: p.label, path: `/docs/${product}` },
          { name: d.title, path },
        ])}
      />
      <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)_200px] lg:gap-12">
        <aside>
          <DocsSidebar products={sidebar()} current={path} />
        </aside>

        <article className="min-w-0">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted">
            <Link href="/docs/studio-reel/install" className="hover:text-ink">Docs</Link> <span aria-hidden>/</span> {p.label} <span aria-hidden>/</span> {d.group} <span aria-hidden>/</span> <span className="text-ink">{d.title}</span>
          </nav>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">{d.title}</h1>
            <CopyMarkdown markdown={`# ${d.title}\n\n${d.description}\n\n${d.body}\n`} />
          </div>
          {d.description ? <p className="mt-3 text-lg leading-relaxed text-muted">{d.description}</p> : null}
          <div className={proseClass + " mt-8"}>
            <Markdown source={d.body} />
          </div>

          <div className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
            {prev ? (
              <Link href={`/docs/${prev.product}/${prev.slug}`} className="rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">← Previous</span>
                <span className="mt-1 block font-medium text-ink">{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/docs/${next.product}/${next.slug}`} className="rounded-xl border border-line bg-surface p-4 text-right transition-colors hover:border-line-strong">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Next →</span>
                <span className="mt-1 block font-medium text-ink">{next.title}</span>
              </Link>
            ) : null}
          </div>
        </article>

        <aside className="hidden lg:block">
          {toc.length ? (
            <nav aria-label="On this page" className="sticky top-28 flex flex-col gap-2">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink">On this page</p>
              {toc.map((h) => (
                <a key={h.id} href={`#${h.id}`} className={"text-sm text-muted hover:text-accent " + (h.depth === 3 ? "pl-3" : "")}>
                  {h.text}
                </a>
              ))}
            </nav>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
