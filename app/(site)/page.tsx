import { NotePosts } from "@/components/notes";
import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance">
          개발 블로그
        </h1>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
          배운 것들을 기록합니다.
        </p>
      </header>

      {/* Blog */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium tracking-tight">Blog</h2>
        <div className="border-t border-neutral-200 dark:border-neutral-800" />
        <div className="pt-2">
          <BlogPosts count={3} />
        </div>
      </div>

      {/* Note */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium tracking-tight">Note</h2>
        <div className="border-t border-neutral-200 dark:border-neutral-800" />
        <div className="pt-2">
          <NotePosts count={3} />
        </div>
      </div>
    </section>
  );
}
