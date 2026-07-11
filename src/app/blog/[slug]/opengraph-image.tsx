import { ogCard, OG_SIZE } from "@/lib/og-card";
import { getAllPosts, getPost } from "@/lib/content";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "kaiships.ai ship log";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogCard({
    title: post?.title ?? "Ship log",
    pathLabel: `kaiships.ai/blog/${slug}`,
    meta: post
      ? `${post.tag} · ${post.readTime} min · ship log`
      : "ship log",
  });
}
