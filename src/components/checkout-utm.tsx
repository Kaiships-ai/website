"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * Carries utm_source / utm_campaign from the landing URL to Polar checkout links.
 * Polar copies these query params into the checkout session metadata, so each
 * order shows which reel/email sold it. Stored in sessionStorage so they survive
 * in-site navigation. No visual output.
 */
const KEYS = ["utm_source", "utm_campaign"] as const;

function read(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function CheckoutUtm() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    for (const k of KEYS) {
      const v = params.get(k);
      if (v) {
        try {
          sessionStorage.setItem(k, v);
        } catch {}
      }
    }

    const onClick = (e: Event) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='buy.polar.sh']") as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href);
      for (const k of KEYS) {
        const v = read(k);
        if (v && !url.searchParams.has(k)) url.searchParams.set(k, v);
      }
      a.href = url.toString();
      const data: Record<string, string> = { path: window.location.pathname };
      for (const k of KEYS) {
        const v = url.searchParams.get(k);
        if (v) data[k] = v;
      }
      track("checkout_click", data);
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);
  return null;
}
