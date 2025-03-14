"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface HeaderProps {
  page: string;
}

export function Header({ page }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between bg-[#5776A4] p-4">
      <Button
        className="rounded-lg border-[1px] border-black bg-[#4AA5FF] px-4 py-2 text-white"
        onClick={() => router.push(page)}
      >
        Back
      </Button>
      <Image src="/logo.png" width={50} height={50} alt="Some" />
    </header>
  );
}
