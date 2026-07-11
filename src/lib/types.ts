export const RESOURCE_TYPES = [
  "Skills",
  "Agents",
  "Systems",
  "Workflows",
  "Guides",
] as const;
export type ResourceType = (typeof RESOURCE_TYPES)[number];

export const RESOURCE_TOOLS = ["Claude Code", "Claude", "Multi-tool"] as const;
export type ResourceTool = (typeof RESOURCE_TOOLS)[number];

export interface FaqItem {
  q: string;
  a: string;
}

export interface ResourceMeta {
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  tool: ResourceTool;
  date: string; // ISO yyyy-mm-dd
  readTime: number; // minutes
  popular?: boolean;
  faq?: FaqItem[];
}

export const POST_TAGS = ["build-log", "teardown", "numbers"] as const;
export type PostTag = (typeof POST_TAGS)[number];

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  tag: PostTag;
}
