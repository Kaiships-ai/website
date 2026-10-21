"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site.config";
import { Button } from "@/components/ui/button";

export const DISCORD = "https://discord.gg/MAAJmghmrA";

const links = [
  { label: "Studio", href: "/" },
  { label: "Docs", href: "/docs/studio-reel/install" },
  { label: "Guides", href: "/guides" },
  { label: "Changelog", href: "/changelog" },
  { label: "Showcase", href: "/showcase" },
  { label: "Discord", href: DISCORD },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 font-display text-[17px] font-bold tracking-[-0.01em] text-ink ${className}`}>
      <span aria-hidden className="relative grid size-7 place-items-center rounded-lg bg-space">
        <span className="size-2.5 rounded-full bg-accent-soft" />
        <span className="absolute inset-1 rounded-full border border-space-muted/50" />
      </span>
      Kaiships Studio
    </span>
  );
}

function NavLink({ href, label, active, onClick, big = false }: { href: string; label: string; active: boolean; onClick?: () => void; big?: boolean }) {
  const ext = href.startsWith("http");
  const cls = big
    ? "flex min-h-12 items-center border-b border-line text-lg text-ink"
    : `inline-flex min-h-11 items-center text-[14px] transition-colors hover:text-ink ${active ? "text-ink" : "text-muted"}`;
  return ext ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
      {label}
    </a>
  ) : (
    <Link href={href} className={cls} onClick={onClick} aria-current={active ? "page" : undefined}>
      {label}
    </Link>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Gift pages (/get/*) ask for one thing: the email. No links out, logo only.
  if (pathname.startsWith("/get/")) {
    return (
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center px-4 sm:px-6">
          <Logo />
        </div>
      </header>
    );
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const cta = { label: "Buy Pro PreOrder", href: siteConfig.studio.pro.checkout };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-surface/80 backdrop-blur-md supports-[backdrop-filter]:bg-surface/70">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex min-h-11 items-center" onClick={() => setOpen(false)} aria-label="Kaiships Studio home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <NavLink key={l.href} {...l} active={isActive(l.href)} />
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href={cta.href} variant="ghost">
            {cta.label}
          </Button>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-[10px] border border-line lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {open ? (
        <div id="mobile-menu" className="flex h-[calc(100dvh-4rem)] flex-col border-t border-line bg-bg px-4 py-6 lg:hidden">
          {links.map((l) => (
            <NavLink key={l.href} {...l} big active={isActive(l.href)} onClick={() => setOpen(false)} />
          ))}
          <div className="pt-8">
            <Button href={cta.href} variant="ghost" className="w-full">
              {cta.label}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
