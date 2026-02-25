import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type Post = {
  slug: string;
  metadata: { title: string };
};

export function PostNav({
  prev,
  next,
  basePath,
}: {
  prev: Post | null;
  next: Post | null;
  basePath: string;
}) {
  return (
    <nav className="flex justify-between mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 gap-8">
      <div className="flex-1">
        {prev && (
          <Link
            href={`${basePath}/${prev.slug}`}
            className="group flex flex-col gap-1"
          >
            <span className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
              <ChevronLeft className="w-3 h-3" /> 이전 글
            </span>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
              {prev.metadata.title}
            </span>
          </Link>
        )}
      </div>

      <div className="flex-1 text-right">
        {next && (
          <Link
            href={`${basePath}/${next.slug}`}
            className="group flex flex-col gap-1 items-end"
          >
            <span className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
              다음 글 <ChevronRight className="w-3 h-3" />
            </span>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
              {next.metadata.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
