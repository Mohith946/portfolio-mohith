import { ImageResponse } from "next/og";
import { hero, profile } from "@/data/portfolio";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { headline } = hero;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0d0f0e",
        backgroundImage:
          "radial-gradient(circle at 0% 0%, rgba(52,211,153,0.28), transparent 45%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        color: "#ecefed",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 20,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#8f9792",
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: 12, background: "#34d399" }} />
        {hero.status}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          fontSize: 88,
          lineHeight: 1.02,
          letterSpacing: -2,
        }}
      >
        <span>{headline.before}&nbsp;</span>
        <span style={{ color: "#34d399", fontStyle: "italic" }}>{headline.accent}</span>
        <span>&nbsp;{headline.after}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
        <span>{profile.name}</span>
        <span style={{ color: "#8f9792" }}>{profile.role}</span>
      </div>
    </div>,
    size,
  );
}
