"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { track } from "@/lib/track";

type Status = "idle" | "loading" | "success" | "error";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

/** utm saved by CheckoutUtm on landing; empty strings when storage is blocked. */
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

export function GiftForm({
  slug,
  url,
  cta,
  hideKitLine = false,
}: {
  slug: string;
  url: string;
  cta?: string;
  hideKitLine?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: slug, utm: readUtm() }),
      });
      if (res.ok) {
        setStatus("success");
        track("gift_signup", { slug });
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

  if (status === "success") {
    return (
      <div role="status">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-success-ink">✓ saved</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center rounded-2xl border-[2.5px] border-ink bg-accent px-6 py-4 text-lg font-semibold text-cream shadow-[4px_5px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
        >
          {cta ?? "Open the guide →"}
        </a>
        {hideKitLine ? null : (
        <p className="mt-6 text-sm leading-relaxed text-ink-2">
          Want reels like the one you just watched? They&apos;re made with one prompt.{" "}
          <Link
            href="/#pricing"
            className="font-medium text-accent-ink underline underline-offset-2"
          >
            See the Reel Kit
          </Link>
        </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        <label className="sr-only" htmlFor="gift-email">Email address</label>
        <input
          id="gift-email"
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
          className="rounded-2xl border-[2.5px] border-ink bg-accent px-6 py-3 text-base font-semibold text-cream shadow-[4px_5px_0_var(--ink)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send it"}
        </button>
      </div>
      {status === "error" ? (
        <div role="alert" className="mt-3 text-sm">
          <p className="text-accent-ink">{error}</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-ink-2 underline underline-offset-2">
            {cta ?? "Open the guide anyway"}
          </a>
        </div>
      ) : null}
      <p className="mt-4 text-sm text-ink-2">No spam. Unsubscribe anytime.</p>
    </form>
  );
}
