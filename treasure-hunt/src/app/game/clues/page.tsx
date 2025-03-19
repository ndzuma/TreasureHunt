import { Header } from "~/components/header";
import Image from "next/image";
import { TimeRemaining } from "~/components/time-remaining";
import { ClueButton } from "~/components/clue-button";

export default function () {
    

    return (
      <div>
        <Header page="/" />
        <main className="flex min-h-screen flex-col items-center justify-center gap-2.5 bg-[#5776A4] px-6 text-white">
                <h1 className="text-4xl">Clues</h1>         
                <TimeRemaining />
                <div className="grid grid-cols-2 gap-4">
                    <ClueButton title="Clue 1" /> 
                    <ClueButton title="Clue 2" /> 
                    <ClueButton title="Clue 3" />
                    <ClueButton title="Clue 4"/>
                    <ClueButton title="Clue 5" />
                    <ClueButton title="Clue 6" />
                    <ClueButton title="Clue 7" />
                    <ClueButton title="Clue 8" />
                    <ClueButton title="Clue 9" />
                    <ClueButton title="Clue 10" /> 
                    <ClueButton title="Clue 11" /> 
                    <ClueButton title="Clue 12" />
                    <ClueButton title="Clue 13" /> 
                    <ClueButton title="Clue 14"/> 

                </div>
        </main>
        
      </div>
      
    );
}