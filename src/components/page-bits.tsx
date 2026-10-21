import type { ReactNode } from "react";

/* Shared shells for the inner pages, Studio design system v1. */

export function PageShell({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) {
  return (
    <div className="pt-32 pb-[72px] sm:pt-40 sm:pb-28">
      <div className={`mx-auto px-4 sm:px-6 ${narrow ? "max-w-3xl" : "max-w-[1200px]"}`}>{children}</div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  sub: string;
  children?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="max-w-3xl font-display text-[clamp(2.3rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
        {title}
        {accent ? <span className="text-accent"> {accent}</span> : null}
      </h1>
      <p className="max-w-xl text-[17px] leading-relaxed text-muted">{sub}</p>
      {children}
    </header>
  );
}

export function SectionTitle({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="font-display text-[28px] font-bold leading-tight tracking-[-0.015em] text-ink sm:text-[32px]">
      {children}
    </h2>
  );
}

export const card = "flex h-full flex-col gap-3 rounded-card border border-line bg-surface p-6 shadow-card";

export function Badge2({ children, tone = "free" }: { children: ReactNode; tone?: "free" | "pro" }) {
  return (
    <span
      className={`w-fit rounded-full px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] ${
        tone === "free" ? "bg-accent-wash text-accent" : "border border-line-strong text-ink"
      }`}
    >
      {children}
    </span>
  );
}
