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
    // "Kai Ship AI Community", invite never expires (checked 2026-11-03).
    discord: "https://discord.gg/MAAJmghmrA",
  },

  // The one paid product. Every fact here comes from the settled offer
  // (crowsnest first-principle/da-chac-chan.html, step 3), the approved
  // wireframe (trang-ban-nhap.md) or the product README (studio-reel v1.6).
  // Don't add numbers that are not in those files.
  studio: {
    name: "Kaiships Studio",
    price: "$30",
    refundDays: 7,
    checkout:
      "https://buy.polar.sh/polar_cl_yqXEKmmPW7SvfiYAfeDll5InhQ2jiUaJp8UtZ2GvObZ",
    headline: "You built it with Claude Code. Nobody knows yet.",
    sub: "Type what it does. Claude Code makes the reel on your machine: script, voice, scenes, captions and music. No camera.",
    // The refund condition, said where the money decision happens (offer:
    // "Không ra được reel: hoàn tiền trong 7 ngày").
    // Non-breaking spaces keep the refund sentence on one line on a phone.
    buyNote: "One payment. Can't\u00a0make\u00a0a\u00a0reel\u00a0in\u00a07\u00a0days?\u00a0Refund.",
    // Every buy button says the outcome, then the price (no surprise at checkout).
    cta: "Make my reel",
    prompt: "/studio a promo for my app",
    nav: [
      { label: "Real run", href: "#real-run" },
      { label: "How it works", href: "#how" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],

    // Reels that exist. Views read from the Instagram Graph API on
    // 2026-11-03 (kaiship-business ig_stats.py posts, read-only).
    reels: [
      { id: "studio-fall", video: "/proof/studio-fall-loop.mp4", poster: "/proof/studio-fall-poster.jpg", tag: "Made by Studio, about itself" },
      { id: "reel37", video: "/night-full/top-reels/reel37.mp4", poster: "/night-full/top-reels/reel37.jpg", tag: "241.9K views" },
      { id: "reel11", video: "/night-full/top-reels/reel11.mp4", poster: "/night-full/top-reels/reel11.jpg", tag: "130.8K views" },
      { id: "reel49", video: "/night-full/top-reels/reel49.mp4", poster: "/night-full/top-reels/reel49.jpg", tag: "50.4K views" },
      { id: "reel45", video: "/night-full/top-reels/reel45.mp4", poster: "/night-full/top-reels/reel45.jpg", tag: "15.3K views" },
      { id: "reel26", video: "/night-full/top-reels/reel26.mp4", poster: "/night-full/top-reels/reel26.jpg", tag: "11.0K views" },
    ],
    reelsSource: "My own reels, made in Studio's hand-drawn style. Views on Instagram, Nov 3, 2026.",

    how: {
      title: ["One prompt.", "Six jobs. One MP4."],
      lead: "You type what your product does and pick a style. Claude runs six jobs, one after another, and hands you a 1080×1920 MP4 with a cover, ready to post.",
      steps: [
        { k: "Writer", t: "It writes the words.", d: "From one line about your product, it writes the script with the hook in the first 3 seconds. Or paste your own script and it keeps every word." },
        { k: "Narrator", t: "A voiceover. No microphone.", d: "Text to speech, line by line. A speech-to-text check listens back to every line and redoes the ones that come out wrong." },
        { k: "Director", t: "One of 52 film styles.", d: "It suggests two or three styles that fit, each with a preview. Every frame is drawn in code: no video generation, no stock footage." },
        { k: "Captions", t: "Captions on every word.", d: "Word timings come from the voice, so each caption lands on its word. They are burned into the picture." },
        { k: "Composer", t: "Music and sound effects.", d: "A score and sound effects built on the same timeline as the picture, then mixed under the voice." },
        { k: "Reviewer", t: "It checks its own work.", d: "It scores the hook against a bar of 8/10 and tells you when it misses. Then it scans the MP4 and fixes what is wrong, up to 3 rounds." },
      ],
      // Scene text for the phone mock, taken from the studio-fall reel itself.
      hook: "I just launched Kaiships Studio. Watch Clawd fall through it.",
      caption: "It turns one line into a finished reel, all in code.",
      styles: [
        { name: "Kai Hand-Draw Reel", img: "/night/styles/kai-hand-draw.jpg" },
        { name: "Living Screencast", img: "/night/styles/living-screencast.jpg" },
        { name: "ASCII / CRT Terminal", img: "/night/styles/ascii-crt.jpg" },
      ],
      review: "hook 7/10, bar 8/10",
      output: "studio-fall.mp4",
    },

    realRun: {
      title: ["One real run,", "start to finish."],
      lead: "My Mac, one session: I say what Studio is, it suggests styles, writes, renders and reviews. About 50 minutes of real time in a 9:38 video.",
      // 1440p master for wide screens, 720p for phones. Both stream only
      // when the visitor presses play.
      sources: [
        { src: "/proof/tutorial-1440.mp4", media: "(min-width: 901px)" },
        { src: "/proof/tutorial-720.mp4" },
      ],
      poster: "/proof/tutorial-poster.jpg",
      playLabel: "Watch the real run · 9:38",
      caption: "One real run, waits sped up and labelled. The clock shows real time.",
      reel: {
        video: "/proof/studio-fall.mp4",
        poster: "/proof/studio-fall-poster.jpg",
        title: "The reel from this run",
        text: "30 seconds, made about itself. A fast preview, not the final render. Turn the sound on.",
      },
      facts: [
        { k: "Time", t: "About 50 minutes for two fast-preview reels." },
        { k: "Machine", t: "My Mac, with the setup already downloaded." },
        { k: "Your first time", t: "The setup downloads about 900 MB first." },
        { k: "Its own review", t: "Flagged both hooks at 7/10, under the 8/10 bar." },
      ],
    },

    users: {
      title: "In their words.",
      lead: "People who tried my earlier kit told me this. Tap a handle to see who they are.",
      // The one paying buyer leads; then the quotes about making videos.
      // The two quotes about slides are left out: not the buyer's job.
      featured: "i.sonnenkinder",
      show: ["thanh.hai2802", "nhatpt_", "gnikylenol_ndb"],
    },

    pricing: {
      title: "Pay once. Keep it.",
      lead: "What it replaces, what you get, and everything it costs you.",
      plan: "Kaiships Studio",
      note: "Polar emails you the download link.",
      gets: [
        "Promo reels of your product, ready to post: 1080×1920 MP4 with a cover",
        "Script, voice, scenes, captions and music, made for you",
        "52 film styles to pick from",
        "Every hook scored against a bar of 8/10, so you know before you post",
        "Unlimited reels, personal or commercial use",
        "Discord help",
      ],
      costs: [
        { k: "Money", t: "$30 once. No monthly plan, no upsell. Your Claude plan is separate." },
        { k: "Effort", t: "One line about your product, then pick a style. No camera, no editing." },
        { k: "Time", t: "My run: about 50 minutes for two reels, with the setup already downloaded." },
        { k: "Risk", t: "Can't make a reel on your machine? DM @kaiships.ai within 7 days for a refund." },
      ],
      // What Studio removes next to each alternative from the wireframe.
      // Claims are about Studio only, not about other people's products.
      insteadOf: [
        { k: "Filming yourself", t: "Here: no camera, no retakes, no editing." },
        { k: "Hiring an editor", t: "Here: no fee per video. $30 once, unlimited reels." },
        { k: "Template apps", t: "Here: no monthly plan, and the script, voice and music are made for you." },
      ],
    },

    before: {
      title: "What you need.",
      needs: [
        { t: "Claude Code", d: "Studio runs inside it. Your Claude plan is not included in the $30." },
        { t: "A computer: macOS, Windows or Linux", d: "Not a phone. Heavier 3D styles run better with a GPU." },
      ],
      promise: "It makes the reel. It can't promise views or sales.",
      faq: [
        {
          q: "What if it doesn't work on my machine?",
          a: "Ask in the Discord and I'll help you get it running. If you still can't make a reel on your machine within 7 days, DM @kaiships.ai on Instagram for a refund.",
          cta: { label: "Join the Discord", href: "https://discord.gg/MAAJmghmrA", event: "discord-click" },
        },
        { q: "What happens after I pay?", a: "Polar emails you the download, about 180 MB. Unzip it, open the folder in Claude Code and type /studio. The first run sets everything up: it downloads about 900 MB of tools into the Studio folder, so it needs internet." },
        { q: "How long does a reel take?", a: "My real run made two fast-preview reels in about 50 minutes on my Mac, with the setup already downloaded. Your first run also downloads the tools before it starts." },
        { q: "Is there a monthly fee?", a: "Not from me. $30 once, no subscription, no upsell. You use your own Claude plan." },
        { q: "Can I use the reels for my business?", a: "Yes. Unlimited reels, personal or commercial, with no watermark. Please don't share or resell Studio itself." },
        { q: "Do I need to film or edit anything?", a: "No. Claude writes the script, makes the voiceover, draws every scene in code, adds captions, music and sound effects, and exports the MP4." },
        { q: "Will my reel get views?", a: "It makes the reel. It can't promise views or sales." },
      ],
    },

    final: {
      eyebrow: "Kaiships Studio",
      title: ["Your next reel is", "one prompt", "away."],
    },
  },

  // Early users of the earlier kit, word for word from the home page on main
  // (site.config reelKit.users before PR #22). Handles are real.
  earlyUsers: [
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
      label: "",
      text: "Gotta admit, the kit's visuals are nothing like the usual templates. I make reels faster and they don't have that AI-slop feel like the scammy stuff online. It makes my content look way more consistent. Are you planning to add more templates?",
    },
    {
      name: "Phạm Tiến Nhật",
      handle: "nhatpt_",
      img: "nhatpt_",
      label: "",
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
