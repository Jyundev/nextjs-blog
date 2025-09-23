import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        머릿속 정리
      </h1>
      <p className="mb-4">{`배운 것들을 메모합니다.`}</p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
