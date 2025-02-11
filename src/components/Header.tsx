"use client"

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { LuMic, LuMicOff, LuVideo, LuVideoOff, LuLightbulb, LuLightbulbOff, LuPower   } from 'react-icons/lu'
import Image from 'next/image'
import { useToggle } from '@/hooks/useToggle'

const pageNames: { [key: string]: string } = {
  '/': 'Home',
  '/audio': 'Audio',
  '/cameras': 'Cameras',
  '/meetings': 'Meetings'
}

const Header = () => {
  const pathname = usePathname()

  const { state: isMicMuted, toggle: toggleMic } = useToggle({
    componentName: 'MicVolume',
    controlName: 'mute'
  })
  const {state: isCameraPrivate, toggle: togglePrivacy} = useToggle({
    componentName: 'Camera-Bridge',
    controlName: 'toggle.privacy'
  })
  const { state: isLightOn, toggle: toggleLight } = useToggle({
    componentName: 'Light Control',
    controlName: 'toggle.1'
  })
  const { state: isPowerOn, toggle: setIsPowerOn } = useToggle({
    componentName: 'SystemPower',
    controlName: 'toggle.1'
  })

  return (
    <header className="w-full bg-gray-900 text-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ">{pageNames[pathname] || 'Home'}</h1>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleMic}
            className={`p-2 rounded-full ${isMicMuted ? 'bg-red-600' : 'bg-green-500'}`}
          >
            {isMicMuted ? <LuMicOff size={20} /> : <LuMic size={20} />}
          </button>

          <button 
            onClick={togglePrivacy}
            className={`p-2 rounded-full ${isCameraPrivate ? 'bg-blue-500' : 'bg-gray-700'}`}
          >
            {isCameraPrivate ? <LuVideoOff size={20} /> : <LuVideo size={20} />}
          </button>

          <button 
            onClick={toggleLight}
            className={`p-2 rounded-full ${isLightOn ? 'bg-yellow-500' : 'bg-gray-700'}`}
          >
            {isLightOn ? <LuLightbulbOff size={20} /> : <LuLightbulb size={20} />}
          </button>

          <button
            onClick={setIsPowerOn}
            className={`p-2 rounded-full ${ isPowerOn  ? 'bg-green-500' : 'bg-red-600'}`}
          >
            <LuPower size={20} />
          </button>

          <div className="w-px h-6 bg-gray-700 mx-4" />

          <div className="w-32 h-8 relative">
            <Image
              src="/logo.png"
              alt="Q-Sys Logo"
              fill
              sizes="(max-width: 100vw), 33vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header