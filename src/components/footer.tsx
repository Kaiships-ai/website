"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site.config";
import { DISCORD, Logo } from "@/components/nav";

const cols = [
  {
    title: "Product",
    links: [
      { label: "Kaiships Studio", href: "/" },
      { label: "Pricing", href: "/#buy" },
      { label: "Starter PACK", href: "/pack" },
      { label: "Guides", href: "/guides" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Guides", href: "/guides" },
      { label: "Changelog", href: "/changelog" },
      { label: "Showcase", href: "/showcase" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: DISCORD },
      { label: "Instagram", href: siteConfig.socials.instagram },
      { label: "TikTok", href: siteConfig.socials.tiktok },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Ship log", href: "/blog" },
      { label: "Contact", href: siteConfig.socials.instagramDm },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const linkCls = "inline-flex min-h-9 items-center text-[14px] text-muted transition-colors hover:text-ink";

export function Footer() {
  const pathname = usePathname();
  // Gift pages (/get/*) keep the legal links only, so the email is the one action.
  if (pathname?.startsWith("/get/")) {
    return (
      <footer className="border-t border-line bg-sunk">
        <div className="mx-auto flex max-w-[1200px] gap-6 px-4 py-6 sm:px-6">
          <Link href="/privacy" className={linkCls}>Privacy</Link>
          <Link href="/terms" className={linkCls}>Terms</Link>
        </div>
      </footer>
    );
  }
  return (
    <footer className="border-t border-line bg-sunk">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-ink">{col.title}</p>
              <ul className="mt-4 space-y-1">
                {col.links.map((l) => {
                  const external = l.href.startsWith("http");
                  return (
                    <li key={l.label}>
                      {external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className={linkCls}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <p className="font-mono text-[12px] text-muted">
            Built with Claude Code by{" "}
            <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
              @kaiships.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
