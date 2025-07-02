import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "My Blog Post";
  const author = searchParams.get("author") || "Yun";
  const date = searchParams.get("date") || "";

  // 서버에서 직접 이미지 로드
  const imageRes = await fetch(
    new URL("/public/og/my-notion-face-transparent.png", import.meta.url)
  );
  const imageBuffer = await imageRes.arrayBuffer();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "linear-gradient(135deg, #e0e7ff 0%, #3b82f6 100%)",
          color: "black",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: "900",
            lineHeight: 1.2,
            color: "#1e293b",
            textShadow: "2px 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 40,
            gap: 24,
          }}
        >
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              backgroundColor: "#ffffff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/og/my-notion-face-transparent.png`}
              alt="Avatar"
              width={160}
              height={160}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            borderRadius: 12,
            padding: "12px 24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            color: "#334155",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: 12,
            maxWidth: 400,
          }}
        >
          <div style={{ fontSize: 32, fontWeight: "600" }}>{author}</div>
          <div style={{ fontSize: 24, marginTop: 4 }}>{date}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
