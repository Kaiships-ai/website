"use client";

import { useEffect, useRef, useState } from "react";

/** Muted looping reel in a hand-drawn phone. `sound` adds a tap-for-sound pill. */
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
    <div className={`phone relative ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className="block aspect-[9/16] w-full bg-paper-2 object-cover"
      />
      {sound ? (
        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-ink bg-cream px-4 py-1.5 text-sm font-extrabold text-ink shadow-[3px_3px_0_var(--ink)]"
        >
          {muted ? "🔊 Tap for sound" : "🔇 Mute"}
        </button>
      ) : null}
    </div>
  );
}

/** Prompt picker: tabs with the README prompts, copy to clipboard. */
export function PromptPicker({
  prompts,
}: {
  prompts: readonly { tab: string; text: string }[];
}) {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompts[i].text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div>
      <div role="tablist" aria-label="Example prompts" className="flex flex-wrap gap-2">
        {prompts.map((p, k) => (
          <button
            key={p.tab}
            role="tab"
            aria-selected={k === i}
            type="button"
            onClick={() => {
              setI(k);
              setCopied(false);
            }}
            className={`rounded-xl border-2 border-ink px-3.5 py-1.5 text-sm font-extrabold transition-colors ${
              k === i ? "bg-ink text-ochre" : "bg-cream text-ink hover:bg-paper-2"
            }`}
          >
            {p.tab}
          </button>
        ))}
      </div>
      <div className="sketch mt-4 p-5 sm:p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink-2">
          You paste into Claude Code
        </p>
        <p key={i} className="type-in mt-3 min-h-[5.5rem] text-lg font-semibold leading-relaxed text-ink sm:text-xl">
          <span className="text-accent-ink">&gt; </span>
          {prompts[i].text}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copy}
            className="rounded-xl border-2 border-ink bg-accent px-4 py-2 text-sm font-extrabold text-cream shadow-[3px_3px_0_var(--ink)]"
          >
            {copied ? "✓ Copied" : "Copy prompt"}
          </button>
          <p className="text-sm text-ink-2">
            Claude writes the script, voices it, paints it, adds captions and music.
          </p>
        </div>
      </div>
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
        className="flex items-center justify-between rounded-2xl border-[2.5px] border-ink bg-ink px-5 py-3 text-cream shadow-[4px_5px_0_var(--accent)]"
      >
        <span className="text-base font-extrabold">Get the Reel Kit</span>
        <span className="rounded-lg bg-accent px-3 py-1 text-base font-extrabold">{price}</span>
      </a>
    </div>
  );
}
