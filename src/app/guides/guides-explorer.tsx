"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export type GuideCard = {
  slug: string;
  title: string;
  keyword: string;
  topic: string;
  summary: string;
  minutes: number;
  date: string;
};

export function GuidesExplorer({ guides, topics }: { guides: GuideCard[]; topics: readonly string[] }) {
  const params = useSearchParams();
  const initial = params.get("topic");
  const [topic, setTopic] = useState(initial && topics.includes(initial) ? initial : "All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"latest" | "quickest">("latest");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = guides.filter(
      (g) =>
        (topic === "All" || g.topic === topic) &&
        (!needle || g.keyword.toLowerCase().includes(needle) || g.title.toLowerCase().includes(needle)),
    );
    return [...list].sort((a, b) =>
      sort === "quickest" ? a.minutes - b.minutes || (a.date < b.date ? 1 : -1) : a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
    );
  }, [guides, topic, q, sort]);

  const chip = (active: boolean) =>
    `rounded-full border-2 border-ink px-3.5 py-1.5 text-sm font-bold transition-colors ${
      active ? "bg-ink text-ochre" : "bg-cream text-ink hover:bg-paper-2"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="guide-search">Search guides</label>
        <input
          id="guide-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type a keyword from a reel, e.g. LIMIT"
          className="w-full rounded-2xl border-[2.5px] border-ink bg-white px-5 py-3 text-base text-ink placeholder:text-ink-2/60 focus:border-accent focus:outline-none sm:max-w-md"
        />
        <div className="flex gap-2" role="group" aria-label="Sort">
          <button type="button" onClick={() => setSort("latest")} className={chip(sort === "latest")}>Latest</button>
          <button type="button" onClick={() => setSort("quickest")} className={chip(sort === "quickest")}>Quickest</button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Topic">
        {["All", ...topics].map((t) => {
          const n = t === "All" ? guides.length : guides.filter((g) => g.topic === t).length;
          return (
            <button key={t} type="button" onClick={() => setTopic(t)} className={chip(topic === t)}>
              {t} <span className="font-mono text-xs opacity-70">{n}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-ink-2">Free for one email.</p>
      {shown.length === 0 ? (
        <p className="mt-10 text-base text-ink-2">No guide matches that. Try another keyword.</p>
      ) : (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="sketch flex h-full flex-col gap-2 p-5 transition-transform hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  <span className="w-fit rounded-md bg-ink px-2.5 py-1 font-mono text-xs font-bold tracking-[0.18em] text-ochre">
                    {g.keyword}
                  </span>
                  <span className="text-xs text-ink-2">{g.topic}</span>
                </span>
                <span className="text-lg font-extrabold text-ink">{g.title}</span>
                <span className="text-base text-ink-2">{g.summary}</span>
                <span className="mt-auto flex items-center justify-between pt-2 text-sm">
                  <span className="font-mono text-xs text-ink-2">{g.minutes} min read</span>
                  <span className="font-extrabold text-accent-ink">Read the guide →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
