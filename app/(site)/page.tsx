import { NotePosts } from "@/components/notes";
import { BlogPosts } from "@/components/posts";

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-20">
      {/* ─────────────── Header ─────────────── */}
      <header className="text-center sm:text-left space-y-3">
        <div className="h-1 w-10 bg-sky-500 rounded-full mx-auto sm:mx-0 mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Dev Blog
        </h1>
        <p className="text-base md:text-lg text-muted-foreground">
          배운 것을 기록하며 성장해가는 공간입니다.
        </p>
      </header>

      {/* ─────────────── Blog Section ─────────────── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
            Blog
          </h2>
          <a
            href="/blog"
            className="text-sm font-medium text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
          >
            모든 글 보기 →
          </a>
        </div>
        <div className="border-t border-border" />
        <div className="pt-4">
          <BlogPosts count={3} />
        </div>
      </section>

      {/* ─────────────── Note Section ─────────────── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
            Note
          </h2>
          <a
            href="/note"
            className="text-sm font-medium text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
          >
            전체 보기 →
          </a>
        </div>
        <div className="border-t border-border" />
        <div className="pt-4">
          <NotePosts count={3} />
        </div>
      </section>
    </main>
  );
}
