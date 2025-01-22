"use client"

import { useState, useEffect } from 'react'
import { LuVolumeX, LuVolume2, LuPlus, LuMinus} from "react-icons/lu"
import { useToggle } from '@/hooks/useToggle'
import { useVolume } from '@/hooks/useVolume'


const Footer = () => {
  const { volume, adjustVolume, dbToPercent, isLoading, formattedVolume } = useVolume({
    componentName: 'SpeakerVolume',
    controlName: 'gain',
    min: -60,
    max: 0,
    step: 5
  })
  const { state: isMuted, toggle: toggleMute } = useToggle({
    componentName: 'SpeakerVolume',
    controlName: 'mute'
  })

  if (isLoading || isMuted === null) {
    return <div>Loading volume controls...</div>
  }

  const safeVolume = volume !== null ? volume : 0; // Default to 0 if volume is null

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center gap-4 max-w-screen-xl mx-auto">
        <button
          onClick={() => adjustVolume(-5)}
          className="p-2 hover:bg-gray-700 rounded-full"
        >
          <LuMinus size={16} />
        </button>

        <div className="flex-1 flex items-center gap-2">
          <button 
            onClick={toggleMute}
            className="p-2 hover:bg-gray-700 rounded-full"
          >
            {isMuted ? <LuVolumeX size={20} /> : <LuVolume2 size={20} />}
          </button>
          
          <div 
            onClick={toggleMute}
            className="flex-1 h-4 bg-gray-700 rounded-full cursor-pointer overflow-hidden"
          >
            <div
              className="h-full transition-all duration-300"
              style={{ 
                width: `${dbToPercent(safeVolume)}%`,
                backgroundColor: isMuted ? '#ef4444' : '#22c55e'
              }}
            />
          </div>
          <span className="min-w-[5ch]">{isMuted ? '-- dB' : formattedVolume}</span>
        </div>

        <button
          onClick={() => adjustVolume(5)}
          className="p-2 hover:bg-gray-700 rounded-full"
        >
          <LuPlus size={16} />
        </button>
      </div>
    </footer>
  )
}

export default Footer