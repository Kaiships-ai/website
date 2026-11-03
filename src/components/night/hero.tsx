import { siteConfig } from "@/lib/site.config";
import { HeroBean } from "./bean";
import { BuyButton } from "./buy-button";
import { ReelStrip } from "./reel-strip";
import { Spotlight } from "./spotlight";
import s from "./night.module.css";

const { studio } = siteConfig;

/* 1 · Who it is for, what they get, one button, then reels that exist. */
export function Hero() {
  const prompt = studio.prompt;
  return (
    <section className={s.hero} id="top" aria-labelledby="hero-title">
      <div className={s.glow} aria-hidden />
      <Spotlight />
      <p className={`${s.pill} ${s.enter}`}>
        <i aria-hidden />
        {studio.name} · <b>52 film styles</b>
      </p>
      <h1 id="hero-title" className={`${s.h1} ${s.grad}`}>
        You built it with Claude Code.
        <br />
        Nobody knows <span className={s.hot}>yet</span>.
      </h1>
      <p className={s.sub}>
        {studio.sub}
      </p>
      <div className={`${s.ctas} ${s.enter}`} style={{ "--d": 3 } as React.CSSProperties}>
        <BuyButton className={s.heroBuy} />
      </div>
      <p className={`${s.btnNote} ${s.enter}`} style={{ "--d": 3 } as React.CSSProperties}>
        {studio.buyNote}
      </p>
      <div className={`${s.term} ${s.enter}`} style={{ "--d": 4 } as React.CSSProperties}>
        <span className={s.or} aria-hidden>
          ❯
        </span>
        <span className={s.srOnly}>Claude Code prompt: {prompt}</span>
        <span className={s.typed} style={{ "--n": prompt.length } as React.CSSProperties} aria-hidden>
          {prompt}
        </span>
        <span className={s.caret} aria-hidden />
        <small aria-hidden>Claude Code</small>
        <HeroBean say={studio.bean.hero.say} />
      </div>
      <ReelStrip reels={studio.reels} source={studio.reelsSource} />
    </section>
  );
}
