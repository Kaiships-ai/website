# Lighthouse, local production build

`pnpm build && pnpm start -p 3311`, Lighthouse 12.8.2 CLI, headless Chrome, 2026-11-03. Mobile = Moto G Power emulation, simulated slow 4G, 4x CPU slowdown.

| run | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| mobile 1 | 91 | 100 | 96 | 100 | 1.2 s | 3.5 s | 0 ms | 0 |
| mobile 2 | 91 | 100 | 96 | 100 | 1.2 s | 3.5 s | 0 ms | 0 |
| desktop | 100 | 100 | 96 | 100 | 0.3 s | 0.7 s | 0 ms | 0 |

Best practices 96: only `errors-in-console`, a 404 for `/_vercel/insights/script.js`, which exists only on Vercel.

The 1440p tutorial (68 MB) does not touch these numbers: the player asks for its poster and metadata only when it is near the screen, and streams only on play.
