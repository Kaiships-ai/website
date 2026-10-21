"use client";

import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";

const styles = {
  // Studio v1: accent = the one primary action per screen; ghost = secondary outline.
  accent: "bg-accent text-accent-on hover:brightness-110 shadow-card",
  ghost: "border border-line-strong bg-surface text-ink hover:border-ink",
  primary: "bg-ink text-bg hover:opacity-90",
  terminal: "border border-space-line bg-space-2 text-space-ink hover:border-space-muted",
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

  const base = `inline-flex items-center justify-center gap-2 min-h-11 rounded-[10px] px-5 py-2.5 text-[15px] font-semibold transition-[filter,border-color,opacity] duration-200 ${styles[variant]} ${className}`;

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
