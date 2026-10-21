import { redirect } from "next/navigation";
import { allDocs } from "@/components/content/docs-data";

export default function DocsIndex() {
  const first = allDocs()[0];
  redirect(first ? `/docs/${first.product}/${first.slug}` : "/");
}
