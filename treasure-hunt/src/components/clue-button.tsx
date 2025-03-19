"use client"

import { Button } from "./ui/button";

interface ClueButtonProps{
    title:string
}

export function ClueButton({title } : ClueButtonProps) {
    
   

  
    
    return (
        <Button className="rounded-lg bg-[#CF3C3F]   text-white w-full"> {title} </Button>


    );

}