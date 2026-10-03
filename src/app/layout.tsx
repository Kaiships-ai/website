import type { Metadata } from "next";
import { sans, serif, mono, marker } from "@/lib/fonts";
import { siteConfig } from "@/lib/site.config";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ExitIntent } from "@/components/exit-intent";
import { CheckoutUtm } from "@/components/checkout-utm";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.bio,
  keywords: [
    "Claude Code",
    "Claude Code skills",
    "Claude Code agents",
    "CLAUDE.md",
    "AI agents",
    "solo builder",
  ],
  authors: [{ name: "Kai", url: siteConfig.url }],
  creator: "Kai",
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.bio,
  },
  twitter: {
    card: "summary_large_image",
    site: "@kaiships",
    creator: "@kaiships",
  },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/rss.xml" },
  },
};

const siteLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.bio,
      publisher: { "@id": `${siteConfig.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: "Kai",
      url: siteConfig.url,
      description: siteConfig.bio,
      sameAs: [
        siteConfig.socials.instagram,
        siteConfig.socials.tiktok,
        siteConfig.socials.x,
        siteConfig.socials.youtube,
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} ${marker.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CheckoutUtm />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <ExitIntent />
        <Analytics />
      </body>
    </html>
  );
}
