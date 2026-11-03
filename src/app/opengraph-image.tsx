import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "@/lib/site.config";

const studio = siteConfig.studio;

export const alt = `${studio.name}: ${studio.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const root = process.cwd();
const font = (file: string) => fs.readFileSync(path.join(root, "src/assets/fonts", file));

// Link preview for the sales page in the Night look: Bricolage headline,
// Inter text, one real reel poster as the proof. Price and refund are text,
// not a button, because a preview can't be clicked.
export default function Image() {
  const poster = fs.readFileSync(path.join(root, "public/proof/studio-fall-poster.jpg")).toString("base64");
  const nowrap = { display: "flex", whiteSpace: "nowrap" } as const;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0a0c17",
          backgroundImage: "radial-gradient(circle at 78% 30%, rgba(240,135,79,0.18), transparent 55%)",
          padding: "60px 64px",
          fontFamily: "Inter",
          color: "#ece9f6",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
          <div style={{ ...nowrap, alignItems: "center", fontSize: 26, fontWeight: 600 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: "#f0874f",
                boxShadow: "0 0 18px rgba(240,135,79,0.6)",
                marginRight: 14,
              }}
            />
            {studio.name}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 40,
              fontFamily: "Bricolage",
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: -2,
            }}
          >
            <span style={nowrap}>You built it with</span>
            <span style={nowrap}>Claude Code.</span>
            <span style={nowrap}>
              Nobody knows<span style={{ color: "#f0874f", marginLeft: 18 }}>yet.</span>
            </span>
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 25, lineHeight: 1.4, color: "#b4b1cc", textWrap: "balance" }}>
            {studio.sub}
          </div>
          <div style={{ ...nowrap, marginTop: "auto", alignItems: "baseline" }}>
            <span style={{ fontFamily: "Bricolage", fontWeight: 800, fontSize: 52, color: "#f0874f" }}>{studio.price}</span>
            <span style={{ marginLeft: 20, fontSize: 24, color: "#b4b1cc" }}>{studio.buyNote}</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 286,
            height: 508,
            borderRadius: 24,
            overflow: "hidden",
            border: "2px solid #2c3152",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
          }}
        >
          <img src={`data:image/jpeg;base64,${poster}`} width={286} height={508} alt="" style={{ objectFit: "cover" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: font("BricolageGrotesque-opsz96-wght800-latin.ttf"), weight: 800, style: "normal" },
        { name: "Inter", data: font("Inter-400-latin.ttf"), weight: 400, style: "normal" },
        { name: "Inter", data: font("Inter-600-latin.ttf"), weight: 600, style: "normal" },
      ],
    },
  );
}
