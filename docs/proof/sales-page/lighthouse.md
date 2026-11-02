# Lighthouse, local production build

`pnpm build && pnpm start -p 3311` on the final commit, Lighthouse 12.8.2 CLI, headless Chrome, 2026-11-02. Mobile = default Moto G Power emulation, simulated slow 4G, 4x CPU slowdown.

| run | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Speed Index |
|---|---|---|---|---|---|---|---|---|---|
| mobile 1 | 91 | 100 | 96 | 100 | 1.2 s | 3.5 s | 0 ms | 0 | 1.2 s |
| mobile 2 | 91 | 100 | 96 | 100 | 1.2 s | 3.5 s | 0 ms | 0 | 1.2 s |
| mobile 3 | 91 | 100 | 96 | 100 | 1.2 s | 3.5 s | 0 ms | 0 | 1.2 s |
| desktop | 100 | 100 | 96 | 100 | 0.3 s | 0.7 s | 0 ms | 0 | 0.3 s |

Best practices 96: the only failing audit is `errors-in-console`, a 404 for `/_vercel/insights/script.js`. That script only exists on Vercel, so it fails on any local build.
