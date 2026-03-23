import { getNotePosts } from "@/utils/blog";
import { NotePosts } from "app/components/notes";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const notes = getNotePosts();
  const tags = new Set<string>();
  for (const note of notes) {
    for (const tag of note.metadata.tags ?? []) {
      tags.add(tag.toLowerCase());
    }
  }
  return Array.from(tags).map((tag) => ({ tag }));
}

export function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Metadata {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `#${tag} | Notes`,
    description: `Notes tagged with ${tag}`,
  };
}

export default function NotesByTagPage({
  params,
}: {
  params: { tag: string };
}) {
  const tag = decodeURIComponent(params.tag);
  const notes = getNotePosts().filter((note) =>
    note.metadata.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );

  if (notes.length === 0) notFound();

  const allTags = Array.from(
    new Set(getNotePosts().flatMap((note) => note.metadata.tags ?? []))
  ).sort();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="flex items-center gap-3 text-3xl md:text-4xl font-bold tracking-tight">
          <span className="w-1 h-5 rounded-full bg-sky-500" />
          <span>#{tag}</span>
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {notes.length} note{notes.length > 1 ? "s" : ""}
        </p>
      </header>

      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/note"
          className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          All
        </Link>
        {allTags.map((t) => (
          <Link
            key={t}
            href={`/note/tag/${encodeURIComponent(t)}`}
            className={[
              "px-3 py-1 rounded-full text-xs font-medium transition-colors",
              t.toLowerCase() === tag.toLowerCase()
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700",
            ].join(" ")}
          >
            {t}
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800" />

      {/* Filtered Notes List */}
      <div className="pt-2">
        <NotePosts tag={tag} />
      </div>
    </section>
  );
}
