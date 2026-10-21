import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

const bricolage = () => fs.readFileSync(path.join(process.cwd(), "src/app/og/fonts", "Bricolage-Bold.ttf"));
const mono = () => fs.readFileSync(path.join(process.cwd(), "src/assets/fonts", "JetBrainsMono-Regular.ttf"));

export const OG = { width: 1200, height: 630 };

/** Studio-look OG card: warm paper bg, Bricolage headline, Mars-orange accent. */
export function studioCard({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#F7F5F2", padding: 72, position: "relative" }}>
        <div style={{ position: "absolute", right: -120, top: -120, width: 420, height: 420, borderRadius: 210, backgroundColor: "#DF7440", opacity: 0.9, display: "flex" }} />
        <div style={{ position: "absolute", right: 150, top: 250, width: 46, height: 46, borderRadius: 23, backgroundColor: "#B04A18", display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", fontFamily: "Mono", fontSize: 24, color: "#B04A18", letterSpacing: 3 }}>
          <div style={{ width: 30, height: 2, backgroundColor: "#B04A18", marginRight: 16, display: "flex" }} />
          {eyebrow.toUpperCase()}
        </div>
        <div style={{ display: "flex", marginTop: 40, fontFamily: "Bricolage", fontSize: title.length > 40 ? 76 : 92, lineHeight: 1.02, letterSpacing: -2, color: "#15130F", maxWidth: 800 }}>
          {title}
        </div>
        <div style={{ display: "flex", marginTop: 28, fontFamily: "Mono", fontSize: 28, color: "#6B645A", maxWidth: 900 }}>{sub}</div>
        <div style={{ display: "flex", marginTop: "auto", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #E3DED6", paddingTop: 28 }}>
          <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: 34, color: "#15130F" }}>Kaiships Studio</div>
          <div style={{ display: "flex", fontFamily: "Mono", fontSize: 24, color: "#6B645A" }}>kaiships.ai</div>
        </div>
      </div>
    ),
    {
      ...OG,
      fonts: [
        { name: "Bricolage", data: bricolage(), weight: 700 },
        { name: "Mono", data: mono(), weight: 400 },
      ],
    },
  );
}

export const SECTIONS = {
  default: { eyebrow: "Kaiships Studio", title: "One prompt. Claude ships the reel.", sub: "Script, voice, painted animation, captions, music." },
  docs: { eyebrow: "Docs", title: "Make your first reel with Studio.", sub: "Install, prompts, /make-reel, troubleshooting." },
  guides: { eyebrow: "Free guides", title: "Free guides for Claude Code.", sub: "Skills, agents and the guide behind every reel." },
  changelog: { eyebrow: "Changelog", title: "What shipped, and when.", sub: "Every Starter and Pro release, newest first." },
  showcase: { eyebrow: "Showcase", title: "Reels made with Studio.", sub: "One prompt each. Posted on @kaiships.ai." },
} as const;
