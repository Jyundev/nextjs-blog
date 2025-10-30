import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <header className="space-y-3">
        <h1 className="flex items-center gap-3 text-3xl md:text-4xl font-bold tracking-tight">
          <span className="w-1 h-5 rounded-full bg-gradient-to-b from-sky-400 to-indigo-400" />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            My Blog
          </span>
        </h1>

        {/* <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          기술들을 기록합니다.
        </p> */}
      </header>

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800" />

      {/* Blog List */}
      <div className="pt-2">
        <BlogPosts />
      </div>
    </section>
  );
}
