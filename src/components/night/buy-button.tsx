import { siteConfig } from "@/lib/site.config";
import s from "./night.module.css";

const { studio } = siteConfig;

/**
 * Every buy button on the page: same Polar link, same Umami event.
 * Same tab on purpose; CheckoutUtm adds the utm_* params on click.
 * `data-buy` lets the nav know when a buy button is on screen.
 */
export function BuyButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={studio.checkout}
      className={`${s.btn} ${s.primary} ${className}`}
      data-umami-event="buy-click"
      data-buy=""
    >
      Get it · {studio.price}
    </a>
  );
}
