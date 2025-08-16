"use client";

import { useState } from "react";

export default function FlexOrderExample() {
  const [reversed, setReversed] = useState(false);

  return (
    <div className="space-y-4 p-6">
      <button
        onClick={() => setReversed((prev) => !prev)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        순서 {reversed ? "원래대로" : "뒤집기"}
      </button>

      {/* flex 컨테이너 */}
      <div className="flex gap-4 bg-gray-100 dark:bg-gray-900 p-4 rounded border border-gray-400">
        <div
          className="flex items-center justify-center w-20 h-20 bg-red-400 text-white rounded"
          style={{ order: reversed ? 3 : 1 }}
        >
          1
        </div>
        <div
          className="flex items-center justify-center w-20 h-20 bg-green-400 text-white rounded"
          style={{ order: reversed ? 2 : 2 }}
        >
          2
        </div>
        <div
          className="flex items-center justify-center w-20 h-20 bg-blue-400 text-white rounded"
          style={{ order: reversed ? 1 : 3 }}
        >
          3
        </div>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        <b>order</b>는 시각적 순서만 바꿉니다. HTML 순서는 여전히{" "}
        <code>1 → 2 → 3</code>이므로, 스크린 리더나 키보드 포커스 순서는
        변경되지 않습니다.
      </p>
    </div>
  );
}
