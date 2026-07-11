# kaiships.ai Website — Design Spec

Date: 2026-07-11. Approved by Kai (design direction: Terminal Editorial; structure/stack/funnel/content: green-lit).

## Purpose

Marketing + content site for kaiships.ai. Brand locked 2026-07-11: niche = Claude Code power-user systems (agents + skills) for solo builders. Tagline: "Real Claude Code agents. No slop." Funnel: free installable PACK (comment-to-DM keyword `PACK`) → $97/mo Skool community (founding $47/mo, first 50, grandfathered). Moat: rigorous real-founder — verify everything, no hype, build in public. Copy must read as substance to the r/ClaudeAI crowd: real numbers, honest caveats, installable files not prompt lists.

## Sources

- Structure reference: chaseai.io (Kai likes the organization). Sections cloned: Services, Approach, Community, Blog. Mentorship DROPPED.
- Resources page reference: mavgpt.ai/resources (crawled 2026-07-11, 78-item inventory captured). Ungated library: search + tool/type filter chips + sort, text-forward cards, per-resource article pages with copy-to-clipboard blocks. Email capture decoupled, not a gate.
- Brand facts: Kai-Official-OS vault (`Knowledge/kaiships-ai.md`, Foundation spec, bio-v2, audience personas).

## Information Architecture

```
/                  Home
/resources         Library index (search, filters, sort — client-side)
/resources/[slug]  Resource article (MDX)
/blog              Ship log index
/blog/[slug]       Post (MDX)
/privacy, /terms   Minimal legal
llms.txt, sitemap.xml, robots.txt, rss.xml, dynamic OG images
```

### Homepage sections (order)

1. **Hero** — H1 "Real Claude Code agents. No slop." (serif italic accent + blinking cursor on "No slop"). Sub = positioning bio. CTAs: `Get the free PACK` (filled) + `Browse the library` (ghost). Signature device: dark terminal mockup (macOS dots) live-typing an install → verified ship result lines.
2. **What I ship** (Services clone) — 4 cards: Agent Templates · Claude Code Skills · CLAUDE.md Systems · Weekly Drops. Each card: icon, one-liner, mini terminal demo line.
3. **Approach** — 4 numbered steps: 01 Build (on a real product) → 02 Verify (test every claim) → 03 Ship (installable files) → 04 Document (build in public). Big muted numerals, vertical steps.
4. **Community** — Skool band. Founding-member framing: $47/mo first 50 grandfathered, then $97/mo. Weekly drops = anti-churn. HONESTY RULE: no fabricated member counts, no fake testimonials. Free PACK row above paid row.
5. **Ship log** (Blog clone) — latest 3 posts, link to /blog.
6. **Final CTA band** — PACK keyword mechanic + email fallback.
7. **Footer** — 3 cols (Ship / Company / Connect), socials (@kaiships.ai IG/TikTok, @kaiships X/YouTube), legal links, © kaiships.ai.

## Funnel wiring

Library ungated (SEO/AEO + dev-crowd trust). PACK = flagship magnet: buttons deep-link to Instagram DM (`ig.me/m/kaiships.ai` pattern) with copyable keyword `PACK`; email fallback field (Beehiiv-ready, config stub). Every resource article ends with PACK → community ladder CTA. All keywords/URLs in `site.config.ts`.

## Design system — "Terminal Editorial"

- **Base**: light editorial. Paper `#FAF9F7`, card white, warm ink `#141210`. Airy spacing, generous vertical rhythm, pill buttons, rounded-2xl cards, soft shadows, glassy sticky nav (backdrop-blur).
- **Accent**: flare coral `#E0532F` (hover darker). Distinct from chaseai terracotta #B45309. Success green `#16A34A` for terminal ✓ lines. Amber cursor.
- **Dark terminal panels** as the signature contrast device (hero mockup, card demos, code blocks): bg `#12100E`, mono type, syntax accents in coral/green/amber, traffic-light dots.
- **Type**: Inter (body/UI) + Newsreader italic (editorial display accents — distinct from chase's Instrument Serif) + JetBrains Mono (terminal/code). next/font, self-hosted.
- **Tokens**: all colors/radii/fonts as CSS custom properties in one `globals.css` block + Tailwind v4 `@theme` — theme swap = one file (requirement: easy theme update).
- **Motion**: Lenis smooth scroll; Framer Motion section reveals (fade+rise, stagger), hero terminal typewriter loop, magnetic hover on primary CTAs, marquee strip of skill names, scroll-driven step highlighting in Approach. `prefers-reduced-motion` respected — all motion gated.

## Content plan

- ~14 sample resources as MDX in `content/resources/`: adapted from mavgpt's proven Claude-relevant titles into kaiships niche (Claude Code skills/agents/systems for solo builders; ChatGPT-consumer items dropped). Frontmatter: title, description, type (Skills/Agents/Systems/Workflows/Guides), tool (Claude Code/Claude/Multi), date, readTime, popular, keyword. Body: intro → numbered setup → copy-paste blocks (custom `<Prompt>` component with Copy button) → honest caveats section ("What breaks") → PACK CTA.
- 3 ship-log posts in `content/blog/` from vault build-in-public material (voice: terse, real numbers, no hype).
- All site copy (nav, hero, sections, footer, keywords, socials, Skool URL placeholder) in `lib/site.config.ts` — content configurable without touching components.

## Stack

Next.js 15 App Router (static prerender all routes) · TypeScript · Tailwind CSS v4 · Framer Motion (`motion`) · Lenis · MDX via `next-mdx-remote` + `gray-matter`. No CMS, no DB. pnpm.

## SEO / AEO

Metadata API per route; canonical; OpenGraph + Twitter cards; dynamic OG images via `next/og` (branded terminal-card design); JSON-LD: WebSite + Person (Kai) on home, Article on posts/resources, FAQPage on resource articles with Q&A blocks; `sitemap.ts`, `robots.ts`, RSS; `llms.txt` describing site for answer engines; semantic HTML landmarks; alt text everywhere.

## Performance / quality budgets

Static output; zero client JS where possible (server components; client islands only for search/filter, terminal animation, motion). LCP < 1.5s, CLS ~0, Lighthouse ≥ 95 across the board. Images: none heavy (design is type+terminal driven), SVG/CSS art only. Fonts subset + `display: swap`.

## Security

Static site, no user data endpoints (email form posts to configurable external endpoint stub). Headers via `next.config.ts`: CSP (self + inline styles for Tailwind), X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy minimal. No secrets in repo.

## Deploy

Vercel via `npx vercel` (user runs `npx vercel login` once). Preview deploy → Kai reviews → `--prod`. Domain kaiships.ai attach documented in README (registration still pending per vault).

## Honesty constraints (carry into all copy)

- No invented member counts, revenue claims, or testimonials.
- Sample resources clearly real in structure; where content is illustrative, keep claims generic and verifiable.
- Cost/time numbers only where sourced from vault or clearly framed as examples.

## Out of scope (v1)

Skool embed, payment, auth, CMS, ManyChat integration, newsletter backend (stub + config only), i18n, analytics (config stub for later).
