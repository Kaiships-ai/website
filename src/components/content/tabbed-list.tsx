"use client";
import { useState, type ReactNode } from "react";

/** Filter tabs over server-rendered items. `key` of an item = the tab it belongs to. */
export function TabbedList({ tabs, items }: { tabs: { key: string; label: string }[]; items: { key: string; id: string; node: ReactNode }[] }) {
  const [tab, setTab] = useState("all");
  return (
    <div>
      <div role="tablist" aria-label="Filter releases" className="flex flex-wrap gap-2">
        {[{ key: "all", label: "All" }, ...tabs].map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={"rounded-full border px-4 py-1.5 text-sm transition-colors " + (tab === t.key ? "border-ink bg-ink text-bg" : "border-line bg-surface text-muted hover:text-ink")}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ol className="mt-10 flex flex-col">
        {items.filter((it) => tab === "all" || it.key === tab).map((it) => (
          <li key={it.id}>{it.node}</li>
        ))}
      </ol>
    </div>
  );
}
