import { siteConfig } from "@/lib/site.config";
import { NightNav } from "./nav";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { RealRun } from "./real-run";
import { Quotes } from "./quotes";
import { Pricing } from "./pricing";
import { BeforeYouBuy } from "./before-you-buy";
import { FinalCta } from "./final-cta";
import { NightFooter } from "./footer";
import "@/app/night.css";
import s from "./night.module.css";

const { studio } = siteConfig;

/**
 * The Kaiships Studio sales page at "/", built on the Night design
 * (public/night-full.html stays as the visual reference).
 */
export function NightPage() {
  return (
    <div className={s.night} data-night="">
      <div className={s.grain} aria-hidden />
      <NightNav name={studio.name} cta={studio.cta} price={studio.price} checkout={studio.checkout} variant="sales" inPageBuy links={studio.nav} />
      <Hero />
      {/* Proof first, as in the approved wireframe: see it work, then how. */}
      <RealRun />
      <HowItWorks how={studio.how} bean={studio.bean.how} prompt={studio.prompt} reel={studio.reels[0]} />
      <Quotes />
      <Pricing />
      <BeforeYouBuy />
      <FinalCta />
      <NightFooter />
    </div>
  );
}
