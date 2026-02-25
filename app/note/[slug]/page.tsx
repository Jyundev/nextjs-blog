import { formatDate, getNotePosts } from "@/utils/blog";
import { calculateReadingTime, CustomMDX } from "app/components/mdx";
import { PostNav } from "app/components/postNav";
import { ViewCount } from "app/components/viewCount";
import { baseUrl } from "app/sitemap";
import { Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// 1) 정적 파라미터: 노트에서만 슬러그 뽑기
export async function generateStaticParams() {
  const posts = getNotePosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// 2) 메타데이터도 노트에서 찾기
export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getNotePosts().find((p) => p.slug === params.slug);
  if (!post) return;

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  const ogImage =
    image ??
    `${baseUrl}/api/og?title=${encodeURIComponent(
      title
    )}&author=YUN&date=${encodeURIComponent(post.metadata.publishedAt)}`;

  return {
    title,
    description,
    alternates: { canonical: `${baseUrl}/note/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/note/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// 3) 본문도 노트에서 로드
export default function NotePage({ params }: { params: { slug: string } }) {
  const allNotes = getNotePosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );
  const idx = allNotes.findIndex((p) => p.slug === params.slug);
  const post = allNotes[idx];
  if (!post) notFound();
  const prev = idx < allNotes.length - 1 ? allNotes[idx + 1] : null;
  const next = idx > 0 ? allNotes[idx - 1] : null;

  return (
    <section>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `${baseUrl}/api/og?title=${encodeURIComponent(
                  post.metadata.title
                )}&author=YUN&date=${encodeURIComponent(
                  post.metadata.publishedAt
                )}`,
            url: `${baseUrl}/note/${post.slug}`,
            author: { "@type": "Person", name: "YUN's blog" },
          }),
        }}
      />

      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>

      <div className="flex flex-col md:flex-row justify-between md:items-center mt-2 mb-8 text-sm gap-2">
        <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 text-sm">
          <p className="text-sm">{formatDate(post.metadata.publishedAt)}</p>
          <p>•</p>
          <div className="flex items-center gap-1">
            <Clock3 className="w-3 h-3" />
            <span>{calculateReadingTime(post.content)}</span>
          </div>
        </div>

        <Suspense fallback={null}>
          {/* <ViewCount slug={params.slug} /> */}
        </Suspense>
      </div>

      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      <PostNav prev={prev} next={next} basePath="/note" />
    </section>
  );
}
