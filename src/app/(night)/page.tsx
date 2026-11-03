import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import { NightPage } from "@/components/night/night-page";

const studio = siteConfig.studio;
const title = `${studio.name} · ${studio.headline}`;

// Explicit homepage title. Without it the tab title fell back to the root
// layout's title.default, which Next.js does not re-apply on client-side
// navigation. `absolute` skips the title.template suffix.
// openGraph replaces the layout's object rather than merging into it, so it
// repeats type, url and siteName.
export const metadata: Metadata = {
  title: { absolute: title },
  description: siteConfig.bio,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title,
    description: siteConfig.bio,
  },
  twitter: {
    card: "summary_large_image",
    site: "@kaiships",
    creator: "@kaiships",
    title,
    description: siteConfig.bio,
  },
};

// The real offer only: no rating, no review, nothing site.config does not say.
const productLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: studio.name,
  description: siteConfig.bio,
  image: `${siteConfig.url}/proof/studio-fall-poster.jpg`,
  offers: {
    "@type": "Offer",
    price: studio.price.replace("$", "") + ".00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: studio.checkout,
  },
};

// The homepage sells one thing: Kaiships Studio, $30 one-time.
// Copy: site.config.ts `studio`. Design: public/night-full.html (Night).
// Spec: crowsnest first-principle/trang-ban-nhap.md + da-chac-chan.html step 3.
export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <NightPage />
    </main>
  );
}
