# kaiships.ai Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship kaiships.ai — Terminal-Editorial marketing site (home, resources library, ship log) — statically built on Next.js 15, deployed to Vercel.

**Architecture:** Fully static Next.js App Router site. Server components everywhere; client islands only for: resources search/filter, terminal typewriter, motion wrappers, copy buttons. Content = MDX files in `content/` + one typed `site.config.ts` for all copy/links. Design tokens = CSS vars in one `@theme` block.

**Tech Stack:** Next.js 15, TypeScript, Tailwind v4, `motion` (Framer Motion), Lenis, next-mdx-remote-client (RSC), gray-matter, next/og. pnpm.

## Global Constraints

- Tagline exact: "Real Claude Code agents. No slop."
- Bio exact: "Solo builder shipping real AI agents. The exact Claude Code skills + systems I use - tested, no slop."
- Keyword: `PACK`. Handles: IG/TikTok `@kaiships.ai`, X/YouTube `@kaiships`. Domain kaiships.ai.
- Pricing copy: $97/mo standard; founding $47/mo first ~50, grandfathered. NO fabricated member counts/testimonials/revenue claims.
- Accent `#E0532F`; paper `#FAF9F7`; ink `#141210`; terminal bg `#12100E`. Fonts: Inter, Newsreader (italic display), JetBrains Mono.
- All motion respects `prefers-reduced-motion`. Lighthouse ≥ 95. All routes statically prerendered.
- Every page: Metadata API + canonical + OG. Sections cloned from chaseai.io org: Services→"What I ship", Approach, Community, Blog→"Ship log". NO Mentorship.

---

### Task 1: Scaffold + design tokens + site config

**Files:**
- Create: Next app root (create-next-app), `src/lib/site.config.ts`, `src/app/globals.css` (tokens), `src/lib/fonts.ts`
- Modify: `src/app/layout.tsx`, `next.config.ts` (security headers), `package.json`

**Interfaces (Produces):**
- `siteConfig` export: `{ name, domain, url, tagline, bio, keyword, socials: {instagram, tiktok, x, youtube, skool, email}, nav: {label, href}[], hero, ship: {title, items[]}, approach: {steps[]}, community, cta, footer }` — all homepage copy lives here.
- CSS vars: `--background, --foreground, --paper, --ink, --accent, --accent-hover, --terminal, --terminal-fg, --success, --amber, --muted, --line` + `@theme inline` mapping to Tailwind colors `paper/ink/accent/terminal/...`; fonts wired as `--font-sans/--font-serif/--font-mono`.

**Steps:**
- [ ] `pnpm create next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack`
- [ ] Add deps: `pnpm add motion lenis gray-matter next-mdx-remote-client`
- [ ] `fonts.ts`: next/font/google — Inter (`--font-sans`), Newsreader italic (`--font-serif`), JetBrains_Mono (`--font-mono`); wire className vars into `<html>` in layout.
- [ ] `globals.css`: token block per Global Constraints + base styles (selection color, focus-visible ring, scrollbar).
- [ ] `site.config.ts`: full typed config with ALL copy (hero H1/sub/CTAs, 4 ship cards + terminal demo lines, 4 approach steps, community tiers, cta band, footer cols, socials incl. `https://ig.me/m/kaiships.ai` DM link, Skool placeholder `https://skool.com/kaiships` flagged `// TODO real URL`).
- [ ] `next.config.ts`: headers() — X-Frame-Options DENY, nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy `camera=(), microphone=(), geolocation=()`, HSTS.
- [ ] Verify: `pnpm build` passes. Commit.

### Task 2: Content pipeline

**Files:**
- Create: `src/lib/content.ts`, `src/lib/types.ts`, `content/resources/*.mdx` (1 fixture), `content/blog/*.mdx` (1 fixture)

