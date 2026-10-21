import { notFound } from "next/navigation";
import { studioCard, SECTIONS } from "../../studio-card";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}

export async function GET(_: Request, { params }: { params: Promise<{ section: string }> }) {
  const s = SECTIONS[(await params).section as keyof typeof SECTIONS];
  if (!s) notFound();
  return studioCard(s);
}
