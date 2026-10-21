import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, sub, center = false }: { eyebrow: string; title: ReactNode; sub?: ReactNode; center?: boolean }) {
  return (
    <header className={center ? "mx-auto flex max-w-2xl flex-col items-center gap-4 text-center" : "flex max-w-2xl flex-col gap-4"}>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">{title}</h1>
      {sub ? <p className="text-lg leading-relaxed text-muted">{sub}</p> : null}
    </header>
  );
}

export function Chip({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider " +
        (accent ? "border-accent/40 bg-accent-wash text-accent" : "border-line bg-surface text-muted")
      }
    >
      {children}
    </span>
  );
}

/** Clean generated cover: topic label + title on a calm card. No stock art, no fake data. */
export function Cover({ topic, title, tone = 0 }: { topic: string; title: string; tone?: number }) {
  const bg = ["bg-sunk", "bg-accent-wash", "bg-surface"][tone % 3];
  return (
    <div className={"relative flex aspect-[16/9] flex-col justify-between overflow-hidden rounded-[18px] border border-line p-6 text-ink sm:p-8 " + bg}>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{topic}</span>
      <span className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl line-clamp-3">{title}</span>
      <span aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-soft/25" />
    </div>
  );
}

export function StudioCta() {
  return (
    <p className="mt-14 border-t border-line pt-6 text-base text-muted">
      Want reels like this without filming?{" "}
      <Link href="/#buy" className="font-medium text-accent underline underline-offset-4">
        Kaiships Studio makes the whole reel from one prompt →
      </Link>
    </p>
  );
}

export const shell = "mx-auto w-full max-w-[1200px] px-4 sm:px-6";
