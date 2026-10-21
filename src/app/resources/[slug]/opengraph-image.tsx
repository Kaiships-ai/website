import { studioCard, OG } from "@/app/og/studio-card";
import { getAllResources, getResource } from "@/lib/content";

export const size = OG;
export const contentType = "image/png";
export const alt = "Kaiships Studio free guide";

export function generateStaticParams() {
  return getAllResources().map((r) => ({ slug: r.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const res = getResource((await params).slug);
  return studioCard({ eyebrow: res ? `Free guide · ${res.type}` : "Free guide", title: res?.title ?? "Free guide", sub: res ? `${res.readTime} min read · ${res.tool}` : "" });
}
