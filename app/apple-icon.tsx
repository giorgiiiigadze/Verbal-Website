import { ImageResponse } from "next/og";
import { LOGO_PATH } from "@/components/ui/Logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** The home-screen icon. Worth having for an audience that is on iPhone and may
 *  add the site to a home screen before the app itself exists. */
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
          background: "#192868",
        }}
      >
        <svg width="116" height="80" viewBox="0 0 543 374">
          <path fill="#fff" d={LOGO_PATH} />
        </svg>
      </div>
    ),
    size,
  );
}
