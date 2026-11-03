"use client";

import Image from "next/image";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { Follow, LiveBean } from "./bean-live";
import registry from "./bean-poses.json";
import s from "./night.module.css";

/** Bean, the lead studio mascot. Poses are prerendered by scripts/render-bean.mjs. */
export type BeanPose = keyof typeof registry.poses;
type BeanImage = { src: string; width: number; height: number };

export const BEAN = Object.fromEntries(
  Object.keys(registry.poses).map((k) => [k, { src: `/bean/${k}.webp`, width: registry.size.w, height: registry.size.h }]),
) as Record<BeanPose, BeanImage>;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True once the page has loaded and gone idle, so extra poses never compete with the first paint. */
function useAfterLoad() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idle = 0;
    const go = () => {
      idle =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(() => setReady(true), { timeout: 2500 })
          : (globalThis.setTimeout(() => setReady(true), 300) as unknown as number);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      else globalThis.clearTimeout(idle);
    };
  }, []);
  return ready;
}

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

// Live Bean (bean-live.ts, three.js) only after load and the first real
// input, so it never competes with the first paint and Lighthouse never sees
// it. Reduced motion, Save-Data, no WebGL or a failed chunk: the stills stay.
const INPUTS = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;
let engine: Promise<typeof import("./bean-live") | null> | undefined;
function loadLive() {
  return (engine ??= Promise.all([
    new Promise<void>((r) => (document.readyState === "complete" ? r() : addEventListener("load", () => r(), { once: true }))),
    new Promise<void>((r) => {
      const go = () => {
        INPUTS.forEach((ev) => removeEventListener(ev, go));
        r();
      };
      INPUTS.forEach((ev) => addEventListener(ev, go, { passive: true }));
    }),
  ])
    .then(() => (canLive() ? import("./bean-live") : null))
    .catch(() => null));
}
function canLive() {
  if (reducedMotion() || (navigator as { connection?: { saveData?: boolean } }).connection?.saveData) return false;
  const gl = document.createElement("canvas").getContext("webgl2");
  gl?.getExtension("WEBGL_lose_context")?.loseContext();
  return !!gl;
}

/** still: the WebP stack. mounting: canvas drawn under it. live: canvas faded in over it. */
type LiveState = "still" | "mounting" | "live";
type Live = { state: LiveState; canvas: (el: HTMLCanvasElement | null) => void };

/** Brings a spot's Bean to life once allowed. `hop` changes replay the source's hop. */
export function useLiveBean({ pose, hop = 0, follow, doze }: { pose: BeanPose; hop?: number; follow?: Follow; doze?: boolean }): Live {
  const [state, setState] = useState<LiveState>("still");
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const bean = useRef<LiveBean | null>(null);
  const spec = useRef({ pose, follow, doze, hop });
  useEffect(() => {
    spec.current = { pose, follow, doze, hop };
  });
  useEffect(() => {
    let on = true;
    loadLive().then((mod) => {
      if (on && mod) setState("mounting");
    });
    return () => {
      on = false;
    };
  }, []);
  useEffect(() => {
    if (!canvas) return;
    let on = true;
    loadLive().then((mod) => {
      if (!on || !mod) return;
      const { pose, doze } = spec.current;
      bean.current = mod.mountBean(
        canvas,
        { pose, doze, follow: (t) => spec.current.follow?.(t) ?? null },
        { shown: () => setState("live"), failed: () => setState("still") },
      );
      if (!bean.current) setState("still");
      // A hop asked for before the chunk arrived (the final cheer, or a click that was
      // the first input) still plays once Bean is live.
      else if (spec.current.hop) bean.current.hop();
    });
    return () => {
      on = false;
      bean.current?.dispose();
      bean.current = null;
    };
  }, [canvas]);
  useEffect(() => {
    bean.current?.set(pose);
  }, [pose]);
  useEffect(() => {
    if (hop) bean.current?.hop();
  }, [hop]);
  return { state, canvas: setCanvas };
}

/**
 * Every pose this spot can show, stacked; the current one is opaque. Changing
 * pose is an opacity crossfade, so a fast scroll just retargets it. A live
 * Bean, once allowed, fades in over the stack on a canvas framed like the stills.
 */
