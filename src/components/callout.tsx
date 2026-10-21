import type { ReactNode } from "react";

const kinds = {
  warn: {
    cls: "border-amber/40 bg-accent-soft/8",
    label: "what breaks",
    labelCls: "text-[#92400e]",
  },
  note: {
    cls: "border-line bg-sunk",
    label: "note",
    labelCls: "text-muted",
  },
} as const;

export function Callout({
  type = "note",
  children,
}: {
  type?: keyof typeof kinds;
  children: ReactNode;
}) {
  const k = kinds[type];
  return (
    <aside className={`not-prose my-6 rounded-xl border p-4 ${k.cls}`}>
      <p
        className={`mb-2 font-mono text-[11px] uppercase tracking-[0.2em] ${k.labelCls}`}
      >
        {type === "warn" ? "⚠ " : ""}
        {k.label}
      </p>
      <div className="text-sm leading-relaxed text-ink [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-1">
        {children}
      </div>
    </aside>
  );
}
