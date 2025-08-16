"use client";

import { useState } from "react";

export default function FlexGrowWithDirection() {
  const widths = ["100%", "50%", "200px"];
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-4 p-6">
      <button
        onClick={() => setIndex((prev) => (prev + 1) % widths.length)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Container width: {widths[index]}
      </button>

      <div
        className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-900 rounded "
        style={{ width: widths[index] }}
      >
        {/* 고정 폭 */}
        <div
          className="flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded shadow "
          style={{
            flexShrink: 0,
            width: "100px",
          }}
        >
          100px
        </div>

        {/* grow 1 */}
        <div
          className="flex items-center justify-center bg-blue-400 dark:bg-blue-600 text-white rounded shadow "
          style={{ flexGrow: 1 }}
        >
          grow: 1
        </div>

        {/* grow 2 */}
        <div
          className="flex items-center justify-center bg-green-400 dark:bg-green-600 text-white rounded shadow "
          style={{ flexShrink: 0, flexGrow: 2 }}
        >
          grow: 2
        </div>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        컨테이너 크기가 줄어들어도 첫 번째 아이템은 폭 100px을 유지하며 줄어들지
        않는다.
      </p>
    </div>
  );
}
