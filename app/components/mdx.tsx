import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { highlight } from "sugar-high";
import { mdxComponents } from "./mdxComponents";

// 이미지 첨부
type ImageWithCaptionProps = {
  src: string;
  alt?: string;
  caption?: string;
  className?: string;
  sourceUrl?: string; // 출처 URL
  sourceLabel?: string; // 출처 표시 텍스트
};

export function ImageWithCaption({
  src,
  alt = "",
  caption,
  className = "",
  sourceUrl,
  sourceLabel,
}: ImageWithCaptionProps) {
  return (
    <figure className={`my-6 text-center ${className}`}>
      <img
        src={src}
        alt={alt}
        className="mx-auto max-w-full rounded-lg shadow-md"
      />
      {
        <figcaption className="mt-2 text-sm text-gray-500">
          {caption}
          {sourceUrl && (
            <>
              <a
                href={sourceUrl}
                className="inline text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {sourceLabel || "출처"}
              </a>
            </>
          )}
        </figcaption>
      }
    </figure>
  );
}

// Reading Time 계산 함수
export function calculateReadingTime(content: string) {
  const wordsPerMinute = 200; // 평균 읽기 속도
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function HeaderCell({ children }) {
  return (
    <th className="border border-gray-300 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left text-gray-900 dark:text-gray-100">
      {children}
    </th>
  );
}

function BodyCell({ children }) {
  return (
    <td className="border border-gray-300 px-4 py-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">
      {children}
    </td>
  );
}

function Table({ data }) {
  return (
    <div className="overflow-x-auto max-h-96 overflow-y-auto rounded-lg  custom-scrollbar">
      <table className="table-auto border-collapse w-full min-w-max text-gray-800 dark:text-gray-200">
        <thead>
          <tr>
            {data.headers.map((header) => (
              <HeaderCell key={header}>{header}</HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="even:bg-gray-50 dark:even:bg-gray-700"
            >
              {row.map((cell, cellIndex) => (
                <BodyCell key={cellIndex}>{cell}</BodyCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a className="inline" {...props} />;
  }

  return (
    <a
      className="inline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}
type Heading = {
  level: number;
  text: string;
  slug: string;
};

export function extractHeadings(mdxContent) {
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  const headings: Heading[] = [];
  let match;
  while ((match = headingRegex.exec(mdxContent))) {
    const level = match[1].length;
    const text = match[2];
    const slug = slugify(text);
    headings.push({ level, text, slug });
  }
  return headings;
}

interface HighlightProps {
  children: React.ReactNode;
  bgColor?: string; // 배경색
  textColor?: string; // 글자색
  className?: string; // Tailwind/전역 CSS 클래스
  style?: React.CSSProperties; // 인라인 스타일 확장
}

export const Highlight = ({
  children,
  bgColor = "var(--highlight-text-yellow)",
  textColor = "inherit",
  className = "",
  style = {},
}: HighlightProps) => {
  return (
    <span
      className={` my-2 p-2 rounded ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        padding: "0.2em 0.4em",
        borderRadius: "4px",
        ...style,
      }}
    >
      {children}
    </span>
  );
};

type Props = {
  isIcon?: boolean;
  children: React.ReactNode;
  className?: string;
};

export const Info = ({ isIcon = true, children, className }: Props) => (
  <blockquote className={`prose callout info ${className ?? ""}`}>
    <span className="title">
      {isIcon ? "💡" : ""} {children}
    </span>
  </blockquote>
);

export const Tip = ({ isIcon = true, children, className }: Props) => (
  <blockquote className={`prose callout tip ${className ?? ""}`}>
    <span className="title">
      {isIcon ? "🧩" : ""} {children}
    </span>
  </blockquote>
);

export const Warn = ({ isIcon = true, children, className }: Props) => (
  <blockquote className={`prose callout warn ${className ?? ""}`}>
    <span className="title">
      {isIcon ? "⚠️" : ""} {children}
    </span>
  </blockquote>
);

export const QA = ({ isIcon = true, children, className }: Props) => (
  <blockquote className={`prose callout qa ${className ?? ""}`}>
    <span className="title">
      {isIcon ? "❓" : ""} {children}
    </span>
  </blockquote>
);

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  Link: CustomLink,
  code: Code,
  Table,
  ImageWithCaption,
  Highlight,
  Info,
  Tip,
  Warn,
  QA,
  ...mdxComponents,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
