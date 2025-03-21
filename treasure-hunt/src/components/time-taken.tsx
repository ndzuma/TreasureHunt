"use client";

export function TimeTaken({ timeTaken }: { timeTaken: string }) {
  return (
    <div className="flex w-full">
      <div className="flex w-full rounded-l-lg border border-black bg-[#4AA5FF] p-0.5 justify-center">
        <p>Time Taken</p>
      </div>
      <div className="flex w-full rounded-r-lg border border-black bg-white p-0.5 text-black justify-center">
        <p>{timeTaken}</p>
      </div>
    </div>
  );
}
