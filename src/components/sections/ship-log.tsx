import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { getAllPosts } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevealStagger, RevealItem } from "@/components/reveal";

export function ShipLog() {
  const { shipLog } = siteConfig;
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <section className="bg-paper-2 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={shipLog.eyebrow}
            title={shipLog.title}
            titleAccent={shipLog.titleAccent}
            sub={shipLog.sub}
          />
          <Button href={shipLog.cta.href} variant="ghost">
            {shipLog.cta.label}
          </Button>
        </div>
        <RevealStagger className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <RevealItem key={post.slug} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(20,18,16,0.18)]"
              >
                <div className="flex items-center justify-between">
                  <Badge>{post.tag}</Badge>
                  <time
                    dateTime={post.date}
                    className="font-mono text-xs text-ink-2"
                  >
                    {post.date}
                  </time>
                </div>
                <h3 className="mt-4 flex-1 text-lg font-medium leading-snug tracking-tight text-ink group-hover:text-accent-ink">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-2">
                  {post.description}
                </p>
                <p className="mt-4 font-mono text-xs text-ink-2">
                  {post.readTime} min read →
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
