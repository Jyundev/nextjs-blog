"use client";

import { useState } from "react";

const gridOptions = [
  {
    label: "100px 100px 300px",
    columns: "100px 100px 300px",
    rows: "100px 100px 300px",
  },
  {
    label: "1fr 1fr 1fr",
    columns: "1fr 1fr 1fr",
    rows: "1fr 1fr 1fr",
  },
  {
    label: "200px 1fr",
    columns: "200px 1fr",
    rows: "200px 1fr",
  },
  {
    label: "100px 200px auto",
    columns: "100px 200px auto",
    rows: "100px 200px auto",
  },
];

export default function GridTemplateVisualizer() {
  const [index, setIndex] = useState(0);
  const { label, columns, rows } = gridOptions[index];
  const itemCount = 9;

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
        className=" bg-gray-100 dark:bg-gray-900 border border-gray-500 rounded p-2 gap-2 grid"
        style={{
          gridTemplateColumns: columns,
          gridTemplateRows: rows,
        }}
      >
        {/* Grid 아이템 */}
        {Array.from({ length: itemCount }).map((_, i) => (
          <div
            key={i}
            className={
              i % 2 == 0
                ? "bg-gray-300 dark:bg-gray-700 p-4 text-gray-900 dark:text-gray-100 text-2xl flex items-center justify-center rounded"
                : "bg-gray-400 dark:bg-gray-600 p-4 text-gray-900 dark:text-gray-100 text-2xl flex items-center justify-center rounded"
            }
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
