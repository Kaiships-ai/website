import localFont from "next/font/local";
import { Inter } from "next/font/google";

// Night type: Bricolage Grotesque for headlines and numbers, Inter for text.
// JetBrains Mono (labels, terminal) comes from the root layout as --font-mono.
// Imported only by the Night page, so other routes don't preload these.
//
// Bricolage is self-hosted as one file: the opsz 96 (display) cut, weights
// 700-800, latin, from Google Fonts (OFL, see BricolageGrotesque-OFL.txt).
// Night's headlines are display sizes, and this file is 41 KB instead of the
// 77 KB full optical-size axis.
export const display = localFont({
  src: "../../assets/fonts/BricolageGrotesque-opsz96-wght700-800-latin.woff2",
  weight: "700 800",
  style: "normal",
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const text = Inter({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
});
