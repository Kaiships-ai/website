import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-mono text-sm font-semibold text-ink">
              kaiships.ai
              <span
                aria-hidden
                className="ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.1em] bg-accent"
              />
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-2">
              {siteConfig.footer.blurb}
            </p>
            <p className="mt-4 font-mono text-xs text-ink-2">
              $ built in public with Claude Code agents —{" "}
              <Link
                href="/blog/building-this-site-with-agent-teams"
                className="text-accent-ink underline underline-offset-4"
              >
                this site is one of the receipts
              </Link>
            </p>
          </div>
          {siteConfig.footer.cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => {
                  const external = l.href.startsWith("http");
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-block py-1 text-sm text-ink-2 transition-colors hover:text-ink"
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {l.label}
                        {external ? " ↗" : ""}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-xs text-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <p>{siteConfig.footer.legal}</p>
          <p>
            <span className="text-success-ink">✓</span> no slop detected
          </p>
        </div>
      </div>
    </footer>
  );
}
