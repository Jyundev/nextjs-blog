import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

export async function POST(req: NextRequest) {
  if (!process.env.REDIS_URL) {
    return;
  }
  const redis = createClient({ url: process.env.REDIS_URL });

  try {
    const { slug } = await req.json();

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Slug is required and must be a string" },
        { status: 400 }
      );
    }

    // 조회수 증가 쿼리 실행
    await redis.connect();
    await redis.hIncrBy("views", slug, 1); // 특정 slug 조회수 +1 증가

    // 결과 반환
    return NextResponse.json({
      status: 200,
      message: `View count incremented - ${slug}`,
    });
  } catch (error) {
    console.error("Error incrementing view:", error);
    return NextResponse.json(
      { error: "Failed to increment view" },
      { status: 500 }
    );
  } finally {
    if (redis) {
      await redis.disconnect();
    }
  }
}
