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
          width: "100%",
          height: "100%",
          flexDirection: "column",
          background:
            " linear-gradient(90deg,rgba(230, 230, 255, 1) 0%, rgba(9, 9, 121, 1) 0%, rgba(255, 230, 252, 1) 0%, rgba(212, 248, 255, 1) 100%)",
          padding: 80,
          color: "black",
          fontFamily: "Arial, sans-serif",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: "bold", lineHeight: 1.3 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: "50%", // 원형 배경을 만들기 위해 사용
              overflow: "hidden", // 이미지를 잘라내지 않도록 설정
              backgroundColor: "#ffffff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              // src={`data:image/png;base64,${Buffer.from(imageBuffer).toString(
              //   "base64"
              // )}`}
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/og/my-notion-face-transparent.png`}
              width={160}
              height={160}
              alt="Avatar"
              style={{ objectFit: "cover" }} // 이미지가 원형 안에 잘 맞게 처리
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 32 }}>{author}</div>
          <div style={{ fontSize: 24 }}>{date}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
