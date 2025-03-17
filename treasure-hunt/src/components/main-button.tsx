"use client";

import { useRouter } from "next/navigation";

interface MainButtonProps {
  title: string;
  page: string;
}

export function MainButton({ title, page }: MainButtonProps) {
  const router = useRouter();

  return (
    <button
      className="rounded-lg bg-[#3CB4CF] border-[1px] border-black px-4 py-2 text-white w-full"
      onClick={() => router.push(page)}
    >
      {title}
    </button>
  );
}

interface MainButtonOnClickProps {
  title: string;
  onClick?: () => void;
}

export function MainButtonWithOnClick({ title, onClick }: MainButtonOnClickProps) {
  return (
    <button
      className="rounded-lg bg-[#3CB4CF] border-[1px] border-black px-4 py-2 text-white w-full"
      onClick={onClick}
    >
      {title}
    </button>
  );
}