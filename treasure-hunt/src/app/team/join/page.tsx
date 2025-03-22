"use client";

import { Header } from "~/components/header";
import Image from "next/image";
import { InputTeamName } from "~/components/input-field";
import { MainButtonWithOnClick } from "~/components/main-button";
import { useRouter } from "next/navigation";
import { useUserStore } from "~/store/userStore";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function CreatePage() {
  const [teamName, setTeamName] = useState("");
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const setTeam = useUserStore((state) => state.updateTeam);
  const joinTeam = useMutation(api.users.joinTeamByName);
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

  async function handleJoinTeam() {
    if (!userId) {
      console.log("no user id");
      return;
    }
    
    if (!teamName.trim()) {
      console.error("Team name cannot be empty");
      return;
    } 
    
    try {
      const result = await joinTeam({
        // @ts-expect-error - teamNumber is handled properly at runtime
        userId: userId,
        teamName: teamName,
      });
      console.log("here", result);

      if (result.success) {
        const teamNumber = result.teamNumber || 0;
        setTeam(teamNumber);
        router.push("/game");
      }
    } catch (err) {
      console.error("Create a team error", err);
    }
  }

  const handleTeamNameChange = (value: string) => {
    setTeamName(value.toUpperCase());
  };

  return (
    <div className="min-h-[100dvh] bg-[#5776A4]">
      <Header page="/team" />
      <main className="flex min-h-[50vh] flex-col items-center justify-center gap-2.5 bg-[#5776A4] px-6 text-white">
        <Image src="/logo.png" width={200} height={200} alt="Some" />
        <h1 className="text-4xl font-bold">Join a Team</h1>
        <InputTeamName onchange={handleTeamNameChange} />
        <MainButtonWithOnClick title="Join Team" onClick={handleJoinTeam} />
      </main>
    </div>
  );
}
