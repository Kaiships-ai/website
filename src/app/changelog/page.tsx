import type { Metadata } from "next";
import { getChangelog, getProducts } from "@/lib/products";
import { Markdown, proseClass, slugify } from "@/components/content/markdown";
import { TabbedList } from "@/components/content/tabbed-list";
import { PageHeader, Chip } from "@/components/content/bits";
import { JsonLd } from "@/components/content/json-ld";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Changelog · Kaiships Studio",
  description:
    "Every Kaiships Studio release, newest first: what changed in Starter (Studio Reel) and Pro, with version numbers and dates straight from the product repos.",
  path: "/changelog",
  section: "changelog",
});

const fmt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function ChangelogPage() {
  const products = getProducts();
  const label = (slug: string) => products.find((p) => p.slug === slug)?.label ?? slug;
  const entries = getChangelog();
  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <JsonLd data={breadcrumbLd([{ name: "Changelog", path: "/changelog" }])} />
      <PageHeader eyebrow="Changelog" title="What shipped, and when." sub="Every release of Starter and Pro, newest first. Pulled from each product repo's CHANGELOG." />
      <div className="mt-12">
        <TabbedList
          tabs={products.map((p) => ({ key: p.slug, label: p.label }))}
          items={entries.map((e) => {
            const id = slugify(`${e.slug}-${e.version}`);
            return {
              key: e.slug,
              id,
              node: (
                <section id={id} className="grid scroll-mt-28 gap-3 border-t border-line py-10 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-10">
                  <time dateTime={e.date} className="font-mono text-sm text-muted">{fmt(e.date)}</time>
                  <div className="min-w-0 rounded-[18px] border border-line bg-surface p-6 sm:p-8">
                    <h2 className="flex flex-wrap items-center gap-3 font-display text-2xl font-bold tracking-tight text-ink">
                      <a href={`#${id}`} className="hover:text-accent">{e.version}</a>
                      <Chip accent={products.find((p) => p.slug === e.slug)?.tier === "pro"}>{label(e.slug)}</Chip>
                    </h2>
                    <div className={proseClass + " mt-4 prose-sm sm:prose-base"}>
                      <Markdown source={e.items} />
                    </div>
                  </div>
                </section>
              ),
            };
          })}
        />
      </div>
    </div>
  );
}
