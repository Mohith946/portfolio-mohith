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
        background: "#090a10",
        border: "3px solid #818cf8",
        color: "#818cf8",
        fontSize: 38,
        fontWeight: 700,
      }}
    >
      {profile.shortName[0]}
    </div>,
    size,
  );
}
