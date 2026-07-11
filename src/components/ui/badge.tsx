import type { ReactNode } from "react";

const tones = {
  neutral: "bg-paper-2 text-ink border-line",
  accent: "bg-accent/10 text-accent-ink border-accent/20",
  success: "bg-success-ink/10 text-success-ink border-success-ink/20",
  terminal: "bg-terminal-2 text-terminal-fg border-terminal-line",
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
