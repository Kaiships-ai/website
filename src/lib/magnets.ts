export type Magnet = {
  slug: string;
  kw: string;
  title: string;
  url: string;
  /** Page h1 + meta title. Default: "Your free {title}". */
  heading?: string;
  /** Line under the h1. Default: the guide blurb. */
  blurb?: string;
  /** Button text after signup. Default: "Open the guide →". */
  cta?: string;
  /** Hide the "See the Reel Kit" line after signup. */
  hideKitLine?: boolean;
  /** Loops userGroup. "deal" keeps sales leads out of the "IG lead nurture" workflow (filter userGroup = lead). Default: "lead". */
  group?: "deal";
};

/** Instagram comment->DM lead magnets. Source: kaiship-business magnets.json. */
export const magnets: Magnet[] = [
  { slug: "audit", kw: "AUDIT", title: "Prompt audit", url: "https://docs.google.com/document/d/1YJ1zVzP6Pvr3GidN0z6g6DQpdcsB2AEjLRjJGaQFb2E/view" },
  { slug: "open", kw: "OPEN", title: "OpenAlternative", url: "https://docs.google.com/document/d/1cUu4SbGTP6KYhTCH6ZKImRHbJk--RgdusGypZrbZOk4/view" },
  { slug: "prompt", kw: "PROMPT", title: "prompts.chat", url: "https://docs.google.com/document/d/16QKgLUcjD0CfCQVecbM4YzEhlLbYdg9I3P9VIWKs0wg/view" },
  { slug: "senior", kw: "SENIOR", title: "Agent Skills", url: "https://docs.google.com/document/d/1eCcDMNIoHz6eZDYBpgzCE7RAHujHwGCdZvdCmVkDAdI/view" },
  { slug: "limit", kw: "LIMIT", title: "4 usage-limit tools", url: "https://docs.google.com/document/d/1PuxzdVkYW_VrOQ-LDnWanG_VZQhyDte3SzH4W9azgoM/view" },
  { slug: "scrape", kw: "SCRAPE", title: "3 scraping tools", url: "https://docs.google.com/document/d/1hWd3nO1TH6MOxGb4YiIZUBWO_Ovgbe_I5wdczvYFeZM/view" },
  { slug: "income", kw: "INCOME", title: "4 service repos", url: "https://docs.google.com/document/d/1csaUiVsjcJ1tG9VkthDo3S7Zfc_C35xaLCavEc9QeLI/view" },
  { slug: "api", kw: "API", title: "Free AI API list", url: "https://docs.google.com/document/d/1CddyELg8qpLFr8lZg2dTTMUe1UWx-z-ohFn7WO7VPXU/view" },
  { slug: "repos", kw: "REPOS", title: "4 design repos", url: "https://docs.google.com/document/d/1yYawdzkUnvSajMIguN17NUOrJO-4sGYpZReihLViJdY/view" },
  { slug: "stack", kw: "STACK", title: "AI tool stack", url: "https://docs.google.com/document/d/1vV8aVDThatWyqMx_9GUiS3XhIlXEClmHRwNEe_BDerI/view" },
  { slug: "sonnet", kw: "SONNET", title: "Which Claude cheat sheet", url: "https://docs.google.com/document/d/14CADI_1mycKoCNwsywbgs_PGTJLOHS3IPArNWLGJ5Jk/view" },
  { slug: "google", kw: "GOOGLE", title: "15 Google AI tools", url: "https://docs.google.com/document/d/1BfQ57l6npagzcCvpaQHQd0andzhLDDsFr8jCjazpfCk/view" },
  { slug: "apple", kw: "APPLE", title: "Apple design skill", url: "https://docs.google.com/document/d/1-rQAITnIPu3PK5QcEFGinThVmzpLpSQMy7GHpLwbKv0/view" },
  { slug: "frontend", kw: "FRONTEND", title: "5 frontend plugins", url: "https://docs.google.com/document/d/1ffMhTUVEFRlfMAdqpp07gRaHUe5ba9cSG8LW3qepvAQ/view" },
  { slug: "effort", kw: "EFFORT", title: "Effort cheat sheet", url: "https://docs.google.com/document/d/1L_H-sULYJEXkR2ocAfmztiQMkHvrQ43VTYk9I2aPJ5k/view" },
  { slug: "coding", kw: "CODING", title: "4 vibe plugins", url: "https://docs.google.com/document/d/1COe3DX17s28oRRF2IRh0tZ42c1gJSEd_YMQ6DK1gvZA/view" },
  { slug: "die", kw: "DIE", title: "Web design setup", url: "https://docs.google.com/document/d/1ehxOBkuk_Ygja2CABx80MiCcQV4KqbaAdWaloquRixE/view" },
  { slug: "claude", kw: "CLAUDE", title: "5 Claude Code plugins", url: "https://drive.google.com/file/d/12KGukRg9I29SgUTzY6ValGgVqpEm6XNh/view?usp=sharing" },
  { slug: "design", kw: "DESIGN", title: "5 Claude design plugins", url: "https://drive.google.com/file/d/1ZYRCCVYhrx0w6E2ctW6H211-8mdox9CF/view?usp=sharing" },
  { slug: "skill", kw: "SKILL", title: "Agent Reach guide", url: "https://kai-ships-ai-website.vercel.app/ig/agent-reach-guide/slide1.pdf" },
  { slug: "tools", kw: "TOOLS", title: "AI Tools List", url: "https://kai-ships-ai-website.vercel.app/ig/sunday-content-engine/slide1.pdf" },
  { slug: "frame", kw: "FRAME", title: "Reel Kit", url: "https://buy.polar.sh/polar_cl_HyrrBG3sH6HuMBa6QZndeGTLHaaErzsyHqZwG0sl3bV?utm_source=ig_dm&utm_medium=social&utm_campaign=frame", heading: "Reel Kit launch price", blurb: "Reel Kit ($50) + Token Diet bonus → $29.99 till Oct 9. Token Diet sent to buyers by Oct 5. Drop your email and the checkout opens right here.", cta: "Get the Reel Kit · $29.99 →", hideKitLine: true, group: "deal" },
  { slug: "kit", kw: "KIT", title: "Reel Kit", url: "https://buy.polar.sh/polar_cl_HyrrBG3sH6HuMBa6QZndeGTLHaaErzsyHqZwG0sl3bV?utm_source=ig_dm&utm_medium=social&utm_campaign=kit", heading: "Reel Kit launch price", blurb: "Reel Kit ($50) + Token Diet bonus → $29.99 till Oct 9. Token Diet sent to buyers by Oct 5. Drop your email and the checkout opens right here.", cta: "Get the Reel Kit · $29.99 →", hideKitLine: true, group: "deal" },
  { slug: "learn", kw: "LEARN", title: "vibe-wise", url: "https://github.com/nykooi1/vibe-wise", blurb: "Drop your email and the repo opens right here. I'll also send you the next ones I make.", cta: "Open the repo →" },
];

export const getMagnet = (slug: string) => magnets.find((m) => m.slug === slug);
