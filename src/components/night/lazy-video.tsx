"use client";

import { useEffect, useRef, useState } from "react";
import s from "./night.module.css";

type Source = { src: string; media?: string };

/**
 * A normal <video controls> that waits until it is near the screen before it
 * asks for its poster and metadata, so below-the-fold players don't compete
 * with the first paint. Never autoplays; the visitor presses play, with sound.
 * Several sources: the browser takes the first whose `media` matches (sharp
 * 1440p on wide screens, a lighter 720p on phones).
 */
export function LazyVideo({
  sources,
  poster,
  width,
  height,
  label,
  playLabel,
}: {
  sources: readonly Source[];
  poster: string;
  width: number;
  height: number;
  label: string;
  /** Big play button over the poster; the visitor still starts it, with sound. */
  playLabel?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const video = (
    <video
      ref={ref}
      controls
      playsInline
      preload="metadata"
      poster={near ? poster : undefined}
      width={width}
      height={height}
      aria-label={label}
      onPlay={() => setStarted(true)}
    >
      {near
        ? sources.map((x) => <source key={x.src} src={x.src} media={x.media} type="video/mp4" />)
        : null}
    </video>
  );
  if (!playLabel) return video;
  return (
    <div className={s.vwrap}>
      {video}
      {started ? null : (
        <button type="button" className={s.playBig} onClick={() => ref.current?.play().catch(() => {})}>
          <i aria-hidden />
          <span>{playLabel}</span>
        </button>
      )}
    </div>
  );
}
