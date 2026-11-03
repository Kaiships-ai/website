import { WebGLRenderer, type PerspectiveCamera, type Scene } from "three";
import type { BeanPose } from "./bean";
import { Mascot, makeCam, makeScene, type MascotExpr, type MascotPose } from "./bean-mascot.gen";
import registry from "./bean-poses.json";

/**
 * Live Bean: the lead studio Mascot, drawn over the still it replaces. One
 * shared WebGL renderer draws every Bean on screen and copies each frame into
 * that Bean's own 2D canvas (the source's miniR + renderMinis pattern). This
 * module is its own chunk; bean.tsx loads it only after load and first input.
 */
type Point = { x: number; y: number };
/** Where a Bean looks instead of the pointer: a screen point, straight ahead, or nothing to say. */
export type Follow = (t: number) => Point | "ahead" | null;
export type LiveSpec = { pose: BeanPose; follow?: Follow; doze?: boolean };
export type LiveBean = { set(pose: BeanPose): void; hop(): void; dispose(): void };
type Hooks = { shown(): void; failed(): void };

type Look = { pose: MascotPose; expr: MascotExpr; gaze?: Point };
const LOOKS = registry.poses as Record<BeanPose, Look>;
const DOZING: Look = { pose: "floating", expr: "sleeping" };
const F = registry.frame;
// The canvas overhangs the still's box (fractions of it) so hops and squashes never clip.
const PAD = { t: 0.3, r: 0.08, b: 0.02, l: 0.08 };
const AHEAD: Point = { x: 0, y: 0 };
const REACH = 320; // px from Bean at which the eyes reach their corner
const MOUSE_HOLD = 2.5; // s the eyes stay on a resting mouse, as in the source
const TAP_HOLD = 1.2; // s a tap holds a glance
const DOZE_AFTER = 20; // s without any input

type Spot = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  spec: LiveSpec;
  hooks: Hooks;
  pose: BeanPose;
  visible: boolean;
  sized: boolean;
  hovered: boolean;
  // Built on the first visible frame, so the live Bean starts exactly on its still.
  m?: { mascot: Mascot; scene: Scene; cam: PerspectiveCamera; last: number };
};

const spots = new Map<HTMLCanvasElement, Spot>();
const input = { at: now(), point: null as Point | null, pointAt: -99, touch: false };
let renderer: WebGLRenderer | null = null;
let broken = false;
let bufW = 1;
let bufH = 1;
let raf = 0;

function now() {
  return performance.now() / 1000;
}
const clamp = (v: number) => Math.max(-1, Math.min(1, v));

function gaze(spot: Spot, t: number): Point {
  const f = spot.spec.follow?.(t) ?? null;
  const held = t - input.pointAt < (input.touch ? TAP_HOLD : MOUSE_HOLD);
  const p = f ?? (held ? input.point : null);
  if (p === "ahead" || !p) return LOOKS[spot.pose].gaze ?? AHEAD;
  const r = spot.canvas.parentElement!.getBoundingClientRect();
  return { x: clamp((p.x - (r.left + r.width / 2)) / REACH), y: clamp(-(p.y - (r.top + r.height * 0.45)) / REACH) };
}

function look(spot: Spot, t: number): Look {
  return spot.spec.doze && t - input.at > DOZE_AFTER ? DOZING : LOOKS[spot.pose];
}

function build(spot: Spot, t: number) {
  const box = spot.canvas.parentElement!.getBoundingClientRect();
  const mascot = new Mascot({ faceSize: box.width > 90 ? 512 : 256 });
  const l = look(spot, t);
  mascot.s.pose = l.pose;
  mascot.s.expr = l.expr;
  // ft = t + seed is 0 on this frame, the phase the stills were rendered at.
  mascot.seed = -t;
  mascot.nextBlink = t + 1 + Math.random() * 3;
  mascot.gazeTarget = l.gaze ?? AHEAD;
  // A long step settles the eyes, turn and tilt on the still's values.
  mascot.update(t, 10);
  const cam = makeCam(F.camZ, F.lookY);
  const { x, y, w, h } = F.crop;
  cam.setViewOffset(F.canvas, F.canvas, x - PAD.l * w, y - PAD.t * h, w * (1 + PAD.l + PAD.r), h * (1 + PAD.t + PAD.b));
  spot.m = { mascot, scene: makeScene(mascot), cam, last: t };
}

