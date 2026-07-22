import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import { Hero } from "@/components/sections/hero";
import { Approach } from "@/components/sections/approach";
import { Kit } from "@/components/sections/kit";
import { ShipLog } from "@/components/sections/ship-log";
import { CtaBand } from "@/components/sections/cta";

// Explicit homepage title. Without it the tab title fell back to the root
// layout's title.default, which Next.js does not re-apply on client-side
// navigation — so the /pack title leaked onto / after an SPA transition.
// `absolute` skips the title.template suffix so this reads as the brand line.
export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
  alternates: { canonical: "/" },
};
// Commented out 2026-07-22 with their homepage sections (see below). Component
// files + config blocks are kept intact; uncomment to restore.
// import { Ship } from "@/components/sections/ship";
// import { Community } from "@/components/sections/community";
// import { Marquee } from "@/components/marquee";
// import { siteConfig } from "@/lib/site.config";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Kit moved high — it is the real paid product. */}
      <Kit />
      <Approach />
      <ShipLog />
      <CtaBand />
      {/*
        Commented out 2026-07-22 — these did not match the real offer.
        Kept imports + components + config so they can be restored later.

        <Marquee items={siteConfig.marquee} />  fake skills marquee (verify-before-trust / token-guard etc — not offered)
        <Ship />                                 "installable systems, not prompt lists" — abstract/unoffered
        <Community />                            no live community yet
      */}
    </>
  );
}
