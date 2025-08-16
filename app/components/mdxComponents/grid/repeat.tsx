"use client";

import { useState } from "react";

const gridOptions = [
  {
    label: "repeat(5, 1fr)",
    columns: "repeat(5, 1fr)",
    rows: "repeat(5, 1fr)",
  },
  {
    label: "repeat(2, 1fr 4fr)",
    columns: "repeat(2, 1fr 4fr)",
    rows: "repeat(2, 1fr 4fr)",
  },
  {
    label: "repeat(3, 1fr) × repeat(3, minmax(100px, auto))",
    columns: "repeat(3, 1fr)",
    rows: "repeat(3, minmax(100px, auto))",
  },
];

function parseGridCount(template: string) {
  const repeatMatch = template.match(/repeat\((\d+),\s*([^)]+)\)/);
  if (repeatMatch) {
    const repeatTimes = parseInt(repeatMatch[1], 10);
    const patternCount = repeatMatch[2].trim().split(/\s+/).length;
    return repeatTimes * patternCount;
  }
  return template.trim().split(/\s+/).length;
}

function getGridCount(columns: string, rows: string) {
  const colCount = parseGridCount(columns);
  const rowCount = parseGridCount(rows);
  return colCount * rowCount;
}

export default function GridTemplateVisualizer() {
  const [index, setIndex] = useState(0);
  const { label, columns, rows } = gridOptions[index];
  const itemCount = getGridCount(columns, rows);
  const colCount = parseGridCount(columns);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* 버튼 */}
      <button
        onClick={() => setIndex((i) => (i + 1) % gridOptions.length)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        grid-template: {label}
      </button>

      {/* Grid 컨테이너 */}
      <div
        className="bg-gray-100 dark:bg-gray-900 border border-gray-500 rounded p-2 gap-2 grid"
        style={{
          gridTemplateColumns: columns,
          gridTemplateRows: rows,
          height: "600px", // fr 폭 체감용
        }}
      >
        {Array.from({ length: itemCount }).map((_, i) => (
          <div
            key={i}
            className={`p-4 text-gray-900 dark:text-gray-100 text-lg flex flex-col items-center justify-center rounded
              ${
                i % 2 === 0
                  ? "bg-gray-300 dark:bg-gray-700"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
          >
            <span className="font-bold">{i + 1}</span>
            <span className="text-sm opacity-70">
              col {(i % colCount) + 1} / row {Math.floor(i / colCount) + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
