import Link from "next/link";
import { formatDate, getNotePosts } from "@/utils/blog";

export function NotePosts({ count }: { count?: number }) {
  const allNotes = getNotePosts();

  return (
    <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
      {[...allNotes]
        .sort(
          (a, b) =>
            new Date(b.metadata.publishedAt).getTime() -
            new Date(a.metadata.publishedAt).getTime()
        )
        .slice(0, count ?? Infinity)
        .map((post) => (
          <Link
            key={post.slug}
            href={`/note/${post.slug}`}
            className="group block py-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/40 rounded-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 w-[110px] tabular-nums shrink-0">
                {formatDate(post.metadata.publishedAt, false)}
              </p>

              <div className="flex flex-col">
                <h3 className="text-base sm:text-lg font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                  {post.metadata.title}
                </h3>

                {post.metadata.summary && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {post.metadata.summary}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
