import type { ReactNode } from "react";

const kinds = {
  warn: {
    cls: "border-amber/40 bg-amber/8",
    label: "what breaks",
    labelCls: "text-amber",
  },
  note: {
    cls: "border-line bg-paper-2",
    label: "note",
    labelCls: "text-ink-2",
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
