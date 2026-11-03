"use client";

import { useEffect, useState } from "react";
import type { BuySpot } from "./buy-button";
import s from "./night.module.css";

type Props = {
  name: string;
  cta: string;
  price: string;
  checkout: string;
  links: readonly { label: string; href: string }[];
};

/**
 * Sticky nav plus, on phones, a bottom buy bar under the thumb. Both watch the
 * page's own buy buttons (`data-buy`): the nav button stays quiet while one is
 * on screen and turns orange when it is the only one; the bar shows only when
 * nothing else to buy with, or to read under it (`data-bar-off`), is on screen.
 */
function keepAboveBar(el: Element | null) {
  const barEl = document.querySelector("[data-buy-bar]");
  if (!barEl || !el || barEl.contains(el) || !el.matches(":focus-visible")) return;
  const b = barEl.getBoundingClientRect();
  if (!b.height || b.top >= window.innerHeight) return; // no bar here, or hidden
  const r = el.getBoundingClientRect();
  if (r.bottom > b.top - 8 && r.top < window.innerHeight) window.scrollBy(0, r.bottom - b.top + 16);
}

export function NightNav({ name, cta, price, checkout, links }: Props) {
  const [solid, setSolid] = useState(false);
  const [alone, setAlone] = useState(false);
  const [bar, setBar] = useState(false);

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
        const buyOnScreen = [...visible].some((el) => el.hasAttribute("data-buy"));
        setAlone(!buyOnScreen);
        setBar(visible.size === 0);
      },
      // Ignore the strip under the nav itself.
      { rootMargin: "-68px 0px 0px 0px" },
    );
    document.querySelectorAll("main [data-buy], main [data-bar-off]").forEach((el) => io.observe(el));

    // Keyboard focus never sits under the bar: scroll-padding covers most cases, but
    // browsers skip it for an element already partly on screen. Checked a frame after
    // the browser's own focus scroll.
    const onFocus = (e: FocusEvent) => {
      const el = e.target;
      if (el instanceof Element) requestAnimationFrame(() => keepAboveBar(el));
    };
    document.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", onFocus);
      io.disconnect();
    };
  }, []);

  // The bar can also slide in under an element that already has keyboard focus.
  useEffect(() => {
    if (!bar) return;
    const t = window.setTimeout(() => keepAboveBar(document.activeElement), 220);
    return () => window.clearTimeout(t);
  }, [bar]);

  return (
    <>
      <header className={`${s.nav} ${solid ? s.navSolid : ""}`}>
        <a className={s.skip} href="#top">
          Skip to content
        </a>
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
            data-umami-event-spot={"nav" satisfies BuySpot}
          >
            {cta} · {price}
          </a>
        </div>
      </header>
      {/* Outside the header: its backdrop-filter would pin a fixed child to the header. */}
      <div className={`${s.bar} ${bar ? s.barOn : ""}`} data-buy-bar>
        <a
          href={checkout}
          className={`${s.btn} ${s.primary}`}
          data-umami-event="buy-click"
          data-umami-event-spot={"bar" satisfies BuySpot}
        >
          {cta} · {price}
        </a>
      </div>
    </>
  );
}
