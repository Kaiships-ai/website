import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PageShell, card } from "@/components/page-bits";
import { siteConfig } from "@/lib/site.config";

const title = "Thanks";
const description = "Payment received. Check your email for your download links.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/thanks" },
  openGraph: { title, description, url: `${siteConfig.url}/thanks`, images: ["/opengraph-image.jpg"] },
  robots: { index: false, follow: false },
};

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const p = Array.isArray(sp.p) ? sp.p[0] : sp.p;
  const what =
    p === "school"
      ? "The email has the 6-module course, the Reel Kit and the 9 Claude Code skills."
      : p === "skills"
        ? "The email has the 9-skill Library."
        : "The email has your files.";
  return (
    <PageShell>
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-ink">Thanks</p>
        <h1 className="marker mt-4 text-4xl text-ink sm:text-6xl">
          Payment <span className="marker-pop">received.</span>
        </h1>
        <div className={`${card} mt-8`}>
          <p className="text-lg font-extrabold text-ink">Check your email.</p>
          <p className="text-base leading-relaxed text-ink-2">
            Polar sends your download links from Polar. {what} If it&apos;s not there in a few minutes, look in spam.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {p === "school" ? (
            <Button href="/school/module-1" variant="accent">Read module 1 now</Button>
          ) : (
            <Button href="/school/module-1" variant="ghost">Read module 1 free</Button>
          )}
          <Button href={siteConfig.socials.instagramDm} variant="ghost">DM @kaiships.ai for help</Button>
        </div>
      </div>
    </PageShell>
  );
}
