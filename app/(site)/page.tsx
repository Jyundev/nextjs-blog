import { NotePosts } from "@/components/notes";
import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
            Dev Blog
          </span>
        </h1>
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
