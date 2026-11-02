"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";


function Logo() {
  return (
    <>
      Kaiships<span className="text-accent">&nbsp;Studio</span>
    </>
  );
}

// One page, one job: the nav is the logo and a single buy button.
// Copy comes in as props from the (server) layout, so the whole site config
// never ships in the client bundle.
export function Nav({ checkout, cta, price }: { checkout: string; cta: string; price: string }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // "/" is the Night sales page; it renders its own nav.
  if (pathname === "/") return null;

  // Gift pages (/get/*) ask for one thing: the email. No links out, logo only.
  if (pathname?.startsWith("/get/")) {
    return (
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
          <p className="marker text-xl text-ink">
            <Logo />
          </p>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line/70 bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link href="/" className="marker flex items-center py-3 text-lg text-ink sm:text-xl">
          <Logo />
        </Link>
        <Button
          href={checkout}
          variant="accent"
          umamiEvent="buy-click"
          className="!px-4 !py-2 text-sm sm:!px-5 sm:text-base"
        >
          {cta} · {price}
        </Button>
      </nav>
    </header>
  );
}
