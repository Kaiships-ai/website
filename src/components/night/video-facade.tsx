"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { track } from "@/lib/track";
import s from "./night.module.css";

type Source = { src: string; media?: string };
export type Poster = { src: string; srcSet: string; width: number; height: number };

/**
 * A poster and one play control, server-rendered: no video bytes, no native
 * controls and no extra tab stops until the visitor presses play. Without
 * JavaScript the control is a plain link to the MP4. With it, the press mounts
 * <video controls> and starts it inside the same gesture, so sound is allowed.
 * Several sources: the browser takes the first whose `media` matches.
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
  const [on, setOn] = useState(false);
  const [posterSrc, setPosterSrc] = useState<string>();
  const img = useRef<HTMLImageElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  if (on) {
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
        // One player at a time: starting this one pauses any other.
        onPlay={(e) => document.querySelectorAll("video[controls]").forEach((v) => v !== e.currentTarget && (v as HTMLVideoElement).pause())}
      >
        {sources.map((x) => (
          <source key={x.src} src={x.src} media={x.media} type="video/mp4" />
        ))}
      </video>
    );
  }

  return (
    <a
      className={s.facade}
      href={sources[sources.length - 1].src}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        // Keyboard presses target the link itself, which Umami ignores (see the span).
        if (e.detail === 0) track(event);
        flushSync(() => {
          setPosterSrc(img.current?.currentSrc || undefined);
          setOn(true);
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
    </a>
  );
}
