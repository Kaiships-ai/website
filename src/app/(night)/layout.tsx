import type { Viewport } from "next";
import { preload } from "react-dom";

// The Night pages: "/", /terms, /privacy. Light or dark per <html data-theme>
// (ThemeScript in the root layout). viewport-fit=cover lets the phone buy bar
// pad itself above the home indicator; .wrap pads the side insets in landscape.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0c17" },
  ],
};

export default function NightLayout({ children }: { children: React.ReactNode }) {
  // The faces are in night.css; first paint needs both.
  for (const f of ["BricolageGrotesque-opsz96-wght700-800-latin", "Inter-wght400-600-latin"]) {
    preload(`/night/fonts/${f}.woff2`, { as: "font", type: "font/woff2", crossOrigin: "" });
  }
  return children;
}
