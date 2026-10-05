/**
 * The offer ladder beyond the Reel Kit: Kaiships School (course + kit + skills)
 * and the Skill Library. Prices and checkout links match Polar (created
 * 2026-10-06, run R11). The Reel Kit itself lives in site.config.ts.
 *
 * Only module 1 of the course is public (content/school/module-1.md).
 * Modules 2–6 ship in the buyer's download, never in this public repo.
 */

export type Module = {
  n: number;
  title: string;
  summary: string;
  minutes: number;
  lessons: string[];
  free?: boolean;
};

export type Skill = {
  name: string;
  title: string;
  oneLiner: string;
  tier: "free" | "pro";
  triggers: string[];
};

export const school = {
  name: "Kaiships School",
  tagline: "Faceless reels that sell, made with Claude Code.",
  price: "$79",
  priceNote: "one-time · no subscription",
  checkout: "https://buy.polar.sh/polar_cl_LSvwhPWoogzt23rSP4sxQ8Bwd4HrE9CcC2Zjf37AgS6",
  polarProductId: "f7148bd4-468d-4acf-8b4c-756bc4cffdcf",
  guarantee:
    "If it doesn't work for you, DM @kaiships.ai and I'll help you fix it. Still not happy within 14 days, you get a full refund.",
  // Real list prices of what's inside (Polar). The course itself has no
  // separate price.
  stack: [
    { item: "The 6-module course (below)", value: "only in School" },
    { item: "Kaiships Reel Kit: one prompt → a finished reel", value: "$50 on its own ($29.99 launch price until Oct 9)" },
    { item: "Kaiships Skill Library: 9 Claude Code skills", value: "$19 on its own" },
  ],
  modules: [
    {
      n: 1,
      free: true,
      title: "The system, and your first script tonight",
      summary:
        "The whole faceless-reel machine on one page with my real numbers, then set up Claude Code and write your first 30-second script.",
      minutes: 75,
      lessons: [
        "The whole machine on one page",
        "Why animated faceless reels",
        "Set up Claude Code",
        "Exercise: your first 30-second script",
      ],
    },
    {
      n: 2,
      title: "Find ideas that already won",
      summary:
        "Spot outlier posts by hand, filter ideas with my GREEN/RED rubric, and turn one outlier into your own checked angle.",
      minutes: 90,
      lessons: [
        "Outliers, and how to find them by hand",
        "My GREEN and RED rubric",
        "Turn one outlier into your own angle",
        "Exercise: a 10-idea list in 30 minutes",
      ],
    },
    {
      n: 3,
      title: "Scripts that hold people",
      summary:
        "A hook in the first two seconds, one idea per reel, one keyword at the end, and only claims that are true.",
      minutes: 60,
      lessons: [
        "The hook in the first 1–2 seconds",
        "One idea per reel, proof on screen",
        "The CTA: one unused keyword per post",
        "Fact-check before you render",
      ],
    },
    {
      n: 4,
      title: "Make the reel with Claude",
      summary:
        "Turn a checked script into a finished vertical reel with the Reel Kit, check it before posting, and post on a steady rhythm.",
      minutes: 75,
      lessons: [
        "How the Kaiships Reel Kit works",
        "Prompts that work",
        "QA before posting: a checklist",
        "Posting: rhythm, cover, caption",
      ],
    },
    {
      n: 5,
      title: "Comment → DM → email",
      summary:
        "Turn a keyword comment into an email address you own: the DM, the gift page, a 3-email nurture, and the numbers to check.",
      minutes: 75,
      lessons: [
        "The keyword funnel",
        "The gift page",
        "Email: welcome, value, offer",
        "What to measure per reel",
      ],
    },
    {
      n: 6,
      title: "Sell one product",
      summary:
        "Pick what your viewers already ask for, shape one offer, price it once, and wire checkout so delivery runs without you.",
      minutes: 80,
      lessons: [
        "Pick one product your viewers already ask for",
        "Build the offer: the value equation",
        "Checkout and automatic delivery",
        "Lessons from my own launch",
      ],
    },
  ] satisfies Module[],
  faq: [
    {
      q: "Is this a subscription?",
      a: "No. You pay once and keep everything, including updates to the files.",
    },
    {
      q: "How do I get it?",
      a: "Polar (the payment company) emails you the download links right after you pay. The course is 6 written modules, 24 lessons, as Markdown files you open in any editor (or paste into Claude and ask it to coach you). Each module ends with an exercise. The Reel Kit and the 9 skills come as zip files.",
    },
    {
      q: "Do I need to know how to code?",
      a: "No. You install two free apps (Node.js and Claude Code), then paste prompts. Module 1 walks you through it, and it's free, so you can try that part first.",
    },
    {
      q: "What else do I need to pay for?",
      a: "A Claude plan that includes Claude Code. The Reel Kit's voiceover, music and sound are free. I run it on Claude Max; on a smaller plan a long reel can hit your usage limit and you continue later.",
    },
    {
      q: "Does the Reel Kit work on Windows?",
      a: "I've only tested it on Apple Silicon Macs. The course and the skills work anywhere Claude Code runs.",
    },
    {
      q: "I already bought the Reel Kit. Do I pay again?",
      a: "DM @kaiships.ai with your order email and I'll send you a code that takes the Kit's price off.",
    },
  ],
};

