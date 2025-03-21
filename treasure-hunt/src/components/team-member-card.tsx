"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect } from "react";
import { cn } from "~/lib/utils";

interface TeamMembersCardProps {
  teamNumber: number | null;
  className?: string;
}

export function TeamMembersCard({ teamNumber, className }: TeamMembersCardProps) {
  const [mounted, setMounted] = useState(false);
  
  // Fetch team members from Convex
  const teamMembers = useQuery(api.users.getUsersInTeam, 
    teamNumber ? { teamNumber } : "skip"
  );
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  if (!teamNumber) {
    return (
      <div className={cn("w-full text-black", className)}>
        <div className="bg-[#4AA5FF] rounded-t-lg border-[1px] border-black p-2">
          <h3 className="text-2xl text-white">Your Team Members:</h3>
        </div>
        <div className="bg-[#E6F3FF] border-[1px] border-black p-2">
          <p className="text-[#21257C] italic">No team selected</p>
        </div>
      </div>
    );
  }
  
  if (teamMembers === undefined) {
    return (
      <div className={cn("w-full text-black", className)}>
        <div className="bg-[#4AA5FF] rounded-t-lg border-[1px] border-black p-2">
          <h3 className="text-2xl text-white">Your Team Members:</h3>
        </div>
        <div className="bg-[#E6F3FF] border-[1px] border-black p-2">
          <p className="text-[#21257C] italic">Loading team members...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn("w-full text-black", className)}>
      <div className="bg-[#4AA5FF] rounded-t-lg border-[1px] border-black p-2">
        <h3 className="text-2xl text-white">Your Team Members:</h3>
      </div>
      <div className="bg-[#E6F3FF] border-[1px] border-black p-2">
        {teamMembers.length === 0 ? (
          <p className="text-[#21257C] italic">No members in this team yet</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {teamMembers.map((member) => (
              <p 
                key={member._id} 
                className="overflow-hidden text-[#21257C] text-lg"
              >
                {member.user}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
