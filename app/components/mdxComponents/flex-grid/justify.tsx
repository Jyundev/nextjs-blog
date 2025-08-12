"use client";

import React, { useState, useRef, useEffect } from "react";

const justifyContents = [
  { value: "flex-start", description: "아이템들을 시작점으로 정렬합니다." },
  { value: "flex-end", description: "아이템들을 끝점으로 정렬합니다." },
  { value: "center", description: "아이템들을 가운데로 정렬합니다." },
  {
    value: "space-between",
    description: "아이템들의 사이에 균일한 간격을 만들어 줍니다.",
  },
  {
    value: "space-around",
    description: "아이템들의 둘레에 균일한 간격을 만들어 줍니다.",
  },
  {
    value: "space-evenly",
    description: "아이템들의 사이와 양 끝에 균일한 간격을 만들어 줍니다.",
  },
];

export default function JustifyContentVisualizer() {
  const [index, setIndex] = useState(0);
  const justifyContent = justifyContents[index].value;
  const description = justifyContents[index].description;

  // 아이템 개수, 아이템 너비 고정
  const itemCount = 4;
  const itemWidth = 112; // 28 * 4 px in tailwind w-28

  const containerWidth = 700; // px, 예시

  // 컨테이너 너비에 따른 총 간격 공간
  const totalGap = containerWidth - itemCount * itemWidth;

  // 간격 개수와 크기 계산
  let gapCount = 0;
  let gapSize = 0;

  switch (justifyContent) {
    case "space-between":
      gapCount = itemCount - 1;
      gapSize = gapCount > 0 ? totalGap / gapCount : 0;
      break;
    case "space-around":
      gapCount = itemCount;
      gapSize = gapCount > 0 ? totalGap / gapCount : 0;
      break;
    case "space-evenly":
      gapCount = itemCount + 1;
      gapSize = gapCount > 0 ? totalGap / gapCount : 0;
      break;
    default:
      gapCount = 0;
      gapSize = 0;
  }

  // 아이템 위치 계산 (왼쪽부터 시작 x 좌표)
  const positions: number[] = [];

  switch (justifyContent) {
    case "flex-start":
      for (let i = 0; i < itemCount; i++) {
        positions.push(i * itemWidth);
      }
      break;
    case "flex-end":
      for (let i = 0; i < itemCount; i++) {
        positions.push(totalGap + i * itemWidth);
      }
      break;
    case "center":
      const startX = totalGap / 2;
      for (let i = 0; i < itemCount; i++) {
        positions.push(startX + i * itemWidth);
      }
      break;
    case "space-between":
      for (let i = 0; i < itemCount; i++) {
        positions.push(i * (itemWidth + gapSize));
      }
      break;
    case "space-around":
      for (let i = 0; i < itemCount; i++) {
        positions.push(gapSize / 2 + i * (itemWidth + gapSize));
      }
      break;
    case "space-evenly":
      for (let i = 0; i < itemCount; i++) {
        positions.push(gapSize + i * (itemWidth + gapSize));
      }
      break;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <button
        onClick={() => setIndex((i) => (i + 1) % justifyContents.length)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        justifyContent: {justifyContent}
      </button>

      <div
        className="relative bg-gray-100 dark:bg-gray-900 rounded h-32"
        style={{ width: containerWidth, display: "flex", position: "relative" }}
      >
        {/* 간격 표시 (파란 박스) */}
        {(justifyContent === "space-between" ||
          justifyContent === "space-around" ||
          justifyContent === "space-evenly") && (
          <>
            {/* space-between 은 간격이 itemCount-1개 */}
            {Array.from(
              {
                length:
                  justifyContent === "space-between"
                    ? itemCount - 1
                    : justifyContent === "space-around"
                    ? itemCount
                    : itemCount + 1,
              },
              (_, i) => {
                // 간격 위치 계산
                let left = 0;
                if (justifyContent === "space-between") {
                  left = i * (itemWidth + gapSize) + itemWidth;
                } else if (justifyContent === "space-around") {
                  left = i * (itemWidth + gapSize);
                } else if (justifyContent === "space-evenly") {
                  left = i * (itemWidth + gapSize);
                }
                return (
                  <div
                    key={i}
                    className="absolute bg-blue-400/60 border border-blue-700 rounded text-blue-900 text-xs font-mono flex items-center justify-center select-none"
                    style={{
                      left,
                      top: 0,
                      width: gapSize,
                      height: "100%",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    {Math.round(gapSize)}px
                  </div>
                );
              }
            )}
          </>
        )}

        {/* 아이템 표시 (회색 박스) */}
        {positions.map((left, i) => (
          <div
            key={i}
            className={`absolute flex items-center justify-center rounded shadow-md text-gray-900 dark:text-gray-100 border-2 border-gray-600 dark:border-gray-400 bg-gray-300 dark:bg-gray-700`}
            style={{
              left,
              width: itemWidth,
              height: "100%",
              top: 0,
              userSelect: "none",
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
