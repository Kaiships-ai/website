"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { track } from "@/lib/track";
import s from "./night.module.css";
import f from "./video-facade.module.css";

type Source = { src: string; media?: string };
export type Poster = { src: string; srcSet: string; width: number; height: number };

/** poster: nothing loaded yet. video: <video controls> mounted. failed: back on the poster, saying so. */
type Phase = "poster" | "video" | "failed";

/**
 * A poster and one play control, server-rendered: no video bytes, no native
 * controls and no extra tab stops until the visitor presses play. Without
 * JavaScript the control is a plain link to the MP4. With it, the press mounts
 * <video controls> and starts it inside the same gesture, so sound is allowed.
 * Several sources: the browser takes the first whose `media` matches.
 * A playing video pauses when it leaves the screen or the tab hides; one that
 * cannot load goes back to its poster with a short note, and play retries.
 */
export function VideoFacade({
  sources,
  poster,
  sizes,
  label,
  playLabel,
  event,
  iconOnly = false,
}: {
  sources: readonly Source[];
  poster: Poster;
  sizes: string;
  label: string;
  playLabel: string;
  event: string;
  iconOnly?: boolean;
}) {
  const [phase, setPhase] = useState<Phase>("poster");
  const [posterSrc, setPosterSrc] = useState<string>();
  const img = useRef<HTMLImageElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const link = useRef<HTMLAnchorElement>(null);

  // The failed player unmounts with focus inside it: hand focus back to play.
  useEffect(() => {
    if (phase === "failed") link.current?.focus();
  }, [phase]);

  useEffect(() => {
    const v = video.current;
    if (phase !== "video" || !v) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) v.pause();
    });
    io.observe(v);
    const onHide = () => {
      if (document.hidden) v.pause();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [phase]);

  if (phase === "video") {
    const failed = () => setPhase("failed");
    return (
      <video
        ref={video}
        controls
        autoPlay
        playsInline
        poster={posterSrc}
        width={poster.width}
        height={poster.height}
        aria-label={label}
        onError={failed}
        // One player at a time: starting this one pauses any other.
        onPlay={(e) => document.querySelectorAll("video[controls]").forEach((v) => v !== e.currentTarget && (v as HTMLVideoElement).pause())}
      >
        {sources.map((x, i) => (
          // A source's error only means the browser tries the next; the last one failing means none loaded.
          <source key={x.src} src={x.src} media={x.media} type="video/mp4" onError={i === sources.length - 1 ? failed : undefined} />
        ))}
      </video>
    );
  }

  return (
    <a
      ref={link}
      className={s.facade}
      href={sources[sources.length - 1].src}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        // Keyboard presses target the link itself, which Umami ignores (see the span).
        if (e.detail === 0) track(event);
        flushSync(() => {
          setPosterSrc(img.current?.currentSrc || undefined);
          setPhase("video");
        });
        video.current?.play().catch(() => {});
        video.current?.focus();
      }}
    >
      {/* Umami turns a click on an <a data-umami-event> into a page load of its
          href (the MP4), so the event name sits on this inner span instead. */}
      <span className={s.facadeIn} data-umami-event={event}>
        <picture>
          <source type="image/webp" srcSet={poster.srcSet} sizes={sizes} />
          <img ref={img} src={poster.src} width={poster.width} height={poster.height} alt="" loading="lazy" decoding="async" />
        </picture>
        <span className={`${s.playBig} ${iconOnly ? s.playIcon : ""}`}>
          <i aria-hidden />
          <span>{playLabel}</span>
        </span>
      </span>
      <span className={f.note} role="status">
        {phase === "failed" ? "The video didn't load. Press play to try again." : ""}
      </span>
    </a>
  );
}
