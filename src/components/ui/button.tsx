"use client";

import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";

const styles = {
  primary:
    "bg-ink text-paper hover:bg-terminal-2 shadow-[0_1px_0_rgba(0,0,0,0.05),0_8px_24px_-12px_rgba(20,18,16,0.5)]",
  accent:
    "border-[2.5px] border-ink bg-accent text-cream font-semibold shadow-[4px_5px_0_var(--ink)] hover:-translate-y-0.5 hover:shadow-[5px_7px_0_var(--ink)]",
  ghost:
    "border-[2.5px] border-ink bg-cream text-ink font-semibold hover:bg-paper-2",
  terminal: "bg-terminal-fg text-terminal hover:bg-white",
} as const;

export type ButtonVariant = keyof typeof styles;

export function Button({
  href,
  children,
  variant = "primary",
  magnetic = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  magnetic?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const internal = href.startsWith("/") || href.startsWith("#");

  const base = `inline-flex items-center justify-center gap-2 rounded-[18px_22px_16px_24px/22px_16px_24px_18px] px-6 py-3 text-base font-semibold tracking-tight transition-all duration-300 active:scale-[0.98] ${styles[variant]} ${className}`;

  // Non-internal hrefs (external URLs, unconfigured placeholders) render as a
  // plain anchor so next/link never prefetches them.
  const link = internal ? (
    <Link href={href} className={base}>
      {children}
    </Link>
  ) : (
    <a
      href={href}
      className={base}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );

  if (!magnetic) return link;

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left - r.width / 2) / r.width) * 12;
    const y = ((e.clientY - r.top - r.height / 2) / r.height) * 10;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block transition-transform duration-200 ease-out will-change-transform"
    >
      {link}
    </div>
  );
}
