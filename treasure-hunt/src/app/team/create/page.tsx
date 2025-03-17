import { Header } from "~/components/header";
import { InputTeamName } from "~/components/input-field";
import { MainButton } from "~/components/main-button";

export default function CreatePage()
{
    return (
        <div>
            <Header page="/team" />
            <main className="flex min-h-screen flex-col items-center justify-center bg-[#5776A4] text-white px-6 gap-2.5">
                <h1 className="text-4xl font-bold">Create a Team</h1> 
                <InputTeamName />
                <MainButton title = "Create Team" page="/lobby"/>
            
            
            </main>    
        </div>


    )


}