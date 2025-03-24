"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface ClueButtonProps {
  title: string;
  number: number;
  isFound: boolean;
}

export function ClueButton({ title, number, isFound }: ClueButtonProps) {
  const router = useRouter();
  
  const handleNavigateToClue = () => {
    router.push(`/game/clues/${number}`);
  };
  
  if (isFound) {
    return (
      <Button
        className="h-14 w-full rounded-lg bg-[#3CB4CF] text-xl text-white"
        onClick={handleNavigateToClue}
      >
        {title}
      </Button>
    );
  }
  
  return (
    <Button
      className="h-14 w-full rounded-lg bg-[#CF3C3F] text-xl text-white"
      onClick={handleNavigateToClue}
    >
      {title}
    </Button>
  );
}
