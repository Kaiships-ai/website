import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// The Night nav logo (orange dot in a ring) at home-screen size. iOS rounds
// the corners itself, so the square stays full-bleed.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0c17",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 60,
            border: "3px solid #2c3152",
            boxShadow: "0 0 48px rgba(240, 135, 79, 0.45)",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              marginLeft: -10,
              marginTop: -10,
              borderRadius: 32,
              backgroundColor: "#f0874f",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
