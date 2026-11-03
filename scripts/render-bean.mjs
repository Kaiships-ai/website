#!/usr/bin/env node
// Renders every Bean pose in src/components/night/bean-poses.json to
// public/bean/<key>.webp, all cropped to one shared box so poses line up
// when the page crossfades them, then writes that box size back to the JSON.
// Needs: git, agent-browser, magick, cwebp. Run: node scripts/render-bean.mjs
import { execFile, execFileSync } from "node:child_process";
import { promisify } from "node:util";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const REGISTRY = join(ROOT, "src/components/night/bean-poses.json");
const OUT = join(ROOT, "public/bean");
const CROWSNEST = process.env.CROWSNEST ?? "/Users/kienbeovl/Desktop/kaiships/crowsnest";
const CANVAS = 640;
const PAD = 8;
// The source frames Bean for a card; pull back so props (magnifier, arms) fit.
const CAM_Z = 8;
const HEIGHT = 240;
const SESSION = "bean-render";

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { encoding: "utf8", maxBuffer: 64 << 20, ...opts });
// Async on purpose: a sync call would block the HTTP server the page loads from.
const ab = async (...args) => (await promisify(execFile)("agent-browser", ["--session", SESSION, ...args], { maxBuffer: 64 << 20 })).stdout;

function patch(src, from, to) {
  if (!src.includes(from)) throw new Error(`mascot source changed, patch anchor missing: ${from}`);
  return src.replace(from, to);
}

const SNAP = `
window.__snap = ({ pose, expr, gaze }) => {
  hero.setPose(pose); hero.setExpr(expr);
  hero.gazeTarget = gaze ?? { x: 0, y: 0 }; hero.yawTarget = 0;
  hero.happyUntil = -1; hero.bounceAt = -99; hero.popAt = -99;
  heroR.setPixelRatio(1); heroR.setSize(${CANVAS}, ${CANVAS}, false);
  heroCam.aspect = 1; heroCam.position.set(0, 0.42, ${CAM_Z}); heroCam.lookAt(0, 0.2, 0); heroCam.updateProjectionMatrix();
  for (let i = 0; i < 6; i++) hero.update(1000 + i, 0.016);
  if (hero.conf) hero.conf.visible = false;
  heroR.render(heroScene, heroCam);
  return heroCanvas.toDataURL('image/png');
};
window.__ready = true;
`;

function buildPage() {
  let src = run("git", ["-C", CROWSNEST, "show", "origin/main:documents/brand/mascot/index.html"]);
  src = patch(src, "{ canvas: heroCanvas, antialias: true, alpha: true }", "{ canvas: heroCanvas, antialias: true, alpha: true, preserveDrawingBuffer: true }");
  src = patch(src, "let last = performance.now(), frame = 0;", `${SNAP}\nlet last = performance.now(), frame = 0;`);
  src = patch(src, "</head>", `<style>#hero{position:fixed!important;left:0;top:0;width:${CANVAS}px!important;height:${CANVAS}px!important;z-index:9}</style></head>`);
  return src;
}

const { poses } = JSON.parse(readFileSync(REGISTRY, "utf8"));
const tmp = mkdtempSync(join(tmpdir(), "bean-"));
const html = buildPage();
const server = createServer((_, res) => res.writeHead(200, { "content-type": "text/html" }).end(html));
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}/?theme=dark`;

try {
  await ab("set", "viewport", String(CANVAS + 200), String(CANVAS + 200));
  await ab("set", "media", "dark", "reduced-motion");
  await ab("open", url);
  await ab("wait", "--fn", "window.__ready === true");
  for (const [key, spec] of Object.entries(poses)) {
    const js = Buffer.from(`window.__snap(${JSON.stringify(spec)})`).toString("base64");
    const out = JSON.parse(await ab("--json", "eval", "-b", js));
    const data = out.data?.result ?? out.result ?? out.data;
    if (typeof data !== "string" || !data.startsWith("data:image/png;base64,")) throw new Error(`${key}: no PNG from __snap: ${JSON.stringify(out).slice(0, 200)}`);
    writeFileSync(join(tmp, `${key}.png`), Buffer.from(data.split(",")[1], "base64"));
  }
} finally {
  await ab("close");
  server.close();
}

// One union box over every pose's visible pixels, so crossfades don't jump.
let box = { x0: CANVAS, y0: CANVAS, x1: 0, y1: 0 };
for (const key of Object.keys(poses)) {
  const g = run("magick", [join(tmp, `${key}.png`), "-alpha", "extract", "-threshold", "4%", "-format", "%@", "info:"]).trim();
  const [, w, h, x, y] = g.match(/(\d+)x(\d+)\+(\d+)\+(\d+)/).map(Number);
  box = { x0: Math.min(box.x0, x), y0: Math.min(box.y0, y), x1: Math.max(box.x1, x + w), y1: Math.max(box.y1, y + h) };
}
const x = Math.max(0, box.x0 - PAD), y = Math.max(0, box.y0 - PAD);
const w = Math.min(CANVAS, box.x1 + PAD) - x, h = Math.min(CANVAS, box.y1 + PAD) - y;
const outW = Math.round((w * HEIGHT) / h);

mkdirSync(OUT, { recursive: true });
const sizes = {};
for (const key of Object.keys(poses)) {
  const png = join(tmp, `${key}.crop.png`);
  run("magick", [join(tmp, `${key}.png`), "-crop", `${w}x${h}+${x}+${y}`, "+repage", "-resize", `${outW}x${HEIGHT}!`, png]);
  const webp = join(OUT, `${key}.webp`);
  run("cwebp", ["-quiet", "-q", "80", "-alpha_q", "80", "-m", "6", png, "-o", webp]);
  sizes[key] = statSync(webp).size;
}

const reg = JSON.parse(readFileSync(REGISTRY, "utf8"));
reg.size = { w: outW, h: HEIGHT };
writeFileSync(REGISTRY, JSON.stringify(reg, null, 2) + "\n");
console.log(`crop ${w}x${h}+${x}+${y} -> ${outW}x${HEIGHT}, raw PNGs in ${tmp}`);
for (const [k, b] of Object.entries(sizes)) console.log(`${k.padEnd(10)} ${b} B`);
