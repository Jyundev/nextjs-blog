import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About codeByYun",
};

export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16 space-y-12">
      {/* Intro */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">About</h1>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          안녕하세요, 프론트엔드 개발자 Yun입니다.
        </p>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          배운 것을 기록하고, 직접 만들어보며 이해를 쌓아가는 방식으로
          성장하고 있습니다. 이 블로그는 그 과정을 남기는 공간입니다.
        </p>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800" />

      {/* Blog structure */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">이 블로그는</h2>
        <ul className="space-y-3 text-neutral-700 dark:text-neutral-300">
          <li className="flex gap-3">
            <span className="font-medium text-neutral-900 dark:text-neutral-100 w-12 shrink-0">Blog</span>
            <span>학습하고 구현하며 정리한 기술 글. 주로 React, Next.js, TypeScript를 다룹니다.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-medium text-neutral-900 dark:text-neutral-100 w-12 shrink-0">Note</span>
            <span>짧은 메모, CS 정리, 개념 스케치처럼 가볍게 기록하는 공간입니다.</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800" />

      {/* Links */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Links</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="https://github.com/Jyundev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
            >
              GitHub →
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Jyundev/nextjs-blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
            >
              Blog Source →
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
