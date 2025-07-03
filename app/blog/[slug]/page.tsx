import { formatDate, getBlogPosts } from "app/blog/utils";
import { calculateReadingTime, CustomMDX } from "app/components/mdx";
import { baseUrl } from "app/sitemap";
import { notFound } from "next/navigation";
import { Clock3, Hourglass } from "lucide-react";
import { ViewCount } from "app/components/viewCount";
import { Suspense } from "react";
export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/api/og?title=${encodeURIComponent(
        title
      )}&author=YUN&date=${encodeURIComponent(post.metadata.publishedAt)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    notFound();
  }
  return (
    <section>
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
              : `/api/og/?title=${encodeURIComponent(
                  post.metadata.title
                )}&author=YUN&date=${encodeURIComponent(
                  post.metadata.publishedAt
                )}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "YUN's blog",
            },
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
            <Clock3 className="w-3 h-3" />{" "}
            <span>{calculateReadingTime(post.content)}</span>
          </div>
        </div>

        <Suspense>
          <ViewCount slug={params.slug} />
        </Suspense>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
