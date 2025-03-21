"use client";

import { Header } from "~/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "~/store/userStore";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

function isLecturer(username: string) {
  return username.substring(0, 2).toLowerCase() === "ku"
}

export default function ScorecardPage() {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const setTeam = useUserStore((state) => state.updateTeam);
  const teams = useQuery(api.teams.getAll);

  const [mounted, setMounted] = useState(false);

  // Handle hydration issues
  useEffect(() => {
    setMounted(true);
    console.log("Current user state:", {
      userId: useUserStore.getState().userId,
    });
  }, []);
  
  useEffect(() => {
    if (mounted) {
      if (!userId || isLecturer(userId)) {
        router.push("/");
      }
    }
  }, [userId, router, mounted]);

  if (!mounted) {
    return null;
  }
  
  function handleRedirect(teamNumber: number) {
    return () => {
      setTeam(teamNumber);
      router.push("/game");
    };
  }

  return (
    <div className="min-h-screen bg-[#5776A4]">
      <Header page="/" />
      <main className="flex flex-col items-center gap-3 bg-[#5776A4] px-4 text-white">
        <h1 className="text-4xl">Scoreboard</h1>
        <div className={"flex flex-row w-full text-black"}>
          <div className="w-full">
            <div className="rounded-lg border-[1px] border-black bg-[#4AA5FF] p-2">
              <h3 className="text-2xl text-white">Teams</h3>
            </div>
            <div className="rounded-lg border-[1px] border-black bg-[#E6F3FF] p-2">
              {teams?.map((team) => (
                <div key={team._id}>
                  <button className="text-xl text-black"  onClick={handleRedirect(team.Team_Number)}>
                    {team.Team_Name}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <div className="rounded-lg border-[1px] border-black bg-[#4AA5FF] p-2">
              <h3 className="text-2xl text-white">Clues Found</h3>
            </div>
            <div className="rounded-lg border-[1px] border-black bg-[#E6F3FF] p-2">
              {teams?.map((team) => (
                <p key={team._id} className="text-xl text-black">
                  {team.Score}
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
