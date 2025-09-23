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
        grid grid-cols-1 gap-6
        md:grid-cols-[240px_minmax(0,720px)_240px] md:gap-10
      "
    >
      {/* 좌측 태그 사이드바 (col 1) */}
      <aside className="hidden md:block md:sticky md:top-16 md:h-[calc(100dvh-6rem)] md:overflow-y-auto">
        <div className="mb-3 text-xs font-medium uppercase text-neutral-500">
          Tags
        </div>
        <nav className="space-y-1">
          <Link
            href="/note"
            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <span>All</span>
            <span className="ml-3 inline-flex min-w-6 items-center justify-center rounded-md bg-black/5 px-1.5 text-xs dark:bg-white/10">
              {total}
            </span>
          </Link>
          {entries.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/note/tag/${encodeURIComponent(tag)}`}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <span className="truncate">#{tag}</span>
              <span className="ml-3 inline-flex min-w-6 items-center justify-center rounded-md bg-black/5 px-1.5 text-xs dark:bg-white/10">
                {count}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* 가운데 본문 (col 2) — 다른 페이지처럼 중앙 정렬 폭 유지 */}
      <div className="min-w-0">{children}</div>

      {/* 우측 스페이서(눈에 보이지 않지만 중앙 정렬을 위해 필요, col 3) */}
      <div aria-hidden className="hidden md:block" />

      {/* 모바일에서는 상단에 접히는 태그 패널 */}
      <details className="md:hidden">
        <summary className="cursor-pointer select-none rounded-lg border px-3 py-2 text-sm">
          태그 필터
        </summary>
        <div className="mt-2 max-h-72 space-y-1 overflow-y-auto rounded-lg border p-2">
          <Link
            href="/note"
            className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            All <span className="ml-2 text-xs opacity-70">({total})</span>
          </Link>
          {entries.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/note/tag/${encodeURIComponent(tag)}`}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <span className="truncate">#{tag}</span>
              <span className="ml-3 inline-flex min-w-6 items-center justify-center rounded-md bg-black/5 px-1.5 text-xs dark:bg-white/10">
                {count}
              </span>
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
}
