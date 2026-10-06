import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import {
  KitHero,
  KitPain,
  KitHow,
  KitCompare,
  KitFeatures,
  KitFounder,
  KitShowcase,
  KitUsers,
  KitSetup,
  KitPricing,
  KitFree,
  KitFaq,
  KitStickyBuy,
} from "@/components/sections/reel-kit";
import { Ladder } from "@/components/sections/ladder";

export const metadata: Metadata = {
  title: `${siteConfig.reelKit.name}: one prompt, a finished reel`,
  description: siteConfig.bio,
  alternates: { canonical: "/reel-kit" },
  openGraph: { images: ["/opengraph-image.jpg"] },
};

// The Reel Kit sales page (moved from / when the home became the guide library).
export default function ReelKitPage() {
  return (
    <>
      <KitHero />
      <KitPain />
      <KitHow />
      <KitFeatures />
      <KitCompare />
      <KitShowcase />
      <KitUsers />
      <KitSetup />
      <KitPricing />
      <KitFounder />
      <KitFree />
      <Ladder />
      <KitFaq />
      <KitStickyBuy />
    </>
  );
}
