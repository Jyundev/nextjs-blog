"use client";

import React, { useState } from "react";

const flexWraps: React.CSSProperties["flexWrap"][] = [
  "nowrap",
  "wrap",
  "wrap-reverse",
];

export default function Wrap() {
  const [index, setIndex] = useState(0);
  const flexWrap = flexWraps[index];

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIndex((prev) => (prev + 1) % flexWraps.length)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        flexWrap: {flexWrap}
      </button>

      <div
        className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-900 rounded transition"
        style={{ flexWrap }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`w-24 h-24 flex items-center justify-center rounded shadow text-gray-900 dark:text-gray-100 ${
              i % 3 === 0
                ? "bg-gray-300 dark:bg-gray-700"
                : i % 3 === 1
                ? "bg-gray-400 dark:bg-gray-600"
                : "bg-gray-500 dark:bg-gray-500"
            }`}
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
