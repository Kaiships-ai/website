import { NextResponse } from "next/server";

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
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  ) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
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
