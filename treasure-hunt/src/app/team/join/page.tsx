"use client"

import { Header } from "~/components/header";
import Image from "next/image";
import { InputTeamName } from "~/components/input-field";
import { MainButtonWithOnClick } from "~/components/main-button";
import { useRouter } from "next/navigation";
import { useUserStore } from "~/store/userStore";

export default function CreatePage() {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);

  
  async function handleJoinTeam() {
    if (!userId) {
      return;
    }
    
    try {
      const result = await loginUser({user: username,user_type: user_type});

      if (result.success) {
        console.log(
          `User ${result.isNewUser ? "created" : "logged in"} successfully`,
        );
        router.push("/team");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div>
      <Header page="/team" />
      <main className="flex min-h-screen flex-col items-center justify-center gap-2.5 bg-[#5776A4] px-6 text-white">
        <Image src="/logo.png" width={200} height={200} alt="Some" />
        <h1 className="text-4xl font-bold">Join a Team</h1>
        <InputTeamName />
        <MainButtonWithOnClick title="Join Team" onClick={handleJoinTeam}  />
      </main>
    </div>
  );
}