**Interfaces (Produces):**
- Types: `ResourceMeta { slug, title, description, type: 'Skills'|'Agents'|'Systems'|'Workflows'|'Guides', tool: 'Claude Code'|'Claude'|'Multi-tool', date, readTime, popular?, faq?: {q,a}[] }`; `PostMeta { slug, title, description, date, readTime, tag }`.
- `getAllResources(): ResourceMeta[]` (sorted popular→date), `getResource(slug): {meta, content}` , `getAllPosts(): PostMeta[]`, `getPost(slug)` — fs+gray-matter, compiled in RSC via next-mdx-remote-client.
- MDX custom components contract for content authors: `<Prompt title="...">...</Prompt>` (mono block + Copy button), `<Callout type="warn|note">` , `<PackCta />`.

**Steps:**
- [ ] Implement types + loaders (readdirSync on `content/`, parse frontmatter, validate required fields — throw with filename on missing).
- [ ] Write 1 fixture MDX per collection exercising every frontmatter field + all 3 components.
- [ ] Verify: `pnpm build` fails on a deliberately broken fixture (missing title), passes when fixed. Commit.

### Task 3: UI primitives

**Files:**
- Create: `src/components/ui/button.tsx` (variants: primary pill filled ink, accent, ghost; magnetic hover for primary), `src/components/ui/badge.tsx`, `src/components/reveal.tsx` (motion in-view fade+rise, stagger, reduced-motion gate), `src/components/terminal.tsx` (dark panel, traffic dots, title, children lines; optional `typewriter` client mode with loop), `src/components/prompt.tsx` (copy-to-clipboard client), `src/components/callout.tsx`, `src/components/section-heading.tsx` (eyebrow mono + serif-italic accent H2), `src/components/marquee.tsx` (CSS animation, pause on hover), `src/components/lenis-provider.tsx`, `src/components/nav.tsx` (glassy sticky, mobile sheet), `src/components/footer.tsx`, `src/components/pack-cta.tsx`
- Test: visual via dev render page (deleted after) — no unit tests for presentational components.

**Steps:**
- [ ] Build primitives per design tokens. Terminal typewriter: types command chars, prints result lines with ✓ stagger, loops with pause; static fallback for reduced motion/SSR.
- [ ] Nav: logo `kaiships.ai_` (mono, blinking cursor block), links from config, CTA `Get the PACK`.
- [ ] Verify: `pnpm build`; render smoke page, eyeball in browser. Commit.

### Task 4: Homepage

**Files:**
- Create: `src/components/sections/hero.tsx`, `ship.tsx`, `approach.tsx`, `community.tsx`, `ship-log.tsx`, `cta.tsx`
- Modify: `src/app/page.tsx`

**Interfaces (Consumes):** siteConfig, primitives, `getAllPosts()` (ship-log preview).

**Steps:**
- [ ] Hero: ambient radial glow blobs (CSS), H1 with serif-italic "No slop" + blink cursor, sub, 2 CTAs, hero Terminal: `$ npx kaiships add starter-pack` → install/verify lines (from config).
- [ ] Ship: 4 cards grid (white, rounded-2xl, hover lift), each w/ mono mini-demo line.
- [ ] Approach: numbered 01–04 rows, big muted mono numerals, scroll-driven active highlight.
- [ ] Community: two-tier card (Free PACK row; paid tier w/ founding $47 framing), honest copy, marquee of skill names between sections.
- [ ] Ship-log: latest 3 posts cards. CTA band: dark terminal-styled full-bleed w/ keyword copy chip `PACK` + IG DM button + email input stub (posts to config endpoint or mailto fallback).
- [ ] Verify build + browser pass. Commit.

### Task 5: Resources library + article template

**Files:**
- Create: `src/app/resources/page.tsx`, `src/app/resources/[slug]/page.tsx`, `src/components/resources-explorer.tsx` (client), `src/components/resource-card.tsx`
- Consumes: content pipeline Task 2.

