import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllResources, getResource } from "@/lib/content";
import { ArticleView } from "@/components/content/article";
import { JsonLd } from "@/components/content/json-ld";
import { articleLd, breadcrumbLd, faqLd, pageMeta } from "@/lib/seo";

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllResources().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const res = getResource((await params).slug);
  if (!res) return {};
  return pageMeta({ title: res.title, description: res.description, path: `/resources/${res.slug}`, section: "guides", type: "article", image: `/resources/${res.slug}/opengraph-image` });
}

export default async function ResourcePage({ params }: P) {
  const res = getResource((await params).slug);
  if (!res) notFound();
  const path = `/resources/${res.slug}`;
  const others = getAllResources().filter((r) => r.slug !== res.slug);
  const related = [...others.filter((r) => r.type === res.type), ...others.filter((r) => r.type !== res.type)]
    .slice(0, 2)
    .map((r) => ({ href: `/resources/${r.slug}`, title: r.title, topic: r.type }));
  const ld: object[] = [
    articleLd({ title: res.title, description: res.description, path, date: res.date }),
    breadcrumbLd([{ name: "Guides", path: "/guides" }, { name: res.title, path }]),
  ];
  if (res.faq?.length) ld.push(faqLd(res.faq));
  return (
    <>
      <JsonLd data={ld} />
      <ArticleView
        back={{ href: "/guides", label: "all guides" }}
        chips={[res.type, res.tool]}
        date={res.date}
        readTime={res.readTime}
        title={res.title}
        description={res.description}
        content={res.content}
        related={related}
        after={
          res.faq?.length ? (
            <section className="mt-14 border-t border-line pt-10">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">FAQ</h2>
              <dl className="mt-6 space-y-6">
                {res.faq.map((f) => (
                  <div key={f.q}>
                    <dt className="font-medium text-ink">{f.q}</dt>
                    <dd className="mt-1.5 leading-relaxed text-muted">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null
        }
      />
    </>
  );
}
