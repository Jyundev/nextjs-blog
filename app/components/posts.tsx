import { formatDate, getBlogPosts } from "@/utils/blog";
import Link from "next/link";

export function BlogPosts({ count }: { count?: number }) {
  let allBlogs = getBlogPosts();

  return (
    <div>
      {[...allBlogs]
        .sort((a, b) => {
          const da = new Date(a.metadata.publishedAt).getTime();
          const db = new Date(b.metadata.publishedAt).getTime();
          if (da === db) return 0;
          return db - da; // 최신순
        })
        .slice(0, count ?? Infinity) // 개수 제한
        .map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col space-y-1 mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 rounded"
          >
            <div className="w-full flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums shrink-0">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:underline">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
