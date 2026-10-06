import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * The free guide library (/guides). One guide per reel, tagged with the reel's
 * comment keyword. Files: content/guides/<slug>.mdx. Every "## " heading starts
 * a section; the first section is free, the rest open after one email.
 */

export const GUIDE_TOPICS = [
  "Claude Code",
  "Plugins & skills",
  "Free tools",
  "Design",
  "Build & sell",
] as const;
export type GuideTopic = (typeof GUIDE_TOPICS)[number];

export type GuideSection = { title: string; body: string };

export type Guide = {
  slug: string;
  title: string;
  /** The reel's comment keyword, upper case (e.g. "LIMIT"). */
  keyword: string;
  topic: GuideTopic;
  summary: string;
  minutes: number;
  date: string;
  /** Instagram permalink of the reel this guide belongs to. */
  reel?: string;
  /** Related School module (1–6). */
  school?: number;
  /** Line under the School link, e.g. "Module 5 builds this funnel step by step." */
  schoolLine?: string;
  /** Markdown before the first "## " heading (usually empty). */
  intro: string;
  sections: GuideSection[];
};

const DIR = path.join(process.cwd(), "content", "guides");

function parse(file: string): Guide {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  for (const f of ["title", "keyword", "topic", "summary", "minutes", "date"]) {
    if (data[f] === undefined || data[f] === null || data[f] === "") {
      throw new Error(`guides: "${file}" is missing frontmatter field "${f}"`);
    }
  }
  if (!GUIDE_TOPICS.includes(data.topic)) {
    throw new Error(`guides: "${file}" has topic "${data.topic}" (allowed: ${GUIDE_TOPICS.join(", ")})`);
  }
  const parts = content.split(/^## /m);
  const intro = parts.shift()?.trim() ?? "";
  const sections = parts.map((p) => {
    const nl = p.indexOf("\n");
    return { title: (nl === -1 ? p : p.slice(0, nl)).trim(), body: nl === -1 ? "" : p.slice(nl + 1).trim() };
  });
  if (sections.length < 2) throw new Error(`guides: "${file}" needs at least 2 "## " sections`);
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: String(data.title),
    keyword: String(data.keyword).toUpperCase(),
    topic: data.topic,
    summary: String(data.summary),
    minutes: Number(data.minutes),
    date,
    reel: data.reel ? String(data.reel) : undefined,
    school: data.school ? Number(data.school) : undefined,
    schoolLine: data.schoolLine ? String(data.schoolLine) : undefined,
    intro,
    sections,
  };
}

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
}

export function getGuide(slug: string): Guide | undefined {
  return getAllGuides().find((g) => g.slug === slug);
}

export function getGuideByKeyword(keyword: string): Guide | undefined {
  const k = keyword.toUpperCase();
  return getAllGuides().find((g) => g.keyword === k);
}
