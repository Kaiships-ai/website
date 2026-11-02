import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/site.config";
import { NightPage } from "@/components/night/night-page";

// Explicit homepage title. Without it the tab title fell back to the root
// layout's title.default, which Next.js does not re-apply on client-side
// navigation. `absolute` skips the title.template suffix.
export const metadata: Metadata = {
  title: { absolute: `${siteConfig.studio.name} · ${siteConfig.studio.headline}` },
  description: siteConfig.bio,
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0a0c17",
  colorScheme: "dark",
};

// The homepage sells one thing: Kaiships Studio, $30 one-time.
// Copy: site.config.ts `studio`. Design: public/night-full.html (Night).
// Spec: crowsnest first-principle/trang-ban-nhap.md + da-chac-chan.html step 3.
export default function Home() {
  return <NightPage />;
}
