import { MetadataRoute } from "next";
import { baseUrl } from "./sitemap"; // 또는 다른 config에서 import

const base = baseUrl || "https://yun-blog.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/", // 모든 경로 허용
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
