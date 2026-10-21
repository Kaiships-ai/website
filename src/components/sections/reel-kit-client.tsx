"use client";

import { useEffect, useRef, useState } from "react";

/** Muted looping 9:16 reel tile. `sound` adds a tap-for-sound pill. */
export function PhoneVideo({
  src,
  poster,
  label,
  sound = false,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  sound?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Only play while on screen: saves data on phones and keeps the page smooth.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className="block aspect-[9/16] w-full bg-sunk object-cover"
      />
      {sound ? (
        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-3 left-1/2 min-h-11 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-surface px-4 text-sm font-semibold text-ink shadow-card"
        >
          {muted ? "🔊 Tap for sound" : "🔇 Mute"}
        </button>
      ) : null}
    </div>
  );
}

/** Mobile-only buy bar that slides in once the hero is off screen. */
export function StickyBuy({ href, price }: { href: string; price: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const pricing = document.getElementById("pricing");
      const nearPricing = pricing ? pricing.getBoundingClientRect().top < window.innerHeight && pricing.getBoundingClientRect().bottom > 0 : false;
      setShow(window.scrollY > 700 && !nearPricing);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-3 bottom-3 z-40 transition-all duration-300 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        className="flex min-h-14 items-center justify-between rounded-card-lg border border-space-line bg-space px-5 text-space-ink shadow-card"
      >
        <span className="text-base font-semibold">Buy Pro PreOrder</span>
        <span className="rounded-lg bg-accent px-3 py-1 text-base font-semibold text-accent-on">{price}</span>
      </a>
    </div>
  );
}
