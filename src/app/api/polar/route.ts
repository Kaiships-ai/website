import { after, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Polar webhook (Standard Webhooks spec). On order.paid, tag the buyer in
 * Loops. Reel Kit and Kaiships School (which includes the Kit) fire
 * `kit_purchased` (starts the Kit onboarding workflow). School and the Skill
 * Library also get the "Purchase welcome" transactional with their download.
 *
 * Env: POLAR_WEBHOOK_SECRET, LOOPS_API_KEY.
 */
export const runtime = "nodejs";

const REEL_KIT_PRODUCT_ID = "e62fb517-8ad3-42ae-a24d-be4574d09acf";

/** Products sold on /school and /skills (R11). The download links are the same
 * ones Polar shows the buyer in the product's benefit. */
const BUNDLES: Record<string, { slug: string; event: string; kit: boolean; welcome: Record<string, string> }> = {
  "f7148bd4-468d-4acf-8b4c-756bc4cffdcf": {
    slug: "school",
    event: "school_purchased",
    kit: true,
    welcome: {
      productName: "Kaiships School",
      downloadUrl:
        "https://9mnakwbq5fbjl7jj.public.blob.vercel-storage.com/dl/kaiships-school-v1-f7iBtm2DASrz9wCB8DrpNrS9FBF2ZG.zip",
      firstStep:
        "unzip it and open course/m1-the-system.md. The Reel Kit is a separate download in your Polar receipt.",
    },
  },
  "5596945f-1cd4-4127-ac0e-127f5f6b4baf": {
    slug: "skills",
    event: "library_purchased",
    kit: false,
    welcome: {
      productName: "Kaiships Skill Library",
      downloadUrl:
        "https://9mnakwbq5fbjl7jj.public.blob.vercel-storage.com/dl/kaiships-skill-library-v1-ZqF4ADMJ12mwTX1inU7t9DjHWvcJJo.zip",
      firstStep:
        "unzip it, copy the skills folders into ~/.claude/skills/, start Claude Code and say \"review my numbers this week\".",
    },
  },
};
const WELCOME_TRANSACTIONAL_ID = "cmuvirk4200f40jzr22b0ecgz";
const TOLERANCE_SECONDS = 5 * 60;

function secretKey(secret: string): Buffer {
  // "whsec_<base64>" is the Standard Webhooks form. Polar's own secrets are
  // used as raw UTF-8 bytes (its SDK base64-encodes them before verifying).
  if (secret.startsWith("whsec_")) return Buffer.from(secret.slice(6), "base64");
  return Buffer.from(secret, "utf8");
}

function verify(body: string, headers: Headers, secret: string): boolean {
  const id = headers.get("webhook-id");
  const ts = headers.get("webhook-timestamp");
  const sigHeader = headers.get("webhook-signature");
  if (!id || !ts || !sigHeader) return false;
  const tsNum = Number(ts);
  if (!Number.isFinite(tsNum)) return false;
  if (Math.abs(Date.now() / 1000 - tsNum) > TOLERANCE_SECONDS) return false;

  const expected = createHmac("sha256", secretKey(secret))
    .update(`${id}.${ts}.${body}`)
    .digest();
  for (const part of sigHeader.split(" ")) {
    const [version, sig] = part.split(",");
    if (version !== "v1" || !sig) continue;
    const got = Buffer.from(sig, "base64");
    if (got.length === expected.length && timingSafeEqual(got, expected)) return true;
  }
  return false;
}

const UMAMI_URL = "https://kstats-kaiships.vercel.app/api/ks";
const UMAMI_WEBSITE_ID = "a11d08a4-7f99-420e-aafc-5aa471b7ca6e";
const UMAMI_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

/** Server-side Umami `purchase` event. Never throws. */
async function trackPurchase(data: Record<string, unknown>) {
  try {
    const res = await fetch(UMAMI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": UMAMI_UA },
      body: JSON.stringify({
        type: "event",
        payload: {
          website: UMAMI_WEBSITE_ID,
          hostname: "kai-ships-ai-website.vercel.app",
          url: "/purchase",
          title: "purchase",
          name: "purchase",
          data,
        },
      }),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) console.error("umami purchase failed", res.status);
  } catch (err) {
    console.error("umami purchase error", err);
  }
}

/** True when Loops already has this contact (so its lead `source` must be kept). */
async function loopsHasContact(email: string, key: string): Promise<boolean> {
  try {
    const res = await fetch(
      `https://app.loops.so/api/v1/contacts/find?email=${encodeURIComponent(email)}`,
      { headers: { Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(3000) },
    );
    if (!res.ok) return false;
    const list: unknown = await res.json();
    return Array.isArray(list) && list.length > 0;
  } catch {
    return false;
  }
}

async function loops(path: string, key: string, payload: object) {
  const res = await fetch(`https://app.loops.so/api/v1/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) console.error(`loops ${path} failed`, res.status, await res.text());
}

export async function POST(request: Request) {
  const secret = process.env.POLAR_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "not_configured" }, { status: 500 });

  const body = await request.text();
  if (!verify(body, request.headers, secret)) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  let event: { type?: string; data?: Record<string, any> };
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const order = event.data ?? {};
  const productId: unknown = order.product_id ?? order.product?.id;
  const bundle = typeof productId === "string" ? BUNDLES[productId] : undefined;
  const isKit = productId === REEL_KIT_PRODUCT_ID || bundle?.kit === true;
  const email: unknown = order.customer?.email;
  const loopsKey = process.env.LOOPS_API_KEY;

  if (event.type === "order.paid" && (isKit || bundle) && typeof email === "string" && loopsKey) {
    const name: unknown = order.customer?.name;
    const firstName = typeof name === "string" && name.trim() ? name.trim().split(/\s+/)[0] : undefined;
    const meta: Record<string, unknown> = order.metadata ?? {};
    const utm = [meta.utm_source, meta.utm_medium, meta.utm_campaign].filter(
      (v): v is string => typeof v === "string" && v.length > 0,
    );
    const source = utm.length ? `polar · ${utm.join("/")}` : "polar";
    const amount = Number(order.net_amount ?? order.amount ?? order.total_amount ?? 0);
    const purchaseData: Record<string, unknown> = {
      revenue: Number.isFinite(amount) ? amount / 100 : 0,
      currency: String(order.currency ?? "usd").toUpperCase(),
      product: bundle?.slug ?? "kit",
    };
    if (typeof meta.utm_source === "string" && meta.utm_source) purchaseData.utm_source = meta.utm_source;
    if (typeof meta.utm_campaign === "string" && meta.utm_campaign) purchaseData.utm_campaign = meta.utm_campaign;
    after(async () => {
      await trackPurchase(purchaseData);
      // buySource = where the purchase came from; `source` stays the lead's
      // first source (only set for buyers Loops has never seen).
      const known = await loopsHasContact(email, loopsKey);
      await loops("contacts/update", loopsKey, {
        email,
        ...(firstName ? { firstName } : {}),
        userGroup: "buyer",
        buySource: source,
        ...(known ? {} : { source }),
      });
      if (isKit) await loops("events/send", loopsKey, { email, eventName: "kit_purchased" });
      if (bundle) {
        await loops("events/send", loopsKey, { email, eventName: bundle.event });
        await loops("transactional", loopsKey, {
          transactionalId: WELCOME_TRANSACTIONAL_ID,
          email,
          dataVariables: bundle.welcome,
        });
      }
    });
  }

  return NextResponse.json({ ok: true });
}
