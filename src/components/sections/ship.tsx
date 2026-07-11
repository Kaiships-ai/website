import { siteConfig } from "@/lib/site.config";
import { SectionHeading } from "@/components/section-heading";
import { RevealStagger, RevealItem } from "@/components/reveal";

const icons: Record<string, string> = {
  bot: "🤖",
  zap: "⚡",
  file: "📄",
  ship: "🚀",
};

export function Ship() {
  const { ship } = siteConfig;
  return (
    <section id="ship" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={ship.eyebrow}
          title={ship.title}
          titleAccent={ship.titleAccent}
          sub={ship.sub}
        />
        <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {ship.items.map((item) => (
            <RevealItem key={item.title}>
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(20,18,16,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(20,18,16,0.18)] sm:p-7">
                <span aria-hidden className="text-2xl">
                  {icons[item.icon] ?? "▸"}
                </span>
                <h3 className="mt-4 text-xl font-medium tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">
                  {item.desc}
                </p>
                <p className="mt-5 rounded-lg border border-terminal-line bg-terminal px-3.5 py-2.5 font-mono text-xs text-terminal-fg transition-colors group-hover:text-amber">
                  {item.demo}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