export const library = {
  name: "Kaiships Skill Library",
  tagline: "The Claude Code skills I use to run kaiships.ai.",
  price: "$19",
  priceNote: "one-time · 9 skills",
  checkout: "https://buy.polar.sh/polar_cl_UFZqjKsrTPjfDJABkWQ4Z9VZzeG5z7YDBnojW05IQqB",
  polarProductId: "5596945f-1cd4-4127-ac0e-127f5f6b4baf",
  // The free starter pack is the `skills` magnet in magnets.ts.
  freeSlug: "skills",
};

export const skills: Skill[] = [
  {
    "name": "content-plan",
    "title": "Outlier Ideas to Reel Scripts",
    "oneLiner": "Turns proven niche posts into a month idea graph and fact-checked scripts.",
    "tier": "pro",
    "triggers": [
      "plan my month of reels",
      "write scripts for next week",
      "find outlier ideas in my niche"
    ]
  },
  {
    "name": "content-week",
    "title": "One-Line Weekly Content Run",
    "oneLiner": "Turns one request into a week of scripts, a shoot list and captions.",
    "tier": "pro",
    "triggers": [
      "do next week's content",
      "run the week",
      "clips are done, package week 41"
    ]
  },
  {
    "name": "comment-dm-funnel",
    "title": "Comment-to-DM Lead Funnel",
    "oneLiner": "Builds the comment KEYWORD to DM to gift page to email funnel for a reel.",
    "tier": "pro",
    "triggers": [
      "set up the funnel for this reel",
      "make a comment-to-DM lead magnet",
      "create the automation for my video"
    ]
  },
  {
    "name": "offer-doctor",
    "title": "Offer Doctor Diagnosis",
    "oneLiner": "Finds the one thing blocking your sales and gives a 7-day fix.",
    "tier": "pro",
    "triggers": [
      "why is nobody buying my offer",
      "how should I price and package this",
      "I feel stuck, what should I do next to make money"
    ]
  },
  {
    "name": "business-cook",
    "title": "Fix or Grow One Block",
    "oneLiner": "Turns a money goal into bets, builds and verifies them, and shows evidence per result.",
    "tier": "pro",
    "triggers": [
      "fix my checkout",
      "grow my email list",
      "make a plan to reach $300"
    ]
  },
  {
    "name": "finance-ledger",
    "title": "Honest Money Ledger",
    "oneLiner": "Keeps one ledger of money in and out, syncing Polar or Stripe orders without duplicates.",
    "tier": "pro",
    "triggers": [
      "sync my finances",
      "add an expense",
      "show my ledger"
    ]
  },
  {
    "name": "weekly-review",
    "title": "Weekly Business Review",
    "oneLiner": "Pulls your real numbers, compares them to your goal, and names the one biggest gap.",
    "tier": "free",
    "triggers": [
      "weekly review",
      "how did last week go",
      "where is my biggest gap"
    ]
  },
  {
    "name": "lead-magnet-page",
    "title": "Free Guide Page Builder",
    "oneLiner": "Builds a fact-checked free guide page or PDF you can use as a lead magnet.",
    "tier": "free",
    "triggers": [
      "build a lead magnet",
      "make a free guide",
      "turn this into a PDF freebie"
    ]
  },
  {
    "name": "market-research",
    "title": "Demand Validation Research",
    "oneLiner": "Checks if people want your idea: demand, customers, competitors, one clear verdict.",
    "tier": "free",
    "triggers": [
      "does the market need this",
      "validate demand for my idea",
      "who are my competitors"
    ]
  }
];
