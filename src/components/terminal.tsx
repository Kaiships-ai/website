import type { ReactNode } from "react";

export type TermLine = {
  kind: "dim" | "ok" | "accent" | "cmd";
  text: string;
};

export function lineColor(kind: TermLine["kind"]) {
  switch (kind) {
    case "ok":
      return "text-[#7fd3a3]";
    case "accent":
      return "text-accent-soft";
    case "cmd":
      return "text-space-ink";
    default:
      return "text-space-muted";
  }
}

export function TerminalShell({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-card-lg border border-space-line bg-space shadow-card ${className}`}
    >
      <div className="relative flex items-center gap-2 border-b border-space-line px-4 py-3">
        <span aria-hidden className="size-3 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="size-3 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="size-3 rounded-full bg-[#28c840]" />
        <span className="absolute inset-x-0 text-center font-mono text-xs text-space-muted">
          {title}
        </span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-7 sm:text-sm">
        {children}
      </div>
    </div>
  );
}

export function TermLineView({ line }: { line: TermLine }) {
  return (
    <div className={lineColor(line.kind)}>
      {line.kind === "ok" ? (
        <>
          <span className="mr-2">✓</span>
          {line.text}
        </>
      ) : line.kind === "accent" ? (
        <>
          <span className="mr-2">◆</span>
          {line.text}
        </>
      ) : line.kind === "cmd" ? (
        <>
          <span className="mr-2 text-accent-soft">$</span>
          {line.text}
        </>
      ) : (
        <>
          <span className="mr-2 opacity-0">·</span>
          {line.text}
        </>
      )}
    </div>
  );
}
