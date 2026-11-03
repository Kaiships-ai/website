import { CheckoutUtm } from "@/components/checkout-utm";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { siteConfig } from "@/lib/site.config";

/** In every page's <body>: utm carry-over to checkout, Vercel analytics, Umami. */
export function SiteScripts() {
  return (
    <>
      <CheckoutUtm />
      {/* Only Vercel serves /_vercel/insights and /_vercel/speed-insights; elsewhere the scripts 404. */}
      {process.env.VERCEL && <Analytics />}
      {process.env.VERCEL && <SpeedInsights />}
      <Script
        src="https://kstats-kaiships.vercel.app/stats.js"
        data-website-id="a11d08a4-7f99-420e-aafc-5aa471b7ca6e"
        data-domains={new URL(siteConfig.url).hostname}
        strategy="afterInteractive"
      />
    </>
  );
}
