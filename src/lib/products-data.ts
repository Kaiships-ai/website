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
};

type Synced = Record<string, { product: { name: string; version: string }; polar: { name: string; price_amount: number; currency: string } }>;

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
    };
  });
}

export function getProduct(tier: Tier): Product {
  const p = getProducts().find((x) => x.tier === tier);
  if (!p) throw new Error(`products: no ${tier} product`);
  return p;
}
