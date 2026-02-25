import { getBlogPosts } from "@/utils/blog";
import { BlogPosts } from "app/components/posts";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.metadata.tags ?? []) {
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
    title: `#${tag} | Blog`,
    description: `Blog posts tagged with ${tag}`,
  };
}

export default function BlogByTagPage({
  params,
}: {
  params: { tag: string };
}) {
  const tag = decodeURIComponent(params.tag);
  const posts = getBlogPosts().filter((post) =>
    post.metadata.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );

  if (posts.length === 0) notFound();

  const allTags = Array.from(
    new Set(getBlogPosts().flatMap((post) => post.metadata.tags ?? []))
  ).sort();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="flex items-center gap-3 text-3xl md:text-4xl font-bold tracking-tight">
          <span className="w-1 h-5 rounded-full bg-gradient-to-b from-sky-400 to-indigo-400" />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            #{tag}
          </span>
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {posts.length} post{posts.length > 1 ? "s" : ""}
        </p>
      </header>

      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/blog"
          className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          All
        </Link>
        {allTags.map((t) => (
          <Link
            key={t}
            href={`/blog/tag/${encodeURIComponent(t)}`}
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

      {/* Filtered Blog List */}
      <div className="pt-2">
        <BlogPosts tag={tag} />
      </div>
    </section>
  );
}
