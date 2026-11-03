import { siteConfig } from "@/lib/site.config";
import s from "./night.module.css";

const { studio } = siteConfig;

/** Where a buy click came from, sent to Umami with every buy-click. */
export type BuySpot = "nav" | "bar" | "hero" | "reel" | "pricing" | "final";

/**
 * Every buy button on the page: same Polar link, same Umami event, plus the
 * spot it sits in. Same tab on purpose; CheckoutUtm adds the utm_* params on
 * click. `data-buy` lets the nav know when a buy button is on screen.
 */
export function BuyButton({ spot, className = "" }: { spot: BuySpot; className?: string }) {
  return (
    <a
      href={studio.checkout}
      className={`${s.btn} ${s.primary} ${className}`}
      data-umami-event="buy-click"
      data-umami-event-spot={spot}
      data-buy=""
    >
      {studio.cta} · {studio.price}
    </a>
  );
}
