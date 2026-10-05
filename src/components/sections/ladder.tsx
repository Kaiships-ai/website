import Link from "next/link";
import { school, library } from "@/lib/offers";

const cards = [
  { href: "/school", name: school.name, line: "6 modules, the Reel Kit and 9 skills.", meta: `${school.price} one-time` },
  { href: "/skills", name: library.name, line: "Claude Code skills I use daily. Three are free.", meta: `${library.price} for all 9` },
  { href: "/resources", name: "Free guides", line: "The guide behind each reel, and deep dives.", meta: "Free" },
];

export function Ladder() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="more">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="more" className="marker text-[clamp(1.9rem,4.6vw,3.2rem)] text-ink">More from kaiships</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="flex h-full flex-col gap-2 rounded-2xl border-[2.5px] border-ink bg-cream p-5 shadow-[4px_5px_0_var(--ink)] transition-transform hover:-translate-y-1"
              >
                <span className="text-lg font-extrabold text-ink">{c.name}</span>
                <span className="text-base text-ink-2">{c.line}</span>
                <span className="mt-auto pt-2 font-mono text-xs uppercase tracking-[0.15em] text-accent-ink">{c.meta} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
