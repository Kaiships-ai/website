import type { Metadata } from "next";
import {
  StudioHero,
  StudioCrew,
  StudioPain,
  StudioInside,
  StudioReels,
  StudioAccounts,
  StudioUsers,
  StudioPricing,
  StudioCommitments,
  StudioFaq,
  StudioRequirements,
  StudioInstall,
  StudioFinal,
  StudioStickyBuy,
  StudioJsonLd,
} from "@/components/sections/studio";

const title = "Kaiships Studio: type one prompt, get a hand-painted reel";
const description =
  "Claude writes, voices, paints, captions and scores the reel. Starter $39.99 one-time, Pro $79 PreOrder (then $99).";

// `absolute` skips the title.template suffix so this reads as the brand line.
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description },
};

// The home page is the Kaiships Studio sales page (wireframe direction A).
export default function Home() {
  return (
    <>
      <StudioJsonLd />
      <StudioHero />
      <StudioCrew />
      <StudioPain />
      <StudioInside />
      <StudioReels />
      <StudioAccounts />
      <StudioUsers />
      <StudioPricing />
      <StudioCommitments />
      <StudioFaq />
      <StudioRequirements />
      <StudioInstall />
      <StudioFinal />
      <StudioStickyBuy />
    </>
  );
}
