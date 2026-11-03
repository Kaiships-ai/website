import { siteConfig } from "@/lib/site.config";
import { BuyButton } from "./buy-button";
import { LazyVideo } from "./lazy-video";
import s from "./night.module.css";

const { studio } = siteConfig;
const run = studio.realRun;

/*
 * 4 · Proof the buyer can check: the whole session, then the reel it made.
 * Both players start only when the visitor presses play, with sound.
 * A buy button sits right after the proof, where belief peaks.
 */
export function RealRun() {
  return (
    <section className={s.sec} aria-labelledby="run-title">
      <div className={s.wrap}>
        <span className={s.eyebrow}>
          <i aria-hidden />
          Real run
        </span>
        <h2 id="run-title" className={`${s.h2} ${s.grad}`}>
          {run.title[0]}
          <br />
          {run.title[1]}
        </h2>
        <p className={s.lead}>{run.lead}</p>

        <figure className={s.player} id="real-run">
          <LazyVideo
            sources={run.sources}
            poster={run.poster}
            width={2560}
            height={1440}
            playLabel={run.playLabel}
            label="Screen recording of one real Kaiships Studio run, 9 minutes 38 seconds"
          />
        </figure>
        <p className={s.caption}>{run.caption}</p>

        <div className={s.made}>
          <div className={s.madePhone}>
            <LazyVideo
              sources={[{ src: run.reel.video }]}
              poster={run.reel.poster}
              width={540}
              height={960}
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
              <BuyButton />
              <p className={s.btnNote}>{studio.buyNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
