import type { ReactNode } from "react";
import { isValidElement } from "react";
import { MDXRemote } from "next-mdx-remote-client/rsc";

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[`*_~]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function text(n: ReactNode): string {
  if (n == null || typeof n === "boolean") return "";
  if (typeof n === "string" || typeof n === "number") return String(n);
  if (Array.isArray(n)) return n.map(text).join("");
  if (isValidElement(n)) return text((n.props as { children?: ReactNode }).children);
  return "";
}

/** h2/h3 headings of a markdown body, for "On this page". */
export function headings(md: string): { depth: 2 | 3; text: string; id: string }[] {
  const out: { depth: 2 | 3; text: string; id: string }[] = [];
  let fence = false;
  for (const line of md.split("\n")) {
    if (/^```/.test(line)) fence = !fence;
    const m = !fence && line.match(/^(##|###)\s+(.+?)\s*#*$/);
    if (m) {
      const t = m[2].replace(/[`*_]/g, "").replace(/\[(.*?)\]\(.*?\)/g, "$1");
      out.push({ depth: m[1].length as 2 | 3, text: t, id: slugify(t) });
    }
  }
  return out;
}

const H = (Tag: "h2" | "h3") =>
  function Heading({ children }: { children?: ReactNode }) {
    const id = slugify(text(children));
    return (
      <Tag id={id} className="group scroll-mt-28">
        {children}
        <a href={`#${id}`} aria-label="Link to this section" className="ml-2 text-line-strong no-underline opacity-0 group-hover:opacity-100">#</a>
      </Tag>
    );
  };

export const proseClass =
  "prose max-w-none text-ink prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-ink prose-p:text-ink prose-li:text-ink prose-strong:text-ink prose-a:text-accent prose-a:underline-offset-4 prose-code:rounded prose-code:bg-sunk prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:font-normal prose-code:text-ink prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:border prose-pre:border-space-line prose-pre:bg-space prose-pre:text-space-ink prose-blockquote:border-accent prose-blockquote:text-muted prose-hr:border-line prose-th:text-ink prose-td:text-ink";

/** Renders plain markdown (format "md", so stray < and { in product docs never break the build). */
export function Markdown({ source, mdx = false, components = {} }: { source: string; mdx?: boolean; components?: Record<string, unknown> }) {
  return (
    <MDXRemote
      source={source}
      options={{ mdxOptions: { format: mdx ? "mdx" : "md" } }}
      components={{ h2: H("h2"), h3: H("h3"), ...(components as object) }}
    />
  );
}
