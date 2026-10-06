"use client";

import { createContext, useContext, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { track } from "@/lib/track";

const KEY = "ks_lib";
type Ctx = { unlocked: boolean; unlock: () => void };
const LockCtx = createContext<Ctx>({ unlocked: false, unlock: () => {} });

function readUnlocked(): boolean {
  try {
    if (document.cookie.split("; ").some((c) => c === `${KEY}=1`)) return true;
  } catch {}
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function UnlockProvider({ children }: { children: ReactNode }) {
  const unlocked = useSyncExternalStore(
    (cb) => {
      window.addEventListener("ks_lib_change", cb);
      return () => window.removeEventListener("ks_lib_change", cb);
    },
    readUnlocked,
    () => false,
  );
  const unlock = () => {
    try {
      document.cookie = `${KEY}=1; max-age=315360000; path=/; samesite=lax`;
    } catch {}
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
      window.dispatchEvent(new Event("ks_lib_change"));
  };
  return <LockCtx.Provider value={{ unlocked, unlock }}>{children}</LockCtx.Provider>;
}

/** "(locked)" marker for the contents list. */
export function LockedTag() {
  const { unlocked } = useContext(LockCtx);
  return unlocked ? null : <span className="text-ink-2"> (locked)</span>;
}

/** Server-rendered sections 2+; hidden until unlocked. */
export function LockedBody({ children }: { children: ReactNode }) {
  const { unlocked } = useContext(LockCtx);
  return <div hidden={!unlocked}>{children}</div>;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
function readUtm(): Record<string, string> {
  return Object.fromEntries(
    UTM_KEYS.map((k) => {
      try {
        return [k, sessionStorage.getItem(k) ?? ""];
      } catch {
        return [k, ""];
      }
    }),
  );
}

export function GateCard({ slug, more }: { slug: string; more: number }) {
  const { unlocked, unlock } = useContext(LockCtx);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  if (unlocked) return null;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `guide:${slug}`, utm: readUtm() }),
      });
      if (res.ok) {
        unlock();
        track("guide_unlock", { slug });
        return;
      }
      const data = await res.json().catch(() => ({}));
      setStatus("error");
      setError(
        data.error === "invalid_email"
          ? "That email doesn't look right — check the address."
          : "Something broke on my end. Try again in a minute.",
      );
    } catch {
      setStatus("error");
      setError("Network hiccup — try again.");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 rounded-2xl border-[2.5px] border-ink bg-cream p-6 shadow-[4px_5px_0_var(--ink)]"
    >
      <h2 className="text-2xl font-semibold text-ink">Free, for an email.</h2>
      <p className="mt-2 text-base leading-relaxed text-ink-2">
        Unlocks {more} more sections and every other guide on the site. Enter your email once to keep reading.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="guide-email">Email address</label>
        <input
          id="guide-email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full rounded-2xl border-[2.5px] border-ink bg-white px-5 py-3 text-base text-ink placeholder:text-ink-2/60 focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-2xl border-[2.5px] border-ink bg-accent px-6 py-3 text-base font-semibold text-cream shadow-[4px_5px_0_var(--ink)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Unlock everything"}
        </button>
      </div>
      {status === "error" ? (
        <p role="alert" className="mt-3 text-sm text-accent-ink">{error}</p>
      ) : null}
      <p className="mt-4 text-sm text-ink-2">
        From the reels on @kaiships.ai: 22 reels, 207K views (Oct 4, 2026). No spam. Unsubscribe in one click.
      </p>
    </form>
  );
}
