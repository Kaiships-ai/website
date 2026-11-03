#!/bin/bash
# Proves the live Bean on a running build: a shot of every spot live, then the
# fallbacks (reduced motion, no WebGL, chunk fails) and the layout checks.
# Videos come from scripts/rec-bean-live.mjs. Needs agent-browser.
#   pnpm start -p 3321, then bash scripts/proof-bean-live.sh [base-url] [out-dir]
set -euo pipefail
URL="${1:-http://localhost:3321/}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${2:-$ROOT/docs/proof/bean-live}"
mkdir -p "$OUT"
SES=bean-live
# Muted: the page has videos, and a test browser must never play sound.
ab() { agent-browser --session "$SES" --args "${ARGS:---mute-audio}" "$@" > /dev/null; }
js() { printf '%s' "$1" | agent-browser --session "$SES" eval --stdin; }
shot() { agent-browser --session "$SES" screenshot "$OUT/$1.png" > /dev/null; echo "$1.png"; }
live() { agent-browser --session "$SES" wait --fn "document.querySelectorAll('[data-live]').length >= $1" > /dev/null; }
# Scroll the step into the active band, as scripts/proof-bean.sh does.
STEP='(i) => { const b = document.querySelectorAll("#how ol > li")[i].getBoundingClientRect(); const y = innerWidth <= 900 ? b.top - innerHeight * 0.6 : b.bottom - innerHeight * 0.6; scrollTo(0, y + scrollY); }'
LIVE_CHUNK=$(grep -l WebGLRenderer "$ROOT"/.next/static/chunks/*.js | xargs -n1 basename)
CHUNK="performance.getEntriesByType(\"resource\").filter((r) => r.name.includes(\"$LIVE_CHUNK\")).length"

for vp in "d 1440 900" "m 390 844"; do
  set -- $vp
  tag=$1
  ab set viewport "$2" "$3" 2

  # Hero: still first paint, then the first input brings Bean to life.
  ab open "$URL"
  ab wait 2500
  shot "$tag-hero-still"
  box=$(js 'const r = document.querySelector("[class*=heroBean] [class*=beanStack]").getBoundingClientRect(); `${Math.round(r.x)} ${Math.round(r.y)} ${Math.round(r.width)} ${Math.round(r.height)}`' | tr -d '"')
  set -- $box
  bx=$1 by=$2 bw=$3 bh=$4
  ab mouse move $((bx - 40)) $((by + bh / 2))
  live 1
  ab wait 1800
  shot "$tag-hero-live"
  for p in "$((bx - 320)) $((by - 120))" "$((bx + bw + 200)) $((by - 200))" "$((bx + bw / 2)) $((by + bh + 160))" "$((bx - 200)) $((by + bh / 2))"; do
    ab mouse move ${p% *} ${p#* }
    ab wait 700
  done
  shot "$tag-hero-look"
  ab mouse move $((bx + bw / 2)) $((by + bh / 2))
  ab wait 500
  shot "$tag-hero-hover"
  ab click 'button[aria-label="Say hi to Bean"]'
  ab wait 450
  shot "$tag-hero-hi"
  ab wait 3000

  # How it works: six step poses, each change pops.
  ab open "$URL"
  ab wait 1200
  js "($STEP)(0)" > /dev/null
  live 1
  for i in 0 1 2 3 4 5; do
    js "($STEP)($i)" > /dev/null
    ab wait 1300
    [ $i = 0 ] || [ $i = 3 ] || [ $i = 5 ] && shot "$tag-how-step$((i + 1))"
  done

  # FAQ: rises curious with the "?" bobbing, waves, hops and talks on click.
  ab open "$URL"
  ab wait 1200
  js 'scrollTo(0, document.querySelector("#faq").getBoundingClientRect().top + scrollY - innerHeight)' > /dev/null
  live 1
  ab wait 600
  js 'document.querySelector("#faq details").scrollIntoView({ block: "center" })' > /dev/null
  ab wait 600
  shot "$tag-faq-curious"
  ab wait 1600
  shot "$tag-faq-hi"
  ab click 'button[aria-label="Ask Bean for help"]'
  ab wait 450
  shot "$tag-faq-speaking"
  ab wait 2500

  # Final CTA: cheering and hopping, with the page's one (DOM) confetti.
  ab open "$URL"
  ab wait 1200
  js 'scrollTo(0, document.querySelector("#final-title").getBoundingClientRect().top + scrollY - innerHeight * 1.6)' > /dev/null
  live 1
  ab wait 600
  js 'document.querySelector("#final-title").closest("section").scrollIntoView({ block: "center" })' > /dev/null
  ab wait 300
  shot "$tag-final-party"
  ab wait 1700
  shot "$tag-final-cheer"
  ab wait 1500

  echo "$tag checks: $(js '({ scroll: document.documentElement.scrollWidth + "/" + innerWidth, buttons: [...document.querySelectorAll("[class*=beanBtn]")].map((b) => { const r = b.getBoundingClientRect(); return Math.round(r.width) + "x" + Math.round(r.height); }), canvases: document.querySelectorAll("canvas[class*=beanLive]").length, live: document.querySelectorAll("[data-live]").length, confettiLeft: document.querySelectorAll("[class*=confetti] i").length })')"
done

# Doze: 20 s without input, the hero Bean sleeps with rising z's; input wakes it.
ab set viewport 1440 900 2
ab open "$URL"
ab wait 1500
ab mouse move 900 640
live 1
ab wait 22000
shot d-hero-doze
ab mouse move 700 500
ab wait 900
shot d-hero-woke

# Keyboard: Tab reaches the hero Bean, Enter makes it talk.
ab set viewport 1440 900 2
ab open "$URL"
ab wait 1500
for _ in $(seq 1 12); do
  ab press Tab
  [ "$(js 'document.activeElement?.getAttribute("aria-label")')" = '"Say hi to Bean"' ] && break
done
ab press Enter
ab wait 450
shot d-hero-keyboard
echo "keyboard: focus=$(js 'document.activeElement?.getAttribute("aria-label")') speaking=$(js '!!document.querySelector("[class*=heroBean] [class*=beanSay][data-on]")')"
ab close

# Reduced motion: input happens, three.js is never requested.
ab set viewport 390 844 2
ab set media dark reduced-motion
ab open "$URL"
ab wait 1500
ab mouse move 100 300
js 'scrollTo(0, 3000)' > /dev/null
ab wait 2500
echo "reduced motion: three.js requests=$(js "$CHUNK") canvases=$(js 'document.querySelectorAll("canvas").length') errors=$(agent-browser --session "$SES" errors | grep -c . || true)"
ab close

# No WebGL: Chrome launched with WebGL off keeps the stills, no error.
SES=bean-live-nogl
ARGS="--mute-audio,--disable-webgl,--disable-webgl2"
ab set viewport 1440 900 2
ab open "$URL"
ab wait 1500
ab mouse move 700 500
ab wait 2500
shot d-hero-no-webgl
echo "no webgl: canvases=$(js 'document.querySelectorAll("canvas").length') errors=$(agent-browser --session "$SES" errors | grep -c . || true)"
ab close

# Chunk fails: offline after load, so the import after the first input fails.
SES=bean-live-block
ab set viewport 1440 900 2
ab open "$URL"
ab wait 2000
ab set offline on
ab mouse move 700 500
ab wait 2500
echo "chunk failed ($LIVE_CHUNK): canvases=$(js 'document.querySelectorAll("canvas").length') live=$(js 'document.querySelectorAll("[data-live]").length') errors=$(agent-browser --session "$SES" errors | grep -c . || true)"
ab close
