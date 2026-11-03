import localFont from "next/font/local";

// Night type: Bricolage Grotesque for headlines and numbers, Inter for text.
// JetBrains Mono (labels, terminal) comes from the root layout as --font-mono.
// Imported only by the Night page, so other routes don't preload these.
//
// Bricolage is self-hosted as one file: the opsz 96 (display) cut, weights
// 700-800, latin, from Google Fonts (OFL, see BricolageGrotesque-OFL.txt).
// Night's headlines are display sizes, and this file is 41 KB instead of the
// 77 KB full optical-size axis. Inter is Google's latin subset cut to the
// weights Night uses, 400-600: 30 KB instead of 48 KB. Rebuild both cuts with
// scripts/subset-fonts.sh.
export const display = localFont({
  src: "../../assets/fonts/BricolageGrotesque-opsz96-wght700-800-latin.woff2",
  weight: "700 800",
  style: "normal",
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const text = localFont({
  src: "../../assets/fonts/Inter-wght400-600-latin.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-text",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
