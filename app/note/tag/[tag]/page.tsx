import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNotePosts } from "app/utils/blog";

function norm(s: string) {
  return s.trim().toLowerCase();
}

export async function generateStaticParams() {
  const notes = getNotePosts();
  const tags = new Set<string>();
  for (const n of notes)
    for (const t of n?.metadata?.tags ?? []) tags.add(norm(t));
  return Array.from(tags).map((t) => ({ tag: t }));
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
  const reqTag = norm(decodeURIComponent(params.tag));
  const all = getNotePosts();
  const items = all.filter((n) =>
    (n?.metadata?.tags ?? []).some((t) => norm(t) === reqTag)
  );

  if (items.length === 0) notFound();

  const tagLabel = decodeURIComponent(params.tag);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-gradient-to-b from-sky-400 to-indigo-400" />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            #{tagLabel}
          </span>
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {items.length} note{items.length > 1 ? "s" : ""} found
        </p>
      </header>

      <div className="border-t border-neutral-200 dark:border-neutral-800" />

      {/* Notes list */}
      <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {items
          .sort(
            (a, b) =>
              +new Date(b.metadata.publishedAt) -
              +new Date(a.metadata.publishedAt)
          )
          .map((n) => (
            <li key={n.slug}>
              <Link
                href={`/note/${n.slug}`}
                className="group block py-5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/40 rounded-lg"
              >
                <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                  {n.metadata.title}
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {new Date(n.metadata.publishedAt).toLocaleDateString("ko-KR")}
                  {n.metadata.tags?.length ? (
                    <>
                      {" · "}
                      {n.metadata.tags.map((t, i) => (
                        <span
                          key={i}
                          className="text-sky-600 dark:text-sky-400"
                        >
                          #{t}
                          {n.metadata.tags
                            ? i < n.metadata.tags.length - 1
                              ? " "
                              : ""
                            : null}
                        </span>
                      ))}
                    </>
                  ) : null}
                </p>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
}
