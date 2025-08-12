"use client";

import React, { useState } from "react";

const basisValues = ["100px", "150px", "200px", "25%", "auto"];
const directions: ("row" | "column")[] = ["row", "column"];

export default function FlexBasisWithDirection() {
  const [basisIndex, setBasisIndex] = useState(0);
  const [dirIndex, setDirIndex] = useState(0);

  const flexBasis = basisValues[basisIndex];
  const flexDirection = directions[dirIndex];

  return (
    <div className="space-y-4 p-6">
      <div className="flex gap-2">
        <button
          onClick={() =>
            setBasisIndex((prev) => (prev + 1) % basisValues.length)
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          flex-basis: {flexBasis}
        </button>

        <button
          onClick={() => setDirIndex((prev) => (prev + 1) % directions.length)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          flex-direction: {flexDirection}
        </button>
      </div>

      <div
        className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-900 rounded border border-gray-400"
        style={{
          flexDirection,
          width: flexDirection === "row" ? "700px" : "auto",
          height: flexDirection === "column" ? "500px" : "auto",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center bg-gray-400 dark:bg-gray-600 p-4 text-gray-900 dark:text-gray-100 rounded shadow border"
            style={{
              flexBasis,
              flexGrow: 0,
              flexShrink: 0,
            }}
          >
            Item {i + 1}
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        <b>flex-basis</b>는 <code>flex-direction</code>의 주축(main axis) 크기를
        결정합니다.
        <br />
        <code>row</code> → 너비 기준
        <br />
        <code>column</code> → 높이 기준
      </p>
    </div>
  );
}
