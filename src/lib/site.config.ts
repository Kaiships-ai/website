/**
 * kaiships.ai — all site copy, links, and funnel wiring live here.
 * Edit this file to change content; components never hardcode copy.
 */
import { getProduct, formatDate } from "./products-data";

// Price, checkout and version come from products.json + Polar (pnpm sync:products).
const starterP = getProduct("starter");
const proP = getProduct("pro");
const shipped = proP.includes.filter((i) => i.status === "shipped").map((i) => i.title.toLowerCase());
const proShipLine =
  (shipped.length ? `The first skill (${shipped.join(", ")}) is already in the repo; the rest arrive one a week` : "The Pro skills arrive one a week") +
  (proP.shipsBy ? `, all by ${formatDate(proP.shipsBy)}.` : ".");

export const siteConfig = {
  name: "kaiships.ai",
  domain: "kaiships.ai",
  // kaiships.ai has no DNS yet (checked 2026-10-02); the live site is the Vercel URL.
  url: "https://kai-ships-ai-website.vercel.app",
  tagline: "One prompt. Claude ships the reel.",
  bio: "Type one prompt and Claude makes the whole reel: script, voiceover, painted animation, captions and music. Kaiships Studio, plus every free guide from my reels.",
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
    { label: "Products", href: "/#buy" },
    { label: "Free guides", href: "/guides" },
    { label: "About", href: "/about" },
  ],
  navCta: {
    label: "Buy Pro PreOrder",
    href: proP.checkout,
  },

  // The one paid product. Numbers here are real; update them from
  // ig_stats.py / Polar before changing.
  reelKit: {
    name: "Kaiships Studio",
    checkout: starterP.checkout,
    price: starterP.price,
    version: starterP.version,
    // Pulled from the Instagram Graph API on 2026-10-20 (ig_stats.py).
    stats: {
      date: "Oct 20, 2026",
      followers: "1,189",
      bestViews: "127.6K",
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
      note: "Prompt to finished 28-second MP4 on my Mac. 0 edits.",
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
      "So I taught Claude to do all of it. One of those reels reached 127.6K views (Instagram, Oct 20, 2026), and I never filmed a second of it. People kept asking how I made them, so I packed the setup into a kit you can run yourself.",
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
      { id: "reel11-vibe-plugins", url: "https://www.instagram.com/reel/Dd0gXqBy_dw/", views: "127.6K", saves: "" },
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
        a: "I have only tested it on Mac with Apple Silicon so far. The setup script supports Windows, but it is less tested there. If it fails on your machine, DM me on Instagram and I'll help you fix it.",
      },
      {
        q: "How long does one reel take?",
        a: "A 30-second reel renders in a few minutes, longer on a laptop without a dedicated GPU. The first run also sets everything up, which takes a few minutes and needs internet.",
      },
      {
        q: "Can I change the style or the character?",
        a: "The kit is built for this one hand-drawn style and its little mascot. You choose the topic, tone, length, facts and script, and you can ask for changes after each render.",
      },
      {
        q: "What happens after I pay?",
        a: "Starter: Polar emails you a download link. Pro: you get an invite to the private GitHub repo studio-pro, and `git pull` gets every update. " + proShipLine + " Both plans get the Discord. If it won't run, DM @kaiships.ai and I'll fix it with you.",
      },
      {
        q: "Can I use the videos for my business?",
        a: "Yes. Unlimited videos, personal or commercial. Please don't share or resell the kit itself.",
      },
    ],
  },

  // Kaiships Studio: Starter (= Studio Reel, the old Reel Kit Polar product) + Pro PreOrder.
  // Copy from 00-journal/html-visualization/website-wireframe.html (home:A).
  studio: {
    starter: {
      name: "Starter",
      price: starterP.price,
      priceValue: starterP.priceValue,
      productName: starterP.name,
      currency: starterP.currency,
      version: starterP.version,
      checkout: starterP.checkout,
      sub: "one-time · Studio Reel",
      items: ["Watercolour reel engine + Clawd", "/make-reel + 3 example scripts", "Unlimited reels, commercial use", "Discord help"],
    },
    pro: {
      name: "Pro",
      price: proP.price,
      priceValue: proP.priceValue,
      productName: proP.name,
      currency: proP.currency,
      version: proP.version,
      after: proP.afterPreorderPrice,
      productId: proP.polarProductId,
      checkout: proP.checkout,
      includes: proP.includes,
      shipsBy: proP.shipsBy ? formatDate(proP.shipsBy) : null,
      updatesMonths: proP.updatesMonths ?? null,
      items: [
        "Everything in Starter",
        ...proP.includes.map((i) => `Week ${i.week} · ${i.title}`),
        ...(proP.updatesMonths ? [`${proP.updatesMonths} months of updates`] : []),
      ],
    },
    // Reels made with the Studio Reel engine (ksa-reel-handdrawn). Views from the Instagram API, Oct 20, 2026.
    reels: [
      { id: "reel49-shark", label: "Shark: pitch your idea to 5 Claude sharks", url: "https://www.instagram.com/reel/DeQNRxTyS-v/", views: "40.3K" },
      { id: "reel45-vibe-v2", label: "5 plugins for vibe coding", url: "https://www.instagram.com/reel/DeMxFCtyAm9/", views: "13.3K" },
      { id: "reel48-cli", label: "CLI-Anything", url: "https://www.instagram.com/reel/DePaI0_S9Rj/", views: "4.8K" },
    ] as { id: string | null; label: string; url: string | null; views: string }[],
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
          { label: "Products", href: "/#buy" },
                      { label: "Kaiships Studio", href: "/#buy" },
          { label: "Starter PACK", href: "/pack" },
          { label: "Free resources", href: "/guides" },
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
          { label: "Discord", href: "https://discord.gg/MAAJmghmrA" },
        ],
      },
    ],
    legal: "© 2026 kaiships.ai. All rights reserved.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
