"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteConfig } from "@/lib/site.config";


// Copy comes in as props from the (server) layout, so the whole site config
// never ships in the client bundle.
export function Footer({ footer }: { footer: SiteConfig["footer"] }) {
  const pathname = usePathname();
  // Gift pages (/get/*) keep the legal links only, so the email is the one action.
  if (pathname?.startsWith("/get/")) {
    return (
      <footer className="border-t border-line bg-paper-2">
        <div className="mx-auto flex max-w-6xl gap-5 px-4 py-6 font-mono text-xs text-ink-2 sm:px-6">
          <Link href="/privacy" className="hover:text-ink">Privacy</Link>
          <Link href="/terms" className="hover:text-ink">Terms</Link>
        </div>
      </footer>
    );
  }
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="marker text-xl text-ink">
            Kaiships<span className="text-accent">&nbsp;Studio</span>
          </p>
          <ul className="flex flex-wrap gap-5">
            {footer.links.map((l) => {
              const external = l.href.startsWith("http");
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block py-1 text-sm text-ink-2 transition-colors hover:text-ink"
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {l.label}
                    {external ? " ↗" : ""}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-2 border-t border-line pt-5 text-xs text-ink-2">
          <p>{footer.clawd}</p>
          <p className="font-mono">{footer.legal}</p>
        </div>
      </div>
    </footer>
  );
}
