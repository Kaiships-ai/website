import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  RESOURCE_TYPES,
  RESOURCE_TOOLS,
  POST_TAGS,
  type ResourceMeta,
  type PostMeta,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function mdxFiles(dir: string): string[] {
  const abs = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs).filter((f) => f.endsWith(".mdx"));
}

function requireFields(
  file: string,
  data: Record<string, unknown>,
  fields: string[],
) {
  for (const f of fields) {
    if (data[f] === undefined || data[f] === null || data[f] === "") {
      throw new Error(`content: "${file}" is missing frontmatter field "${f}"`);
    }
  }
}

function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function parseResource(file: string): ResourceMeta & { content: string } {
  const raw = fs.readFileSync(
    path.join(CONTENT_DIR, "resources", file),
    "utf8",
  );
  const { data, content } = matter(raw);
  requireFields(file, data, [
    "title",
    "description",
    "type",
    "tool",
    "date",
    "readTime",
  ]);
  if (!RESOURCE_TYPES.includes(data.type)) {
    throw new Error(
      `content: "${file}" has invalid type "${data.type}" (allowed: ${RESOURCE_TYPES.join(", ")})`,
    );
  }
  if (!RESOURCE_TOOLS.includes(data.tool)) {
    throw new Error(
      `content: "${file}" has invalid tool "${data.tool}" (allowed: ${RESOURCE_TOOLS.join(", ")})`,
    );
  }
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title,
    description: data.description,
    type: data.type,
    tool: data.tool,
    date: normalizeDate(data.date),
    readTime: Number(data.readTime),
    popular: Boolean(data.popular),
    faq: data.faq ?? undefined,
    content,
  };
}

function parsePost(file: string): PostMeta & { content: string } {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "blog", file), "utf8");
  const { data, content } = matter(raw);
  requireFields(file, data, [
    "title",
    "description",
    "date",
    "readTime",
    "tag",
  ]);
  if (!POST_TAGS.includes(data.tag)) {
    throw new Error(
      `content: "${file}" has invalid tag "${data.tag}" (allowed: ${POST_TAGS.join(", ")})`,
    );
  }
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title,
    description: data.description,
    date: normalizeDate(data.date),
    readTime: Number(data.readTime),
    tag: data.tag,
    content,
  };
}

export function getAllResources(): ResourceMeta[] {
  return mdxFiles("resources")
    .map(parseResource)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => {
      if (Boolean(a.popular) !== Boolean(b.popular)) return a.popular ? -1 : 1;
      return b.date.localeCompare(a.date);
    });
}

export function getResource(slug: string) {
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(CONTENT_DIR, "resources", file))) return null;
  return parseResource(file);
}

export function getAllPosts(): PostMeta[] {
  return mdxFiles("blog")
    .map(parsePost)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(CONTENT_DIR, "blog", file))) return null;
  return parsePost(file);
}
