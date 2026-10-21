---
title: /ig-reel · hook + script
description: One raw idea to scored hooks, the spoken script, on-screen text and a timed beat sheet.
group: Make better reels
order: 1
---

Turns one raw idea into a Reel script: hook options off 26 formulas, the spoken script, the on-screen text, and a
timed beat sheet, in your own voice and scored before you shoot it.

## Run it

```
/ig-reel we cut proposal time from 5 hours to 20 minutes with one template
```

## Commands it runs

```bash
python3 hookscore.py hooks.txt              # rank your hook options
python3 hookscore.py --hook "one line"      # score a single one
python3 beats.py script.txt --target 30     # timed beat sheet before you shoot
```

## What it does

1. Reads your voice profile (`~/.claude/instagram/voice.md`). If there is none, it asks for three of your own reels
   and writes the file.
2. Picks three hook formulas from `hooks.json` that fit the idea and writes a spoken line plus an on-screen line for each.
3. Scores them with `hookscore.py`. Under 50 means there is no hook yet.
4. Writes the script on the winning hook, then times it with `beats.py` and fixes every flag (hook past 3 seconds,
   a beat over 4 seconds, no loop).
5. Runs the script through `/ig-human`.
6. Prints a `REEL READY` block: hook, length, on-screen cards, humanizer score.

It never publishes. You shoot and post. Say "yes" to log it to `~/.claude/instagram/log.md`.

## The shape

```
0:00 - 0:02   HOOK        the claim, spoken and on screen
0:02 - 0:07   THE STAKE   why this matters to the viewer
0:07 - ...    THE BODY    one idea per beat, the frame changes every beat
LAST 3s       THE PAYOFF  deliver the hook's promise, then one ask
LAST LINE     THE LOOP    echo one word from the hook
```

15 to 45 seconds is the working range. It never invents numbers: an unknown one stays as `{{your number}}`.
