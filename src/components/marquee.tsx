export function Marquee({ items }: { items: readonly string[] }) {
  const row = [...items, ...items];
  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-line bg-paper-2 py-3"
    >
      <div className="animate-marquee flex w-max items-center gap-8">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-ink-2"
          >
            {item}
            <span className="text-accent">✓</span>
          </span>
        ))}
      </div>
    </div>
  );
}
