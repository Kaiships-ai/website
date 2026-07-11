import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getAllPosts, getPost } from "@/lib/content";
import { siteConfig } from "@/lib/site.config";
import { Prompt } from "@/components/prompt";
import { Callout } from "@/components/callout";
import { PackCta } from "@/components/pack-cta";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

const mdxComponents = { Prompt, Callout, PackCta };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Kai", url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <article className="pt-32 pb-24 sm:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          href="/blog"
          className="font-mono text-xs text-ink-2 transition-colors hover:text-accent-ink"
        >
          ← ship log
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge>{post.tag}</Badge>
          <time dateTime={post.date} className="font-mono text-xs text-ink-2">
            {post.date}
          </time>
          <span className="font-mono text-xs text-ink-2">
            · {post.readTime} min
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">
          {post.description}
        </p>
        <div className="prose prose-stone mt-10 max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:text-accent-ink prose-code:rounded prose-code:bg-paper-2 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:before:content-none prose-code:after:content-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
