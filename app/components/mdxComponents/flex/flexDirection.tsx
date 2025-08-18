"use client";

import React, { useState } from "react";

const flexDirections: React.CSSProperties["flexDirection"][] = [
  "row",
  "row-reverse",
  "column",
  "column-reverse",
];

export default function FlexToggleExample() {
  const [index, setIndex] = useState(0);
  const flexDirection = flexDirections[index];

  return (
    <div className="space-y-4 ">
      <button
        onClick={() => setIndex((prev) => (prev + 1) % flexDirections.length)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        flexDirection : {flexDirection}
      </button>

      <div
        className="flex gap-4 p-4  bg-gray-100 dark:bg-gray-900 rounded transition"
        style={{ flexDirection }}
      >
        <div className="bg-gray-300 dark:bg-gray-700 p-4 text-gray-900 dark:text-gray-100">
          AAAAAAAAAAAA
        </div>
        <div className="bg-gray-400 dark:bg-gray-600 p-4 text-gray-900 dark:text-gray-100">
          BBB
        </div>
        <div className="flex-1 bg-gray-500 dark:bg-gray-500 p-4 text-gray-900 dark:text-gray-100">
          CCCCCCC
        </div>
      </div>
    </div>
  );
}
