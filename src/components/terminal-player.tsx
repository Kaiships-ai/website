"use client";

import { useEffect, useRef, useState } from "react";
import { TerminalShell, TermLineView, type TermLine } from "./terminal";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

/**
 * Looping terminal animation: types the command, prints result lines,
 * types the prompt line, holds, restarts. SSR renders the full static
 * output (SEO/LCP); animation takes over after mount.
 */
export function TerminalPlayer({
  title,
  command,
  lines,
  prompt,
}: {
  title: string;
  command: string;
  lines: TermLine[];
  prompt: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [cmdChars, setCmdChars] = useState(command.length);
  const [shown, setShown] = useState(lines.length);
  const [promptChars, setPromptChars] = useState(prompt.length);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reduced) return;
    const t = timers.current;
    const schedule = (fn: () => void, ms: number) => {
      t.push(setTimeout(fn, ms));
    };

    const runLoop = () => {
      setCmdChars(0);
      setShown(0);
      setPromptChars(0);
      let at = 400;
      for (let i = 1; i <= command.length; i++) {
        schedule(() => setCmdChars(i), (at += 34));
      }
      at += 350;
      for (let i = 1; i <= lines.length; i++) {
        schedule(() => setShown(i), (at += 170));
      }
      at += 500;
      for (let i = 1; i <= prompt.length; i++) {
        schedule(() => setPromptChars(i), (at += 55));
      }
      schedule(runLoop, at + 4200);
    };
    runLoop();
    const snapshot = t;
    return () => snapshot.forEach(clearTimeout);
  }, [mounted, reduced, command, lines.length, prompt]);

  const cmdDone = cmdChars >= command.length;
  const linesDone = shown >= lines.length;

  return (
    <TerminalShell title={title}>
      <div aria-hidden={mounted && !reduced ? undefined : undefined}>
        <div className="text-terminal-fg">
          <span className="mr-2 text-accent">$</span>
          {command.slice(0, cmdChars)}
          {!cmdDone ? <Cursor /> : null}
        </div>
        <div className="mt-1 space-y-0.5">
          {lines.slice(0, shown).map((l, i) => (
            <TermLineView key={i} line={l} />
          ))}
        </div>
        {cmdDone && linesDone ? (
          <div className="mt-2 text-terminal-fg">
            <span className="mr-2 text-accent">$</span>
            {prompt.slice(0, promptChars)}
            <Cursor />
          </div>
        ) : null}
      </div>
    </TerminalShell>
  );
}

function Cursor() {
  return (
    <span className="cursor-blink ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.18em] bg-amber" />
  );
}
