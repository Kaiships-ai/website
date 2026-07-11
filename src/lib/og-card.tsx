import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

const fontDir = path.join(process.cwd(), "src/assets/fonts");

/** Shared branded OG card — dark terminal aesthetic, mono type. */
export function ogCard({
  title,
  pathLabel,
  meta,
}: {
  title: string;
  pathLabel: string;
  meta: string;
}) {
  const monoBold = fs.readFileSync(
    path.join(fontDir, "JetBrainsMono-Bold.ttf"),
  );
  const monoRegular = fs.readFileSync(
    path.join(fontDir, "JetBrainsMono-Regular.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#12100e",
          padding: 56,
          fontFamily: "JBMono",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#ff5f57" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#febc2e" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#28c840" }} />
          <div style={{ marginLeft: 24, color: "#8d857e", fontSize: 26 }}>
            {pathLabel}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 60,
            fontSize: 30,
            color: "#8d857e",
          }}
        >
          <span style={{ color: "#e0532f", marginRight: 16 }}>$</span>
          <span>kai ships --daily</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: title.length > 60 ? 50 : 64,
            fontWeight: 700,
            color: "#e7e5e4",
            lineHeight: 1.15,
            letterSpacing: -1.5,
            maxWidth: 1070,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontSize: 28 }}>
            <span style={{ color: "#4ade80", marginRight: 14 }}>✓</span>
            <span style={{ color: "#8d857e" }}>{meta}</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#e0532f",
              color: "#ffffff",
              borderRadius: 999,
              padding: "12px 28px",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            kaiships.ai
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "JBMono", data: monoBold, weight: 700 },
        { name: "JBMono", data: monoRegular, weight: 400 },
      ],
    },
  );
}
