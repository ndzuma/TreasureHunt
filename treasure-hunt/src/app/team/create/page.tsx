"use client";
import { useMutation } from "convex/react";
import { createTeam, getAll } from "convex/teams";
import { Header } from "~/components/header";
import { InputTeamName } from "~/components/input-field";
import { MainButtonWithOnClick } from "~/components/main-button";
import { useUserStore } from "~/store/userStore";

import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePage() {
  const [teamName, setTeamName] = useState("");
  const userId = useUserStore((state) => state.userId);
  const setTeam = useUserStore((state) => state.updateTeam);

  const createTeam = useMutation(api.teams.createTeam);
  const router = useRouter();

  async function CreateTeam() {
    if (!userId) {
      return;
    }
    
    try {
      const newTeam = await createTeam({
        teamName: teamName,
        creatorId: userId,
      });
      if (newTeam.success == true) {
        setTeam(newTeam.teamId);
        router.push("/game"); //page name here
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
        <h1 className="text-4xl font-bold">Create a Team</h1>
        <InputTeamName onchange={handleTeamNameChange} />
        <MainButtonWithOnClick title="Create Team" onClick={CreateTeam} />
      </main>
    </div>
  );
}
