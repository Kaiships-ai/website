import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import { NightShell } from "@/components/night/shell";
import s from "@/components/night/night.module.css";
import p from "@/components/night/shell.module.css";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using kaiships.ai and the free resource library.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <NightShell current="/terms" inPageBuy={false}>
      <article className={p.doc}>
        <span className={s.eyebrow}>
          <i aria-hidden />
          Legal
        </span>
        <h1>Terms of Service</h1>
        <p className={p.updated}>Last updated: 2026-11-03</p>
        <h2>The library</h2>
        <p>
          Resources published on this site are free to use in your own
          projects, personal or commercial. Don&apos;t republish them wholesale
          as your own paid product.
        </p>
        <h2>No warranty</h2>
        <p>
          Everything here is tested before release, and every article documents
          known failure modes, but software changes fast. Resources are
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
        <h2>Kaiships Studio</h2>
        <p>
          Kaiships Studio is a one-time $30 purchase sold through Polar, which
          emails the download right after payment. There is no subscription.
          You may make unlimited videos, personal or commercial; please
          don&apos;t share or resell Studio itself. Studio runs inside Claude
          Code, and your Claude costs are not part of the price.
        </p>
        <p>
          If you can&apos;t make a reel within 7 days of purchase, DM
          @kaiships.ai on Instagram for a refund.
        </p>
        <h2>Contact</h2>
        <p>
          Questions: <a href={`mailto:${siteConfig.socials.email}`}>{siteConfig.socials.email}</a>
        </p>
      </article>
    </NightShell>
  );
}
