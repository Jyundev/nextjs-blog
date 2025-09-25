import { getBlogPosts, getNotePosts } from "@/utils/blog";

export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://yun-blog.vercel.app";

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let notes = getNotePosts().map((note) => ({
    url: `${baseUrl}/note/${note.slug}`,
    lastModified: note.metadata.publishedAt,
  }));

  let routes = ["", "/blog", "/note"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...notes];
}
