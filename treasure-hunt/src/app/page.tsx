"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUserStore } from "~/store/userStore";

export default function HomePage() {
  const loginUser = useMutation(api.users.loginUser);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  function get_user_type() { 
    if (username.substring(0, 2).toLowerCase() == "ku") {
      return "Lecturer"
    } else if (username.charAt(0).toLowerCase() == "k") {
      return "Student"
    } else { 
      return "Invalid"
    }
  }

  async function handleLogin() {
    if (!username) {
      setError("Username cannot be empty");
      return;
    }

    setIsLoading(true);
    setError("");
    
    const user_type = get_user_type()
    if (user_type == "Invalid") {
      setError("Invalid username");
      setIsLoading(false);
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
    <main className="flex min-h-screen flex-col items-center justify-center gap-2.5 bg-[#5776A4] px-6 text-white">
      <h1 className="text-4xl font-bold">QuestConnect</h1>
      <Image src="/logo.png" width={200} height={200} alt="Some" />
      <div className="w-full">
        <Label htmlFor="username">K Number:</Label>
        <Input
          className="border-[1px] border-black bg-[#E6F3FF] text-black"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Label htmlFor="password">Password:</Label>
        <Input
          className="border-[1px] border-black bg-[#E6F3FF] text-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <Button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log in"}
      </Button>
    </main>
  );
}
