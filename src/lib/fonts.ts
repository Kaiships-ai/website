import localFont from "next/font/local";
import {
  Newsreader,
  Permanent_Marker,
  Shantell_Sans,
} from "next/font/google";

// Hand-drawn brand style (brand-kit "Hình ảnh"): Shantell Sans for body,
// numbers and names; Permanent Marker for headlines and labels.
// preload: false because the root layout loads these on every route, and the
// home page (Night) uses none of them except JetBrains Mono for small labels.
// With display: swap the text shows at once and the font follows.
export const sans = Shantell_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "800"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

export const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marker",
  display: "swap",
  preload: false,
});

export const serif = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

// JetBrains Mono is self-hosted: Google's latin subset cut to weights 400-700
// (29 KB instead of 41 KB), from scripts/subset-fonts.sh. Night paints its
// labels with it, so its size counts against the first paint.
export const mono = localFont({
  src: "../assets/fonts/JetBrainsMono-wght400-700-latin.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});
