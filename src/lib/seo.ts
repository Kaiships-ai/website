/** SEO helpers: absolute URLs, page metadata, JSON-LD builders. Server or client safe. */
import type { Metadata } from "next";
import { siteConfig } from "./site.config";
import type { Product } from "./products-data";

export type OgSection = "default" | "docs" | "guides" | "changelog" | "showcase";

export const abs = (p = "/") => (p.startsWith("http") ? p : `${siteConfig.url}${p.startsWith("/") ? p : `/${p}`}`);
export const ogImage = (s: OgSection = "default") => abs(`/og/studio/${s}`);

const PAD = " Made for Claude Code: one prompt in, one finished reel out.";

/** Keep descriptions in the 120–160 char band: pad short ones, cut long ones at a word. */
export function fitDescription(s: string): string {
  let d = s.trim();
  if (d.length < 120) d = (d.replace(/\.?$/, ".") + PAD).trim();
  if (d.length > 160) d = d.slice(0, 157).replace(/\s+\S*$/, "") + "…";
  return d;
}

/** Title without the " — kaiships.ai" template suffix; keeps the full title ≤ 60 chars. */
export function fitTitle(t: string): string {
  const max = 60 - ` — ${siteConfig.name}`.length;
  return t.length <= max ? t : t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

export function pageMeta(o: {
  title: string;
  description: string;
  path: string;
  section?: OgSection;
  type?: "website" | "article";
  /** Path of a page-specific OG image; defaults to the section card. */
  image?: string;
}): Metadata {
  const title = fitTitle(o.title);
  const description = fitDescription(o.description);
  const image = o.image ? abs(o.image) : ogImage(o.section);
  return {
    title,
    description,
    alternates: { canonical: abs(o.path) },
    openGraph: {
      type: o.type ?? "website",
      url: abs(o.path),
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

const ctx = "https://schema.org";

export const organizationLd = () => ({
  "@context": ctx,
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: abs("/icon"),
  sameAs: [siteConfig.socials.instagram, siteConfig.socials.tiktok, siteConfig.socials.x, siteConfig.socials.youtube],
});

export const productLd = (p: Product, description: string) => ({
  "@context": ctx,
  "@type": "Product",
  name: p.name,
  description,
  brand: { "@type": "Brand", name: "Kaiships Studio" },
  offers: {
    "@type": "Offer",
    price: p.priceValue,
    priceCurrency: p.currency,
    url: p.checkout,
    availability: p.preorder ? "https://schema.org/PreOrder" : "https://schema.org/InStock",
  },
});

export const faqLd = (items: { q: string; a: string }[]) => ({
  "@context": ctx,
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const articleLd = (a: { title: string; description: string; path: string; date?: string; type?: string }) => ({
  "@context": ctx,
  "@type": a.type ?? "Article",
  headline: a.title,
  description: a.description,
  datePublished: a.date,
  image: ogImage("guides"),
  author: { "@type": "Person", name: "Kai", url: siteConfig.url },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  mainEntityOfPage: abs(a.path),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": ctx,
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});
