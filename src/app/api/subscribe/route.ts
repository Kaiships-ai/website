import { NextResponse } from "next/server";
import { getMagnet } from "@/lib/magnets";
import { getGuide } from "@/lib/guides";

/**
 * Proxies email opt-ins to Kit (ConvertKit) v3 forms API so the browser
 * never sees the API key and CSP connect-src can stay 'self'.
 *
 * Required env (server-side only, set in Vercel project settings):
 *   KIT_API_KEY  — Kit account API key (v3, public "API Key", not secret)
 *   KIT_FORM_ID  — numeric id of the Kit form
 * Optional:
 *   KIT_TAG_ID   — numeric id of the "pack-v1" tag. If unset, configure
 *                  the tag directly on the form in the Kit UI instead.
 */
/** Loops userGroup of an existing contact, or undefined. Never throws. */
async function currentGroup(email: string, key: string): Promise<string | undefined> {
  try {
    const res = await fetch(
      `https://app.loops.so/api/v1/contacts/find?email=${encodeURIComponent(email)}`,
      { headers: { Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(3000) },
    );
    if (!res.ok) return undefined;
    const list: unknown = await res.json();
    const first = Array.isArray(list) ? (list[0] as { userGroup?: unknown } | undefined) : undefined;
    return typeof first?.userGroup === "string" ? first.userGroup : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(request: Request) {
  let email: unknown;
  let source: unknown;
  let utm: unknown;
  try {
    ({ email, source, utm } = await request.json());
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  ) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  // Loops is the ESP. Set LOOPS_API_KEY in the Vercel project; the old
  // ConvertKit path below only runs while that key is missing.
  const loopsKey = process.env.LOOPS_API_KEY;
  const magnet = typeof source === "string" ? getMagnet(source) : undefined;
  const guide =
    typeof source === "string" && source.startsWith("guide:") ? getGuide(source.slice(6)) : undefined;
  if (loopsKey && guide) {
    // Free guide library (/guides/[slug]): one email unlocks every guide.
    const u = (utm && typeof utm === "object" ? utm : {}) as Record<string, unknown>;
    const pick = (k: string) => (typeof u[k] === "string" ? (u[k] as string).slice(0, 64) : "");
    const extra = [pick("utm_campaign")].filter(Boolean);
    const res = await fetch("https://app.loops.so/api/v1/contacts/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loopsKey}`,
      },
      body: JSON.stringify({
        email,
        source: [`${pick("utm_source") || "web"}-guide-${guide.slug}`, ...extra].join(" · "),
        ...((await currentGroup(email, loopsKey)) === "buyer" ? {} : { userGroup: "lead" }),
        magnet: guide.keyword.toLowerCase(),
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "kit_error" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }
  if (loopsKey && magnet) {
    // IG DM gift page (/get/[slug]): tag the lead, no PACK email.
    // utm is folded into `source` (no utm* contact properties exist in Loops).
    const u = (utm && typeof utm === "object" ? utm : {}) as Record<string, unknown>;
    const pick = (k: string) => (typeof u[k] === "string" ? (u[k] as string).slice(0, 64) : "");
    const extra = [pick("utm_medium"), pick("utm_campaign")].filter((v) => v && v !== magnet.slug);
    const res = await fetch("https://app.loops.so/api/v1/contacts/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loopsKey}`,
      },
      body: JSON.stringify({
        email,
        source: [`${pick("utm_source") || "ig_dm"}-${magnet.slug}`, ...extra].join(" · "),
        // A buyer who grabs a free gift stays a buyer (keeps them out of lead nurture).
        ...((await currentGroup(email, loopsKey)) === "buyer" ? {} : { userGroup: magnet.group ?? "lead" }),
        magnet: magnet.slug,
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "kit_error" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }
  if (loopsKey) {
    const res = await fetch("https://app.loops.so/api/v1/contacts/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loopsKey}`,
      },
      body: JSON.stringify({ email, source: "website-pack", userGroup: "pack" }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "kit_error" }, { status: 502 });
    }
    // Deliver the PACK by email: transactional "Website PACK delivery",
    // created via the Loops MCP on 2026-10-02. The form already shows the
    // repo link on success, so a failed send does not fail the request.
    await fetch("https://app.loops.so/api/v1/transactional", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loopsKey}`,
      },
      body: JSON.stringify({
        transactionalId:
          process.env.LOOPS_PACK_TRANSACTIONAL_ID ?? "cmupsb43107dw0jyi5kdzf7tw",
        email,
      }),
    }).catch(() => {});
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;
  if (!apiKey || !formId) {
    return NextResponse.json({ error: "kit_not_configured" }, { status: 501 });
  }

  const tagId = process.env.KIT_TAG_ID;
  const body: Record<string, unknown> = { api_key: apiKey, email };
  if (tagId) body.tags = [Number(tagId)];

  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    return NextResponse.json({ error: "kit_error" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
