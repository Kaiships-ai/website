---
title: "The system, and your first script tonight"
module: 1
summary: "One page that shows the whole faceless-reel machine with my real numbers, then you set up Claude Code and write your first 30-second script tonight."
minutes: 75
lessons:
  - "1.1 The whole machine on one page"
  - "1.2 Why animated faceless reels"
  - "1.3 Set up Claude Code"
  - "1.4 Exercise: your first 30-second script"
---

# Module 1. The system, and your first script tonight

This module is free. If you never buy anything from me, you should still leave with a working setup and a script you wrote yourself. That is the bar.

I am Kai. I run @kaiships.ai on Instagram. I post animated reels that Claude Code makes, and I turn the people who watch them into leads and, sometimes, buyers. This course is how I do it, in order, with the real numbers, including the bad ones.

## 1.1 The whole machine on one page

Here is the full path, left to right:

```
idea  →  script  →  reel  →  "comment KEYWORD"  →  DM  →  email  →  one product
```

Each step does one job.

**Idea.** A topic that already worked for someone else, filtered by my own taste. Module 2 is all about this.

**Script.** About 30 seconds of spoken words. One reel, one idea. Module 3.

**Reel.** Claude Code turns the script into a vertical video: voiceover, painted animation, captions, music, sound effects. You do not film yourself.

**"Comment KEYWORD".** The last line of every reel tells people to comment one short word. Each reel gets its own word, and I never reuse one.

**DM.** Anyone who comments gets a direct message with a free thing: a list, a prompt pack, a checklist. The first line of the DM is the link. Then one question. Then I ask for an email.

**Email.** A short sequence of three emails that helps them, then points to one product.

**One product.** A single, one-time purchase. Mine is the Reel Kit: $50, or $29.99 at its launch price.

Now the real numbers. Instagram numbers change every day, so each one has its date. I tell you these so you can judge the machine honestly, not to impress you.

- On October 1, 2026 the account had 408 followers (Instagram API).
- One reel, a coding-plugins list, had 104K views and 5.4K saves on October 1, 2026, and kept climbing after that.
- That reel is a big outlier. A typical reel of mine sits near the middle of my last ten: a median of 3,644 views and 136.5 saves.
- I have 19 live comment-to-DM flows, one per reel keyword.
- 2 people have paid for the Reel Kit so far.

Read that last line again. Two sales. This is an early system, not a finished one. Views are not the hard part. Turning views into a comment, then a DM, then an email, then a payment is the hard part, and it is where I spend most of my time.

I am not promising you income. I am showing you a machine and how it runs for me today.

## 1.2 Why animated faceless reels

For my first reels I filmed myself talking to the phone. It is the format everyone recommends. I made several.

Two examples from my own account. My tier-list reel got 750 views. My Agent Reach reel got 404. Across the talking-head reels, my note says they sat around 700 views.

Then I switched to animation made by Claude. The batch of 10 hand-drawn reels landed between 2.5K and 7.5K views each. That is the same account, the same followers, the same topics (tools and plugins for people who build with Claude). Only the format changed.

Be careful with what this proves. It is my account, one test, a small number of reels. It does not prove animation beats talking on yours. It is the reason I stopped filming and kept testing.

Here is why I think it helps, and why it matters even if the view numbers turn out different for you:

1. **No camera shyness.** You never appear. If you hate being on camera, this removes the whole problem.
2. **No retakes.** A bad line is a text edit, not a re-shoot.
3. **Volume.** I made 10 reels in one night, using 10 parallel Claude helpers and a render queue of 2 slots. You cannot do that with a camera.
4. **Constant motion.** My own lesson from a few reels: the first 3 seconds have to move constantly. A static frame loses people. An animation can move on every beat.

There is a cost. Animation that looks cheap or sloppy is worse than a plain talking head. Later in the course I will show the mistakes I made so you can skip them.

## 1.3 Set up Claude Code

You need two things on your computer: Node.js and Claude Code. Allow about 15 minutes.

**Step 1. Node.js.** Go to [nodejs.org](https://nodejs.org) and install the current LTS version. The Reel Kit needs version 18 or newer. Check it worked by opening a terminal and typing:

```bash
node --version
```

If you see a version number starting with 18 or higher, you are done with this step.

**Step 2. Claude Code.** Follow the install steps on [claude.com/claude-code](https://claude.com/claude-code). The page has the current install command for your system, and it changes, so I will not copy it here and risk giving you an old one. You also need a Claude account that can use Claude Code.

**Step 3. Make a folder and open Claude Code in it.**

```bash
mkdir my-first-reel
cd my-first-reel
claude
```

**Step 4. Check it answers.** Type this and press Enter:

```
Say hello and tell me which folder you are in.
```

If Claude replies and names the folder, you are set up.

If something breaks, copy the exact error and paste it into Claude Code with the words "setup failed, fix it". It is good at fixing its own install problems. The Reel Kit README says the same thing.

One note on cost. Claude Code uses your own Claude plan, so what it costs depends on the plan you pick. I will not guess at a number for you.

## 1.4 Exercise: write your first 30-second script tonight

You will not render anything yet. Tonight is only a script. A good script is most of a good reel.

**Pick one topic.** Use something you actually know. A tool you use, a mistake you made, a small how-to. One reel, one idea.

**Open Claude Code** in your folder and paste this prompt. Fill in the three brackets first.

```
Write a 30-second spoken script for an Instagram reel.

Topic: [one idea, in one sentence]
Who watches: [one kind of person, e.g. "beginners who just installed Claude Code"]
Facts you may use: [only facts I give you here. If you are not sure of a number or a name, leave it out and tell me]

Rules:
- Write it the way a person talks. Short sentences. Fragments are fine.
- The first line is the hook. Under 10 words. It must say something concrete, not "Did you know".
- One idea only. No second topic.
- Do not invent numbers, results or quotes.
- Banned words: unlock, game-changer, dive in, seamless, revolutionary.
- End with one line: Comment [KEYWORD] and I'll send you [the free thing].
- Output the script as numbered lines, one beat per line, and say after each line how many seconds it needs.
```

Claude will give you a draft. Do not take it as is. Read it out loud. Anywhere you stumble, rewrite the line.

**The 5-point checklist.** Your script passes if you can answer yes to all five:

1. **Hook.** Is the first line under 10 words and specific enough to make a stranger stop?
2. **One idea.** Could you say the whole reel in one sentence?
3. **Spoken.** Did you read it out loud without tripping? Does it sound like you, not like an article?
4. **True.** Is every number and name something you can point to a source for? If not, cut it.
5. **Ask.** Does it end with one clear "comment this word" line and a free thing that is real?

If it fails any point, change the line and run the checklist again. Do not move on until it is five out of five.

Save the script in a text file. You will use it in Module 3.

## What is in modules 2 to 6

Module 2 is how to find ideas that already won, and how to turn them into your own angle. Module 3 sharpens the script, and Module 4 turns it into a reel. The later modules cover the comment-to-DM flow, the email sequence and the one product at the end of it.

If you want the fastest route to a finished video, the Reel Kit does the rendering for you: one prompt, and a vertical MP4. It took 12 minutes on the first real run I timed. It comes with Kaiships School, and Module 4 shows how I use it. If you only read this free module, you can still write and post the script with any editor you like. The full course is on [the School page](https://kai-ships-ai-website.vercel.app/school).
