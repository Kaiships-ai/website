import { getProducts, getDocs } from "@/lib/products";
import type { SidebarProduct } from "./docs-sidebar";

/** Every doc of every product in reading order: product, then group, then order. */
export function allDocs() {
  return getProducts().flatMap((p) => getDocs(p.slug).map((d) => ({ ...d, product: p.slug, label: p.label })));
}

export function sidebar(): SidebarProduct[] {
  return getProducts().map((p) => {
    const groups: SidebarProduct["groups"] = [];
    for (const d of getDocs(p.slug)) {
      let g = groups.find((x) => x.name === d.group);
      if (!g) groups.push((g = { name: d.group, docs: [] }));
      g.docs.push({ slug: d.slug, title: d.title, description: d.description });
    }
    return { slug: p.slug, label: p.label, groups };
  });
}
