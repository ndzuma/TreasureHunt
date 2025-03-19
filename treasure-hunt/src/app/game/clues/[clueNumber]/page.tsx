"use client";

import { Header } from "~/components/header";
import { TimeRemaining } from "~/components/time-remaining";
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

export default function CluePage() {
  const router = useRouter();
  const params = useParams();
  const clueNumber = params.clueNumber;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const clue = useQuery(api.clues.getClueByNumber, { clueNumber: Number(clueNumber) });
  const [mounted, setMounted] = useState(false);
  
  // Handle hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Handle navigation after rendering
  useEffect(() => {
    if (mounted) {
      if (isNaN(Number(clueNumber))) { 
        console.log("Invalid clue number:", clueNumber);
        router.push("/game/clues");
      }
    }
  }, [clueNumber, router, mounted]);
  
  if (!mounted) {
    return null;
  }
  
  
  return (
    <div>
      <Header page="/game/clues" />
      <main className="flex min-h-screen flex-col items-center justify-center gap-2.5 bg-[#5776A4] px-6 text-white">
        <TimeRemaining />
        <div className={"w-full text-black"}>
          <div className="bg-[#4AA5FF] rounded-t-lg border-[1px] border-black p-2">
            <h3 className="text-2xl text-white">{ clue?.Clue_Name }</h3>
          </div>
          <div className="bg-[#E6F3FF] border-[1px] border-black p-2">
            <p>{ clue?.Clue_Text }</p>
          </div>
        </div>
      </main>
    </div>
  );
}
