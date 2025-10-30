import { NotePosts } from "@/components/notes";
import { BlogPosts } from "@/components/posts";

export default function Page() {
  return (
    <section className="max-w-4xl mx-auto space-y-14 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="space-y-3 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 dark:from-cyan-300 dark:via-sky-200 dark:to-indigo-300 bg-clip-text text-transparent">
            Dev Blog
          </span>
        </h1>
        {/* <p className="text-base text-gray-500 dark:text-gray-400">
          기술을 기록합니다.
        </p> */}
      </header>

      {/* Blog Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Blog
          </h2>
          <a
            href="/blog"
            className="text-sm text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
          >
            모든 글 보기 →
          </a>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-800" />
        <div className="pt-4">
          <BlogPosts count={3} />
        </div>
      </section>

      {/* Note Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Note
          </h2>
          <a
            href="/note"
            className="text-sm text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
          >
            전체 보기 →
          </a>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-800" />
        <div className="pt-4">
          <NotePosts count={3} />
        </div>
      </section>
    </section>
  );
}
