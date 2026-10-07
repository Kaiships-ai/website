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

// Explicit homepage title. Without it the tab title fell back to the root
// layout's title.default, which Next.js does not re-apply on client-side
// navigation — so the /pack title leaked onto / after an SPA transition.
// `absolute` skips the title.template suffix so this reads as the brand line.
export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
  alternates: { canonical: "/" },
};

// The homepage sells one thing: the Kaiships Reel Kit. The older sections
// (hero, kit, approach, ship-log, cta, ship, community) stay in
// components/sections but are no longer rendered.
export default function Home() {
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
      <KitFaq />
      <KitStickyBuy />
    </>
  );
}
