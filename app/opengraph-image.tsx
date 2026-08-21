import { ImageResponse } from "next/og";
import { SITE_NAME, TAGLINE } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — ${TAGLINE}`;

/**
 * Generated rather than drawn, so it cannot drift out of sync with the tagline.
 * No custom font is loaded: fetching Roboto Slab at build time would be one
 * more thing to break, and the card is read at thumbnail size.
 */
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
          background: "#192868",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#A9BAF5",
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 92, lineHeight: 1.1, marginTop: 28 }}>
          Speak the job.
        </div>
        <div style={{ fontSize: 92, lineHeight: 1.1 }}>Send the quote.</div>
        <div style={{ fontSize: 34, marginTop: 40, color: "#DDE5F9" }}>
          Spoken jobs into priced quotes, for tradespeople.
        </div>
      </div>
    ),
    size,
  );
}
