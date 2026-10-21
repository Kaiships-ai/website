"use client";
import { useState } from "react";

export function CopyMarkdown({ markdown }: { markdown: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(markdown);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {}
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:border-line-strong"
    >
      <span aria-hidden>{done ? "✓" : "⧉"}</span>
      {done ? "Copied" : "Copy Markdown"}
    </button>
  );
}
