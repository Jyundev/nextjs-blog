import { ImageResponse } from "next/og";
import OGImageContent from "./ogCard";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "My Blog Post";
  const author = searchParams.get("author") || "Yun";
  const date = searchParams.get("date") || "2025.08.13";
  const avatarUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/og/my-notion-face-transparent.png`;

  return new ImageResponse(
    (
      <OGImageContent
        title={title}
        author={author}
        date={date}
        avatarUrl={avatarUrl}
      />
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
