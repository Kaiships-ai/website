import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import { StudioHero, StudioProof, StudioFacts } from "@/components/sections/studio";

// Explicit homepage title. Without it the tab title fell back to the root
// layout's title.default, which Next.js does not re-apply on client-side
// navigation. `absolute` skips the title.template suffix.
export const metadata: Metadata = {
  title: { absolute: `${siteConfig.studio.name} · ${siteConfig.studio.headline}` },
  description: siteConfig.bio,
  alternates: { canonical: "/" },
};

// The homepage sells one thing: Kaiships Studio, $30 one-time.
// Spec: crowsnest first-principle/trang-ban-nhap.md, screen C1.
export default function Home() {
  return (
    <>
      <StudioHero />
      <StudioProof />
      <StudioFacts />
    </>
  );
}
