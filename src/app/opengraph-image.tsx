import { ImageResponse } from "next/og";

export const alt = "Calera34 Labs · Software a medida y Odoo en Carmelo, Colonia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#0F2240";
const SKY = "#1EA0E6";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: NAVY,
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", fontSize: 128, fontWeight: 700 }}>
          <span>Calera</span>
          <span style={{ color: SKY }}>34</span>
          <span style={{ marginLeft: 28 }}>Labs</span>
        </div>
        <div style={{ width: 160, height: 6, background: SKY, margin: "36px 0" }} />
        <div style={{ fontSize: 44 }}>Software a medida y Odoo en Carmelo, Colonia</div>
      </div>
    ),
    { ...size },
  );
}
