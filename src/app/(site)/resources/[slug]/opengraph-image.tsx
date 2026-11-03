import { ogCard, OG_SIZE } from "@/lib/og-card";
import { getAllResources, getResource } from "@/lib/content";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "kaiships.ai resource";

export function generateStaticParams() {
  return getAllResources().map((r) => ({ slug: r.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = getResource(slug);
  return ogCard({
    title: res?.title ?? "Resource",
    pathLabel: `kaiships.ai/resources/${slug}`,
    meta: res
      ? `${res.type.toLowerCase()} · ${res.readTime} min · free`
      : "free resource",
  });
}
