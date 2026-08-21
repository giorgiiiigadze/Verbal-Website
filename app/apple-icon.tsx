import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** The home-screen icon. Worth having for an app whose audience is on iPhone
 *  and may well add the site to their home screen before the app exists. */
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
        <svg width="112" height="112" viewBox="0 0 64 64">
          <path
            fill="#fff"
            d="M32 37a7 7 0 0 0 7-7V16a7 7 0 0 0-14 0v14a7 7 0 0 0 7 7Zm13-7a13 13 0 0 1-11 12.84V50h-4v-7.16A13 13 0 0 1 19 30h4a9 9 0 0 0 18 0h4Z"
          />
        </svg>
      </div>
    ),
    size,
  );
}
