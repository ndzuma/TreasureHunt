"use client"

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function HomePage() {
  function handleLogin() { 
    // Do something
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#5776A4] text-white px-6 gap-2.5">
      <h1 className="text-4xl font-bold">QuestConnect</h1>
      <Image src="/logo.png" width={200} height={200} alt="Some" />
      <div className="w-full">
        <Label htmlFor="email">K Number:</Label>
        <Input className="bg-[#E6F3FF] border-[1px] border-black text-black" type="email" />
        <Label htmlFor="password">Password:</Label>
        <Input className="bg-[#E6F3FF] border-[1px] border-black text-black" type="password" />
      </div>
      <Button onClick={handleLogin}>Log in</Button>
    </main>
  );
}
