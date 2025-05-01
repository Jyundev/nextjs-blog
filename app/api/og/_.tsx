import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || "My Blog Post";
    const author = searchParams.get("author") || "Yun";
    const date = searchParams.get("date") || "2025.05.01";

    // 서버에서 직접 이미지 로드
    const imageRes = await fetch(
      new URL("/public/og/my-notion-face-customized.png", import.meta.url)
    );
    const imageBuffer = await imageRes.arrayBuffer();

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            background: "linear-gradient(to right, #1f2937, #111827)",
            padding: 80,
            color: "white",
            fontFamily: "Arial, sans-serif",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 64, fontWeight: "bold", lineHeight: 1.3 }}>
            {title}
          </div>

          <div style={{ display: "flex", alignItems: "center", marginTop: 40 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 9999,
                overflow: "hidden",
                marginRight: 24,
                backgroundColor: "#fff",
              }}
            >
              {/*  public 폴더 내 이미지 경로 사용 */}
              <img
                src={`data:image/png;base64,${Buffer.from(imageBuffer).toString(
                  "base64"
                )}`}
                width={80}
                height={80}
                alt="avatar"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 32 }}>{author}</div>
              <div style={{ fontSize: 24, color: "#d1d5db" }}>{date}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error("OG Image API Error:", e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
