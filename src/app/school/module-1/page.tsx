import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site.config";
import { school } from "@/lib/offers";

const raw = () => fs.readFileSync(path.join(process.cwd(), "content/school/module-1.md"), "utf8");

export function generateMetadata(): Metadata {
  const { data } = matter(raw());
  const title = `Module 1 (free): ${data.title}`;
  const description = String(data.summary);
  return {
    title,
    description,
    alternates: { canonical: "/school/module-1" },
    openGraph: { type: "article", title, description, url: `${siteConfig.url}/school/module-1`, images: ["/opengraph-image.jpg"] },
  };
}

export default function Module1Page() {
  const { data, content } = matter(raw());
  return (
    <article className="pt-32 pb-24 sm:pt-36">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/school" className="font-mono text-xs text-ink-2 transition-colors hover:text-accent-ink">
          ← {school.name}
        </Link>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-accent-ink">
          Free module · {data.minutes} min
        </p>
        <div className="prose prose-stone mt-6 max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:text-accent-ink prose-code:rounded prose-code:bg-paper-2 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:before:content-none prose-code:after:content-none">
          <MDXRemote source={content} options={{ mdxOptions: { format: "md" } }} />
        </div>
        <aside className="sketch-ink mt-14 flex flex-col gap-4 p-7">
          <p className="marker text-3xl text-ochre">Modules 2–6 are in {school.name}</p>
          <p className="text-base text-cream/85">
            {school.price} one-time. Includes the Reel Kit and the 9-skill Library.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/school" variant="accent">See {school.name} →</Button>
            <Link href="/school" className="self-center text-sm font-extrabold text-cream underline underline-offset-2">
              ← Back to the course page
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
