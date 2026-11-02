import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "@/lib/site.config";

const studio = siteConfig.studio;

export const alt = `${studio.name}: ${studio.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = path.join(process.cwd(), "src/assets/fonts");

// Link preview for the sales page, in the Night colours. Facts only from
// site.config (studio).
export default function Image() {
  const bold = fs.readFileSync(path.join(fontDir, "JetBrainsMono-Bold.ttf"));
  const regular = fs.readFileSync(path.join(fontDir, "JetBrainsMono-Regular.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0c17",
          padding: 64,
          fontFamily: "JBMono",
          color: "#ece9f6",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
          Kaiships<span style={{ color: "#f0874f", marginLeft: 16 }}>Studio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 44, fontSize: 58, fontWeight: 700, lineHeight: 1.12, letterSpacing: -1.5 }}>
          <span>You built it with Claude Code.</span>
          <span style={{ display: "flex" }}>
            Nobody knows<span style={{ color: "#f0874f", marginLeft: 22 }}>yet.</span>
          </span>
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: "#8c89a8", maxWidth: 1000, lineHeight: 1.35 }}>
          {studio.sub}
        </div>
        <div style={{ display: "flex", marginTop: "auto", alignItems: "center", gap: 24, fontSize: 28 }}>
          <span
            style={{
              display: "flex",
              backgroundColor: "#f0874f",
              color: "#160b05",
              borderRadius: 14,
              padding: "12px 28px",
              fontWeight: 700,
            }}
          >
            {studio.cta} · {studio.price}
          </span>
          <span style={{ color: "#8c89a8" }}>{studio.buyNote}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "JBMono", data: bold, weight: 700, style: "normal" },
        { name: "JBMono", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
