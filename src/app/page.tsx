import { Hero } from "@/components/sections/hero";
import { Ship } from "@/components/sections/ship";
import { Approach } from "@/components/sections/approach";
import { Community } from "@/components/sections/community";
import { ShipLog } from "@/components/sections/ship-log";
import { CtaBand } from "@/components/sections/cta";
import { Marquee } from "@/components/marquee";
import { siteConfig } from "@/lib/site.config";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={siteConfig.marquee} />
      <Ship />
      <Approach />
      <Community />
      <ShipLog />
      <CtaBand />
    </>
  );
}
