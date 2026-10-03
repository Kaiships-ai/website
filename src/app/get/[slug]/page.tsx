import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMagnet, magnets } from "@/lib/magnets";
import { GiftForm } from "./gift-form";

export const dynamicParams = false;

export function generateStaticParams() {
  return magnets.map((m) => ({ slug: m.slug }));
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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = getMagnet(slug);
  if (!m) notFound();
  return (
    <div className="relative px-4 pt-28 pb-20 sm:pt-36">
      <div className="mx-auto max-w-md">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2">
          gift · {m.kw}
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {m.heading ?? `Your free ${m.title}`}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-2">
          {m.blurb ?? "Drop your email and the guide opens right here. I'll also send you the next ones I make."}
        </p>
        <div className="mt-6">
          <GiftForm slug={m.slug} url={m.url} cta={m.cta} hideKitLine={m.hideKitLine} />
        </div>
      </div>
    </div>
  );
}
