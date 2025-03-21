"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface ClueButtonProps {
  title: string;
  number: number;
}

export function ClueButton({ title, number }: ClueButtonProps) {
  const router = useRouter();
  
  const handleNavigateToClue = () => {
    router.push(`/game/clues/${number}`);
  };
  
  return (
    <Button
      className="h-14 w-full rounded-lg bg-[#CF3C3F] text-xl text-white"
      onClick={handleNavigateToClue}
    >
      {title}
    </Button>
  );
}
