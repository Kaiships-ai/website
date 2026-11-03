import { siteConfig } from "@/lib/site.config";
import { BuyButton } from "./buy-button";
import s from "./night.module.css";

const { studio } = siteConfig;
const p = studio.pricing;

/*
 * 6 · What it replaces first, so the price is read against the buyer's real
 * alternatives; then one card with the value next to the whole cost (money,
 * effort, time, risk). The section ends on its button.
 */
export function Pricing() {
  return (
    <section className={s.sec} id="pricing" aria-labelledby="pricing-title">
      <div className={s.wrap}>
        <div className={s.center}>
          <span className={`${s.eyebrow} ${s.arrive}`}>
            <i aria-hidden />
            Pricing
          </span>
          <h2 id="pricing-title" className={`${s.h2} ${s.grad} ${s.arrive}`}>
            {p.title}
          </h2>
          <p className={`${s.lead} ${s.arrive}`}>{p.lead}</p>
        </div>

        <div className={s.insteadWrap}>
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
        <div className={s.plan}>
          <div className={s.planHead}>
            <h3>{p.plan}</h3>
            <div className={s.pr}>
              <b>{studio.price}</b>
              <span>one-time</span>
            </div>
          </div>
          <div className={s.planCols}>
            <div>
              <span className={s.eyebrow}>
                <i aria-hidden />
                You get
              </span>
              <ul className={s.gets}>
                {p.gets.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className={s.eyebrow}>
                <i aria-hidden />
                It costs you
              </span>
              <dl className={s.costs}>
                {p.costs.map((c) => (
                  <div key={c.k}>
                    <dt>{c.k}</dt>
                    <dd>{c.t}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className={s.planFoot}>
            <BuyButton spot="pricing" className={s.planBuy} />
            <p className={s.planNote}>{p.note}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
