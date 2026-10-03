"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site.config";
import { Button } from "@/components/ui/button";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line/70 bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="marker flex items-center py-3 text-xl text-ink"
          onClick={() => setOpen(false)}
        >
          kaiships<span className="text-accent">.ai</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2.5 text-sm text-ink-2 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Button href={siteConfig.navCta.href} variant="accent">
            {siteConfig.navCta.label}
          </Button>
        </div>

        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-6 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-ink ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open ? (
        <div className="flex h-[calc(100dvh-4rem)] flex-col gap-2 border-t border-line bg-paper px-6 py-8 md:hidden">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 font-mono text-lg text-ink"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-6">
            <Button
              href={siteConfig.navCta.href}
              variant="accent"
              className="w-full"
            >
              {siteConfig.navCta.label}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
