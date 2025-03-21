"use client"
import { Header } from "~/components/header";
import { TimeRemaining } from "~/components/time-remaining";
import { ClueButton } from "~/components/clue-button";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";






export default function  createCluesPage() {
    const getAllClue = useQuery(api.clues.getAllClues);
    
    return (
      <div>
        <Header page="/" />
        <main className="flex min-h-screen flex-col items-center justify-center gap-2.5 bg-[#5776A4] px-6 text-white">
                <h1 className="text-4xl">Clues</h1>         
                <TimeRemaining />
                <div className="grid grid-cols-2 gap-4">
                    {getAllClue?.map((clue) => (
                        <ClueButton key={clue._id} title={"Clue " + clue.Clue_Number} number={clue.Clue_Number} />        

                    ))}

                </div>
        </main>
        
      </div>
      
    );
}