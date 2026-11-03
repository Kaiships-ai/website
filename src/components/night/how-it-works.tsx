"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SiteConfig } from "@/lib/site.config";
import { BeanStack, useLiveBean, type BeanPose } from "./bean";
import s from "./night.module.css";

type Studio = SiteConfig["studio"];
type Props = { how: Studio["how"]; bean: readonly BeanPose[]; prompt: string; reel: Studio["reels"][number] };

const WAVE = Array.from({ length: 22 }, (_, k) => +(0.25 + Math.abs(Math.sin(k * 1.7)) * 0.75).toFixed(2));
const HITS = new Set([0, 3, 6, 8, 11, 14, 16, 19, 22, 24, 27, 30]);
const pad = (i: number) => String(i + 1).padStart(2, "0");

/**
 * 3 · Six-step scroll story. The step crossing the middle of the screen
 * drives the terminal and the phone. Scenes crossfade (opacity only), so a
 * fast scroll just retargets the fade instead of queueing animations.
 */
export function HowItWorks({ how, bean, prompt, reel }: Props) {
  const CAP_WORDS = how.caption.split(" ");
  const capCount = CAP_WORDS.length;
  const [active, setActive] = useState(0);
  const [near, setNear] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [word, setWord] = useState(-1);
  const stepsRef = useRef<HTMLOListElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const live = useLiveBean({ pose: bean[active] });

  // Images in the phone load only once the story is close.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Which step is in the middle band of the viewport.
  useEffect(() => {
    const steps = [...(stepsRef.current?.children ?? [])];
    // Side by side: the middle of the screen. Stacked (below 1180 px): the
    // middle of the space left under the sticky monitor, so the active step
    // is the one you can read.
    const stacked = window.matchMedia("(max-width: 1179.98px)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(steps.indexOf(e.target));
      },
      { rootMargin: stacked ? "-70% 0px -28% 0px" : "-45% 0px -45% 0px" },
    );
    steps.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Captions scene: light the words one by one, like the reel does.
  // Reduced motion: CSS shows every word lit, nothing ticks.
  useEffect(() => {
    if (active !== 3) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = -1;
    const tick = () => {
      w = (w + 1) % (capCount + 3);
      setWord(w);
    };
    const first = window.setTimeout(tick, 0);
    const t = window.setInterval(tick, 260);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(t);
    };
  }, [active, capCount]);

  // Last scene: the reel itself, muted. Loads only when it is shown.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active === 5 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (!v.src) v.src = v.dataset.src!;
      v.play().catch(() => {});
    } else v.pause();
  }, [active]);

  const scene = (i: number, extra = "") => `${s.scene} ${extra} ${active === i ? s.sceneOn : ""}`;

  return (
    <section className={s.sec} id="how" aria-labelledby="how-title" ref={sectionRef}>
      <div className={s.wrap}>
        <span className={`${s.eyebrow} ${s.arrive}`}>
          <i aria-hidden />
          How it works
        </span>
        <h2 id="how-title" className={`${s.h2} ${s.grad} ${s.arrive}`}>
          {how.title[0]}
          <br />
          {how.title[1]}
        </h2>
        <p className={`${s.lead} ${s.arrive}`}>{how.lead}</p>

        <div className={s.story}>
          <ol className={s.steps} ref={stepsRef}>
            {how.steps.map((st, i) => (
              <li key={st.k} className={`${s.step} ${active === i ? s.stepOn : ""}`}>
                <span className={s.n}>
                  {pad(i)} · {st.k.toUpperCase()}
                </span>
                <h3>{st.t}</h3>
                <p>{st.d}</p>
              </li>
            ))}
          </ol>

          <div className={s.monWrap} aria-hidden>
            <div className={s.mon}>
              <div className={s.monTerm}>
                <div className={s.tb}>
                  <i />
                  <i />
                  <i />
                </div>
                <div className={s.cmd}>
                  <b>❯</b> {prompt}
                </div>
                <div className={s.monJobs}>
                  <ul>
                    {how.steps.map((st, j) => (
                      <li
                        key={st.k}
                        className={j < active || (active === 5 && j === 5) ? s.done : j === active ? s.now : ""}
                      >
                        {st.k}
                      </li>
                    ))}
                  </ul>
                  <span className={`${s.bean} ${s.monBean}`}>
                    <BeanStack poses={near ? bean : []} pose={bean[active]} live={live.state} liveRef={live.canvas} />
                  </span>
                </div>
                <div className={`${s.out} ${active === 5 ? s.outOn : ""}`}>
                  <p className={s.warn}>! {how.review}</p>
                  <p className={s.okText}>→ {how.output}</p>
                </div>
              </div>

              <div className={s.phone}>
                {/* The reel's own cover, faint behind every scene: no empty panel. */}
                {near ? <Image className={s.phoneBg} src={reel.poster} alt="" fill sizes="(max-width: 1179px) 160px, 340px" /> : null}
                <div className={scene(0, s.sHook)}>
                  <small>HOOK · SCRIPT</small>
                  <p>{how.hook}</p>
                  <div className={s.sceneLbl}>Script · 30 s</div>
                </div>
                <div className={scene(1)}>
                  <div className={s.wave}>
                    {WAVE.map((h, k) => (
                      <i key={k} style={{ "--k": k, "--h": h } as React.CSSProperties} />
                    ))}
                  </div>
                  <div className={s.sceneLbl}>Voice · checked line by line</div>
                </div>
                <div className={scene(2, s.sStyles)}>
                  {how.styles.map((st, j) => (
                    <div key={st.name} className={s.styleCard}>
                      {near ? <Image src={st.img} alt="" width={540} height={960} sizes="90px" /> : <span className={s.thumb} />}
                      <span>
                        {st.name}
                        {j === 0 ? <small>Studio&apos;s pick</small> : null}
                      </span>
                    </div>
                  ))}
                  <div className={s.sceneLbl}>3 of 52 styles, suggested</div>
                </div>
                <div className={scene(3, s.sCap)}>
                  <p>
                    {CAP_WORDS.map((w, j) => (
                      <span key={j} className={`${j <= word ? s.w : ""} ${j === word ? s.cur : ""}`}>
                        {w}{" "}
                      </span>
                    ))}
                  </p>
                </div>
                <div className={scene(4)}>
                  <div className={s.beats}>
                    {Array.from({ length: 32 }, (_, k) => (
                      <i key={k} className={HITS.has(k) ? s.hit : ""} style={{ "--k": k % 8 } as React.CSSProperties} />
                    ))}
                  </div>
                  <div className={s.sceneLbl}>Music + sound on the beats</div>
                </div>
                <div className={scene(5, s.sFinal)}>
                  {near ? <Image src={reel.poster} alt="" fill sizes="(max-width: 1179px) 160px, 340px" /> : null}
                  <video ref={videoRef} data-src={reel.video} muted loop playsInline preload="metadata" />
                  <span className={s.ready}>✓ ready</span>
                  <span className={s.tag}>Hook 7/10 · bar 8/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
