/**
 * kaiships.ai — all site copy, links, and funnel wiring live here.
 * Edit this file to change content; components never hardcode copy.
 */

export const siteConfig = {
  name: "kaiships.ai",
  domain: "kaiships.ai",
  // kaiships.ai has no DNS yet (checked 2026-10-02); the live site is the Vercel URL.
  url: "https://kai-ships-ai-website.vercel.app",
  tagline: "A reel for what you built with Claude Code.",
  bio: "Kaiships Studio: type what your product does and get a vertical reel with voice, animation, captions and music. No camera. $30 one-time, 7-day refund.",
  keyword: "PACK",

  socials: {
    instagram: "https://instagram.com/kaiships.ai",
    instagramDm: "https://ig.me/m/kaiships.ai",
    tiktok: "https://tiktok.com/@kaiships.ai",
    x: "https://x.com/kaiships",
    youtube: "https://youtube.com/@kaiships",
    email: "kai@kaiships.ai",
  },

  // The one paid product. Every fact here comes from the settled offer
  // (crowsnest first-principle/da-chac-chan.html, step 3). Don't add numbers
  // that are not in that file.
  studio: {
    name: "Kaiships Studio",
    price: "$30",
    refundDays: 7,
    checkout:
      "https://buy.polar.sh/polar_cl_yqXEKmmPW7SvfiYAfeDll5InhQ2jiUaJp8UtZ2GvObZ",
    headline: "You built it with Claude Code. Nobody knows yet.",
    sub: "Type what it does. Get a vertical reel with voice, animation, captions and music. No camera.",
    buyNote: "One payment. 7-day refund.",
    tutorial: {
      video: "/proof/tutorial-9m38.mp4",
      poster: "/proof/tutorial-poster.jpg",
      label: "A real run · 9:38 video of a 50:26 session",
      caption: "One real run, waits sped up and labelled. The clock shows real time.",
    },
    reel: {
      video: "/proof/studio-fall.mp4",
      poster: "/proof/studio-fall-cover.png",
      label: "A reel made by it, about itself · 0:30",
      caption: "Made by the product, about itself. Its own review scored the hook 7/10.",
    },
    facts: [
      { k: "My run", t: "Two fast-preview reels in about 50 minutes on my Mac." },
      {
        k: "You need",
        t: "Claude Code · macOS, Windows or Linux · 900 MB setup. Your Claude plan is not included in the price.",
      },
      { k: "Instead of", t: "Filming yourself · hiring an editor · template apps." },
      { k: "Refund", t: "Can't make a reel on your machine? DM @kaiships.ai within 7 days for a refund." },
      { k: "My numbers", t: "Top reel passed 100K views. My revenue from this so far: $39.99." },
      { k: "No promises", t: "It makes the reel. It can't promise views or sales." },
    ],
  },

  // Free guides sent by DM from each reel. One Google Doc or PDF per keyword.
  magnets: [
    { keyword: "SONNET", title: "Which Claude for which task", desc: "Cheat sheet: when Sonnet is enough and when to pay for Opus.", href: "https://docs.google.com/document/d/14CADI_1mycKoCNwsywbgs_PGTJLOHS3IPArNWLGJ5Jk/view" },
    { keyword: "EFFORT", title: "Claude Effort Cheat Sheet", desc: "Which effort setting to use for which job.", href: "https://docs.google.com/document/d/1L_H-sULYJEXkR2ocAfmztiQMkHvrQ43VTYk9I2aPJ5k/view" },
    { keyword: "CODING", title: "4 plugins before you vibe code", desc: "The four Claude Code plugins from my most-watched reel, with install steps.", href: "https://docs.google.com/document/d/1COe3DX17s28oRRF2IRh0tZ42c1gJSEd_YMQ6DK1gvZA/view" },
    { keyword: "FRONTEND", title: "5 Claude Code plugins for better front-end design", desc: "Five plugins that make Claude's UI output look designed.", href: "https://docs.google.com/document/d/1ffMhTUVEFRlfMAdqpp07gRaHUe5ba9cSG8LW3qepvAQ/view" },
    { keyword: "APPLE", title: "Apple design skill for Claude + the 2 prompts", desc: "The skill and the two prompts I use for Apple-style interfaces.", href: "https://docs.google.com/document/d/1-rQAITnIPu3PK5QcEFGinThVmzpLpSQMy7GHpLwbKv0/view" },
    { keyword: "GOOGLE", title: "15 Free Google AI Tools", desc: "Fifteen free AI tools from Google, with links.", href: "https://docs.google.com/document/d/1BfQ57l6npagzcCvpaQHQd0andzhLDDsFr8jCjazpfCk/view" },
    { keyword: "DIE", title: "Claude web-design setup", desc: "The setup from the \"Claude just killed web designers\" reel.", href: "https://docs.google.com/document/d/1ehxOBkuk_Ygja2CABx80MiCcQV4KqbaAdWaloquRixE/view" },
    { keyword: "SKILL", title: "Agent Reach guide", desc: "Read the web from your terminal: install, playbooks, and what to watch for.", href: "/ig/agent-reach-guide/slide1.pdf" },
    { keyword: "TOOLS", title: "Sunday Content Engine playbook", desc: "How I plan a week of content in one sitting.", href: "/ig/sunday-content-engine/slide1.pdf" },
  ],

  hero: {
    eyebrow: "kaiships.ai — Claude Code content systems for solo builders",
    // H1 renders as: {h1Plain} + {h1Accent (serif italic + cursor)}
    h1Plain: "Real Claude Code agents.",
    h1Accent: "No slop.",
    sub: "Claude Code that researches, writes, and renders your Instagram carousels and reels — running on your own machine. You approve and post. It's the Content Machine Kit, tested on a real product before it reached you.",
    primaryCta: {
      label: "Claim a launch seat — $99",
      href: "https://buy.polar.sh/polar_cl_ifrFWJmjWHztffFq6xwQQlWSJQAbOeUbIZ9hD1xW7oi",
    },
    secondaryCta: { label: "Get the free PACK", href: "/pack" },
    terminal: {
      title: "content-machine — zsh",
      command: '/ksa:ideas "ai tools for solo builders"',
      lines: [
        { kind: "ok", text: "12 angles ranked by proof" },
        { kind: "cmd", text: "/ksa:reach 03 --mode carousel" },
        { kind: "ok", text: "8-slide spec — ends in 'comment PACK'" },
        { kind: "cmd", text: "/ksa:cooking" },
        { kind: "ok", text: "slides + 9:16 reel rendered, local VO" },
        { kind: "cmd", text: "/ksa:serve" },
        { kind: "accent", text: "posted to Instagram — or bundled, your call" },
      ],
      prompt: "kai ships daily",
    },
  },

  ship: {
    eyebrow: "What I ship",
    title: "Installable systems,",
    titleAccent: "not prompt lists.",
    sub: "Everything is a file you drop into Claude Code. If it can't be installed and verified, I don't publish it.",
    items: [
      {
        title: "Agent Templates",
        desc: "Autonomous agents for the boring work — inbox triage, file wrangling, content pipelines. Wired, not described.",
        demo: "$ claude agent run inbox-triage",
        icon: "bot",
      },
      {
        title: "Claude Code Skills",
        desc: "Drop-in skills that make Claude Code sharper: verification gates, token control, shipping rituals.",
        demo: "$ npx kaiships add verify-before-trust",
        icon: "zap",
      },
      {
        title: "CLAUDE.md Systems",
        desc: "The operating file that stops agent drift and token burn. Curated, opinionated, battle-run daily.",
        demo: "✓ CLAUDE.md merged — drift guard on",
        icon: "file",
      },
      {
        title: "Weekly Drops",
        desc: "One new skill or agent every week inside the community — built for real problems members actually hit.",
        demo: "→ drop 07: landing-page-weekend",
        icon: "ship",
      },
    ],
  },

  approach: {
    eyebrow: "Approach",
    title: "Built. Verified.",
    titleAccent: "Then shipped.",
    sub: "The same four-step loop runs this business and everything in the library.",
    steps: [
      {
        num: "01",
        title: "Build",
        desc: "On a real product with real stakes — not a demo repo. Every skill and agent earns its place in my daily stack first.",
        detail: "Solo builder. Real deadlines.",
      },
      {
        num: "02",
        title: "Verify",
        desc: "Every claim gets tested before it ships. Costs measured, failure modes documented, screenshots receipts. If I can't verify it, I say so.",
        detail: "Tested > viral.",
      },
      {
        num: "03",
        title: "Ship",
        desc: "Installable files, not screenshots of prompts. You get the exact CLAUDE.md, skill, or agent — drop it in and run.",
        detail: "Files you can install today.",
      },
      {
        num: "04",
        title: "Document",
        desc: "Built in public. What worked, what broke, what it cost — in the ship log, every week, numbers included.",
        detail: "The ship log is the proof.",
      },
    ],
  },

  // Content Machine Kit — the paid product (rung 1: free PACK → Kit → community).
  kit: {
    name: "Content Machine Kit",
    price: "$99",
    regularPrice: "$149",
    seats: "First 20 seats at launch price",
    priceNote: "launch price · one-time · no subscription",
    checkoutUrl: "https://buy.polar.sh/polar_cl_ifrFWJmjWHztffFq6xwQQlWSJQAbOeUbIZ9hD1xW7oi",
    // TODO(kai): public roadmap URL; roadmap link hidden while empty.
    roadmapUrl: "",
    tagline: "Turn Claude Code into your",
    taglineAccent: "content machine.",
    sub: "An installable system that runs on your machine: ideate → carousels + reels → publish to Instagram. No subscription, no hosted middleman — your keys, your repo, your output.",
    included: [
      "5 KSA commands — the full ideate → publish pipeline",
      "Keyless carousel render — no design-tool API needed",
      "9:16 reels with local voiceover",
      "One-click Instagram publish, or a post-ready bundle",
      "Lifetime updates via git pull",
      "Private GitHub repo + Discord access",
    ],
    need: [
      "A Claude subscription — Pro works, Max is comfortable",
      "It's a builder's tool, not no-code — you run it in a terminal",
      "One-click auto-publish needs an Instagram Business/Creator account linked to a Facebook Page — without it you still publish via the post-ready bundle",
      "A pipeline run takes minutes, not seconds",
    ],
    guarantee: "30-day money-back — and you keep the files. Payment and delivery handled by Polar (Merchant of Record); repo + Discord access is granted right after checkout.",
    buyLabel: "Claim a launch seat — $99",
    pageCta: { label: "See the Content Machine Kit", href: "/kit" },
    terminal: {
      title: "content-machine — zsh",
      lines: [
        { kind: "cmd", text: "/ksa:ideas \"ai tools for solo builders\"" },
        { kind: "ok", text: "12 angles ranked by proof" },
        { kind: "cmd", text: "/ksa:reach 03 --mode carousel" },
        { kind: "ok", text: "8-slide spec — ends in 'comment PACK'" },
        { kind: "cmd", text: "/ksa:cooking" },
        { kind: "ok", text: "slides + 9:16 reel rendered, local VO" },
        { kind: "cmd", text: "/ksa:serve" },
        { kind: "accent", text: "posted to Instagram — or bundled, your call" },
      ],
    },
  },

  community: {
    eyebrow: "Community",
    title: "Ship with people who",
    titleAccent: "actually ship.",
    sub: "Two live rungs, priced plainly: the free PACK and a one-time Kit. A community is coming after launch — no high-ticket upsell hiding behind a call booking.",
    free: {
      label: "Free",
      title: "The Starter PACK",
      desc: "A curated CLAUDE.md, model-routing config, 18 tested skills + 4 subagents — installable in minutes. DM the word PACK on Instagram, or drop your email and get the repo instantly.",
      cta: { label: "Get the PACK", href: "/pack" },
    },
    paid: {
      status: "Coming after launch",
      title: "The kaiships community",
      desc: "A living skills library planned for after launch: a new tested skill or agent drop every week, plus direct support when your setup breaks. Not open yet — I ship it once the free PACK and the Kit are earning.",
      bullets: [
        "Planned: weekly skill + agent drops, verified before release",
        "Planned: the full living library — every drop, updated",
        "Planned: direct help from Kai when things break",
        "Early members get first access when the doors open",
      ],
      cta: { label: "Get the PACK while you wait", href: "/pack" },
      note: "Not open yet. Grab the free PACK now — you'll be first to hear when the community opens. No dead links, no pre-sold vaporware.",
    },
  },

  shipLog: {
    eyebrow: "Ship log",
    title: "Built in public,",
    titleAccent: "numbers included.",
    sub: "What shipped, what broke, what it cost.",
    cta: { label: "Read the ship log", href: "/blog" },
  },

  ctaBand: {
    title: "Start with the PACK.",
    sub: "DM the keyword on Instagram, or drop your email — the repo link lands in your inbox and on your screen at the same time.",
    keyword: "PACK",
    dmCta: { label: "DM PACK on Instagram", href: "https://ig.me/m/kaiships.ai" },
    libraryCta: { label: "Get it by email", href: "/pack" },
  },

  marquee: [
    "verify-before-trust",
    "token-guard",
    "ship-log",
    "inbox-agent",
    "CLAUDE.md",
    "content-pipeline",
    "file-organizer",
    "weekly-ship",
    "landing-weekend",
    "multi-agent panes",
  ],

  footer: {
    links: [
      { label: "Instagram", href: "https://instagram.com/kaiships.ai" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
    clawd: "Clawd is Anthropic's Claude Code mascot, redrawn in code. Unofficial, not affiliated with Anthropic.",
    legal: "© 2026 Kaiships. All rights reserved.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
