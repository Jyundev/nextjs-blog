import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      {/* <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1> */}
      <h1 className="font-semibold text-2xl mb-4 tracking-tighter  flex items-center gap-3">
        <span className="w-1 h-4 rounded-full bg-gradient-to-b from-sky-400 to-indigo-400"></span>
        My Blog
      </h1>
      <BlogPosts />
    </section>
  );
}
