import {
  JetBrains_Mono,
  Newsreader,
  Permanent_Marker,
  Shantell_Sans,
} from "next/font/google";

// Hand-drawn brand style (brand-kit "Hình ảnh"): Shantell Sans for body,
// numbers and names; Permanent Marker for headlines and labels.
export const sans = Shantell_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marker",
  display: "swap",
});

export const serif = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
