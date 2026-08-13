import { ImageResponse } from "next/og";

export const alt = "ПОЛУТОН — specialty coffee concept";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#F3F0E8", color: "#141416", fontFamily: "sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ width: "55%", padding: "72px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ fontSize: 24, fontWeight: 800 }}>CONCEPT / DEMO PROJECT</div>
        <div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 98, fontWeight: 900, letterSpacing: "-7px" }}>ПОЛУТОН</div><div style={{ marginTop: 20, fontSize: 30 }}>Вкус между крайностями.</div></div>
        <div style={{ fontSize: 22 }}>specialty coffee · Калуга</div>
      </div>
      <div style={{ width: "45%", height: "100%", display: "flex", position: "relative" }}><div style={{ width: "50%", background: "#384BFF" }} /><div style={{ width: 8, background: "#F3F0E8" }} /><div style={{ flex: 1, background: "#FF6548" }} /><div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 150, fontWeight: 900 }}>½</div></div>
    </div>, size,
  );
}
