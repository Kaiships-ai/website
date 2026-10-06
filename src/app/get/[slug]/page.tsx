import type { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getAllGuides, getGuideByKeyword } from "@/lib/guides";
import { getMagnet, magnets } from "@/lib/magnets";
import { GiftForm } from "./gift-form";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = new Set(magnets.map((m) => m.slug));
  for (const g of getAllGuides()) slugs.add(g.keyword.toLowerCase());
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getMagnet(slug);
  return {
    title: m ? (m.heading ?? `Your free ${m.title}`) : "Not found",
    robots: { index: false, follow: false },
  };
}

export default async function GiftPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const guide = getGuideByKeyword(slug);
  if (guide) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(await searchParams)) {
      for (const x of Array.isArray(v) ? v : v === undefined ? [] : [v]) qs.append(k, x);
    }
    const q = qs.toString();
    redirect(`/guides/${guide.slug}${q ? `?${q}` : ""}`);
  }
  const m = getMagnet(slug);
  if (!m) notFound();
  return (
    <div className="relative px-4 pt-28 pb-20 sm:pt-36">
      <div className="mx-auto max-w-md">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2">
          {m.group === "deal" ? "deal" : "gift"} · {m.kw}
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {m.heading ?? `Your free ${m.title}`}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-2">
          {m.blurb ?? "Drop your email and the guide opens right here. I'll also send you the next ones I make."}
        </p>
        <div className="mt-6">
          <GiftForm slug={m.slug} url={m.url} cta={m.cta} button={m.button} hideKitLine={m.hideKitLine} />
        </div>
        {m.preview === false ? null : (
          <figure className="mt-10">
            <Image
              src={`/get/${m.slug}.jpg`}
              alt={`First page of the ${m.title} guide`}
              width={720}
              height={446}
              className="w-full rounded-2xl border-[2.5px] border-ink shadow-[4px_5px_0_var(--ink)]"
            />
            <figcaption className="mt-3 text-center font-mono text-xs text-ink-2">
              page 1 of what you get
            </figcaption>
          </figure>
        )}
      </div>
    </div>
  );
}
