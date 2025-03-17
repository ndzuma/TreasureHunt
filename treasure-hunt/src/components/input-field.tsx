"use client"
import { Input } from "./ui/input";

export function InputTeamName({onchange}: {onchange: (e:any)=> void}) { 
    return (< Input  className = "bg-[#E6F3FF] text-black" type = "text" placeholder = "Team Name..." onChange={onchange}/>);
}