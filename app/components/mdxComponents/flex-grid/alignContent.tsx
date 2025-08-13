"use client";

import { useState } from "react";

const alignOptions = [
  {
    value: "flex-start",
    description: "줄들을 컨테이너의 시작점(위쪽)으로 정렬합니다.",
  },
  {
    value: "flex-end",
    description: "줄들을 컨테이너의 끝점(아래쪽)으로 정렬합니다.",
  },
  { value: "center", description: "줄들을 가운데로 정렬합니다." },
  {
    value: "space-between",
    description:
      "첫 줄과 마지막 줄은 위·아래 끝에 붙이고, 나머지 줄 간 간격을 균일하게 합니다.",
  },
  {
    value: "space-around",
    description: "줄 위·아래에 절반 간격을 두고, 줄 간 간격은 동일하게 합니다.",
  },
  {
    value: "space-evenly",
    description: "모든 줄과 컨테이너 위·아래 사이 간격을 동일하게 합니다.",
  },
  {
    value: "stretch",
    description: "줄의 높이를 늘려 컨테이너를 가득 채웁니다.",
  },
];

export default function AlignContentVisualizer() {
  const [index, setIndex] = useState(0);
  const alignContent = alignOptions[index].value;
  const description = alignOptions[index].description;

  const containerHeight = 400;
  const containerWidth = 500;
  const itemWidth = 150;
  const itemHeight = 50;
  const itemCount = 10;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <button
        onClick={() => setIndex((i) => (i + 1) % alignOptions.length)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        align-content: {alignContent}
      </button>

      <div
        className="bg-gray-100 dark:bg-gray-900 rounded relative"
        style={{
          width: containerWidth,
          height: containerHeight,
          display: "flex",
          flexWrap: "wrap",
          alignContent,
          gap: "10px",
          border: "2px solid #555",
        }}
      >
        {Array.from({ length: itemCount }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-300 dark:bg-gray-700 border border-gray-500 rounded flex items-center justify-center"
            style={{
              width: itemWidth,
              height: itemHeight,
            }}
          >
            Item {i + 1}
          </div>
        ))}
      </div>

      <pre className="whitespace-pre-wrap bg-gray-200 dark:bg-gray-800 p-4 rounded text-gray-900 dark:text-gray-100 text-sm leading-relaxed">
        {description}
      </pre>
    </div>
  );
}
