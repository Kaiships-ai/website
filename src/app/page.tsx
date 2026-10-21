import type { Metadata } from "next";
import { getProduct } from "@/lib/products-data";
import {
  StudioHero,
  StudioCrew,
  StudioPain,
  StudioInside,
  StudioProSkills,
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

const starter = getProduct("starter");
const pro = getProduct("pro");
const title = "Kaiships Studio: type one prompt, get a hand-painted reel";
const description =
  `Claude writes, voices, paints, captions and scores the reel. Starter ${starter.price} one-time, Pro ${pro.price} PreOrder (then ${pro.afterPreorderPrice}).`;

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
      <StudioProSkills />
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
