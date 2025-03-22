"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "~/components/header";
import { MainButton } from "~/components/main-button";
import { Button } from "~/components/ui/button";
import { useUserStore } from "~/store/userStore";

export default function HomePage() {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);
  const userId = useUserStore((state) => state.userId);
  
  useEffect(() => {
    console.log("Current user state:", {
      userId: useUserStore.getState().userId,
      username: useUserStore.getState().username,
      teamNumber: useUserStore.getState().teamNumber
    });
  }, []);

  function handleLogOut() {
    console.log("In the team page");
    console.log(userId);
    clearUser();
    router.push("/");
  }
  return (
    <div className="min-h-[100dvh] bg-[#5776A4]">
      <Header page="/" />
      <main className="flex min-h-[50vh] flex-col items-center justify-center gap-2.5 bg-[#5776A4] px-6 text-white">
        <h1 className="text-4xl font-bold">QuestConnect</h1>
        <Image src="/logo.png" width={200} height={200} alt="Some" />
        <MainButton title="Join team" page="/team/join" />
        <MainButton title="Create team" page="/team/create" />
        <Button
          className="rounded-lg border-[1px] border-black bg-[#4AA5FF] px-4 py-2 text-white"
          onClick={handleLogOut}
        >
          Log out
        </Button>
      </main>
    </div>
  );
}
