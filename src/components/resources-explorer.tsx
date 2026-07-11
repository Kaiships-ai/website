"use client";

import { useMemo, useState } from "react";
import {
  RESOURCE_TYPES,
  RESOURCE_TOOLS,
  type ResourceMeta,
} from "@/lib/types";
import { ResourceCard } from "@/components/resource-card";

const SORTS = ["Popular", "Newest", "A–Z"] as const;
type Sort = (typeof SORTS)[number];

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
        active
          ? "border-ink bg-ink text-paper"
          : "border-line bg-white text-ink-2 hover:border-ink/40 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

export function ResourcesExplorer({
  resources,
}: {
  resources: ResourceMeta[];
}) {
  const [q, setQ] = useState("");
  const [tool, setTool] = useState<string>("All");
  const [type, setType] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("Popular");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const out = resources.filter((r) => {
      if (tool !== "All" && r.tool !== tool) return false;
      if (type !== "All" && r.type !== type) return false;
      if (
        needle &&
        !`${r.title} ${r.description}`.toLowerCase().includes(needle)
      )
        return false;
      return true;
    });
    switch (sort) {
      case "Newest":
        out.sort((a, b) => b.date.localeCompare(a.date));
        break;
      case "A–Z":
        out.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        out.sort((a, b) => {
          if (Boolean(a.popular) !== Boolean(b.popular))
            return a.popular ? -1 : 1;
          return b.date.localeCompare(a.date);
        });
    }
    return out;
  }, [resources, q, tool, type, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-ink-2"
          >
            $
          </span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="grep the library…"
            aria-label="Search resources"
            className="w-full rounded-full border border-line bg-white py-3 pl-10 pr-5 font-mono text-sm text-ink placeholder:text-ink-2/60 focus:border-accent focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2">
            tool
          </span>
          {["All", ...RESOURCE_TOOLS].map((t) => (
            <Chip key={t} label={t} active={tool === t} onClick={() => setTool(t)} />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2">
            type
          </span>
          {["All", ...RESOURCE_TYPES].map((t) => (
            <Chip key={t} label={t} active={type === t} onClick={() => setType(t)} />
          ))}
          <span className="mx-2 hidden h-4 w-px bg-line sm:block" />
          <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2">
            sort
          </span>
          {SORTS.map((s) => (
            <Chip key={s} label={s} active={sort === s} onClick={() => setSort(s)} />
          ))}
        </div>
      </div>

      <p aria-live="polite" className="mt-8 font-mono text-xs text-ink-2">
        {filtered.length} of {resources.length} resources
        {q ? ` matching "${q}"` : ""}
      </p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <ResourceCard key={r.slug} r={r} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-line bg-white p-10 text-center">
          <p className="font-mono text-sm text-ink-2">
            $ grep: no matches — try a different filter
          </p>
        </div>
      ) : null}
    </div>
  );
}
