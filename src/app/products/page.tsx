import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { PageShell, PageHero, card, Badge2 } from "@/components/page-bits";
import { siteConfig } from "@/lib/site.config";

const title = "Products: free guides and the Reel Kit";
const description =
  "Every kaiships.ai product in order, free guides, and the Reel Kit. Start free, pay only when you want more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products" },
  openGraph: { title, description, url: `${siteConfig.url}/products`, images: ["/opengraph-image.jpg"] },
};

export default function ProductsPage() {
  const kit = siteConfig.reelKit;
  const steps = [
    {
      n: "1",
      name: "Free guides",
      price: "Free",
      badge: "free" as const,
      body: "The guide behind each reel, plus deep dives. Comment the keyword on a reel and I send it by DM, or open them here.",
      buttons: [
        { label: "Browse free guides", href: "/resources", v: "accent" as const },
        { label: "Get gifts by DM", href: siteConfig.socials.instagramDm, v: "ghost" as const },
      ],
    },
    {
      n: "2",
      name: kit.name,
      price: kit.price,
      note: "one-time, sold through Polar",
      body: "Type one prompt and Claude makes the whole reel: script, voiceover, painted animation, captions and music. Needs a Mac.",
      buttons: [
        { label: `Get the Reel Kit · ${kit.price}`, href: kit.checkout, v: "accent" as const },
        { label: "See how it works", href: "/#kit", v: "ghost" as const },
      ],
    },
  ];
  return (
    <PageShell>
      <PageHero
        eyebrow="Products"
        title="Start free."
        accent="Pay when it helps."
        sub="Two steps. Each one stands on its own. Nothing here is a subscription."
      />
      <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((s) => (
          <li key={s.n}>
            <Reveal className="h-full">
              <div className={`${card}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2">Step {s.n}</span>
                  {s.badge ? <Badge2>FREE</Badge2> : null}
                </div>
                <h2 className="text-xl font-extrabold text-ink">{s.name}</h2>
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="marker text-3xl text-ink">{s.price}</span>
                  {s.note ? <span className="font-mono text-xs text-ink-2">{s.note}</span> : null}
                </p>
                <p className="text-base leading-relaxed text-ink-2">{s.body}</p>
                <div className="mt-auto flex flex-col gap-3 pt-2">
                  {s.buttons.map((b) => (
                    <Button key={b.label} href={b.href} variant={b.v} className="w-full text-center">
                      {b.label}
                    </Button>
                  ))}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
