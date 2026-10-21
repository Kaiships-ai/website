import { studioCard, OG } from "@/app/og/studio-card";
import { getAllPosts, getPost } from "@/lib/content";

export const size = OG;
export const contentType = "image/png";
export const alt = "Kaiships ship log";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return studioCard({ eyebrow: "Ship log", title: post?.title ?? "Ship log", sub: post ? `${post.readTime} min read · ${post.date}` : "" });
}
