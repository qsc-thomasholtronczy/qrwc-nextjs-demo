"use client"

import { LuVolumeX, LuVolume2, LuPlus, LuMinus} from "react-icons/lu"
import { useVolume } from "@/hooks/useVolume"
import { useToggle } from "@/hooks/useToggle"

export default function AudioPage() {
  const volumes = [
    { name: "Program Audio", component: "ProgramVolume" },
    { name: "Microphone", component: "MicVolume" },
    { name: "Speaker", component: "SpeakerVolume" },
  ]

  return (
    <div className="p-8">
      <div className="flex flex-row gap-8">
        {volumes.map((vol) => (
          <VolumeControl 
            key={vol.component} 
            name={vol.name} 
            componentName={vol.component} 
          />
        ))}
      </div>
    </div>
  )
}

function VolumeControl({ name, componentName }: { name: string, componentName: string }) {
  const { volume, adjustVolume, dbToPercent, formattedVolume } = useVolume({
    componentName,
    controlName: 'gain',
    min: -60,
    max: 0,
    step: 5
  })

  const { state: isMuted, toggle: toggleMute } = useToggle({
    componentName,
    controlName: 'mute'
  })

  if (volume === null || isMuted === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center bg-gray-900 p-4 rounded-lg w-[150px]">
      <div className="flex items-center gap-4">
        <div className="h-32 w-4 bg-gray-700 rounded-full relative overflow-hidden">
          <div
            className="absolute bottom-0 w-full rounded-full transition-all duration-300"
            style={{
              height: `${dbToPercent(volume)}%`,
              backgroundColor: isMuted ? '#ef4444' : '#22c55e'
            }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => adjustVolume(5)}
            className="p-2 hover:bg-gray-700 rounded-full text-white"
          >
            <LuPlus size={16} />
          </button>
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-gray-700 rounded-full text-white"
          >
            {isMuted ? <LuVolumeX size={20} /> : <LuVolume2 size={20} />}
          </button>
          <button
            onClick={() => adjustVolume(-5)}
            className="p-2 hover:bg-gray-700 rounded-full text-white"
          >
            <LuMinus size={16} />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4 text-white">
        <span>{formattedVolume}</span>
        <span>{name}</span>
      </div>
    </div>
)
}