"use client";

import React, { useState } from "react";

const alignItemsOptions = [
  {
    value: "stretch",
    description: "기본값입니다. 아이템의 높이를 컨테이너 높이에 맞게 늘립니다.",
  },
  {
    value: "flex-start",
    description: "아이템들을 교차축 시작점(위쪽)으로 정렬합니다.",
  },
  {
    value: "flex-end",
    description: "아이템들을 교차축 끝점(아래쪽)으로 정렬합니다.",
  },
  {
    value: "center",
    description: "아이템들을 교차축 가운데로 정렬합니다.",
  },
  {
    value: "baseline",
    description:
      "아이템들을 텍스트 기준선에 맞춰 정렬합니다. (주로 텍스트가 포함된 경우에 의미가 큽니다.)",
  },
];

export default function AlignSelf() {
  const [index, setIndex] = useState(0);
  const current = alignItemsOptions[index];

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 ">
      <button
        onClick={() => setIndex((i) => (i + 1) % alignItemsOptions.length)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition "
      >
        align-items: {current.value}
      </button>

      <div
        className="flex bg-gray-100 dark:bg-gray-900 rounded transition h-40"
        style={{
          alignItems: current.value as React.CSSProperties["alignItems"],
        }}
      >
        <div
          className="w-20 bg-gray-300 dark:bg-gray-700 p-4 text-gray-900 dark:text-gray-100 flex items-center justify-center rounded m-2"
          style={{
            alignSelf: "auto",
          }}
        >
          auto
        </div>
        <div
          className="w-20 bg-gray-400 dark:bg-gray-600 p-4 text-gray-900 dark:text-gray-100 flex items-center justify-center rounded m-2"
          style={{ alignSelf: "stretch" }}
        >
          stretch
        </div>
        <div
          className="w-20 bg-gray-300 dark:bg-gray-700 p-4 text-gray-900 dark:text-gray-100 flex items-center justify-center rounded m-2"
          style={{ alignSelf: "center" }}
        >
          center
        </div>
        <div
          className="w-20 bg-gray-300 dark:bg-gray-700 p-4 text-gray-900 dark:text-gray-100 flex items-center justify-center rounded m-2"
          style={{
            alignSelf: "flex-end",
          }}
        >
          flex-end
        </div>
        <div
          className="w-20 bg-gray-400 dark:bg-gray-600 p-4 text-gray-900 dark:text-gray-100 flex items-center justify-center rounded m-2"
          style={{ alignSelf: "flex-start;" }}
        >
          flex-start
        </div>
        <div
          className="w-20 bg-gray-300 dark:bg-gray-700 p-4 text-gray-900 dark:text-gray-100 flex items-center justify-center rounded m-2 break-all"
          style={{
            alignSelf: "baseline",
          }}
        >
          baseline
        </div>
      </div>

      <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-sm">
        {current.description}
      </pre>
    </div>
  );
}
