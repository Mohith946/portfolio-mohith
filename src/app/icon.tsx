import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        background: "#0d0f0e",
        border: "3px solid #34d399",
        color: "#34d399",
        fontSize: 38,
        fontStyle: "italic",
      }}
    >
      {profile.shortName[0]}
    </div>,
    size,
  );
}
