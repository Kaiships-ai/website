"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site.config";
import { SectionHeading } from "@/components/section-heading";

export function Approach() {
  const { approach } = siteConfig;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { rootMargin: "-45% 0px -45% 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section id="approach" className="scroll-mt-24 bg-paper-2 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={approach.eyebrow}
          title={approach.title}
          titleAccent={approach.titleAccent}
          sub={approach.sub}
        />
        <ol className="mt-14 space-y-2">
          {approach.steps.map((step, i) => (
            <li
              key={step.num}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className={`grid gap-4 rounded-2xl border p-6 transition-all duration-500 sm:grid-cols-[100px_1fr_auto] sm:items-center sm:gap-8 sm:p-8 ${
                active === i
                  ? "border-accent/30 bg-white shadow-[0_16px_40px_-24px_rgba(224,83,47,0.35)]"
                  : "border-transparent bg-transparent"
              }`}
            >
              <span
                className={`font-mono text-4xl font-semibold tracking-tight transition-colors duration-500 sm:text-5xl ${
                  active === i ? "text-accent" : "text-ink-2/70"
                }`}
              >
                {step.num}
              </span>
              <div>
                <h3 className="text-xl font-medium tracking-tight text-ink sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-2">
                  {step.desc}
                </p>
              </div>
              <p className="hidden font-mono text-xs text-ink-2 lg:block">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
