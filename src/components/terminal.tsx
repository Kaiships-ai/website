import type { ReactNode } from "react";

export type TermLine = {
  kind: "dim" | "ok" | "accent" | "cmd";
  text: string;
};

export function lineColor(kind: TermLine["kind"]) {
  switch (kind) {
    case "ok":
      return "text-success";
    case "accent":
      return "text-amber";
    case "cmd":
      return "text-terminal-fg";
    default:
      return "text-terminal-muted";
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
      className={`overflow-hidden rounded-2xl border border-terminal-line bg-terminal shadow-[0_24px_80px_-24px_rgba(20,18,16,0.55)] ${className}`}
    >
      <div className="relative flex items-center gap-2 border-b border-terminal-line px-4 py-3">
        <span aria-hidden className="size-3 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="size-3 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="size-3 rounded-full bg-[#28c840]" />
        <span className="absolute inset-x-0 text-center font-mono text-xs text-terminal-muted">
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
          <span className="mr-2 text-accent">$</span>
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
