#!/bin/bash
# Rebuilds the self-hosted font files in src/assets/fonts from Google Fonts:
# the latin subset Google serves, cut to the weights the site uses. Smaller
# files keep the first paint light (each KB before first paint costs about
# 4 ms of mobile Lighthouse LCP). Needs: curl, python3 with fonttools and
# brotli (pip install fonttools brotli). Run: bash scripts/subset-fonts.sh
set -euo pipefail
OUT="$(cd "$(dirname "$0")/.." && pwd)/src/assets/fonts"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
# Google's "latin" unicode-range, so every route keeps the glyphs it had.
LATIN="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"

# family | Google axis query | weights kept | output file
FONTS="
JetBrains Mono|wght@100..800|400:700|JetBrainsMono-wght400-700-latin.woff2
Inter|wght@100..900|400:600|Inter-wght400-600-latin.woff2
Inter|wght@100..900|400|Inter-400-latin.ttf
Inter|wght@100..900|600|Inter-600-latin.ttf
Bricolage Grotesque|opsz,wght@96,200..800|800|BricolageGrotesque-opsz96-wght800-latin.ttf
"

latin_url() {
  curl -fsS -A "$UA" "https://fonts.googleapis.com/css2?family=${1// /+}:$2&display=swap" |
    awk '/\/\* latin \*\//{f=1} f&&/src:/{match($0,/https:[^)]*/); print substr($0,RSTART,RLENGTH); exit}'
}

while IFS='|' read -r family axes keep file; do
  [ -z "$family" ] && continue
  src="$TMP/$(echo "$family" | tr -d ' ').woff2"
  [ -f "$src" ] || curl -fsS -o "$src" "$(latin_url "$family" "$axes")"
  python3 -m fontTools.varLib.instancer "$src" "wght=$keep" -q -o "$TMP/cut.ttf"
  flavor=$([ "${file##*.}" = woff2 ] && echo "--flavor=woff2" || true)
  python3 -m fontTools.subset "$TMP/cut.ttf" --unicodes="$LATIN" --layout-features='*' $flavor --output-file="$OUT/$file"
  echo "$file $(wc -c < "$OUT/$file") bytes"
done <<< "$FONTS"
