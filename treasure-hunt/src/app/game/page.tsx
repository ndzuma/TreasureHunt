"use client";

import { Header } from "~/components/header";
import { MainButtonWithOnClick } from "~/components/main-button";
import { TeamMembersCard  } from "~/components/team-member-card";
import { useRouter } from "next/navigation";
import { useUserStore } from "~/store/userStore";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export default function GamePage() {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const teamNumber = useUserStore((state) => state.teamNumber);
  // @ts-expect-error - userId is handled properly at runtime
  const user = useQuery(api.users.getUser, { id: userId });
  // @ts-expect-error - teamNumber is handled properly at runtime
  const gameStatus = useQuery(api.teams.getGameStatus, { teamNumber: teamNumber });
  const startGame = useMutation(api.teams.startGame);
  
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
  
  // Handle navigation after rendering
  useEffect(() => {
    if (mounted) {
      if (!userId) {
        router.push("/");
      } else if (!teamNumber) {
        router.push("/team");
      } else if (gameStatus?.inProgress === true) { 
        router.push("/game/clues");
      }
    }
  }, [userId, teamNumber, gameStatus, router, mounted]);
  
  // Don't render until after hydration
  if (!mounted) {
    return null;
  }
  
  async function handleStartGame() {
    if (!userId || !teamNumber) {
      console.log("No user ID or team number");
      return;
    }
    await startGame({teamNumber: teamNumber})
    router.push("/game/clues");
  }

  return (
    <div>
      <Header page="/team" />
      <main className="flex min-h-screen flex-col items-center justify-center gap-2.5 bg-[#5776A4] px-6 text-white">
        <h1 className="text-4xl font-bold">Game Lobby</h1>
        <TeamMembersCard teamNumber={teamNumber} />
        { 
          user?.user_type === "Lecturer" ? (
            <MainButtonWithOnClick title="Start hunt" onClick={handleStartGame} />
          ) : (
            <MainButtonWithOnClick title="Start hunt" onClick={handleStartGame} disabled={true}/>
          )
        }
      </main>
    </div>
  );
}
