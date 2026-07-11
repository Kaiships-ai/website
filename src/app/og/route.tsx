import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "@/lib/site.config";

export const dynamic = "force-static";

const fontDir = path.join(process.cwd(), "src/assets/fonts");
const monoBold = fs.readFileSync(path.join(fontDir, "JetBrainsMono-Bold.ttf"));
const monoRegular = fs.readFileSync(
  path.join(fontDir, "JetBrainsMono-Regular.ttf"),
);

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? siteConfig.tagline;
  const pathLabel = searchParams.get("path") ?? "kaiships.ai";
  const meta = searchParams.get("meta") ?? "tested · installable · no slop";

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
        {/* window chrome */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#ff5f57" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#febc2e" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#28c840" }} />
          <div style={{ marginLeft: 24, color: "#8d857e", fontSize: 26 }}>{pathLabel}</div>
        </div>

        {/* command line */}
        <div style={{ display: "flex", marginTop: 64, fontSize: 30, color: "#8d857e" }}>
          <span style={{ color: "#e0532f", marginRight: 16 }}>$</span>
          <span>kai ships --daily</span>
        </div>

        {/* title */}
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: title.length > 60 ? 52 : 64,
            fontWeight: 700,
            color: "#e7e5e4",
            lineHeight: 1.15,
            letterSpacing: -1.5,
            maxWidth: 1060,
          }}
        >
          {title}
        </div>

        {/* footer */}
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
      width: 1200,
      height: 630,
      fonts: [
        { name: "JBMono", data: monoBold, weight: 700 },
        { name: "JBMono", data: monoRegular, weight: 400 },
      ],
    },
  );
}
