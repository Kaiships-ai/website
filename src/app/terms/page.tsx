import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using kaiships.ai and the free resource library.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 sm:pt-36">
      <div className="prose prose-stone mx-auto max-w-3xl px-4 sm:px-6 prose-headings:font-medium prose-headings:tracking-tight prose-a:text-accent-ink">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-ink not-prose">
          {"//"} legal
        </p>
        <h1>Terms of Service</h1>
        <p>
          <em>Last updated: 2026-07-11</em>
        </p>
        <h2>The library</h2>
        <p>
          Resources published on this site are free to use in your own
          projects, personal or commercial. Don&apos;t republish them wholesale
          as your own paid product.
        </p>
        <h2>No warranty</h2>
        <p>
          Everything here is tested before release, and every article documents
          known failure modes — but software changes fast. Resources are
          provided <strong>as is</strong>, without warranty of any kind. You
          run them at your own risk; read files before you install them, and
          keep your own backups.
        </p>
        <h2>Not professional advice</h2>
        <p>
          Cost figures and results described on this site are examples from
          specific runs, not promises. Nothing here is legal, financial, or
          professional advice.
        </p>
        <h2>Kaiships Reel Kit</h2>
        <p>
          The Reel Kit is a one-time purchase sold through Polar, which emails
          the download right after payment. You may make unlimited videos,
          personal or commercial; please don&apos;t share or resell the kit
          itself. If the kit won&apos;t run on your machine, DM @kaiships.ai and
          we&apos;ll fix it together. If it still doesn&apos;t work within 14
          days of purchase, you get a full refund.
        </p>
        <h2>Community subscriptions</h2>
        <p>
          The paid community runs on Discord; billing, cancellation, and
          refunds are handled by the payment provider under the terms shown at
          checkout. Cancel anytime.
        </p>
        <h2>Contact</h2>
        <p>
          Questions: <a href={`mailto:${siteConfig.socials.email}`}>{siteConfig.socials.email}</a>
        </p>
      </div>
    </div>
  );
}
