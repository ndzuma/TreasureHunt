"use client";

import { Header } from "~/components/header";
import { TimeTaken } from "~/components/time-taken";
import { ClueButton } from "~/components/clue-button";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useUserStore } from "~/store/userStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function convertSecondsToTime(milliseconds: number) {
  if (!milliseconds) {
    return "00:00:00";
  }
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}


export default function SummaryPage() {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const teamNumber = useUserStore((state) => state.teamNumber);
  const getAllClue = useQuery(api.clues.getAllClues);
  const teamScore = useQuery(api.teams.getTeamScore, { teamNumber: teamNumber! });
  const timeTaken = useQuery(api.teams.getTimeTaken, { teamNumber: teamNumber! });
  const teamData = useQuery(api.teams.getByNumber, { teamNumber: teamNumber! });
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
      }
    }
  }, [userId, teamNumber, allCluesWereFound, router, mounted]);

  // Don't render until after hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-[#5776A4] min-h-[100dvh]">
      <Header page="/team" />
      <main className="flex flex-col items-center justify-top gap-3 px-4 text-white pb-6">
        <h1 className="text-4xl">Clues</h1>
        <TimeTaken timeTaken={convertSecondsToTime(timeTaken!)} />
        <div className="grid grid-cols-2 gap-4">
          {getAllClue?.map((clue) => {
            // @ts-expect-error - Ignore type error for teamData
            const clueValue = teamData?.[`Clue${clue.Clue_Number}`] as number;
            const clueStatus = clueValue === 1;
            return (
              <ClueButton
                key={clue._id}
                title={"Clue " + clue.Clue_Number}
                number={clue.Clue_Number}
                isFound={clueStatus}
              />
            )
          })}
        </div>
      </main>
    </div>
  );
}
