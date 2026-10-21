"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PackForm } from "@/components/pack-form";

const DISMISS_KEY = "kaiships-exit-intent-dismissed";

/**
 * Exit-intent popup: fires once per session when the cursor leaves the
 * top of the viewport. Site-wide except /pack (per spec) and the /get/*
 * gift pages, which already show the email form. Desktop only —
 * there is no reliable exit signal on touch.
 */
export function ExitIntent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/pack" || pathname.startsWith("/get/")) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget || e.clientY > 0) return;
      sessionStorage.setItem(DISMISS_KEY, "1");
      setOpen(true);
      document.removeEventListener("mouseout", onMouseOut);
    };
    document.addEventListener("mouseout", onMouseOut);
    return () => document.removeEventListener("mouseout", onMouseOut);
  }, [pathname]);

  if (!open || pathname === "/pack" || pathname.startsWith("/get/")) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="relative w-full max-w-md rounded-card-lg border border-line bg-surface p-6 shadow-[0_24px_80px_-24px_rgba(20,18,16,0.5)] sm:p-8">
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-sunk hover:text-ink"
        >
          ✕
        </button>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          {"//"} before you go
        </p>
        <h2
          id="exit-intent-title"
          className="mt-3 font-display text-xl font-bold text-ink"
        >
          Grab the free Claude Code starter pack.
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          A starter CLAUDE.md, model-routing config, 18 tested skills + 4
          subagents. Sent by email.
        </p>
        <div className="mt-4">
          <PackForm compact />
        </div>
      </div>
    </div>
  );
}
