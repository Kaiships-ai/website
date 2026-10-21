"use client";
import { useState } from "react";
import { Cover } from "./bits";
import type { Guide } from "./guides-data";

export function GuidesGrid({ guides, topics }: { guides: Guide[]; topics: string[] }) {
  const [topic, setTopic] = useState("All");
  const [q, setQ] = useState("");
  const n = q.trim().toLowerCase();
  const shown = guides.filter((g) => (topic === "All" || g.topic === topic) && (!n || (g.title + " " + g.description).toLowerCase().includes(n)));
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Topics">
          {["All", ...topics].map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={topic === t}
              onClick={() => setTopic(t)}
              className={"rounded-full border px-4 py-1.5 text-sm transition-colors " + (topic === t ? "border-ink bg-ink text-bg" : "border-line bg-surface text-muted hover:text-ink")}
            >
              {t}
            </button>
          ))}
        </div>
        <label className="block sm:w-64">
          <span className="sr-only">Search guides</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search guides"
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </label>
      </div>
      <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {shown.map((g, i) => (
          <li key={g.href}>
            <a href={g.href} className="group flex flex-col gap-4">
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                <Cover topic={g.topic} title={g.title} tone={i} />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-xl font-bold leading-snug tracking-tight text-ink group-hover:text-accent">{g.title}</h2>
                <p className="text-sm leading-relaxed text-muted line-clamp-2">{g.description}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
      {!shown.length ? <p className="mt-10 text-muted">No guide matches. Try another word.</p> : null}
    </div>
  );
}
