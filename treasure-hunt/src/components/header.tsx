"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "~/store/userStore";
import { useEffect, useState } from "react";

interface HeaderProps {
  page: string;
}

export function Header({ page }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter();
  const username = useUserStore((state) => state.username);
  const [isLecturer, setIsLecturer] = useState(false);
  const inScoreboard = pathname === "/scoreboard";

  useEffect(() => {
    if (username?.substring(0, 2).toLowerCase() === "ku") {
      setIsLecturer(true);
    }
  }, [username, setIsLecturer]);

  return (
    <header className="flex items-center justify-between bg-[#5776A4] p-4">
      <div className="flex gap-2">
        <Button
          className="rounded-lg border-[1px] border-black bg-[#4AA5FF] px-4 py-2 text-white"
          onClick={() => router.push(page)}
        >
          Back
        </Button>
        { 
          isLecturer && !inScoreboard ? (
            <Button
              className="rounded-lg border-[1px] border-black bg-[#4AA5FF] px-4 py-2 text-white"
              onClick={() => router.push("/scoreboard")}
            >
              Scoreboard
            </Button>
          ) : null
        }
      </div>
      <Image src="/logo.png" width={50} height={50} alt="Some" />
    </header>
  );
}
