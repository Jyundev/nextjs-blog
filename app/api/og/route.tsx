import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "My Blog Post";
  const author = searchParams.get("author") || "Yun";
  const date = searchParams.get("date") || "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          height: "100%",
          padding: "48px 64px",
          backgroundColor: "#fafafa",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          boxSizing: "border-box",
          color: "#111827", // 다크 그레이
        }}
      >
        {/* Left: Avatar */}
        <div
          style={{
            width: 240,
            height: 240,
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#e5e7eb", // 연한 회색 배경
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "4px solid #3b82f6", // 파란색 테두리
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/og/my-notion-face-transparent.png`}
            alt="Avatar"
            width={240}
            height={240}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>

        {/* Right: Text */}
        <div
          style={{
            marginLeft: 56,
            maxWidth: 720,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.2,
              margin: 0,
              color: "#111827",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              gap: 24,
              fontSize: 22,
              color: "#6b7280", // 중간 그레이
              fontWeight: 500,
            }}
          >
            <span>{author}</span>
            {date && <span>· {date}</span>}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
