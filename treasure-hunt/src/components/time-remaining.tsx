"use client";

export function TimeRemaining() {
  return (
    <div className="flex w-full">
      <div className="w-full rounded-l-lg border border-black bg-[#4AA5FF] p-0.5">
        Time Remaining
      </div>
      <div className="w-full 20 rounded-r-lg border border-black bg-white p-0.5 text-black">
        00:59:59
      </div>
    </div>
  );
}
