import Image from "next/image";
import { siteConfig } from "@/lib/site.config";
import { FinalBean } from "./bean";
import { BuyButton } from "./buy-button";
import s from "./night.module.css";

const { studio } = siteConfig;
const f = studio.final;

/* 8 · Last screen: one line, one button, a wall of real reels behind it. */
export function FinalCta() {
  const posters = studio.reels.map((r) => r.poster);
  return (
    <section className={s.final} aria-labelledby="final-title">
      <div className={s.wall} aria-hidden>
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i}>
            <Image src={posters[i % posters.length]} alt="" fill sizes="(max-width: 900px) 32vw, 14vw" />
          </div>
        ))}
      </div>
      <div className={s.finalIn}>
        <span className={`${s.eyebrow} ${s.arrive}`}>
          <i aria-hidden />
          {f.eyebrow}
        </span>
        <h2 id="final-title" className={`${s.finalH2} ${s.grad} ${s.arrive}`}>
          <span>{f.title[0]}</span>
          <span>
            <span className={s.hot}>{f.title[1]}</span> {f.title[2]}
          </span>
        </h2>
        <div className={`${s.ctas} ${s.finalCtas}`}>
          <BuyButton spot="final" />
          <FinalBean />
        </div>
        <p className={s.btnNote}>{studio.buyNote}</p>
      </div>
    </section>
  );
}
