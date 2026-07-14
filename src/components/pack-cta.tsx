import { siteConfig } from "@/lib/site.config";
import { Button } from "@/components/ui/button";

/** End-of-article CTA — the PACK → community ladder. */
export function PackCta() {
  return (
    <aside className="not-prose mt-12 rounded-2xl border border-line bg-paper-2 p-6 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-ink">
        {"//"} the free pack
      </p>
      <h3 className="mt-3 text-2xl font-medium tracking-tight text-ink">
        Want the whole system, installed in minutes?
      </h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-2">
        The free Starter PACK bundles my curated CLAUDE.md, a model-routing
        config, 18 tested skills, and 4 subagents. Drop your email and the
        repo link lands in your inbox — and on your screen at the same time.
        Or DM{" "}
        <span className="rounded bg-terminal px-1.5 py-0.5 font-mono text-xs text-amber">
          {siteConfig.keyword}
        </span>{" "}
        on Instagram.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button href="/pack" variant="accent">
          Get the PACK by email
        </Button>
        <Button href={siteConfig.socials.instagramDm} variant="ghost">
          DM {siteConfig.keyword} on Instagram
        </Button>
      </div>
    </aside>
  );
}
