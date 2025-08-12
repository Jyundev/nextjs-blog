import fs from "fs";
import path from "path";

function toPascalCase(str: string) {
  return str
    .replace(/[-_/](.)/g, (_, c) => c.toUpperCase()) // 하이픈, 언더바, 슬래시 다음 글자 대문자화
    .replace(/^(.)/, (c) => c.toUpperCase()); // 첫 글자 대문자화
}

async function generateMdxIndex() {
  const componentsDir = path.resolve(
    process.cwd(),
    "app/components/mdxComponents"
  );
  const indexFilePath = path.join(componentsDir, "index.ts");

  // 하위 폴더까지 모두 탐색하는 함수 (재귀)
  function getAllComponentFiles(dir: string): string[] {
    let results: string[] = [];

    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const dirent of list) {
      const fullPath = path.join(dir, dirent.name);
      if (dirent.isDirectory()) {
        results = results.concat(getAllComponentFiles(fullPath));
      } else if (
        dirent.isFile() &&
        (dirent.name.endsWith(".tsx") || dirent.name.endsWith(".jsx")) &&
        dirent.name !== "index.ts"
      ) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const files = getAllComponentFiles(componentsDir);

  // index.ts 기존 파일 삭제
  if (fs.existsSync(indexFilePath)) {
    fs.unlinkSync(indexFilePath);
  }

  // import 구문 생성
  const imports = files
    .map((file) => {
      // 컴포넌트 경로를 mdxComponents 폴더 기준 상대경로로
      const relativePath =
        "./" +
        path
          .relative(componentsDir, file)
          .replace(/\\/g, "/")
          .replace(/\.(tsx|jsx)$/, "");
      // 컴포넌트명은 상대경로의 모든 경로 구분자(`/`, `-`, `_`)를 제거하고 PascalCase로 변환
      const compName = toPascalCase(relativePath.replace(/^\.\/|\/$/, ""));
      return `import ${compName} from "${relativePath}";`;
    })
    .join("\n");

  // export 구문 생성 (키도 PascalCase로)
  const exports = `export const mdxComponents = {
${files
  .map((file) => {
    const relativePath =
      "./" +
      path
        .relative(componentsDir, file)
        .replace(/\\/g, "/")
        .replace(/\.(tsx|jsx)$/, "");
    const compName = toPascalCase(relativePath.replace(/^\.\/|\/$/, ""));
    return `${compName}`;
  })
  .join(",\n")},
};`;

  const content = `${imports}\n\n${exports}\n`;

  fs.writeFileSync(indexFilePath, content);

  console.log(`Generated ${indexFilePath} with components:`);
  files.forEach((f) => console.log(" - " + f));
}

generateMdxIndex().catch(console.error);
