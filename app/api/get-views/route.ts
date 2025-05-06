import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

export async function GET(req: NextRequest) {
  const redis = createClient({ url: process.env.REDIS_URL });

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    await redis.connect();
    const count = await redis.hGet("views", slug);
    return NextResponse.json({ count: parseInt(count ?? "0") });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch view count" },
      { status: 500 }
    );
  } finally {
    await redis.disconnect();
  }
}
