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

export default function ThanksPage() {
    const what = "The email has your files.";
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
            Polar (the payment company) emails your download links right now. {what}{" "}If it&apos;s not there in a few minutes, look in spam.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="https://discord.gg/MAAJmghmrA" variant="accent">Join the Discord</Button>
          <Button href={siteConfig.socials.instagramDm} variant="ghost">DM @kaiships.ai for help</Button>
        </div>
      </div>
    </PageShell>
  );
}
