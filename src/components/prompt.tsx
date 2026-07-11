"use client";

import { useState, type ReactNode } from "react";

/** Copy-paste block used inside MDX resource bodies. */
export function Prompt({
  title = "prompt",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    const pre = e.currentTarget
      .closest("[data-prompt]")
      ?.querySelector("pre");
    const text = pre?.textContent ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      data-prompt
      className="not-prose my-6 overflow-hidden rounded-xl border border-terminal-line bg-terminal"
    >
      <div className="flex items-center justify-between border-b border-terminal-line px-4 py-2.5">
        <span className="font-mono text-xs text-terminal-muted">{title}</span>
        <button
          onClick={onCopy}
          className="rounded-full border border-terminal-line px-3 py-1 font-mono text-xs text-terminal-fg transition-colors hover:border-amber hover:text-amber"
          aria-label={`Copy ${title} to clipboard`}
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap p-4 font-mono text-[13px] leading-6 text-terminal-fg">
        {children}
      </pre>
    </div>
  );
}
