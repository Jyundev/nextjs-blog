import { NotePosts } from "@/components/notes";

export const metadata = {
  title: "Note",
  description: "Read my note.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-4 tracking-tighter">
        Snippets & Notes
      </h1>
      <p className="mb-8">{`간단한 메모, 정리, 생각 기록.`}</p>

      <NotePosts />
    </section>
  );
}
