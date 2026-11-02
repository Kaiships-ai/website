"use client";

import { useEffect, useRef, useState } from "react";

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
}: {
  sources: readonly Source[];
  poster: string;
  width: number;
  height: number;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

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

  return (
    <video
      ref={ref}
      controls
      playsInline
      preload="metadata"
      poster={near ? poster : undefined}
      width={width}
      height={height}
      aria-label={label}
    >
      {near
        ? sources.map((x) => <source key={x.src} src={x.src} media={x.media} type="video/mp4" />)
        : null}
    </video>
  );
}
