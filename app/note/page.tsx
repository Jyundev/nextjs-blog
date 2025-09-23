import { NotePosts } from "@/components/notes";

export const metadata = {
  title: "Note",
  description: "Read my note.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Note</h1>
      <NotePosts />
    </section>
  );
}
