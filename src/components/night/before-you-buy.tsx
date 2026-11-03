import { siteConfig } from "@/lib/site.config";
import { FaqBean } from "./bean";
import s from "./night.module.css";

const { studio } = siteConfig;
const b = studio.before;

/* 7 · What you need, the one thing it can't promise, and the FAQ. */
export function BeforeYouBuy() {
  return (
    <section className={s.sec} id="faq" aria-labelledby="faq-title">
      <div className={`${s.wrap} ${s.faqGrid}`}>
        <div>
          <span className={s.eyebrow}>
            <i aria-hidden />
            Before you buy
          </span>
          <h2 id="faq-title" className={`${s.h2} ${s.grad}`}>
            {b.title}
          </h2>
          <ol className={s.req}>
            {b.needs.map((n) => (
              <li key={n.t}>
                <b>{n.t}</b>
                <span>{n.d}</span>
              </li>
            ))}
          </ol>
          <p className={s.promise}>{b.promise}</p>
        </div>
        <div className={s.faq}>
          <h3 className={s.srOnly}>Questions</h3>
          {b.faq.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>
                {f.q}
                <i aria-hidden />
              </summary>
              <p>{f.a}</p>
              {"cta" in f ? (
                <div className={s.faqHelp} data-bar-off="">
                  <a
                    className={`${s.btn} ${s.ghost} ${s.faqCta}`}
                    href={f.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event={f.cta.event}
                  >
                    {f.cta.label}
                    <span aria-hidden>↗</span>
                    <span className={s.srOnly}> (opens in a new tab)</span>
                  </a>
                  <FaqBean say={studio.bean.faq.say} />
                </div>
              ) : null}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
