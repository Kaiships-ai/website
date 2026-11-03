import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://kstats-kaiships.vercel.app",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self' https://kstats-kaiships.vercel.app",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://ig.me",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

// public/ files have stable names, so they can't be immutable: a re-encoded
// reel or re-rendered Bean pose has to reach returning visitors. One day
// fresh, then served from cache while it revalidates for a week, so a repeat
// visit is instant and at most one visit behind a change.
const assetCache = [
  { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
];

const nextConfig: NextConfig = {
  // Every width a next/image on the site asks for at DPR 2 (posters 160-220 px,
  // thumbs 90 px, avatars 48 px, the /get page 720 px); the defaults put 15
  // widths in each srcset, a third of the homepage HTML.
  images: {
    deviceSizes: [390, 640, 828, 1080, 1440],
    imageSizes: [96, 160, 220],
  },
  // The old Content Machine Kit page is retired; the homepage sells the Reel Kit.
  async redirects() {
    return [{ source: "/kit", destination: "/", permanent: false }];
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      ...["bean", "night-full", "proof", "night"].map((dir) => ({
        source: `/${dir}/:path*`,
        headers: assetCache,
      })),
    ];
  },
};

export default nextConfig;
