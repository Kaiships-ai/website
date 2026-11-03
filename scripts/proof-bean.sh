#!/bin/bash
# Screenshots every Bean state on a running build: pnpm start -p 3217, then
# bash scripts/proof-bean.sh [base-url]. Writes docs/proof/bean/*.png.
set -euo pipefail
URL="${1:-http://localhost:3217/}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/docs/proof/bean"
mkdir -p "$OUT"
ab() { agent-browser --session bean-build "$@" > /dev/null; }
js() { printf '%s' "$1" | agent-browser --session bean-build eval --stdin; }
shot() { agent-browser --session bean-build screenshot "$OUT/$1.png" > /dev/null; echo "$1.png"; }

# Scroll the step into the active band (45-55% desktop, ~70% phone) with the next step still below it, and
# no further, so step 1 already shows the whole monitor.
STEP='(i) => { const b = document.querySelectorAll("#how ol > li")[i].getBoundingClientRect(); const y = innerWidth <= 900 ? b.top - innerHeight * 0.6 : b.bottom - innerHeight * 0.6; scrollTo(0, y + scrollY); }'

for vp in "d 1440 900" "m 390 844"; do
  set -- $vp
  tag=$1
  ab set viewport "$2" "$3"
  ab open "$URL"
  # Walk the page once so lazy media is cached, then start fresh.
  js 'new Promise(r => { let y = 0; const t = setInterval(() => { scrollTo(0, y += 600); if (y > document.body.scrollHeight) { clearInterval(t); r(1); } }, 60); })'
  ab open "$URL"
  ab wait 2600
  shot "$tag-hero-idle"
  ab open "$URL"
  js 'document.getAnimations().forEach(a => { a.pause(); a.currentTime = 1050; })'
  shot "$tag-hero-reading"
  js 'document.getAnimations().forEach(a => a.play())'
  ab wait 1500
  ab click 'button[aria-label="Say hi to Bean"]'
  ab wait 400
  shot "$tag-hero-speaking"
  js 'document.documentElement.scrollWidth + "/" + innerWidth'

  for i in 0 2 5; do
    js "($STEP)($i)"
    ab wait 700
    shot "$tag-how-step$((i + 1))"
  done

  js 'document.querySelector("#faq details").scrollIntoView({ block: "center" })'
  ab wait 450
  shot "$tag-faq-curious"
  ab wait 1400
  shot "$tag-faq-hi"
  ab click 'button[aria-label="Ask Bean for help"]'
  ab wait 400
  shot "$tag-faq-speaking"

  js 'document.querySelector("#final-title").closest("section").scrollIntoView({ block: "center" })'
  ab wait 300
  shot "$tag-final-confetti"
  ab wait 1500
  shot "$tag-final-after"
  js 'document.querySelectorAll("[class*=confetti] i").length + " confetti pieces left"'
done
