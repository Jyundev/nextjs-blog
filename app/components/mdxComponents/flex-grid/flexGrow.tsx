"use client";

import { useState } from "react";

const growValues = [0, 1, 2, 3];
const directions: ("row" | "column")[] = ["row", "column"];

export default function FlexGrowWithDirection() {
  const [growIndex, setGrowIndex] = useState(1);
  const [dirIndex, setDirIndex] = useState(0);

  const flexGrow = growValues[growIndex];
  const flexDirection = directions[dirIndex];

  return (
    <div className="space-y-4 p-6">
      <div className="flex gap-2">
        <button
          onClick={() => setGrowIndex((prev) => (prev + 1) % growValues.length)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          flex-grow: {flexGrow} (Item 2)
        </button>

        <button
          onClick={() => setDirIndex((prev) => (prev + 1) % directions.length)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          flex-direction: {flexDirection}
        </button>
      </div>

      <div
        className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-900 rounded "
        style={{
          flexDirection,
          width: flexDirection === "row" ? "700px" : "auto",
          height: flexDirection === "column" ? "400px" : "auto",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center justify-center bg-gray-400 dark:bg-gray-600 p-4 text-gray-900 dark:text-gray-100 rounded"
            style={{
              flexGrow: i === 1 ? flexGrow : 1, // 두 번째 아이템만 값 변경
              flexShrink: 0,
            }}
          >
            Item {i + 1}
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        <b>flex-grow</b>는 주축(main axis)에서 남는 공간을 얼마나 차지할지
        비율로 결정합니다.
        <br />
        <code>row</code> → 가로 기준 / <code>column</code> → 세로 기준
      </p>
    </div>
  );
}
