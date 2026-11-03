#!/bin/bash
# Encodes a silent looping reel for the page: H.264 High (plays everywhere),
# no audio, +faststart, at the lowest CRF whose file fits a byte budget.
# Usage: bash scripts/encode-loop.sh <source> <out.mp4> <width:height> <max-bytes>
# Run it on the original render, not on a file it already wrote.
# Budgets used: strip reels 432:768 450000 (a 150-220 px tile at DPR 2-3),
# proof/studio-fall-loop 432:768 650000 from proof/studio-fall.mp4.
set -euo pipefail
src=$1 out=$2 scale=$3 max=$4
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
for crf in $(seq 26 46); do
  ffmpeg -v error -y -i "$src" -an -vf "scale=$scale:flags=lanczos" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -preset slower -crf "$crf" -g 60 \
    -movflags +faststart "$tmp/out.mp4"
  size=$(wc -c < "$tmp/out.mp4")
  if [ "$size" -le "$max" ]; then
    mv "$tmp/out.mp4" "$out"
    echo "$out crf=$crf $size bytes"
    exit 0
  fi
done
echo "$out: no CRF up to 46 fits $max bytes" >&2
exit 1
