"use client"
import { useMutation } from "convex/react";
import { createTeam, getAll } from "convex/teams";
import { Header } from "~/components/header";
import { InputTeamName } from "~/components/input-field";
import { MainButton } from "~/components/main-button";
import { useUserStore } from "~/store/userStore";

import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function CreatePage()
{
    const [teamName, setTeamName] = useState("");
    const userid = useUserStore((state) => state.userId)
    const setTeam = useUserStore((state) => state.updateTeam)
    const getTeam = useMutation(api.teams.getByNames)
    
    const createTeam = useMutation(api.teams.createTeam)
    const router = useRouter()

  async function CreateTeam() {
      try {
          if (userid == null) {
              return;
          }
          
          const getAll = await getTeam({ teamName: teamName })
          
        

          const newTeam = await createTeam({ teamName: teamName, creatorId:userid })
          
          
          if (newTeam.success == true) {
              router.push("")//page name here
          }
       }

    }
    return (
        <div>
            <Header page="/team" />
            <main className="flex min-h-screen flex-col items-center justify-center bg-[#5776A4] text-white px-6 gap-2.5">
                <h1 className="text-4xl font-bold">Create a Team</h1> 
                <InputTeamName onchange={setTeamName}/>
                <MainButton title = "Create Team" page="/lobby"/>
            
            
            </main>    
        </div>


    )


}