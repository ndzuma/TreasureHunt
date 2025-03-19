"use client";

import { Header } from "~/components/header";
import Image from "next/image";
import { InputTeamName } from "~/components/input-field";
import { MainButtonWithOnClick } from "~/components/main-button";
import { useRouter } from "next/navigation";
import { useUserStore } from "~/store/userStore";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";

export default function CreatePage() {
  const [teamName, setTeamName] = useState("");
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const setTeam = useUserStore((state) => state.updateTeam);
  const joinTeam = useMutation(api.users.joinTeamByName);

  async function handleJoinTeam() {
    if (!userId) {
      console.log("no user id");
      return;
    }
    
    try {
      const result = await joinTeam({
        userId: userId,
        teamName: teamName,
      });
      console.log("here", result);

      if (result.success) {
        setTeam(result.teamId);
        router.push("/game");
      }
    } catch (err) {
      console.error("Create a team error", err);
    }
  }

  const handleTeamNameChange = (value: string) => {
    setTeamName(value);
  };

  return (
    <div>
      <Header page="/team" />
      <main className="flex min-h-screen flex-col items-center justify-center gap-2.5 bg-[#5776A4] px-6 text-white">
        <Image src="/logo.png" width={200} height={200} alt="Some" />
        <h1 className="text-4xl font-bold">Join a Team</h1>
        <InputTeamName onchange={handleTeamNameChange} />
        <MainButtonWithOnClick title="Join Team" onClick={handleJoinTeam} />
      </main>
    </div>
  );
}
