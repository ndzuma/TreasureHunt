"use client"

import { getAllClues } from "convex/clues";
import { Button } from "./ui/button";

interface ClueButtonProps{
    title: string
    number: number
}

function printClue() {
    
    console.log();
   
}

export function ClueButton({title } : ClueButtonProps) {
    
   
    
  
    
    return (
        <Button className="rounded-lg bg-[#CF3C3F]   text-white w-full"
                onClick={() => printClue()}>
            
          {title}
        </Button>


    );

}