**Steps:**
- [ ] Index: hero ("Free Claude Code skills, agents & systems" + "Always free. Always tested."), explorer island: search input, tool chips, type chips, sort (Popular/Newest/A-Z), live count, text-forward cards grid (tag pill, title, desc) — filter client-side over serialized meta array.
- [ ] Article: breadcrumb `← All resources`, meta line (type · read · date), H1+sub, MDX body (Prompt/Callout rendered), "What breaks" section convention, `<PackCta />` end, FAQPage JSON-LD from frontmatter `faq`, Article JSON-LD, generateStaticParams.
- [ ] Verify: filters work, copy buttons work, build prerenders all slugs. Commit.

### Task 6: Ship log (blog)

**Files:**
- Create: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`

**Steps:**
- [ ] Index list (date mono, title, desc, tag). Post template: narrow prose column, serif display, mono metadata, Article JSON-LD. generateStaticParams.
- [ ] Verify build. Commit.

### Task 7: Sample content (PARALLEL — content teammate)

**Files:**
- Create: `content/resources/` ~14 MDX, `content/blog/` 3 MDX

**Interfaces (Consumes):** frontmatter schema + MDX components contract from Task 2 (given verbatim in teammate prompt).

**Steps:**
- [ ] Teammate writes 14 resources adapted from crawled mavgpt inventory → kaiships niche (Claude Code focus), each: frontmatter complete, intro, numbered setup, ≥1 `<Prompt>`, "What breaks" `<Callout type="warn">`, 3-item `faq`. Voice: terse, verified, no hype. 3 ship-log posts from vault material.
- [ ] I review every file for honesty constraints + schema validity; `pnpm build` validates. Commit.

### Task 8: SEO/AEO layer

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/rss.xml/route.ts`, `public/llms.txt`, `src/app/og/route.tsx` + per-collection OG (`/resources/[slug]/opengraph-image` alt: single dynamic route w/ params), `src/lib/jsonld.ts`
- Modify: `src/app/layout.tsx` (metadataBase, template, WebSite+Person JSON-LD)

**Steps:**
- [ ] Dynamic OG: branded terminal card (ink bg, mono path, serif title, coral accent) via ImageResponse; wired into metadata for home/resources/posts.
- [ ] JSON-LD helpers, sitemap from content, robots allow + sitemap ref, RSS from posts+resources, llms.txt (site purpose, offer, key URLs).
- [ ] Verify: build; validate JSON-LD (schema.org validator paste), OG renders at `/og?...`. Commit.

### Task 9: Legal, 404, polish

**Files:**
- Create: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/not-found.tsx` (terminal `404: command not found` joke)
- Modify: a11y pass (landmarks, alt, contrast, focus), reduced-motion audit, meta descriptions.

**Steps:**
- [ ] Write minimal real legal copy (no lorem). 404 page. Sweep a11y + contrast (accent on paper ≥ 4.5 for text usage; else darken text usage variant).
- [ ] Verify: `pnpm build`, keyboard nav pass. Commit.

### Task 10: QA + deploy

**Steps:**
- [ ] `pnpm build` clean; run prod server; browser QA all routes (desktop+mobile viewport), fix findings.
- [ ] Lighthouse (Chrome headless) — require ≥95 perf/a11y/best/SEO on `/`, `/resources`, one article.
- [ ] User runs `! npx vercel login`. Then `npx vercel` (preview) → share URL → `npx vercel --prod` after Kai OK. README: domain attach steps for kaiships.ai.
- [ ] Commit + final report.

## Self-review

- Spec coverage: IA ✓ (T4-6,9), funnel ✓ (T1 config + T4 CTA + T5 PackCta), design system ✓ (T1,3), content ✓ (T2,7), SEO/AEO ✓ (T8), perf ✓ (static, islands, T10 gate), security ✓ (T1 headers, static), deploy ✓ (T10), honesty ✓ (T7 review step). Gaps: none.
- Placeholders: Skool URL deliberately config-stubbed (spec: out-of-scope backend; flagged TODO in config) — intentional, documented.
- Type consistency: `ResourceMeta.type` enum matches explorer chips + card pills; `siteConfig` consumed by nav/footer/sections; `faq` drives FAQPage JSON-LD.
