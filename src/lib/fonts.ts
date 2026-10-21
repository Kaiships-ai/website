import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

// Kaiships Studio design system v1 (2026-10-21): Bricolage Grotesque for headlines,
// Inter for body, JetBrains Mono for labels and code. Hand-drawn fonts live only in the reels.
export const display = Bricolage_Grotesque({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "700"],
  variable: "--font-display",
  display: "swap",
});

export const sans = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
