import { formatDate, getNotePosts } from "@/utils/blog";
import Link from "next/link";

export function NotePosts({ count, tag }: { count?: number; tag?: string }) {
  const allNotes = getNotePosts();

  return (
    <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
      {[...allNotes]
        .sort(
          (a, b) =>
            new Date(b.metadata.publishedAt).getTime() -
            new Date(a.metadata.publishedAt).getTime()
        )
        .filter((post) =>
          tag
            ? post.metadata.tags?.some(
                (t) => t.toLowerCase() === tag.toLowerCase()
              )
            : true
        )
        .slice(0, count ?? Infinity)
        .map((post) => (
          <Link
            key={post.slug}
            href={`/note/${post.slug}`}
            className="group flex items-baseline gap-4 py-4 rounded-lg transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
          >
            <p className="text-sm text-neutral-400 dark:text-neutral-500 w-[110px] tabular-nums shrink-0">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <h3 className="text-base font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
              {post.metadata.title}
            </h3>
          </Link>
        ))}
    </div>
  );
}
