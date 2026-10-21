import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { PageHeader, Cover } from "@/components/content/bits";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Ship log",
  description:
    "Build-in-public log: what shipped, what broke, what it cost. Real numbers from a solo builder running Claude Code agents every day.",
  path: "/blog",
  section: "guides",
});

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <PageHeader center eyebrow="Ship log" title="Built in public." sub="What shipped, what broke, what it cost. No highlight reel." />
      <ul className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {posts.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group flex flex-col gap-4">
              <Cover topic={p.tag} title={p.title} tone={i} />
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-muted"><time dateTime={p.date}>{p.date}</time> · {p.readTime} min</span>
                <h2 className="font-display text-xl font-bold leading-snug tracking-tight text-ink group-hover:text-accent">{p.title}</h2>
                <p className="text-sm leading-relaxed text-muted">{p.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
