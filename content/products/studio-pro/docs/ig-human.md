---
title: /ig-human · humanizer
description: Strip AI fingerprints from a draft and score it on five checks.
group: Make better reels
order: 2
---

Strips the machine fingerprint out of any draft (em dashes, AI slop words, invisible watermark characters) and
scores it against a five-check panel before it goes out.

## Run it

Say "humanize this" or `/ig-human` with a caption, script, comment, reply or DM. `/ig-reel` runs it for you.

## Commands it runs

```bash
python3 humanize.py draft.txt --report        # clean it, show what changed
python3 detect.py draft.txt                    # score it, five checks
python3 detect.py before.txt after.txt         # prove the delta
```

Both read `slop.json`: 154 stock words and phrases with plain replacements, 18 invisible character classes,
11 typographic substitutions and 16 structural tells. Edit it if it strips a word you always use.

## Fixed automatically

- Invisible characters (zero-width spaces, soft hyphens, tag characters and more).
- Typography: em dash to comma, curly quotes to straight, ellipsis to three dots.
- The slop lexicon, including Instagram phrases like "stop scrolling" and "follow for more".

## Flagged for you to rewrite

"It's not just X, it's Y", rule-of-three triads, one-word question lines, video preambles, emoji bullet lists,
shouted words, hashtag walls, reflex bait.

## The five checks

BURSTINESS, SPECIFICITY, SLOP DENSITY, FINGERPRINT, VOICE, each 0-100 (higher is more human). PASS needs 70+
overall with no check below 55.

These are local heuristics. Nothing is uploaded. They are not GPTZero, Originality or Turnitin and cannot promise
those verdicts.
