import { siteConfig } from "@/lib/site.config";
import { display, text } from "./fonts";
import { NightNav } from "./nav";
import { Hero } from "./hero";
import { Stats } from "./stats";
import { HowItWorks } from "./how-it-works";
import { RealRun } from "./real-run";
import { Quotes } from "./quotes";
import { Pricing } from "./pricing";
import { BeforeYouBuy } from "./before-you-buy";
import { FinalCta } from "./final-cta";
import { NightFooter } from "./footer";
import s from "./night.module.css";

const { studio } = siteConfig;

/**
 * The Kaiships Studio sales page at "/", built on the Night design
 * (public/night-full.html stays as the visual reference).
 */
export function NightPage() {
  return (
    <div className={`${s.night} ${display.variable} ${text.variable}`} data-night="">
      <div className={s.grain} aria-hidden />
      <NightNav name={studio.name} price={studio.price} checkout={studio.checkout} links={studio.nav} />
      <Hero />
      <Stats />
      <HowItWorks how={studio.how} prompt={studio.prompt} reel={studio.reels[0]} />
      <RealRun />
      <Quotes />
      <Pricing />
      <BeforeYouBuy />
      <FinalCta />
      <NightFooter />
    </div>
  );
}
