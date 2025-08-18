"use client";

import { useState } from "react";

export default function ZIndexExample() {
  const [topBox, setTopBox] = useState<"red" | "blue" | "green">("red");

  return (
    <div className="space-y-4 p-6">
      <div className="flex gap-2">
        <button
          onClick={() => setTopBox("red")}
          className={`px-4 py-2 rounded text-white ${
            topBox === "red" ? "bg-red-600" : "bg-red-400"
          }`}
        >
          빨간 박스
        </button>
        <button
          onClick={() => setTopBox("green")}
          className={`px-4 py-2 rounded text-white ${
            topBox === "green" ? "bg-green-600" : "bg-green-400"
          }`}
        >
          초록 박스
        </button>
        <button
          onClick={() => setTopBox("blue")}
          className={`px-4 py-2 rounded text-white ${
            topBox === "blue" ? "bg-blue-600" : "bg-blue-400"
          }`}
        >
          파란 박스
        </button>
      </div>

      <div className="relative w-64 h-64 bg-gray-100 dark:bg-gray-900 rounded border">
        {/* 빨간 박스 */}
        <div
          className="absolute w-40 h-40 bg-red-400 text-white flex items-center justify-center rounded shadow-lg"
          style={{
            top: "20px",
            left: "20px",
            zIndex: topBox === "red" ? 3 : 1,
          }}
        >
          빨강
        </div>

        {/* 초록 박스 */}
        <div
          className="absolute w-40 h-40 bg-green-400 text-white flex items-center justify-center rounded shadow-lg"
          style={{
            top: "40px",
            left: "40px",
            zIndex: topBox === "green" ? 3 : 1,
          }}
        >
          초록
        </div>

        {/* 파란 박스 */}
        <div
          className="absolute w-40 h-40 bg-blue-400 text-white flex items-center justify-center rounded shadow-lg"
          style={{
            top: "60px",
            left: "60px",
            zIndex: topBox === "blue" ? 3 : 1,
          }}
        >
          파랑
        </div>
      </div>
    </div>
  );
}
