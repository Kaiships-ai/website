import {
  JetBrains_Mono,
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

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});
