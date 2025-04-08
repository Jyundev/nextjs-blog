"use server";

import { createClient } from "redis";

// 특정 slug 조회수 증가
export async function incrementView(slug: string) {
  if (!process.env.REDIS_URL) {
    return;
  }

  const redis = createClient({ url: process.env.REDIS_URL });

  await redis.connect();
  await redis.hIncrBy("views", slug, 1); // 특정 slug 조회수 +1 증가
  await redis.disconnect();
}

// 모든 조회수 가져오기
export async function getViewsCount(
  key: string
): Promise<{ slug: string; count: number }> {
  const defaultValue = { slug: key, count: 0 };

  if (!process.env.REDIS_URL) {
    return defaultValue;
  }

  const redis = createClient({ url: process.env.REDIS_URL });

  try {
    await redis.connect();

    const viewsData = await redis.hGetAll("views"); // 해시 데이터 가져오기

    if (!viewsData || !viewsData[key]) {
      return defaultValue; // 키가 없으면 기본값 반환
    }

    return { slug: key, count: Number(viewsData[key]) };
  } catch (error) {
    console.error("Redis error:", error);
    return defaultValue;
  } finally {
    await redis.disconnect();
  }
}
