import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Ship log",
  description:
    "Build-in-public log: what shipped, what broke, what it cost. Real numbers from a solo builder running Claude Code agents daily.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="pt-32 pb-24 sm:pt-36">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-ink">
            {"//"} ship log
          </p>
          <h1 className="text-4xl font-medium tracking-tight text-ink sm:text-6xl">
            Built in public,{" "}
            <em className="font-serif italic text-accent-ink">
              numbers included.
            </em>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink-2">
            What shipped, what broke, what it cost. No highlight reel.
          </p>
        </Reveal>
        <RevealStagger className="mt-14 space-y-4">
          {posts.map((post) => (
            <RevealItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_16px_40px_-16px_rgba(20,18,16,0.14)] sm:p-7"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>{post.tag}</Badge>
                  <time
                    dateTime={post.date}
                    className="font-mono text-xs text-ink-2"
                  >
                    {post.date}
                  </time>
                  <span className="font-mono text-xs text-ink-2">
                    · {post.readTime} min
                  </span>
                </div>
                <h2 className="text-xl font-medium leading-snug tracking-tight text-ink group-hover:text-accent-ink sm:text-2xl">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed text-ink-2">
                  {post.description}
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </div>
  );
}
