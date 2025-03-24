"use client";

import { useEffect } from "react";
import { useUserStore } from "~/store/userStore";

export function TimeRemaining() {
  const timeRemaining = useUserStore((state) => state.timeRemaining);
  const setTimeRemaining = useUserStore((state) => state.setTimeRemaining);
  
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(Math.max(0, timeRemaining - 1));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, setTimeRemaining]);
  
    // Convert seconds to HH:MM:SS format
    const formatTime = (totalSeconds: number) => {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
  
  
  return (
    <div className="flex w-full">
      <div className="w-full rounded-l-lg border border-black bg-[#4AA5FF] p-0.5">
        Time Remaining
      </div>
      <div className="w-full 20 rounded-r-lg border border-black bg-white p-0.5 text-black">
        {formatTime(timeRemaining)}
      </div>
    </div>
  );
}
