/**
 * kaiships.ai — all site copy, links, and funnel wiring live here.
 * Edit this file to change content; components never hardcode copy.
 */

export const siteConfig = {
  name: "kaiships.ai",
  domain: "kaiships.ai",
  // kaiships.ai has no DNS yet (checked 2026-10-02); the live site is the Vercel URL.
  url: "https://kai-ships-ai-website.vercel.app",
  tagline: "One prompt. Claude ships the reel.",
  bio: "Type one prompt and Claude makes the whole reel: script, voiceover, painted animation, captions and music. The Kaiships Reel Kit, plus every free guide from my reels.",
  keyword: "PACK",

  socials: {
    instagram: "https://instagram.com/kaiships.ai",
    instagramDm: "https://ig.me/m/kaiships.ai",
    tiktok: "https://tiktok.com/@kaiships.ai",
    x: "https://x.com/kaiships",
    youtube: "https://youtube.com/@kaiships",
    email: "kaiships.ai@gmail.com",
  },

  nav: [
    { label: "Products", href: "/products" },
    { label: "School", href: "/school" },
    { label: "Skills", href: "/skills" },
    { label: "Free guides", href: "/resources" },
    { label: "About", href: "/about" },
  ],
  navCta: {
    label: "Get the Reel Kit",
    href: "https://buy.polar.sh/polar_cl_HyrrBG3sH6HuMBa6QZndeGTLHaaErzsyHqZwG0sl3bV",
  },

  // The one paid product. Numbers here are real; update them from
  // ig_stats.py / Polar before changing.
  reelKit: {
    name: "Kaiships Reel Kit",
    checkout:
      "https://buy.polar.sh/polar_cl_HyrrBG3sH6HuMBa6QZndeGTLHaaErzsyHqZwG0sl3bV",
    listPrice: "$50",
    price: "$29.99",
    // Pulled from the Instagram Graph API on 2026-10-01 (ig_stats.py).
    stats: {
      date: "Oct 1, 2026",
      followers: "408",
      bestViews: "104K",
      bestSaves: "5.4K",
    },
    bestReel: "https://www.instagram.com/reel/Dd0gXqBy_dw/",
    // The kit's own bundled example, rendered untouched from the v1.2 zip.
    example: {
      video: "/reel-kit/video/kit-example.mp4",
      poster: "/reel-kit/video/kit-example.jpg",
      renderTime: "1 min 41 s",
      length: "17-second",
    },
    // A reel the kit made from the README "A topic" prompt, untouched.
    // null until it has been rendered.
    promptReel: {
      video: "/reel-kit/video/kit-running.mp4",
      poster: "/reel-kit/video/kit-running.jpg",
      note: "Prompt to finished 28-second MP4 in 12 min 42 s on my Mac. 0 edits.",
    } as null | { video: string; poster: string; note: string },
    // One line per job, Blotato-style.
    features: [
      { k: "Script", t: "You give a topic. It writes the words.", d: "Hook first, one idea per reel, in plain spoken lines." },
      { k: "Voice", t: "A voiceover, free.", d: "Natural text-to-speech. No microphone, no voice subscription." },
      { k: "Animation", t: "Every scene, painted.", d: "Hand-drawn characters and props, drawn stroke by stroke in code." },
      { k: "Captions", t: "Word by word, on the beat.", d: "Captions locked to the spoken words, inside Instagram's safe zone." },
      { k: "Sound", t: "Music and sound effects.", d: "Generated on your machine and timed to the words." },
      { k: "Fixes", t: "Say what's wrong. It renders again.", d: "\"The first 3 seconds are too slow\" is a valid prompt." },
    ],
    worksWith: ["Claude Code", "macOS", "Instagram Reels", "TikTok", "YouTube Shorts"],
    founder: [
      "I'm Kai. Product manager by day, builder at night. I wanted to post every day, but one reel ate my whole evening: script, recording, cutting, captions, music.",
      "So I taught Claude to do all of it. One of those reels reached 104K views, and I never filmed a second of it. People kept asking how I made them, so I packed the setup into a kit you can run yourself.",
    ],
    pains: [
      "Write the script",
      "Record yourself, again and again",
      "Cut, animate, add captions",
      "Find music, fix the timing, export",
    ],
    // Prompts copied from the kit README.
    prompts: [
      {
        tab: "A topic",
        text: "Make a 30-second reel about 3 mistakes people make when they start running.",
      },
      {
        tab: "A tone",
        text: "Make a 20-second reel that explains what an API is to a complete beginner. Friendly and a bit funny.",
      },
      {
        tab: "Your facts",
        text: 'Make a 30-second reel for my coffee shop, Moon Beans in Austin. Facts: open 7am–6pm every day, oat flat white is $4.50, we roast in-house. End with "come say hi".',
      },
      {
        tab: "Your script",
        text: 'Make a reel from this script, exactly as written: "Most people quit the gym in week three. Here\'s why…"',
      },
      {
        tab: "Fix it",
        text: "The first 3 seconds are too slow. Make the hook hit harder and render again.",
      },
    ],
    // Reels on @kaiships.ai, numbers from the Graph API on 2026-10-01.
    reels: [
      { id: "reel11-vibe-plugins", url: "https://www.instagram.com/reel/Dd0gXqBy_dw/", views: "104K", saves: "5.4K" },
      { id: "reel15-apple-design", url: "https://www.instagram.com/reel/Dd4BjZ8SssK/", views: "5.7K", saves: "180" },
      { id: "reel16-sonnet-vs-opus", url: "https://www.instagram.com/reel/Dd6nguzSt4G/", views: "3.6K", saves: "32" },
      { id: "reel14-frontend-plugins", url: "https://www.instagram.com/reel/Dd3epGKSN-m/", views: "3.5K", saves: "148" },
      { id: "reel13-google-tools", url: "https://www.instagram.com/reel/Dd3easkS-Qw/", views: "3.2K", saves: "151" },
    ],
    gets: [
      "Script, voiceover, painted animation, captions, music and sound effects",
      "A vertical MP4 (1080×1920) ready to post, with a cover image",
      "Prompts to copy: a topic, a tone, your own facts, or your own script",
      "Unlimited videos, personal or commercial",
      "No extra API keys. The voiceover is free",
    ],
    setup: [
      {
        t: "A Mac",
        d: "Tested on Apple Silicon Macs so far. A computer, not a phone.",
      },
      {
        t: "Install 2 free apps",
        d: "Node.js and Claude Code. About 10 minutes if you have never done it.",
        links: [
          { label: "Node.js", href: "https://nodejs.org" },
          { label: "Claude Code", href: "https://claude.com/claude-code" },
        ],
      },
      {
        t: "Unzip, open, paste a prompt",
        d: "The first run sets everything else up by itself. Your reel lands in the out folder.",
      },
    ],
    users: [
      {
        name: "Thinh",
        handle: "i.sonnenkinder",
        img: "i_sonnenkinder",
        label: "bought the kit",
        text: "Closed the deal with you and it was worth every penny. I like that the templates aren't stuffed with effects. Looks clean, keeps viewers focused on the content.",
      },
      {
        name: "Hải Phạm",
        handle: "thanh.hai2802",
        img: "thanh_hai2802",
        text: "Gotta admit, the kit's visuals are nothing like the usual templates. I make reels faster and they don't have that AI-slop feel like the scammy stuff online. It makes my content look way more consistent. Are you planning to add more templates?",
      },
      {
        name: "Phạm Tiến Nhật",
        handle: "nhatpt_",
        img: "nhatpt_",
        text: "=))) What I need is a template I can pick up and use right away, not one I have to tear apart before it looks good. No idea how, but this kit does exactly that.",
      },
      {
        name: "Đỗ Văn Long",
        handle: "vlonggg23",
        img: "vlonggg23",
        label: "used it for slides",
        text: "Kai, this blew up. I used the kit to make slides for my team. I only meant to try it, but in the meeting everyone asked me for the link. Looks super sharp, really good!!! =)))",
      },
      {
        name: "Nguyễn Linh",
        handle: "nguyn_nlinhh",
        img: "nguyn_nlinhh",
        label: "used it for slides",
        text: "Really easy to use. I used the kit for an internal presentation and the whole company went \"woahh\".",
      },
      {
        name: "Nguyễn Tuấn Ming",
        handle: "gnikylenol_ndb",
        img: "gnikylenol_ndb",
        label: "asked for this in my DMs",
        text: "I need exactly this kind of template, but I had no idea how to make it. I tried Remotion a few times and the output still looked bad.",
      },
    ],
    faq: [
      {
        q: "Do I need to know how to code?",
        a: "No. You unzip the folder, open it in Claude Code and paste a prompt. Claude installs what it needs and writes all the code.",
      },
      {
        q: "Do I need API keys or other subscriptions?",
        a: "No. The voiceover uses a free text-to-speech service, and the music and sound effects are generated on your machine.",
      },
      {
        q: "Does it work on Windows?",
        a: "I have only tested it on Mac with Apple Silicon so far. If it fails on your machine, DM me on Instagram and I'll help you fix it.",
      },
      {
        q: "How long does one reel take?",
        a: "The \"A topic\" prompt above went from prompt to a finished 28-second reel in 12 min 42 s on my Mac, with no edits. Longer or more detailed reels take longer, because Claude writes the script and paints every scene first. My last reel went from one prompt to a first render in 36 minutes and was done at 70, with no edits from me.",
      },
      {
        q: "Can I change the style or the character?",
        a: "The kit is built for this one hand-drawn style and its little mascot. You choose the topic, tone, length, facts and script, and you can ask for changes after each render.",
      },
      {
        q: "What happens after I pay?",
        a: "Polar emails you the download right away. If it won't run, DM @kaiships.ai and I'll fix it with you. Still stuck within 14 days, you get a full refund.",
      },
      {
        q: "Can I use the videos for my business?",
        a: "Yes. Unlimited videos, personal or commercial. Please don't share or resell the kit itself.",
      },
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
    blurb: "One prompt, and Claude ships the reel. Plus every free guide from my reels.",
    cols: [
      {
        title: "Ship",
        links: [
          { label: "Products", href: "/products" },
          { label: "School", href: "/school" },
          { label: "Skills", href: "/skills" },
          { label: "Reel Kit", href: "/#kit" },
          { label: "Starter PACK", href: "/pack" },
          { label: "Free resources", href: "/resources" },
          { label: "Ship log", href: "/blog" },
        ],
      },
      {
        title: "Site",
        links: [
          { label: "About", href: "/about" },
          { label: "Early users", href: "/#users" },
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "Instagram", href: "https://instagram.com/kaiships.ai" },
          { label: "TikTok", href: "https://tiktok.com/@kaiships.ai" },
        ],
      },
    ],
    legal: "© 2026 kaiships.ai. All rights reserved.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
