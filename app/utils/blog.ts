import fs from "fs";
import path from "path";

/**
 *
 * parseFrontmatter | .mdx 파일의 Frontmatter와 콘텐츠 분리
 * getMDXFiles | 디렉토리 내 .mdx 파일 목록 가져오기
 * readMDXFile | 특정 파일을 읽고 파싱
 * getMDXData | 전체 파일의 slug/metadata/content 추출
 * getBlogPosts | 블로그 글 목록 최종 가져오기
 * formatDate | 날짜를 사람이 읽기 쉬운 형식으로 출력
 */

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  draft?: boolean;
  tags?: string[];
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) return { metadata: {} as Metadata, content: fileContent.trim() };

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();

  const lines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};
  let i = 0;

  const stripQuotes = (s: string) => s.replace(/^['"](.*)['"]$/, "$1").trim();
  const parseInlineArray = (s: string): string[] => {
    // e.g. [nextjs, 'react', "mdx"]
    const inner = s.slice(1, -1).trim();
    if (!inner) return [];
    return inner
      .split(",")
      .map((x) => stripQuotes(x.trim()))
      .filter(Boolean);
  };

  while (i < lines.length) {
    const line = lines[i];
    // key: value 형태만 처리 (콜론 기준 첫 분리)
    const sep = line.indexOf(":");
    if (sep === -1) {
      i++;
      continue;
    }
    const key = line.slice(0, sep).trim();
    let value = line.slice(sep + 1).trim();

    // tags: 인라인 배열
    if (key === "tags" && value.startsWith("[") && value.endsWith("]")) {
      metadata.tags = parseInlineArray(value);
      i++;
      continue;
    }

    // tags: (다음 줄들에 - item 형식)
    if (key === "tags" && (value === "" || value === null)) {
      const arr: string[] = [];
      i++;
      while (i < lines.length) {
        const l = lines[i].trim();
        if (!l.startsWith("- ")) break; // 리스트 종료
        arr.push(stripQuotes(l.slice(2).trim()));
        i++;
      }
      metadata.tags = arr.filter(Boolean);
      continue;
    }

    // 일반 값들 처리 (문자열/불리언/날짜 추측)
    value = stripQuotes(value);

    if (key === "draft") {
      (metadata as any).draft = value === "true";
    } else if (key === "publishedAt" || key === "date") {
      (metadata as any).publishedAt = value;
    } else if (key === "tags") {
      // 쉼표 구분형: tags: a, b, c
      const arr =
        value.indexOf(",") >= 0
          ? value
              .split(",")
              .map((x) => stripQuotes(x.trim()))
              .filter(Boolean)
          : value
          ? [value]
          : [];
      (metadata as any).tags = arr;
    } else {
      (metadata as any)[key as keyof Metadata] = value;
    }

    i++;
  }

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "posts"));
}

export function getNotePosts() {
  return getMDXData(path.join(process.cwd(), "notes"));
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
