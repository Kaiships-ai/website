import { ogCard, OG_SIZE } from "@/lib/og-card";
import { siteConfig } from "@/lib/site.config";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function Image() {
  return ogCard({
    title: siteConfig.tagline,
    pathLabel: "kaiships.ai",
    meta: "tested · installable · built in public",
  });
}
