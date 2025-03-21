"use client";

import { Header } from "~/components/header";
import { TimeRemaining } from "~/components/time-remaining";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useEffect, useState } from "react";
import { EmojiProvider, Emoji } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useUserStore } from "~/store/userStore";
import { toast } from "sonner";

export default function CluePage() {
  const router = useRouter();
  const params = useParams();
  const teamNumber = useUserStore((state) => state.teamNumber);
  const clueNumber = params.clueNumber;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const clue = useQuery(api.clues.getClueByNumber, {
    clueNumber: Number(clueNumber),
  });
  const clueInfo = useQuery(api.teams.getTeamClue, {
    teamNumber: Number(teamNumber),
    clueNumber: Number(clueNumber),
  });
  let clueStatus = false;
  if (clueInfo?.clue == 1) {
    clueStatus = true;
  }
  const updateClue = useMutation(api.teams.updateClue);
  const [mounted, setMounted] = useState(false);
  const [cameraClicked, setCameraClicked] = useState(false);

  // Handle hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle navigation after rendering
  useEffect(() => {
    if (mounted) {
      if (isNaN(Number(clueNumber))) {
        console.log("Invalid clue number:", clueNumber);
        router.push("/game/clues");
      }
    }
  }, [clueNumber, router, mounted]);

  if (!mounted) {
    return null;
  }

  function handleCameraClick() {
    setCameraClicked(!cameraClicked);
  }

  async function handleScan(data: string) {
    console.log("Scan result:", data);

    if (!data) {
      console.log("No scan data");
      return;
    }

    if (!clue) {
      console.log("No clue data");
      return;
    }

    try {
      if (data === clue?.Code) {
        console.log("Correct clue code");

        const result = await updateClue({
          teamNumber: Number(teamNumber),
          clueNumber: Number(clueNumber),
          value: 1,
        });

        console.log("Updated result:", result);
        if (result.success) {
          console.log("Clue updated");
          toast("Correct code. Clue updated.");
          setCameraClicked(false);
        }
      } else {
        toast("Incorrect code. Please try again.");
      }
    } catch (error) {
      console.error("Error updating clue:", error);
    }
  }

  return (
    <div>
      <Header page="/game/clues" />
      <main className="flex min-h-screen flex-col items-center justify-center gap-2.5 bg-[#5776A4] px-6 text-white">
        <TimeRemaining />
        <div className={"w-full text-black"}>
          <div className="rounded-lg border-[1px] border-black bg-[#4AA5FF] p-2">
            <h3 className="text-2xl text-white">{clue?.Clue_Name}</h3>
          </div>

          <div className="rounded-lg border-[1px] border-black bg-[#E6F3FF] p-2">
            <p>{clue?.Clue_Text}</p>
          </div>

          {clueStatus ? (
            <div className="flex flex-col items-center rounded-lg border-[1px] border-black bg-[#E6F3FF] p-6">
              <h3 className="text-2xl text-black">Answer:</h3>
              <h3 className="text-2xl text-black">{clue?.Code}</h3>
            </div>
          ) : (
            <div>
              <div
                className="flex justify-center rounded-lg bg-black p-6"
                onClick={handleCameraClick}
              >
                <EmojiProvider data={emojiData}>
                  <Emoji name="camera" width={80} />
                </EmojiProvider>
              </div>
              {cameraClicked ? (
                <Scanner
                  formats={[
                    "qr_code",
                    "micro_qr_code",
                    "rm_qr_code",
                    "maxi_code",
                    "pdf417",
                    "aztec",
                    "data_matrix",
                    "matrix_codes",
                    "dx_film_edge",
                    "databar",
                    "databar_expanded",
                    "codabar",
                    "code_39",
                    "code_93",
                    "code_128",
                    "ean_8",
                    "ean_13",
                    "itf",
                    "linear_codes",
                    "upc_a",
                    "upc_e",
                  ]}
                  onScan={(result) => {
                    if (result && result.length > 0 && result[0]?.rawValue) {
                      handleScan(result[0].rawValue);
                    } else {
                      console.log("Invalid scan result:", result);
                      toast("Unable to read QR code. Please try again.");
                    }
                  }}
                  onError={(error) => {
                    console.log(`onError: ${error}'`);
                  }}
                  styles={{
                    container: {
                      width: "100%", // Take full width of parent
                      height: "100%", // Take full height of parent
                      maxWidth: "100%", // Ensure it doesn't exceed parent
                      maxHeight: "100%", // Ensure it doesn't exceed parent
                      borderRadius: "16px",
                      overflow: "hidden",
                    },
                  }}
                  components={{
                    audio: false,
                  }}
                  allowMultiple={true}
                  scanDelay={2000}
                />
              ) : null}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
