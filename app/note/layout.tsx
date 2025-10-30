import { ReactNode } from "react";
import { getNotePosts } from "@/utils/blog";
import Link from "next/link";

type Props = { children: ReactNode };

function getNoteTagCounts() {
  const notes = getNotePosts();
  const counts: Record<string, number> = {};
  for (const n of notes)
    for (const t of n?.metadata?.tags ?? []) counts[t] = (counts[t] ?? 0) + 1;
  return { entries: Object.entries(counts), total: notes.length };
}

export default function NotesLayout({ children }: Props) {
  const { entries, total } = getNoteTagCounts();

  return (
    <div
      className="
        mx-auto max-w-6xl px-4
        grid grid-cols-1 gap-8
        md:grid-cols-[230px_minmax(0,720px)_1fr] md:gap-12
      "
    >
      {/* ─────────────── Left Sidebar (Tags) ─────────────── */}
      <aside className="hidden md:block md:sticky md:top-20 md:self-start md:max-h-[calc(100dvh-8rem)] md:overflow-y-auto">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Tags
        </div>
        <nav className="space-y-1.5">
          {/* All */}
          <Link
            href="/note"
            className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-200
              hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <span className="font-medium group-hover:text-sky-600 dark:group-hover:text-sky-400">
              All
            </span>
            <span className="ml-3 inline-flex min-w-6 items-center justify-center rounded-md bg-neutral-200/60 px-1.5 text-xs dark:bg-neutral-700/50">
              {total}
            </span>
          </Link>

          {/* Each Tag */}
          {entries.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/note/tag/${encodeURIComponent(tag)}`}
              className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-200
                hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <span className="truncate group-hover:text-sky-600 dark:group-hover:text-sky-400">
                #{tag}
              </span>
              <span className="ml-3 inline-flex min-w-6 items-center justify-center rounded-md bg-neutral-200/60 px-1.5 text-xs dark:bg-neutral-700/50">
                {count}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* ─────────────── Main Content ─────────────── */}
      <main className="min-w-0">{children}</main>

      {/* ─────────────── Right Spacer (for centering) ─────────────── */}
      <div aria-hidden className="hidden md:block" />

      {/* ─────────────── Mobile Tag Dropdown ─────────────── */}
      <details className="md:hidden">
        <summary className="cursor-pointer select-none rounded-lg border border-neutral-200 dark:border-neutral-700 px-3 py-2 text-sm font-medium">
          태그 필터
        </summary>
        <div className="mt-2 max-h-72 space-y-1 overflow-y-auto rounded-lg border border-neutral-200 dark:border-neutral-700 p-2">
          <Link
            href="/note"
            className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            All{" "}
            <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">
              ({total})
            </span>
          </Link>
          {entries.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/note/tag/${encodeURIComponent(tag)}`}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <span className="truncate">#{tag}</span>
              <span className="ml-3 inline-flex min-w-6 items-center justify-center rounded-md bg-neutral-200/60 px-1.5 text-xs dark:bg-neutral-700/50">
                {count}
              </span>
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
}
