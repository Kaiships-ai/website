import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, getAllResources } from "@/lib/content";
import { ArticleView } from "@/components/content/article";
import { JsonLd } from "@/components/content/json-ld";
import { articleLd, breadcrumbLd, pageMeta } from "@/lib/seo";

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMeta({ title: post.title, description: post.description, path: `/blog/${post.slug}`, section: "guides", type: "article", image: `/blog/${post.slug}/opengraph-image` });
}

export default async function PostPage({ params }: P) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const path = `/blog/${post.slug}`;
  const related = getAllResources()
    .filter((r) => r.popular)
    .concat(getAllResources())
    .filter((r, i, a) => a.findIndex((x) => x.slug === r.slug) === i)
    .slice(0, 2)
    .map((r) => ({ href: `/resources/${r.slug}`, title: r.title, topic: r.type }));
  return (
    <>
      <JsonLd
        data={[
          articleLd({ title: post.title, description: post.description, path, date: post.date, type: "BlogPosting" }),
          breadcrumbLd([{ name: "Ship log", path: "/blog" }, { name: post.title, path }]),
        ]}
      />
      <ArticleView
        back={{ href: "/blog", label: "ship log" }}
        chips={[post.tag]}
        date={post.date}
        readTime={post.readTime}
        title={post.title}
        description={post.description}
        content={post.content}
        related={related}
      />
    </>
  );
}
