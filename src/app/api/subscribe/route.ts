import { NextResponse } from "next/server";
import { getMagnet } from "@/lib/magnets";

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
export async function POST(request: Request) {
  let email: unknown;
  let source: unknown;
  try {
    ({ email, source } = await request.json());
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
  if (loopsKey && magnet) {
    // IG DM gift page (/get/[slug]): tag the lead, no PACK email.
    const res = await fetch("https://app.loops.so/api/v1/contacts/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loopsKey}`,
      },
      body: JSON.stringify({
        email,
        source: `ig-dm-${magnet.slug}`,
        userGroup: "lead",
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
