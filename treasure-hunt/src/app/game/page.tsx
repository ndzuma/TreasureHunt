"use client";

import { Header } from "~/components/header";
import { MainButtonWithOnClick } from "~/components/main-button";
import { TeamMembersCard  } from "~/components/team-member-card";
import { useRouter } from "next/navigation";
import { useUserStore } from "~/store/userStore";
import { useEffect, useState } from "react";
import { api } from "convex/_generated/api";

export default function CreatePage() {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const teamNumber = useUserStore((state) => state.teamNumber);
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
  
  // Don't render until after hydration
  if (!mounted) {
    return null;
  }

  async function habdleStartGame() {
    if (!userId || !teamNumber) {
      console.log("No user ID or team number");
      return;
    }
    router.push("/game/clues");
  }

  return (
    <div>
      <Header page="/team" />
      <main className="flex min-h-screen flex-col items-center justify-center gap-2.5 bg-[#5776A4] px-6 text-white">
        <h1 className="text-4xl font-bold">Game Lobby</h1>
        <TeamMembersCard teamNumber={teamNumber} />
        <MainButtonWithOnClick title="Start hunt" onClick={habdleStartGame} />
      </main>
    </div>
  );
}
