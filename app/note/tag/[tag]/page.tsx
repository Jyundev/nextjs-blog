import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNotePosts } from "app/utils/blog"; // 네 경로에 맞게

function norm(s: string) {
  return s.trim().toLowerCase();
}

export async function generateStaticParams() {
  const notes = getNotePosts();
  const tags = new Set<string>();
  for (const n of notes)
    for (const t of n?.metadata?.tags ?? []) tags.add(norm(t));
  // 정적 빌드 시 태그별 페이지 생성
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

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">
          #{decodeURIComponent(params.tag)}
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {items.length} note{items.length > 1 ? "s" : ""} found
        </p>
      </header>

      <ul className="space-y-5">
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
                className="text-neutral-900 dark:text-neutral-100 tracking-tight"
              >
                {n.metadata.title}
              </Link>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {new Date(n.metadata.publishedAt).toLocaleDateString("ko-KR")}
                {n.metadata.tags?.length ? (
                  <>
                    {" · "}#{n.metadata.tags.join(" #")}
                  </>
                ) : null}
              </p>
            </li>
          ))}
      </ul>
    </section>
  );
}
