---
title: What's in Pro
description: Studio Reel plus the writing skills before and after the reel, one a week.
group: Start
order: 1
---

Everything in Studio Reel (one prompt → a hand-painted vertical reel), plus the writing skills that come before and
after the reel: hooks, scripts, captions, what to post and when.

The PreOrder gets the four Pro skills one a week. Get each one with `git pull`.

## Weekly schedule

| Week | Skill | Command | Status |
|---|---|---|---|
| 1 | Hook + script: hook options scored against 26 formulas, the spoken script, on-screen text, a timed beat sheet. Comes with a humanizer that strips AI-sounding lines. | `/ig-reel`, `/ig-human` | in the repo |
| 2 | Caption + CTA: the first line that survives "… more", the body, one ask, search terms, three hashtags. | `/ig-caption` | by 2026-10-27 |
| 3 | Viral radar: reels that are winning in your niche right now, ranked, with the hook formula each one used. | `/ig-viral` | by 2026-11-03 |
| 4 | Week plan: what to post, which format, when, and who to engage with. | `/ig-plan` | by 2026-11-10 |
| — | Studio Reel engine: `/make-reel`, watercolour animation, voice, captions, music. | `/make-reel` | in the repo |

12 months of updates from your purchase date.

## Start

1. `git clone` the repo (you get the GitHub invite after checkout), then `cd studio-pro`.
2. Install [Node.js](https://nodejs.org) 18+ and [Claude Code](https://claude.com/claude-code), then run `claude`.
3. Write the script first: `/ig-reel 3 mistakes people make when they start running`.
4. Turn it into a reel: `/make-reel` and paste the script. The full reel guide is in `engine-README.md`.

## Updates and help

- `git pull` gets every new skill and engine update. What changed is in `CHANGELOG.md`.
- Questions, bugs, ideas: the Kaiships Discord (#help, #bugs, #ideas). Bugs become GitHub Issues in the repo.
