"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteConfig } from "@/lib/site.config";
import s from "./night.module.css";

type Props = { reels: SiteConfig["studio"]["reels"]; source: string };

/**
 * Reels that exist, on a slow loop. Each reel shows its poster first; the
 * muted video loads and plays only while that reel is on screen. A pause
 * button stops the loop and the videos (WCAG 2.2.2). Reduced motion: no loop,
 * no autoplay, posters you can scroll sideways.
 */
export function ReelStrip({ reels, source }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Posters only on Save-Data; videos start after the page has loaded.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const videos = [...row.querySelectorAll<HTMLVideoElement>("video[data-src]")];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting && !pausedRef.current) {
            if (!v.src) v.src = v.dataset.src!;
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { rootMargin: "0px 120px" },
    );
    let idle = 0;
    const observe = () => videos.forEach((v) => io.observe(v));
    const start = () => {
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(observe, { timeout: 2500 });
      else idle = globalThis.setTimeout(observe, 300) as unknown as number;
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      else globalThis.clearTimeout(idle);
      io.disconnect();
    };
  }, []);

  const toggle = useCallback(() => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setPaused(next);
    const row = rowRef.current;
    if (!row) return;
    row.querySelectorAll<HTMLVideoElement>("video").forEach((v) => {
      if (next) v.pause();
      else if (v.src) {
        const r = v.getBoundingClientRect();
        if (r.right > 0 && r.left < window.innerWidth) v.play().catch(() => {});
      }
    });
  }, []);

  const group = (hidden: boolean) => (
    <ul className={s.group} aria-hidden={hidden || undefined}>
      {reels.map((r) => (
        <li key={r.id} className={s.reel}>
          <Image src={r.poster} alt="" fill sizes="(max-width: 900px) 150px, 220px" />
          <video
            data-src={r.video}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            tabIndex={-1}
            onPlaying={(e) => (e.currentTarget.dataset.ready = "true")}
          />
          <span className={s.tag}>{r.tag}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div
        ref={rowRef}
        className={`${s.row} ${s.enter} ${paused ? s.paused : ""}`}
        style={{ "--d": 5 } as React.CSSProperties}
        role="region"
        aria-label="Reels that exist"
      >
        <div className={s.track}>
          {group(false)}
          {group(true)}
        </div>
      </div>
      <div className={s.rowFoot}>
        <button
          type="button"
          className={s.pause}
          onClick={toggle}
          aria-pressed={paused}
          aria-label={paused ? "Play the moving reels" : "Pause the moving reels"}
        >
          {paused ? (
            <svg viewBox="0 0 14 14" aria-hidden>
              <path d="M3 1.5v11l9-5.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 14 14" aria-hidden>
              <rect x="2.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
              <rect x="8.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
            </svg>
          )}
        </button>
        <p className={s.src}>{source}</p>
      </div>
    </>
  );
}
