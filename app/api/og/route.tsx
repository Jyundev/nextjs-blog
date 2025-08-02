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
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "60px 80px",
          backgroundColor: "#1e1e1e", // 다크 배경
          color: "#ffffff",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* Left: Character image (larger) */}
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#2c2c2c", // 배경 투명 시 대비용
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            border: "6px solid #3b82f6",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
          }}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/og/my-notion-face-transparent.png`}
            alt="Avatar"
            width={280}
            height={280}
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        {/* Right: Title & Meta */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 760,
            marginLeft: 60,
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.3,
              color: "#f4f4f5",
            }}
          >
            {title}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <div style={{ fontSize: 26, fontWeight: 500, color: "#d1d5db" }}>
              {author}
            </div>
            <div style={{ fontSize: 22, color: "#9ca3af" }}>{date}</div>
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