function draw(spot: Spot, t: number) {
  if (!spot.m) build(spot, t);
  const { mascot, scene, cam } = spot.m!;
  const l = look(spot, t);
  mascot.setPose(l.pose);
  mascot.setExpr(l.expr);
  mascot.gazeTarget = gaze(spot, t);
  if (spot.hovered) mascot.happyUntil = Math.max(mascot.happyUntil, t + 0.25);
  mascot.update(t, Math.min(0.05, t - spot.m!.last));
  spot.m!.last = t;

  const { width: w, height: h } = spot.canvas;
  if (w > bufW || h > bufH) {
    bufW = Math.max(bufW, w);
    bufH = Math.max(bufH, h);
    renderer!.setSize(bufW, bufH, false);
  }
  renderer!.setViewport(0, 0, w, h);
  renderer!.render(scene, cam);
  spot.ctx.clearRect(0, 0, w, h);
  spot.ctx.drawImage(renderer!.domElement, 0, bufH - h, w, h, 0, 0, w, h);
}

function frame(ms: number) {
  raf = 0;
  const t = ms / 1000;
  try {
    for (const spot of spots.values()) {
      if (!spot.visible || !spot.sized) continue;
      const first = !spot.m;
      draw(spot, t);
      if (first) spot.hooks.shown();
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") console.error(e);
    fail();
    return;
  }
  schedule();
}

function schedule() {
  if (raf || document.hidden || ![...spots.values()].some((s) => s.visible)) return;
  raf = requestAnimationFrame(frame);
}

/** Back to the stills for good: lost context, reduced motion turned on, or a frame threw. */
function fail() {
  broken = true;
  cancelAnimationFrame(raf);
  raf = 0;
  for (const spot of [...spots.values()]) spot.hooks.failed();
  spots.clear();
  renderer?.dispose();
  renderer = null;
}

const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      const spot = spots.get(e.target as HTMLCanvasElement);
      if (spot) spot.visible = e.isIntersecting;
    }
    schedule();
  },
  { rootMargin: "120px" },
);
const ro = new ResizeObserver((entries) => {
  const dpr = Math.min(devicePixelRatio, 2);
  for (const e of entries) {
    const spot = spots.get(e.target as HTMLCanvasElement);
    if (!spot) continue;
    spot.canvas.width = Math.max(2, Math.round(spot.canvas.clientWidth * dpr));
    spot.canvas.height = Math.max(2, Math.round(spot.canvas.clientHeight * dpr));
    spot.sized = true;
  }
  schedule();
});

const wake = () => {
  input.at = now();
};
const opts = { passive: true };
addEventListener("pointermove", (e) => {
  if (e.pointerType === "touch") return;
  wake();
  input.point = { x: e.clientX, y: e.clientY };
  input.pointAt = input.at;
  input.touch = false;
}, opts);
addEventListener("pointerdown", (e) => {
  wake();
  input.point = { x: e.clientX, y: e.clientY };
  input.pointAt = input.at;
  input.touch = e.pointerType === "touch";
}, opts);
for (const ev of ["keydown", "wheel", "scroll", "touchstart"]) addEventListener(ev, wake, opts);
document.documentElement.addEventListener("pointerleave", () => {
  input.point = null;
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(raf);
    raf = 0;
  } else schedule();
});
matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) => {
  if (e.matches) fail();
});

function ensureRenderer() {
  if (renderer || broken) return renderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  } catch {
    broken = true;
    return null;
  }
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.addEventListener("webglcontextlost", fail);
  return renderer;
}

/** Brings the Bean whose still sits in `canvas`'s parent to life. Null: stay still. */
export function mountBean(canvas: HTMLCanvasElement, spec: LiveSpec, hooks: Hooks): LiveBean | null {
  const ctx = canvas.getContext("2d");
  if (!ctx || !ensureRenderer()) return null;
  Object.assign(canvas.style, {
    left: `${-PAD.l * 100}%`,
    top: `${-PAD.t * 100}%`,
    width: `${(1 + PAD.l + PAD.r) * 100}%`,
    height: `${(1 + PAD.t + PAD.b) * 100}%`,
  });
  const spot: Spot = { canvas, ctx, spec, hooks, pose: spec.pose, visible: false, sized: false, hovered: false };
  const btn = canvas.closest("button");
  const enter = (e: PointerEvent) => {
    spot.hovered = e.pointerType === "mouse";
  };
  const leave = () => {
    spot.hovered = false;
  };
  btn?.addEventListener("pointerenter", enter);
  btn?.addEventListener("pointerleave", leave);
  spots.set(canvas, spot);
  io.observe(canvas);
  ro.observe(canvas);
  return {
    set(pose) {
      spot.pose = pose;
    },
    hop() {
      spot.m?.mascot.bounce();
    },
    dispose() {
      spots.delete(canvas);
      io.unobserve(canvas);
      ro.unobserve(canvas);
      btn?.removeEventListener("pointerenter", enter);
      btn?.removeEventListener("pointerleave", leave);
    },
  };
}