export function BeanStack({
  poses,
  pose,
  eager = [],
  live = "still",
  liveRef,
}: {
  poses: readonly BeanPose[];
  pose: BeanPose;
  eager?: readonly BeanPose[];
  live?: LiveState;
  liveRef?: Live["canvas"];
}) {
  return (
    <span
      className={s.beanStack}
      style={{ aspectRatio: `${registry.size.w} / ${registry.size.h}` }}
      data-live={live === "live" || undefined}
    >
      {[...new Set(poses)].map((p) => (
        <Image
          key={p}
          {...BEAN[p]}
          alt=""
          unoptimized
          data-pose={p}
          data-on={p === pose || undefined}
          loading={eager.includes(p) ? "eager" : "lazy"}
          fetchPriority={eager.includes(p) ? "low" : undefined}
        />
      ))}
      {live !== "still" ? <canvas ref={liveRef} className={s.beanLive} /> : null}
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
  follow,
}: {
  say: readonly string[];
  label: string;
  pose: BeanPose;
  poses: readonly BeanPose[];
  eager?: readonly BeanPose[];
  follow?: Follow;
}) {
  const [st, send] = useReducer(speech, { phase: "idle", n: 0 });
  const speaking = st.phase === "speaking";
  const live = useLiveBean({ pose: speaking ? "hi" : pose, hop: st.n, follow, doze: true });
  // "hi" is only needed after a click: fetch it once the page is idle.
  const loaded = useAfterLoad();
  const withHi = loaded || st.n > 0;
  useEffect(() => {
    if (st.phase !== "speaking") return;
    const t = window.setTimeout(() => send("done"), SPEAK_MS);
    return () => window.clearTimeout(t);
  }, [st]);

  return (
    <>
      <button type="button" className={s.beanBtn} aria-label={label} onClick={() => send("click")}>
        {/* Live, the source's own hop replaces the CSS bounce. */}
        <span className={s.beanBounce} data-b={st.n === 0 || live.state === "live" ? undefined : st.n % 2}>
          <span className={s.beanClip}>
            <BeanStack poses={withHi ? [...poses, "hi"] : poses} pose={speaking ? "hi" : pose} eager={eager} live={live.state} liveRef={live.canvas} />
          </span>
        </span>
      </button>
      <span className={s.beanSay} data-on={speaking || undefined} aria-hidden>
        {say.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </span>
      {/* The trailing space flips per click, so a repeat click is announced again. */}
      <span className={s.srOnly} aria-live="polite">
        {speaking ? say.join(" ") + (st.n % 2 ? "\u00a0" : "") : ""}
      </span>
    </>
  );
}

const READ_S = 1.1; // as long as the prompt takes to type itself
const AHEAD_S = 1.4;

/**
 * Live hero Bean's eyes: on the caret while the prompt types; if it came alive
 * after the typing, it reads the line once, left to right. Then it looks at
 * the visitor before the pointer takes over.
 */
function readAlong(root: HTMLElement): Follow {
  let from: number | undefined;
  let sawTyping = false;
  return (t) => {
    const typed = root.parentElement?.querySelector<HTMLElement>(`.${CSS.escape(s.typed)}`);
    if (!typed) return null;
    const r = typed.getBoundingClientRect();
    const y = r.top + r.height / 2;
    if (typed.getAnimations().some((a) => a.playState === "running")) {
      sawTyping = true;
      return { x: r.right, y };
    }
    from ??= sawTyping ? t - READ_S : t;
    const k = (t - from) / READ_S;
    if (k < 1) return { x: r.left + r.width * k, y };
    return t - from < READ_S + AHEAD_S ? "ahead" : null;
  };
}

/** A · Hero: reads the prompt while it types, says hi when clicked. */
export function HeroBean({ say }: { say: readonly string[] }) {
  const [root, setRoot] = useState<HTMLSpanElement | null>(null);
  const follow = useMemo(() => (root ? readAlong(root) : undefined), [root]);
  return (
    <span ref={setRoot} className={`${s.bean} ${s.heroBean}`}>
      <TalkingBean
        say={say}
        label="Say hi to Bean"
        pose="idle"
        poses={["idle", "read"]}
        eager={["idle", "read"]}
        follow={follow}
      />
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
      <TalkingBean say={say} label="Ask Bean for help" pose={phase === "hi" ? "hi" : "curious"} poses={["curious", "hi"]} />
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
  const live = useLiveBean({ pose: "cheer", hop: phase === "party" ? 1 : 0 });
  useEffect(() => {
    if (phase !== "party") return;
    const t = window.setTimeout(() => setPhase("done"), CONFETTI_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  return (
    <span ref={ref} className={`${s.bean} ${s.finalBean}`} data-phase={phase} aria-hidden>
      <BeanStack poses={["cheer"]} pose="cheer" live={live.state} liveRef={live.canvas} />
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
