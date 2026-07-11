import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#12100e",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 5,
          }}
        >
          <div
            style={{
              color: "#e7e5e4",
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            k
          </div>
          <div
            style={{
              width: 12,
              height: 30,
              backgroundColor: "#e0532f",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
