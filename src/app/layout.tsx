import type { Metadata } from "next";
import { sans, serif, mono } from "@/lib/fonts";
import { siteConfig } from "@/lib/site.config";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
