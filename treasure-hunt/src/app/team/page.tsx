"use client"

import Image from "next/image";
import { Header } from "~/components/header";
import { MainButton } from "~/components/main-button";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <Header page="/" />
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#5776A4] text-white px-6 gap-2.5">
        <h1 className="text-4xl font-bold">QuestConnect</h1>
        <Image src="/logo.png" width={200} height={200} alt="Some" />
        <MainButton title="Join team" page="/" />
        <MainButton title="Create team" page="/team/create" />
        <Button className="rounded-lg bg-[#4AA5FF] border-[1px] border-black px-4 py-2 text-white" onClick={handleLogOut}>Log out</Button>
      </main>
    </div>
  );
}
