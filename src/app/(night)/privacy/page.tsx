import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import { NightShell } from "@/components/night/shell";
import s from "@/components/night/night.module.css";
import p from "@/components/night/shell.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How kaiships.ai handles your data, briefly, because there is very little of it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <NightShell current="/privacy" inPageBuy={false}>
      <article className={p.doc}>
        <span className={s.eyebrow}>
          <i aria-hidden />
          Legal
        </span>
        <h1>Privacy Policy</h1>
        <p className={p.updated}>Last updated: 2026-11-03</p>
        <p className={p.lede}>
          Short version: there are no accounts and no cookies. We count visits
          without knowing who you are, and Polar handles payment.
        </p>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Hosting logs.</strong> The site is hosted on Vercel, which
            processes standard request logs (IP address, user agent) to serve
            and secure the site.
          </li>
          <li>
            <strong>Anonymous counts.</strong> Umami and Vercel Web Analytics
            count page views and clicks on the buy buttons, with the page,
            referrer, browser and country. Vercel Speed Insights measures how
            fast pages load. None of them sets cookies or identifies you.
          </li>
        </ul>
        <h2>Purchases</h2>
        <p>
          Kaiships Studio is sold through Polar, the merchant of record: Polar
          takes the payment and we never see your card details. Polar tells us
          your email and what you bought, so we can help with setup and
          refunds.
        </p>
        <h2>Email capture</h2>
        <p>
          If you request the free PACK (on <a href="/pack">/pack</a> or the
          site popup), the email address you submit is sent to Kit
          (ConvertKit), our email provider, to deliver the download link and
          occasional updates. Every email includes an unsubscribe link, and
          unsubscribing removes you from the list.
        </p>
        <h2>Third-party destinations</h2>
        <p>
          Links to Instagram, TikTok, X, YouTube, and Discord take you to those
          platforms, where their own privacy policies apply. Help with Studio
          happens on Discord, and a refund request is a DM on Instagram; both
          conversations happen under those platforms&apos; terms.
        </p>
        <h2>Email</h2>
        <p>
          If you email {siteConfig.socials.email}, we use your address only to
          reply. No lists, no resale.
        </p>
        <h2>Contact</h2>
        <p>
          Questions: <a href={`mailto:${siteConfig.socials.email}`}>{siteConfig.socials.email}</a>
        </p>
      </article>
    </NightShell>
  );
}
