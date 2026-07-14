"use client";

import { useState, type FormEvent } from "react";

const REPO_URL = "https://github.com/KineBeo/claude-code-starter-pack";
const INSTALL_HINT = "cp -R skills/<name> ~/.claude/skills/";

type Status = "idle" | "loading" | "success" | "error";

/** Email gate for the PACK. `compact` = popup variant. */
export function PackForm({ compact = false }: { compact?: boolean }) {
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
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      const data = await res.json().catch(() => ({}));
      setStatus("error");
      setError(
        data.error === "kit_not_configured"
          ? "Email capture isn't wired up yet — DM PACK on Instagram instead."
          : data.error === "invalid_email"
            ? "That email doesn't look right — check the address."
            : "Something broke on my end. Try again, or DM PACK on Instagram.",
      );
    } catch {
      setStatus("error");
      setError("Network hiccup — try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-success-ink/30 bg-white p-5 text-left"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-success-ink">
          ✓ sent
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          The PACK is on its way to your inbox — and here it is right now:
        </p>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9a2f13]"
        >
          Open the repo on GitHub ↗
        </a>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2">
          install a skill
        </p>
        <pre className="mt-1.5 overflow-x-auto rounded-lg border border-terminal-line bg-terminal px-3.5 py-2.5 font-mono text-xs text-terminal-fg">
          {INSTALL_HINT}
        </pre>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="text-left">
      <div className={compact ? "flex flex-col gap-2" : "flex flex-col gap-2 sm:flex-row"}>
        <label className="sr-only" htmlFor={compact ? "pack-email-popup" : "pack-email"}>
          Email address
        </label>
        <input
          id={compact ? "pack-email-popup" : "pack-email"}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@ships.daily"
          className="w-full flex-1 rounded-full border border-line bg-white px-5 py-3 font-mono text-sm text-ink placeholder:text-ink-2/50 focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-accent-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9a2f13] disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send me the PACK"}
        </button>
      </div>
      {status === "error" ? (
        <p role="alert" className="mt-2 text-sm text-accent-ink">
          {error}
        </p>
      ) : null}
      <p className="mt-3 font-mono text-xs leading-relaxed text-ink-2">
        No spam. Unsubscribe anytime. Real files, MIT-licensed, credited.
      </p>
    </form>
  );
}
