"use client";

import { useEffect, useState } from "react";
import s from "./night.module.css";

type Theme = "light" | "dark";
const KEY = "ks-theme";
const system = (): Theme => (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

/**
 * Images drawn for one theme (Bean's stills, `data-theme-img` in bean.tsx)
 * are lazy and hidden in the other, so they have never loaded: fetch them
 * once the visitor reaches for the toggle. Skips the ones inside a part that
 * stays dark in both themes (`--scheme-fixed`, the monitor).
 */
const imagesFor = (t: Theme) =>
  [...document.querySelectorAll<HTMLImageElement>(`img[data-theme-img="${t}"]`)].filter(
    (img) => !getComputedStyle(img).getPropertyValue("--scheme-fixed").trim(),
  );
function warm(t: Theme) {
  for (const img of imagesFor(t)) img.loading = "eager";
}
const other = (): Theme => (document.documentElement.dataset.theme === "light" ? "dark" : "light");

/**
 * Swaps the theme in one frame. Transitions are off while the new colours
 * land, so the page changes at once instead of the nav and buttons fading
 * while everything else snaps. Images that just became visible would replay
 * their one-time entrance (the hero Bean's read-along): it is settled.
 */
function apply(t: Theme) {
  const root = document.documentElement;
  root.dataset.themeSwitch = "";
  root.dataset.theme = t;
  void getComputedStyle(root).color;
  for (const img of imagesFor(t))
    for (const a of img.getAnimations()) {
      try {
        a.finish();
      } catch {}
    }
  requestAnimationFrame(() => delete root.dataset.themeSwitch);
}

/**
 * One button in the Night nav. ThemeScript (in the layout's head) sets
 * `data-theme` before first paint; both icons and both labels are in the
 * markup and CSS shows the pair for the theme a click switches to, so the
 * server never needs to know the theme.
 */
export function ThemeToggle() {
  const [flipped, setFlipped] = useState(false);

  // ThemeScript sets nothing when storage throws: show the system's theme.
  // (ThemeScript also keeps following the system until the visitor picks.)
  useEffect(() => {
    const root = document.documentElement;
    if (!root.dataset.theme) root.dataset.theme = system();
  }, []);

  const toggle = async () => {
    const next = other();
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    // Usually warm already (hover, focus, press); a tap gets at most 150 ms.
    warm(next);
    await Promise.race([
      Promise.all(imagesFor(next).map((img) => img.decode().catch(() => {}))),
      new Promise((r) => setTimeout(r, 150)),
    ]);
    apply(next);
    setFlipped(true);
  };
  const reach = () => warm(other());

  return (
    <button
      type="button"
      className={s.themeBtn}
      onClick={toggle}
      onPointerEnter={reach}
      onPointerDown={reach}
      onFocus={reach}
      data-flipped={flipped || undefined}
    >
      <span className={s.srOnly} data-to="light">
        Switch to light theme
      </span>
      <span className={s.srOnly} data-to="dark">
        Switch to dark theme
      </span>
      <svg data-to="light" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </svg>
      <svg data-to="dark" viewBox="0 0 24 24" aria-hidden>
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  );
}
