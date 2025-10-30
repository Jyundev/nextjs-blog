import { baseUrl } from "app/sitemap";
import { getBlogPosts, getNotePosts } from "@/utils/blog";

// RSS : Rich Site Summary or Really Simple Syndication.
export async function GET() {
  let allBlogs = await getBlogPosts();
  let allNotes = await getNotePosts();

  const createItemXml = (post, type) => `
  <item>
    <title>${post.metadata.title}</title>
    <link>${baseUrl}/blog/${post.slug}</link>
    <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
    <category>${type}</category>
  </item>
`;

  const blogItemsXml = allBlogs
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .map((post) => createItemXml(post, "Blog"))
    .join("\n");

  const noteItemsXml = allNotes
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .map((post) => createItemXml(post, "Note"))
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>CodeByYun</title>
    <link>${baseUrl}</link>
    <description>This is my blog RSS feed</description>
    ${blogItemsXml}
    ${noteItemsXml}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
