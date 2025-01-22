"use client"

import { useState, useEffect } from 'react'
import { BsVolumeUp, BsVolumeMute } from 'react-icons/bs'
import { FaPlus, FaMinus } from 'react-icons/fa'
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

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center gap-4 max-w-screen-xl mx-auto">
        <button
          onClick={() => adjustVolume(-5)}
          className="p-2 hover:bg-gray-700 rounded-full"
        >
          <FaMinus size={16} />
        </button>

        <div className="flex-1 flex items-center gap-2">
          <button 
            onClick={toggleMute}
            className="p-2 hover:bg-gray-700 rounded-full"
          >
            {isMuted ? <BsVolumeMute size={20} /> : <BsVolumeUp size={20} />}
          </button>
          
          <div 
            onClick={toggleMute}
            className="flex-1 h-4 bg-gray-700 rounded-full cursor-pointer overflow-hidden"
          >
            <div
              className="h-full transition-all duration-300"
              style={{ 
                width: `${dbToPercent(volume)}%`,
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
          <FaPlus size={16} />
        </button>
      </div>
    </footer>
  )
}

export default Footer