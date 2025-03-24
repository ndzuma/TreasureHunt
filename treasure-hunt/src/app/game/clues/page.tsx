"use client";

import { Header } from "~/components/header";
import { TimeRemaining } from "~/components/time-remaining";
import { ClueButton } from "~/components/clue-button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { MainButtonWithOnClick } from "~/components/main-button";
import { useUserStore } from "~/store/userStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function CluesPage() {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const username = useUserStore((state) => state.username);
  const teamNumber = useUserStore((state) => state.teamNumber);
  const getAllClue = useQuery(api.clues.getAllClues);
  const gameStatus = useQuery(api.teams.getGameStatus, { teamNumber: teamNumber! });
  const teamScore = useQuery(api.teams.getTeamScore, { teamNumber: teamNumber! });
  const endGame = useMutation(api.teams.endGame);
  const allCluesWereFound = teamScore === 14;
  const [isLecturer, setIsLecturer] = useState(false);
  
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
      } else if (allCluesWereFound && gameStatus?.inProgress === false) {
        router.push("/game/summary");
      } else if (gameStatus?.inProgress === false) { 
        router.push("/game");
      }
    }
  }, [userId, teamNumber, gameStatus, allCluesWereFound, router, mounted]);
  
  useEffect(() => {
    if (username?.substring(0, 2).toLowerCase() === "ku") {
      setIsLecturer(true);
    }
  }, [username, setIsLecturer]);
  
  // Don't render until after hydration
  if (!mounted) {
    return null;
  }
  
  async function handleFinishGame() {
    await endGame({teamNumber: teamNumber!})
    router.push("/game/summary");
  }

  return (
    <div className="bg-[#5776A4] min-h-[100dvh]">
      <Header page="/" />
      <main className="flex flex-col items-center justify-top gap-3 px-4 text-white pb-6">
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
        { 
          allCluesWereFound ? (
            <MainButtonWithOnClick title="Done" onClick={handleFinishGame} />
          ) : (
            <MainButtonWithOnClick title="Done" onClick={handleFinishGame} disabled={true}/>
          )
        }
        {
          isLecturer ? (
            <MainButtonWithOnClick title="Finish Game" onClick={handleFinishGame} />
          ) : null
        }
        
      </main>
    </div>
  );
}
