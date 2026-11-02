"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A normal <video controls> that waits until it is near the screen before it
 * asks for its poster and metadata, so below-the-fold players don't compete
 * with the first paint. Never autoplays; the visitor presses play, with sound.
 */
export function LazyVideo({
  src,
  poster,
  width,
  height,
  label,
}: {
  src: string;
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
      {near ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
