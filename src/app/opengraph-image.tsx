import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "@/lib/site.config";

const studio = siteConfig.studio;

export const alt = `${studio.name}: ${studio.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = path.join(process.cwd(), "src/assets/fonts");

// Link preview for the sales page. Facts only from site.config (studio).
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
          backgroundColor: "#f3ebdc",
          padding: 64,
          fontFamily: "JBMono",
          color: "#2b2233",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
          Kaiships<span style={{ color: "#d97757", marginLeft: 16 }}>Studio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 44, fontSize: 58, fontWeight: 700, lineHeight: 1.12, letterSpacing: -1.5 }}>
          <span>You built it with Claude Code.</span>
          <span style={{ color: "#a84d33" }}>Nobody knows yet.</span>
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: "#63585f", maxWidth: 1000, lineHeight: 1.35 }}>
          {studio.sub}
        </div>
        <div style={{ display: "flex", marginTop: "auto", alignItems: "center", gap: 24, fontSize: 28 }}>
          <span
            style={{
              display: "flex",
              backgroundColor: "#d97757",
              color: "#fffbf2",
              border: "3px solid #2b2233",
              borderRadius: 18,
              padding: "12px 28px",
              fontWeight: 700,
            }}
          >
            Get it · {studio.price}
          </span>
          <span style={{ color: "#63585f" }}>{studio.buyNote}</span>
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
