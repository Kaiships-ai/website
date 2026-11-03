"use client";

import Image from "next/image";
import { useEffect, useReducer, useRef, useState } from "react";
import registry from "./bean-poses.json";
import s from "./night.module.css";

/** Bean, the lead studio mascot. Poses are prerendered by scripts/render-bean.mjs. */
export type BeanPose = keyof typeof registry.poses;
type BeanImage = { src: string; width: number; height: number };

export const BEAN = Object.fromEntries(
  Object.keys(registry.poses).map((k) => [k, { src: `/bean/${k}.webp`, width: registry.size.w, height: registry.size.h }]),
) as Record<BeanPose, BeanImage>;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Calls `onEnter` once, the first time `ref` scrolls into view. */
function useFirstView(ref: React.RefObject<HTMLElement | null>, onEnter: () => void, threshold = 0.6) {
  const cb = useRef(onEnter);
  useEffect(() => {
    cb.current = onEnter;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        cb.current();
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
}

/**
 * Every pose this spot can show, stacked; the current one is opaque. Changing
 * pose is an opacity crossfade, so a fast scroll just retargets it.
 */
export function BeanStack({ poses, pose, eager }: { poses: readonly BeanPose[]; pose: BeanPose; eager?: BeanPose }) {
  return (
    <span className={s.beanStack} style={{ aspectRatio: `${registry.size.w} / ${registry.size.h}` }}>
      {[...new Set(poses)].map((p) => (
        <Image
          key={p}
          {...BEAN[p]}
          alt=""
          unoptimized
          data-pose={p}
          data-on={p === pose || undefined}
          loading={p === eager ? "eager" : "lazy"}
          fetchPriority={p === eager ? "low" : undefined}
        />
      ))}
    </span>
  );
}

// Click to speak: idle -> speaking -> idle after 4 s. `n` counts clicks, so a
// click while speaking restarts the timer and replays the bounce.
type Speech = { phase: "idle" | "speaking"; n: number };
const speech = (st: Speech, ev: "click" | "done"): Speech =>
  ev === "click" ? { phase: "speaking", n: st.n + 1 } : { phase: "idle", n: st.n };
const SPEAK_MS = 4000;

function TalkingBean({
  say,
  label,
  pose,
  poses,
  eager,
}: {
  say: readonly string[];
  label: string;
  pose: BeanPose;
  poses: readonly BeanPose[];
  eager?: BeanPose;
}) {
  const [st, send] = useReducer(speech, { phase: "idle", n: 0 });
  const speaking = st.phase === "speaking";
  useEffect(() => {
    if (st.phase !== "speaking") return;
    const t = window.setTimeout(() => send("done"), SPEAK_MS);
    return () => window.clearTimeout(t);
  }, [st]);

  return (
    <>
      <button type="button" className={s.beanBtn} aria-label={label} onClick={() => send("click")}>
        <span className={s.beanBounce} data-b={st.n === 0 ? undefined : st.n % 2}>
          <span className={s.beanClip}>
            <BeanStack poses={[...poses, "hi"]} pose={speaking ? "hi" : pose} eager={eager} />
          </span>
        </span>
      </button>
      <span className={s.beanSay} data-on={speaking || undefined} aria-hidden>
        {say.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </span>
      <span className={s.srOnly} aria-live="polite">
        {speaking ? say.join(" ") : ""}
      </span>
    </>
  );
}

/** A · Hero: reads the prompt while it types (CSS), says hi when clicked. */
export function HeroBean({ say }: { say: readonly string[] }) {
  return (
    <span className={`${s.bean} ${s.heroBean}`}>
      <TalkingBean say={say} label="Say hi to Bean" pose="idle" poses={["idle", "read"]} eager="idle" />
    </span>
  );
}

/** C · FAQ: rises from behind the baseline curious, then waves. */
export function FaqBean({ say }: { say: readonly string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<"hidden" | "curious" | "hi">("hidden");
  useFirstView(ref, () => setPhase("curious"));
  useEffect(() => {
    if (phase !== "curious") return;
    const t = window.setTimeout(() => setPhase("hi"), 1200);
    return () => window.clearTimeout(t);
  }, [phase]);

  return (
    <span ref={ref} className={`${s.bean} ${s.faqBean}`} data-phase={phase}>
      <TalkingBean say={say} label="Ask Bean for help" pose={phase === "hi" ? "hi" : "curious"} poses={["curious"]} />
    </span>
  );
}

// The page's one confetti moment: pieces fan upward from Bean (never across
// the buy button or the note under it), then unmount.
const CONFETTI = Array.from({ length: 18 }, (_, i) => {
  const a = -Math.PI * (0.08 + (0.84 * ((i * 7) % 18)) / 17);
  const r = 60 + (i % 4) * 22;
  return {
    "--x": `${Math.round(Math.cos(a) * r)}px`,
    "--y": `${Math.round(Math.sin(a) * r - 20)}px`,
    "--r": `${(i * 47) % 360}deg`,
    "--c": ["var(--or)", "var(--ok)", "#ffd69e", "var(--ink-2)", "var(--or-2)"][i % 5],
    "--d": `${(i % 6) * 20}ms`,
  } as React.CSSProperties;
});
const CONFETTI_MS = 1000;

/** Final CTA: cheers next to the last buy button, with the only confetti. */
export function FinalBean() {
  const ref = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<"waiting" | "party" | "done">("waiting");
  useFirstView(ref, () => setPhase(reducedMotion() ? "done" : "party"), 0.8);
  useEffect(() => {
    if (phase !== "party") return;
    const t = window.setTimeout(() => setPhase("done"), CONFETTI_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  return (
    <span ref={ref} className={`${s.bean} ${s.finalBean}`} data-phase={phase} aria-hidden>
      <BeanStack poses={["cheer"]} pose="cheer" />
      {phase === "party" ? (
        <span className={s.confetti}>
          {CONFETTI.map((style, i) => (
            <i key={i} style={style} />
          ))}
        </span>
      ) : null}
    </span>
  );
}
