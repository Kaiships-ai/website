import { after, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Polar webhook (Standard Webhooks spec). On order.paid for the Reel Kit,
 * tag the buyer in Loops and fire `kit_purchased` (starts onboarding).
 *
 * Env: POLAR_WEBHOOK_SECRET, LOOPS_API_KEY.
 */
export const runtime = "nodejs";

const REEL_KIT_PRODUCT_ID = "e62fb517-8ad3-42ae-a24d-be4574d09acf";
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
  const isKit =
    order.product_id === REEL_KIT_PRODUCT_ID || order.product?.id === REEL_KIT_PRODUCT_ID;
  const email: unknown = order.customer?.email;
  const loopsKey = process.env.LOOPS_API_KEY;

  if (event.type === "order.paid" && isKit && typeof email === "string" && loopsKey) {
    const name: unknown = order.customer?.name;
    const firstName = typeof name === "string" && name.trim() ? name.trim().split(/\s+/)[0] : undefined;
    const meta: Record<string, unknown> = order.metadata ?? {};
    const utm = [meta.utm_source, meta.utm_campaign].filter(
      (v): v is string => typeof v === "string" && v.length > 0,
    );
    const source = utm.length ? `polar · ${utm.join("/")}` : "polar";
    const amount = Number(order.net_amount ?? order.amount ?? order.total_amount ?? 0);
    const purchaseData: Record<string, unknown> = {
      revenue: Number.isFinite(amount) ? amount / 100 : 0,
      currency: String(order.currency ?? "usd").toUpperCase(),
    };
    if (typeof meta.utm_source === "string" && meta.utm_source) purchaseData.utm_source = meta.utm_source;
    if (typeof meta.utm_campaign === "string" && meta.utm_campaign) purchaseData.utm_campaign = meta.utm_campaign;
    after(async () => {
      await trackPurchase(purchaseData);
      await loops("contacts/update", loopsKey, {
        email,
        ...(firstName ? { firstName } : {}),
        userGroup: "buyer",
        source,
      });
      await loops("events/send", loopsKey, { email, eventName: "kit_purchased" });
    });
  }

  return NextResponse.json({ ok: true });
}
