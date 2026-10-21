import type { ReactNode } from "react";

const tones = {
  neutral: "bg-sunk text-ink border-line",
  accent: "bg-accent-wash text-accent border-accent/30",
  success: "bg-ok/10 text-ok border-ok/20",
  terminal: "bg-space-2 text-space-ink border-space-line",
} as const;

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
