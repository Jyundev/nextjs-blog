"use client";

import React, { useState } from "react";

const justifyContents: React.CSSProperties["justifyContent"][] = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
];

export default function FlexToggleExample() {
  const [index, setIndex] = useState(0);
  const justifyContent = justifyContents[index];

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIndex((prev) => (prev + 1) % justifyContents.length)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        justifyContent: {justifyContent}
      </button>

      <div
        className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-900 rounded transition"
        style={{ justifyContent }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-24 h-24 flex items-center justify-center rounded shadow text-gray-900 dark:text-gray-100 ${
              i % 2 === 0
                ? "bg-gray-300 dark:bg-gray-700"
                : "bg-gray-400 dark:bg-gray-600"
            }`}
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
