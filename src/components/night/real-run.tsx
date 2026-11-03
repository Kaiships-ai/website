import { siteConfig } from "@/lib/site.config";
import { BuyButton } from "./buy-button";
import { VideoFacade } from "./video-facade";
import s from "./night.module.css";

const { studio } = siteConfig;
const run = studio.realRun;

/*
 * 2 · Proof the buyer can check: the 30-second reel first, with a buy button
 * right after it, where belief peaks; then the whole 9:38 session for people
 * who want it. Both players start only when the visitor presses play, with sound.
 */
export function RealRun() {
  return (
    <section className={s.sec} id="real-run" aria-labelledby="run-title">
      <div className={s.wrap}>
        <span className={`${s.eyebrow} ${s.arrive}`}>
          <i aria-hidden />
          {run.eyebrow}
        </span>
        <h2 id="run-title" className={`${s.h2} ${s.grad} ${s.arrive}`}>
          {run.title[0]}
          <br />
          {run.title[1]}
        </h2>
        <p className={`${s.lead} ${s.arrive}`}>{run.lead}</p>

        <div className={s.made}>
          <div className={s.madePhone}>
            <VideoFacade
              sources={[{ src: run.reel.video }]}
              poster={run.reel.poster}
              sizes="(max-width: 900px) 246px, 286px"
              playLabel={run.reel.playLabel}
              iconOnly
              event="reel-play"
              label="The 30-second reel this run made, about Kaiships Studio"
            />
          </div>
          <div className={s.madeText}>
            <span className={s.eyebrow}>
              <i aria-hidden />
              What it made
            </span>
            <h3>{run.reel.title}</h3>
            <p>{run.reel.text}</p>
            <dl className={s.facts}>
              {run.facts.map((f) => (
                <div key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.t}</dd>
                </div>
              ))}
            </dl>
            <div className={s.madeBuy}>
              <BuyButton spot="reel" />
              <p className={s.btnNote}>{studio.buyNote}</p>
            </div>
          </div>
        </div>

        <div className={s.session}>
          <h3>{run.session.title}</h3>
          <p>{run.session.lead}</p>
          <figure className={s.player}>
            <VideoFacade
              sources={run.sources}
              poster={run.poster}
              sizes="(max-width: 1240px) calc(100vw - 40px), 1192px"
              playLabel={run.playLabel}
              event="run-play"
              label="Screen recording of one real Kaiships Studio run, 9 minutes 38 seconds"
            />
          </figure>
          <p className={s.caption}>{run.caption}</p>
        </div>
      </div>
    </section>
  );
}
