import { getBlogPosts } from "@/utils/blog";
import { BlogPosts } from "app/components/posts";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  const allTags = Array.from(
    new Set(getBlogPosts().flatMap((post) => post.metadata.tags ?? []))
  ).sort();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <header className="space-y-3">
        <h1 className="flex items-center gap-3 text-3xl md:text-4xl font-bold tracking-tight">
          <span className="w-1 h-5 rounded-full bg-gradient-to-b from-sky-400 to-indigo-400" />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Blog
          </span>
        </h1>
      </header>

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog"
            className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 transition-colors"
          >
            All
          </Link>
          {allTags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800" />

      {/* Blog List */}
      <div className="pt-2">
        <BlogPosts />
      </div>
    </section>
  );
}
