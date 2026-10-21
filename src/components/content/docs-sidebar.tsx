"use client";
import Link from "next/link";
import { useState } from "react";

export type SidebarProduct = { slug: string; label: string; groups: { name: string; docs: { slug: string; title: string; description: string }[] }[] };

export function DocsSidebar({ products, current }: { products: SidebarProduct[]; current: string }) {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const match = (d: { title: string; description: string }) => !needle || (d.title + " " + d.description).toLowerCase().includes(needle);
  const list = (
    <div className="flex flex-col gap-6">
      <label className="relative block">
        <span className="sr-only">Search docs</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search docs"
          className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </label>
      {products.map((p) => {
        const groups = p.groups.map((g) => ({ ...g, docs: g.docs.filter(match) })).filter((g) => g.docs.length);
        if (!groups.length) return null;
        return (
          <div key={p.slug} className="flex flex-col gap-4">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">{p.label}</p>
            {groups.map((g) => (
              <div key={g.name} className="flex flex-col gap-1">
                <p className="px-2 text-xs font-semibold text-ink">{g.name}</p>
                {g.docs.map((d) => {
                  const href = `/docs/${p.slug}/${d.slug}`;
                  const on = href === current;
                  return (
                    <Link
                      key={d.slug}
                      href={href}
                      aria-current={on ? "page" : undefined}
                      className={"rounded-md px-2 py-1.5 text-sm transition-colors " + (on ? "bg-accent-wash font-medium text-accent" : "text-muted hover:bg-sunk hover:text-ink")}
                    >
                      {d.title}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        );
      })}
      {needle && products.every((p) => p.groups.every((g) => !g.docs.some(match))) ? <p className="px-2 text-sm text-muted">No page matches “{q}”.</p> : null}
    </div>
  );
  return (
    <>
      <details className="rounded-xl border border-line bg-surface p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-medium text-ink">Browse the docs</summary>
        <div className="mt-4">{list}</div>
      </details>
      <nav aria-label="Docs" className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 lg:block">
        {list}
      </nav>
    </>
  );
}
