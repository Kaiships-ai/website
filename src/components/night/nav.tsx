"use client";

import { useEffect, useState } from "react";
import s from "./night.module.css";

type Props = {
  name: string;
  cta: string;
  price: string;
  checkout: string;
  links: readonly { label: string; href: string }[];
};

/**
 * Sticky nav. The buy button is always reachable (phone included); it stays
 * quiet while another buy button is on screen and turns orange when it is
 * the only one, so each screen has one primary action.
 */
export function NightNav({ name, cta, price, checkout, links }: Props) {
  const [solid, setSolid] = useState(false);
  const [alone, setAlone] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setAlone(visible.size === 0);
      },
      // Ignore the strip under the nav itself.
      { rootMargin: "-68px 0px 0px 0px" },
    );
    document.querySelectorAll("main [data-buy]").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className={`${s.nav} ${solid ? s.navSolid : ""}`}>
      <div className={`${s.wrap} ${s.navIn}`}>
        <a className={s.logo} href="#top" aria-label="Kaiships Studio, back to top">
          <i aria-hidden />
          {name}
        </a>
        <nav aria-label="Sections">
          <ul className={s.navLinks}>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={checkout}
          className={`${s.btn} ${s.navCta} ${alone ? s.primary : s.ghost}`}
          data-umami-event="buy-click"
        >
          {cta} · {price}
        </a>
      </div>
    </header>
  );
}
