import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Footer from "./components/footer";
import { Navbar } from "./components/nav";
import "./global.css";
import { baseUrl } from "./sitemap";
import { themeInitScript } from "./utils/themeScript";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "codeByYun",
    template: "%s | codeByYun",
  },
  description:
    "배운 것을 기록하며 성장해가는 프론트엔드 개발자의 공간입니다.",
  openGraph: {
    title: "codeByYun",
    description:
      "React, Next.js, TypeScript를 중심으로 학습한 내용을 정리하는 기술 블로그입니다.",
    url: baseUrl,
    siteName: "codeByYun",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={cx(
        "bg-background text-foreground",
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="google-site-verification"
          content="1GLOHR19P2RGeAsGA7iXphRML6BBrI1cugHHExYfq30"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>

      <body className="antialiased min-h-dvh flex flex-col">
        {/* 헤더 */}
        <header className="w-full">
          <div className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 mt-8">
            <Navbar />
          </div>
        </header>
        {/* 메인(가변) */}
        <main className="flex-1 w-full">{children}</main>
        <footer className="w-full">
          <div className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4">
            <Footer />
          </div>
        </footer>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
