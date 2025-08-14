"use client";

export default function FlexShorthandExample() {
  return (
    <div className="space-y-4 p-6">
      <div className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-900 ">
        {/* grow: 1, shrink: 0, basis: 0 */}
        <div className="flex-[1_1_0] bg-blue-400 text-white flex items-center justify-center p-4">
          flex: 1
        </div>

        {/* grow: 2, shrink: 1, basis: 0 */}
        <div className="flex-[2_1_0] bg-green-400 text-white flex items-center justify-center p-4">
          flex: 2 1 0
        </div>

        {/* grow:1 shrink: 1, basis: 150px */}
        <div className="flex-[0_0_150px] bg-red-400 text-white flex items-center justify-center p-4">
          flex: 1 150px
        </div>
      </div>
    </div>
  );
}
