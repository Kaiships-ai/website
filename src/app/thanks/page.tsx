import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PageShell, card } from "@/components/page-bits";
import { siteConfig } from "@/lib/site.config";
import { getProduct, formatDate } from "@/lib/products";

const title = "Thanks";
const description = "Payment received. Check your email: a download link (Starter) or a GitHub invite (Pro).";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/thanks" },
  openGraph: { title, description, url: `${siteConfig.url}/thanks`, images: ["/opengraph-image"] },
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  const pro = getProduct("pro");
  const shipped = pro.includes.filter((i) => i.status === "shipped").map((i) => i.title.toLowerCase());
  const what =
    `Bought Pro? You get an invite to the private GitHub repo studio-pro; git pull gets every update.` +
    (shipped.length ? ` The first skill (${shipped.join(", ")}) is already in the repo` : "") +
    (pro.shipsBy ? `, the rest arrive one a week, all by ${formatDate(pro.shipsBy)}.` : ".") +
    " Both plans get the Discord.";
  return (
    <PageShell>
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Thanks</p>
        <h1 className="font-display font-bold tracking-[-0.02em] mt-4 text-4xl text-ink sm:text-6xl">
          Payment <span className="text-accent">received.</span>
        </h1>
        <div className={`${card} mt-8`}>
          <p className="text-lg font-extrabold text-ink">Check your email.</p>
          <p className="text-base leading-relaxed text-muted">
            Bought Starter? Polar (the payment company) emails your download link right now. {what}{" "}If it&apos;s not there in a few minutes, look in spam.
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
