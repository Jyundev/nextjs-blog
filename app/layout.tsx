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
    default: "codedByYun",
    template: "%s | codedByYun",
  },
  description:
    "Sharing insights, code, and clean solutions from my journey as a frontend developer.",
  openGraph: {
    title: "codedByYun",
    description:
      "Frontend development tips, real-world projects, and insights on React, TypeScript, and more.",
    url: baseUrl,
    siteName: "codedByYun",
    locale: "en_US",
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
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
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
          <div className="max-w-xl w-full mx-4 lg:mx-auto mt-8">
            <Navbar />
          </div>
        </header>
        {/* 메인(가변) */}
        <main className="flex-1 w-full">{children}</main>
        <footer className="w-full">
          <div className="max-w-xl w-full mx-4 lg:mx-auto px-2 md:px-0">
            <Footer />
          </div>
        </footer>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
