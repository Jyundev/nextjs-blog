"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TagNav({
  total,
  entries, // [ [tag, count], ... ]
}: {
  total: number;
  entries: [string, number][];
}) {
  const pathname = usePathname();

  const isAll = pathname === "";
  const isActive = (tag: string) =>
    pathname === `/note/tag/${encodeURIComponent(tag)}`;

  return (
    <div className="space-y-1">
      <Link
        href="/note"
        aria-current={isAll ? "page" : undefined}
        className={[
          "flex items-center justify-between rounded-lg px-3 py-2 text-sm",
          isAll
            ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
            : "hover:bg-neutral-100 dark:hover:bg-neutral-800",
        ].join(" ")}
      >
        <span>All</span>
        <span className="ml-3 inline-flex min-w-6 items-center justify-center rounded-md bg-black/5 px-1.5 text-xs dark:bg-white/10">
          {total}
        </span>
      </Link>

      {entries.length === 0 && (
        <p className="px-3 py-2 text-sm text-neutral-500">
          아직 태그가 없어요.
        </p>
      )}

      {entries.map(([tag, count]) => {
        const active = isActive(tag);
        return (
          <Link
            key={tag}
            href={`/note/tag/${encodeURIComponent(tag)}`}
            aria-current={active ? "page" : undefined}
            className={[
              "flex items-center justify-between rounded-lg px-3 py-2 text-sm",
              active
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "hover:bg-neutral-100 dark:hover:bg-neutral-800",
            ].join(" ")}
          >
            <span className="truncate">#{tag}</span>
            <span className="ml-3 inline-flex min-w-6 items-center justify-center rounded-md bg-black/5 px-1.5 text-xs dark:bg-white/10">
              {count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
