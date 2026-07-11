import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  sub,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  sub?: string;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center items-center" : "";
  return (
    <Reveal className={`flex flex-col gap-4 ${alignCls}`}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-ink">
        {"//"} {eyebrow}
      </p>
      <h2 className="max-w-2xl text-4xl font-medium tracking-tight text-ink sm:text-5xl">
        {title}{" "}
        {titleAccent ? (
          <em className="font-serif italic text-accent-ink">{titleAccent}</em>
        ) : null}
      </h2>
      {sub ? (
        <p className="max-w-xl text-base leading-relaxed text-ink-2">{sub}</p>
      ) : null}
    </Reveal>
  );
}
