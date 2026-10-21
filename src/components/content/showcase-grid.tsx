"use client";
import { useState } from "react";

export type Reel = { id: string; label: string; url: string | null; views: string; poster: string | null; video: string | null };

function Media({ r, big = false }: { r: Reel; big?: boolean }) {
  if (r.video)
    return <video src={r.video} poster={r.poster ?? undefined} muted loop playsInline autoPlay={big} controls={big} preload="none" className="h-full w-full object-cover" />;
  if (r.poster) return <img src={r.poster} alt="" loading="lazy" className="h-full w-full object-cover" />;
  return (
    <div className="flex h-full w-full items-end bg-space p-5">
      <span className="font-display text-xl font-bold leading-tight text-space-ink">{r.label}</span>
    </div>
  );
}

export function ShowcaseGrid({ reels, source }: { reels: Reel[]; source: string }) {
  const [q, setQ] = useState("");
  const n = q.trim().toLowerCase();
  const [featured, ...rest] = reels;
  const shown = reels.filter((r) => !n || r.label.toLowerCase().includes(n));
  return (
    <div className="flex flex-col gap-14">
      {featured ? (
        <section aria-label="Featured reel" className="grid items-center gap-8 rounded-[18px] border border-line bg-surface p-5 sm:p-8 md:grid-cols-[280px_minmax(0,1fr)]">
          <div className="mx-auto aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-[18px] border border-line bg-sunk">
            <Media r={featured} big />
          </div>
          <div className="flex flex-col gap-4">
            <p className="eyebrow">Featured</p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">{featured.label}</h2>
            <p className="text-muted">
              <span className="font-mono text-ink">{featured.views}</span> views · {source}
            </p>
            {featured.url ? (
              <a href={featured.url} target="_blank" rel="noopener noreferrer" className="w-fit rounded-lg border border-line-strong px-4 py-2 text-sm font-medium text-ink hover:border-ink">
                Watch on Instagram ↗
              </a>
            ) : null}
          </div>
        </section>
      ) : null}
      <section aria-label="All reels">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink">All reels</h2>
          <input
            type="search"
            aria-label="Search reels"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search reels"
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none sm:w-64"
          />
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((r) => (
            <li key={r.label}>
              <a href={r.url ?? "#"} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-3">
                <div className="aspect-[9/16] overflow-hidden rounded-xl border border-line bg-sunk transition-transform group-hover:-translate-y-1">
                  <Media r={r} />
                </div>
                <span className="text-sm font-medium leading-snug text-ink group-hover:text-accent">{r.label}</span>
                <span className="font-mono text-xs text-muted">{r.views} views</span>
              </a>
            </li>
          ))}
        </ul>
        {rest.length === 0 && !shown.length ? null : null}
      </section>
    </div>
  );
}
