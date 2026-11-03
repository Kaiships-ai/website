#!/usr/bin/env node
// Records each live Bean spot as an MP4 through a CDP screencast, driving real
// mouse (desktop) or touch (phone) input on the same connection, so frames and
// input never come from different contexts. Writes <tag>-<spot>.mp4 (full
// viewport) and <tag>-<spot>-close.mp4 (Bean at 2x) per spot. Needs ffmpeg and
// a Chrome DevTools browser endpoint launched with --mute-audio
// (agent-browser --args --mute-audio open about:blank; agent-browser get cdp-url).
//   node scripts/rec-bean-live.mjs <ws-endpoint> <url> <out-dir> [d|m] [spot,...]
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [ws, url, out, tag = "d", only] = process.argv.slice(2);
const phone = tag === "m";
const [W, H] = phone ? [390, 844] : [1440, 900];
mkdirSync(out, { recursive: true });

const sock = new WebSocket(ws);
await new Promise((r) => sock.addEventListener("open", r, { once: true }));
let id = 0;
const pending = new Map();
const frames = [];
let S;
sock.addEventListener("message", (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) {
    pending.get(d.id)(d);
    pending.delete(d.id);
  } else if (d.method === "Page.screencastFrame") {
    frames.push({ data: d.params.data, ts: d.params.metadata.timestamp });
    send("Page.screencastFrameAck", { sessionId: d.params.sessionId }, S).catch(() => {}); // late acks after the tab closes
  }
});
function send(method, params = {}, sessionId) {
  return new Promise((r) => {
    const i = ++id;
    pending.set(i, r);
    sock.send(JSON.stringify({ id: i, method, params, sessionId }));
  }).then((d) => {
    if (d.error) throw new Error(`${method}: ${JSON.stringify(d.error)}`);
    return d.result;
  });
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const s = (m, p) => send(m, p, S);
const ev = async (expr) => (await s("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true })).result.value;
const box = (sel) => ev(`(() => { const r = document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; })()`);
const live = async (n) => {
  for (let i = 0; i < 200 && (await ev(`document.querySelectorAll("[data-live]").length`)) < n; i++) await sleep(50);
};
async function point(x, y) {
  if (phone) {
    await s("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    await s("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  } else await s("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
}
async function click(sel) {
  const b = await box(sel);
  const x = b.x + b.w / 2, y = b.y + b.h / 2;
  if (phone) return point(x, y);
  await s("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
  await s("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await s("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
}
const STEP = `(i) => { const b = document.querySelectorAll("#how ol > li")[i].getBoundingClientRect(); const y = innerWidth <= 900 ? b.top - innerHeight * 0.6 : b.bottom - innerHeight * 0.6; scrollTo(0, y + scrollY); }`;
const HERO = "[class*=heroBean] [class*=beanStack]";
const HOW = "[class*=monBean] [class*=beanStack]";
const FAQ = "[class*=faqBean] [class*=beanStack]";
const FINAL = "[class*=finalBean] [class*=beanStack]";

// Each spot: what to do, and which Bean the close-up follows.
const SPOTS = {
  async hero() {
    await sleep(2500); // the still first paint, typing done
    const b = await box(HERO);
    await point(b.x - 60, b.y + b.h / 2); // first input: Bean comes alive and reads the prompt
    await live(1);
    await sleep(2800);
    for (const [dx, dy] of [[-360, -140], [b.w + 260, -220], [b.w / 2, b.h + 200], [-240, b.h / 2]]) {
      await point(b.x + dx, b.y + dy);
      await sleep(900);
    }
    if (!phone) {
      await point(b.x + b.w / 2, b.y + b.h / 2); // hover: happy face
      await sleep(1500);
    }
    await click('button[aria-label="Say hi to Bean"]');
    await sleep(3500);
    return HERO;
  },
  async how() {
    await sleep(1200);
    await ev(`(${STEP})(0)`);
    await live(1);
    for (let i = 0; i < 6; i++) {
      await ev(`(${STEP})(${i})`);
      await sleep(1600);
    }
    return HOW;
  },
  async faq() {
    await sleep(1200);
    await ev(`scrollTo(0, document.querySelector("#faq").getBoundingClientRect().top + scrollY - innerHeight)`);
    await live(1);
    await sleep(500);
    await ev(`document.querySelector("#faq details").scrollIntoView({ block: "center" })`);
    await sleep(3000);
    await click('button[aria-label="Ask Bean for help"]');
    await sleep(3500);
    return FAQ;
  },
  async final() {
    await sleep(1200);
    await ev(`scrollTo(0, document.querySelector("#final-title").getBoundingClientRect().top + scrollY - innerHeight * 1.6)`);
    await live(1);
    await sleep(500);
    await ev(`document.querySelector("#final-title").closest("section").scrollIntoView({ block: "center" })`);
    await sleep(4000);
    return FINAL;
  },
  async doze() {
    await sleep(1500);
    const b = await box(HERO);
    await point(b.x - 60, b.y + b.h / 2);
    await live(1);
    await sleep(23000); // 20 s without input: Bean dozes off
    await point(b.x - 300, b.y - 100); // any input wakes it
    await sleep(2500);
    return HERO;
  },
};

async function encode(name, crop) {
  const dir = mkdtempSync(join(tmpdir(), "beanrec-"));
  const list = frames.map((f, i) => {
    writeFileSync(join(dir, `${String(i).padStart(5, "0")}.jpg`), Buffer.from(f.data, "base64"));
    const dur = i + 1 < frames.length ? frames[i + 1].ts - f.ts : 0.1;
    return `file '${String(i).padStart(5, "0")}.jpg'\nduration ${dur.toFixed(4)}`;
  });
  writeFileSync(join(dir, "list.txt"), `ffconcat version 1.0\n${list.join("\n")}\n`);
  const enc = (vf, file) =>
    execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", join(dir, "list.txt"), "-vf", `${vf},fps=30,format=yuv420p`, "-c:v", "libx264", "-crf", "20", "-movflags", "+faststart", join(out, file)]);
  enc(phone ? "scale=780:-2" : "scale=1440:-2", `${name}.mp4`);
  enc(`scale=${W * 2}:${H * 2},crop=${crop.w}:${crop.h}:${crop.x}:${crop.y}`, `${name}-close.mp4`);
  rmSync(dir, { recursive: true });
}

for (const spot of only ? only.split(",") : Object.keys(SPOTS)) {
  if (spot === "doze" && phone) continue;
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  S = (await send("Target.attachToTarget", { targetId, flatten: true })).sessionId;
  await s("Page.enable");
  await s("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: phone });
  if (phone) await s("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  await s("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "dark" }] });
  await send("Target.activateTarget", { targetId });
  await s("Page.startScreencast", { format: "jpeg", quality: 85, everyNthFrame: 1 });
  await sleep(300);
  frames.length = 0;
  await s("Page.navigate", { url });
  const sel = await SPOTS[spot]();
  await s("Page.stopScreencast");
  const b = await box(sel);
  // Close-up: Bean plus room for its words on the side they appear, kept inside the frame.
  const words = await ev(`(() => { const w = document.querySelector(${JSON.stringify(sel)}).closest("[class*=bean]").parentElement.querySelector("[class*=beanSay]"); if (!w) return 0; const r = w.getBoundingClientRect(), b = document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect(); return r.x + r.width / 2 < b.x ? -1 : 1; })()`);
  const cw = Math.min(W, Math.round(b.w * (words ? 4 : 2.6))), ch = Math.round(b.h * 2);
  const left = words < 0 ? b.x + b.w * 1.3 - cw : words > 0 ? b.x - b.w * 0.3 : b.x + b.w / 2 - cw / 2;
  const cx = Math.max(0, Math.min(W - cw, left));
  const cy = Math.max(0, Math.min(H - ch, b.y + b.h + b.h * 0.25 - ch));
  const even = (v) => Math.round(v * 2) & ~1;
  await encode(`${tag}-${spot}`, { x: even(cx), y: even(cy), w: even(cw), h: even(ch) });
  console.log(`${tag}-${spot}: ${frames.length} frames over ${(frames.at(-1).ts - frames[0].ts).toFixed(1)} s`);
  await send("Target.closeTarget", { targetId });
}
sock.close();
