"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "~/components/header";
import { MainButton } from "~/components/main-button";
import { Button } from "~/components/ui/button";
import { useUserStore } from "~/store/userStore";

export default function HomePage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  const clearUser = useUserStore((state) => state.clearUser);
  
  function handleLogOut() { 
    clearUser()
    router.push("/")
  }
  return (
    <div>
      <Header page="/" />
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#5776A4] text-white px-6 gap-2.5">
        <h1 className="text-4xl font-bold">QuestConnect</h1>
        <Image src="/logo.png" width={200} height={200} alt="Some" />
        <MainButton title="Join team" page="/team/join" />
        <MainButton title="Create team" page="/team/create" />
        <Button className="rounded-lg bg-[#4AA5FF] border-[1px] border-black px-4 py-2 text-white" onClick={handleLogOut}>Log out</Button>
      </main>
    </div>
  );
}
