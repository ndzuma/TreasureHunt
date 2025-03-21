"use client";

import { Header } from "~/components/header";
import { TimeRemaining } from "~/components/time-remaining";
import { ClueButton } from "~/components/clue-button";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useUserStore } from "~/store/userStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function SummaryPage() {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const teamNumber = useUserStore((state) => state.teamNumber);
  const getAllClue = useQuery(api.clues.getAllClues);
  const teamScore = useQuery(api.teams.getTeamScore, { teamNumber: teamNumber! });
    const allCluesWereFound = teamScore === 14;
  
  const [mounted, setMounted] = useState(false);
    
  // Handle hydration issues
  useEffect(() => {
    setMounted(true);
    console.log("Current user state:", {
      userId: useUserStore.getState().userId,
      username: useUserStore.getState().username,
      teamNumber: useUserStore.getState().teamNumber
    });
  }, []);
  
  useEffect(() => {
    if (mounted) {
      if (!userId) {
        router.push("/");
      } else if (!teamNumber) {
        router.push("/team");
      } else if (!allCluesWereFound) {
        router.push("/game/clues");
      }
    }
  }, [userId, teamNumber, allCluesWereFound, router, mounted]);

  // Don't render until after hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-[#5776A4] min-h-screen">
      <Header page="/team" />
      <main className="flex flex-col items-center justify-top gap-3 px-4 text-white">
        <h1 className="text-4xl">Clues</h1>
        <TimeRemaining />
        <div className="grid grid-cols-2 gap-4">
          {getAllClue?.map((clue) => (
            <ClueButton
              key={clue._id}
              title={"Clue " + clue.Clue_Number}
              number={clue.Clue_Number}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
