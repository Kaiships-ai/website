# kaiships.ai

Marketing + content site for **kaiships.ai** — "Real Claude Code agents. No slop."

Built with Next.js 16 (App Router, fully static), Tailwind v4, MDX. No CMS, no database, no client-side tracking.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static production build
pnpm start      # serve production build
```

## Edit content

| What | Where |
|---|---|
| All site copy, links, PACK keyword, socials, Skool URL | `src/lib/site.config.ts` |
| Resources (library articles) | `content/resources/*.mdx` |
| Ship log posts | `content/blog/*.mdx` |
| Theme (colors, fonts, radii) | `src/app/globals.css` `:root` block |

### Resource frontmatter

```yaml
title: ""
description: ""
type: Skills | Agents | Systems | Workflows | Guides
tool: Claude Code | Claude | Multi-tool
date: "2026-07-11"
readTime: 7
popular: true      # optional
faq:               # optional, drives FAQPage JSON-LD
  - q: ""
    a: ""
```

MDX components available in content: `<Prompt title="">` (fence the payload in ```text blocks), `<Callout type="warn|note">`, `<PackCta />`.

### Editorial rules (hard)

No invented member counts, no fake testimonials, no revenue flexes. Numbers are examples from real runs, framed as such. Every resource documents failure modes ("What breaks").

## Deploy (Vercel)

```bash
npx vercel login          # once
npx vercel                # preview deploy
npx vercel --prod         # production
```

### Attach the kaiships.ai domain (after registering it)

1. Vercel dashboard → project → Settings → Domains → add `kaiships.ai` + `www.kaiships.ai`.
2. At the registrar, point the apex A record to `76.76.21.21` and `www` CNAME to `cname.vercel-dns.com`.
3. `src/lib/site.config.ts` already uses `https://kaiships.ai` as canonical.

## Built-in SEO/AEO

Per-page metadata + canonical, static OG images per route (`opengraph-image.tsx`), JSON-LD (WebSite, Person, Article, BlogPosting, FAQPage), `sitemap.xml`, `robots.txt`, `rss.xml`, `llms.txt`, security headers in `next.config.ts`.
