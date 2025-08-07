import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        코드 메모장
      </h1>
      <p className="mb-4">{`개발을 기록합니다.`}</p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
