/**
 * Product facts, client-safe (JSON imports only, no fs). Filled by `pnpm sync:products`
 * from each product repo + Polar. Never hand-edit a price, checkout or version in src.
 */
import list from "../../products.json";
import synced from "../../content/products/index.json";

export type Tier = "starter" | "pro";
export type Product = {
  slug: string;
  repo: string;
  tier: Tier;
  label: string;
  name: string;
  version: string;
  /** Display price, formatted from Polar price_amount. */
  price: string;
  /** "39.99" for JSON-LD. */
  priceValue: string;
  currency: string;
  checkout: string;
  polarProductId: string;
  preorder: boolean;
  afterPreorderPrice?: string;
  /** Pro skills by week, from the product repo's product.json `includes`. */
  includes: Include[];
  /** "2026-11-10": the last included skill ships by this date. */
  shipsBy?: string;
  updatesMonths?: number;
};

export type Include = { week: number; title: string; detail: string; commands: string[]; status: string };

type Synced = Record<string, { product: { name: string; version: string; includes?: Include[]; ships_by?: string; updates_months?: number }; polar: { name: string; price_amount: number; currency: string } }>;

export function formatPrice(cents: number, currency = "usd"): string {
  const sym = currency.toLowerCase() === "usd" ? "$" : `${currency.toUpperCase()} `;
  const v = cents / 100;
  return sym + (Number.isInteger(v) ? String(v) : v.toFixed(2));
}

export function getProducts(): Product[] {
  return (list as Array<Record<string, unknown>>).map((p) => {
    const s = (synced as Synced)[p.slug as string];
    if (!s) throw new Error(`products: ${p.slug} not synced, run pnpm sync:products`);
    return {
      slug: p.slug as string,
      repo: p.repo as string,
      tier: p.tier as Tier,
      label: p.label as string,
      name: s.polar.name || s.product.name,
      version: s.product.version,
      price: formatPrice(s.polar.price_amount, s.polar.currency),
      priceValue: (s.polar.price_amount / 100).toFixed(2),
      currency: s.polar.currency.toUpperCase(),
      checkout: p.checkout as string,
      polarProductId: p.polarProductId as string,
      preorder: Boolean(p.preorder),
      afterPreorderPrice: p.afterPreorderPrice as string | undefined,
      includes: s.product.includes ?? [],
      shipsBy: s.product.ships_by,
      updatesMonths: s.product.updates_months,
    };
  });
}

export function getProduct(tier: Tier): Product {
  const p = getProducts().find((x) => x.tier === tier);
  if (!p) throw new Error(`products: no ${tier} product`);
  return p;
}

/** ISO date → short US date, e.g. "Jan 2, 2026". */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}
