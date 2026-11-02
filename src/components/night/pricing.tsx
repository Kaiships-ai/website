import { siteConfig } from "@/lib/site.config";
import { BuyButton } from "./buy-button";
import s from "./night.module.css";

const { studio } = siteConfig;
const p = studio.pricing;

/* 6 · One card, one price, the refund, and what it replaces. */
export function Pricing() {
  return (
    <section className={s.sec} id="pricing" aria-labelledby="pricing-title">
      <div className={s.wrap}>
        <div className={s.center}>
          <span className={s.eyebrow}>
            <i aria-hidden />
            Pricing
          </span>
          <h2 id="pricing-title" className={`${s.h2} ${s.grad}`}>
            {p.title}
          </h2>
          <p className={s.lead}>{p.lead}</p>
        </div>

        <div className={s.priceGrid}>
          <div className={s.plan}>
            <h3>
              {p.plan}
              <span className={s.badge}>{p.badge}</span>
            </h3>
            <div className={s.pr}>
              <b>{studio.price}</b>
              <span>one-time</span>
            </div>
            <p className={s.planNote}>{p.note}</p>
            <ul>
              {p.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <BuyButton />
            <p className={s.refund}>{p.refund}</p>
          </div>

          <div>
            <span className={s.eyebrow}>
              <i aria-hidden />
              Instead of
            </span>
            <ul className={s.instead}>
              {p.insteadOf.map((x) => (
                <li key={x.k}>
                  <b>{x.k}</b>
                  <span>{x.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
