import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden pt-32 pb-24 sm:pt-36">
      <div aria-hidden className="glow absolute -top-24 right-[-10%] h-96 w-96 rounded-full" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  sub: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className="flex flex-col gap-4">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-ink">{eyebrow}</p>
      <h1 className="marker max-w-3xl text-4xl text-ink sm:text-6xl">
        {title} <span className="marker-pop">{accent}</span>
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-ink-2">{sub}</p>
      {children}
    </Reveal>
  );
}

export function SectionTitle({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="marker text-3xl text-ink sm:text-4xl">
      {children}
    </h2>
  );
}

export const card =
  "flex h-full flex-col gap-3 rounded-2xl border-[2.5px] border-ink bg-cream p-6 shadow-[4px_5px_0_var(--ink)]";

export function Badge2({ children, tone = "free" }: { children: ReactNode; tone?: "free" | "pro" }) {
  return (
    <span
      className={`w-fit rounded-md px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${
        tone === "free" ? "bg-ink text-ochre" : "border-2 border-ink text-ink"
      }`}
    >
      {children}
    </span>
  );
}
