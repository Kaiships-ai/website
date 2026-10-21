import { notFound, redirect } from "next/navigation";
import { getProducts, getDocs } from "@/lib/products";

export function generateStaticParams() {
  return getProducts().map((p) => ({ product: p.slug }));
}

export default async function ProductDocs({ params }: { params: Promise<{ product: string }> }) {
  const { product } = await params;
  const first = getDocs(product)[0];
  if (!first) notFound();
  redirect(`/docs/${product}/${first.slug}`);
}
