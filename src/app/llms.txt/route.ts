import { getProducts, getDocs } from "@/lib/products";
import { siteConfig } from "@/lib/site.config";
import { getGuides } from "@/components/content/guides-data";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const products = getProducts();
  const plans = products
    .map((p) => {
      const after = p.preorder && p.afterPreorderPrice ? ` PreOrder price; ${p.afterPreorderPrice} after the PreOrder.` : "";
      return `- **${p.label}** — ${p.name}, ${p.price} (${p.currency}), version ${p.version}.${after} Buy: ${p.checkout}`;
    })
    .join("\n");
  const docs = products
    .map((p) => `### ${p.label} docs\n\n` + getDocs(p.slug).map((d) => `- [${d.title}](${abs(`/docs/${p.slug}/${d.slug}`)}): ${d.description}`).join("\n"))
    .join("\n\n");
  const guides = getGuides().filter((g) => !g.href.startsWith("/get/")).map((g) => `- [${g.title}](${abs(g.href)}): ${g.description}`).join("\n");
  const body = `# Kaiships Studio (${siteConfig.name})

> ${siteConfig.bio}

Kaiships Studio is a kit for Claude Code. Mac (tested) · Windows (setup supports it, less tested). You type one prompt and Claude makes a finished vertical reel (1080×1920 MP4): script, voiceover, painted animation, captions, music and sound effects. It is sold through Polar. Made by Kai, a solo builder who posts the reels on Instagram as @kaiships.ai.

## Plans

${plans}

## Docs

${docs}

## Changelog

- [All releases](${abs("/changelog")})

## Free guides

${guides}

## Links

- [Home](${abs("/")})
- [Plans and pricing](${abs("/#buy")})
- [Install](${abs("/docs/studio-reel/install")})
- [Showcase](${abs("/showcase")})
- [Instagram](${siteConfig.socials.instagram})
- Email: ${siteConfig.socials.email}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
