import Link from "next/link";
import type { ResourceMeta } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function ResourceCard({ r }: { r: ResourceMeta }) {
  return (
    <Link
      href={`/resources/${r.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_16px_40px_-16px_rgba(20,18,16,0.16)]"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">{r.type}</Badge>
        <Badge>{r.tool}</Badge>
        {r.popular ? <Badge tone="success">popular</Badge> : null}
      </div>
      <h3 className="mt-4 text-lg font-medium leading-snug tracking-tight text-ink group-hover:text-accent-ink">
        {r.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">
        {r.description}
      </p>
      <p className="mt-4 font-mono text-xs text-ink-2">
        {r.readTime} min · install-ready →
      </p>
    </Link>
  );
}
