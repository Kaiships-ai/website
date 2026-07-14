/**
 * kaiships.ai — all site copy, links, and funnel wiring live here.
 * Edit this file to change content; components never hardcode copy.
 */

export const siteConfig = {
  name: "kaiships.ai",
  domain: "kaiships.ai",
  url: "https://kaiships.ai",
  tagline: "Real Claude Code agents. No slop.",
  bio: "Solo builder shipping real AI agents. The exact Claude Code skills + systems I use - tested, no slop.",
  keyword: "PACK",

  socials: {
    instagram: "https://instagram.com/kaiships.ai",
    instagramDm: "https://ig.me/m/kaiships.ai",
    tiktok: "https://tiktok.com/@kaiships.ai",
    x: "https://x.com/kaiships",
    youtube: "https://youtube.com/@kaiships",
    // TODO: replace with the real Discord invite once the community is created
    discord: "https://discord.gg/kaiships",
    email: "kai@kaiships.ai",
  },

  nav: [
    { label: "What I ship", href: "/#ship" },
    { label: "Approach", href: "/#approach" },
    { label: "Community", href: "/#community" },
    { label: "Resources", href: "/resources" },
    { label: "Ship log", href: "/blog" },
  ],
  navCta: { label: "Get the PACK", href: "/pack" },

  hero: {
    eyebrow: "kaiships.ai — Claude Code systems for solo builders",
    // H1 renders as: {h1Plain} + {h1Accent (serif italic + cursor)}
    h1Plain: "Real Claude Code agents.",
    h1Accent: "No slop.",
    sub: "The exact skills, agents, and CLAUDE.md systems I run as a solo builder — tested on a real product before they ever reach you.",
    primaryCta: { label: "Get the free PACK", href: "/pack" },
    secondaryCta: { label: "Browse the library", href: "/resources" },
    terminal: {
      title: "kaiships — zsh",
      command: "npx kaiships add starter-pack",
      lines: [
        { kind: "dim", text: "resolving pack · 18 skills · 4 subagents · CLAUDE.md" },
        { kind: "ok", text: "verify-before-trust … installed" },
        { kind: "ok", text: "token-guard … installed" },
        { kind: "ok", text: "ship-log … installed" },
        { kind: "ok", text: "inbox-agent … wired" },
        { kind: "ok", text: "CLAUDE.md … merged" },
        { kind: "accent", text: "pack verified — 0 slop detected" },
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

  community: {
    eyebrow: "Community",
    title: "Ship with people who",
    titleAccent: "actually ship.",
    sub: "Two rungs. No high-ticket upsell hiding behind a call booking.",
    free: {
      label: "Free",
      title: "The Starter PACK",
      desc: "A curated CLAUDE.md, model-routing config, 18 tested skills + 4 subagents — installable in minutes. DM the word PACK on Instagram, or drop your email and get the repo instantly.",
      cta: { label: "Get the PACK", href: "/pack" },
    },
    paid: {
      label: "$97/mo",
      foundingLabel: "Founding: $47/mo",
      title: "The kaiships community",
      desc: "A living skills library with a new tested skill or agent drop every week, plus direct support when your setup breaks.",
      bullets: [
        "Weekly skill + agent drops, verified before release",
        "The full living library — every drop, updated",
        "Direct help from Kai when things break",
        "Founding rate locked for the first 50 members, grandfathered forever",
      ],
      cta: { label: "Join the founding 50", href: "https://discord.gg/kaiships" },
      finePrint: "Founding rate $47/mo for the first ~50 members, then $97/mo. Cancel anytime — churn is my problem to earn, not yours to manage.",
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
    blurb: "Claude Code systems for solo builders. Tested on a real product. No slop.",
    cols: [
      {
        title: "Ship",
        links: [
          { label: "Starter PACK", href: "/pack" },
          { label: "Resources", href: "/resources" },
          { label: "Ship log", href: "/blog" },
          { label: "Community", href: "/#community" },
        ],
      },
      {
        title: "Site",
        links: [
          { label: "What I ship", href: "/#ship" },
          { label: "Approach", href: "/#approach" },
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "Instagram", href: "https://instagram.com/kaiships.ai" },
          { label: "TikTok", href: "https://tiktok.com/@kaiships.ai" },
          { label: "X / Twitter", href: "https://x.com/kaiships" },
          { label: "YouTube", href: "https://youtube.com/@kaiships" },
        ],
      },
    ],
    legal: "© 2026 kaiships.ai. All rights reserved.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
