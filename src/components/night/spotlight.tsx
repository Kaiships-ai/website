"use client";

import { useEffect, useRef } from "react";
import s from "./night.module.css";

/**
 * Decorative light that follows the pointer over the hero. A damped spring
 * (no bounce) chases the pointer, so it keeps its velocity when the pointer
 * changes direction. Fine pointers only; off for reduced motion.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const hero = el?.parentElement;
    if (!el || !hero) return;

    let x = hero.clientWidth / 2;
    let y = 420;
    let tx = x;
    let ty = y;
    let vx = 0;
    let vy = 0;
    let raf = 0;
    const place = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    place();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;

    // stiffness 170, damping 26: settles in ~0.4 s without overshoot.
    const k = 170;
    const c = 26;
    let last = 0;
    const tick = (t: number) => {
      const dt = Math.min((t - (last || t)) / 1000, 1 / 30);
      last = t;
      vx += (k * (tx - x) - c * vx) * dt;
      vy += (k * (ty - y) - c * vy) * dt;
      x += vx * dt;
      y += vy * dt;
      place();
      const resting = Math.abs(tx - x) < 0.5 && Math.abs(ty - y) < 0.5 && Math.abs(vx) + Math.abs(vy) < 1;
      raf = resting ? 0 : requestAnimationFrame(tick);
      if (resting) last = 0;
    };
    const onMove = (e: PointerEvent) => {
      // The light shows up once the pointer moves: feedback, not decoration at rest.
      el.dataset.on = "";
      const r = hero.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    hero.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      hero.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className={s.spot} aria-hidden />;
}
