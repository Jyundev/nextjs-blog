import { NotePosts } from "@/components/notes";

export const metadata = {
  title: "Note",
  description: "Read my note.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-4 tracking-tighter  flex items-center gap-3">
        <span className="w-1 h-4 rounded-full bg-gradient-to-b from-sky-400 to-indigo-400"></span>
        Snippets & Notes
      </h1>
      <p className="mb-8">{`간단한 메모, CS 정리, 생각 기록.`}</p>

      <NotePosts />
    </section>
  );
}
