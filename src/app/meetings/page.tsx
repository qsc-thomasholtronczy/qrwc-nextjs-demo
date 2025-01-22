"use client"

import { LuVideo, LuVideoOff, LuMic, LuMicOff, LuPhoneCall, LuPhoneOff  } from "react-icons/lu";
import { useState } from "react";
import { useToggle } from '@/hooks/useToggle';
import { useImagePreview } from '@/hooks/useImagePreview';

export default function MeetingsPage() {
  const { imageData } = useImagePreview({
    componentName: 'Camera-Bridge',
    controlName: 'jpeg.data'
  });

  const {state: isCameraPrivate, toggle: togglePrivacy} = useToggle({
    componentName: 'Camera-Bridge',
    controlName: 'toggle.privacy'
  })

  const { state: isMicMuted, toggle: toggleMic } = useToggle({
    componentName: 'MicVolume',
    controlName: 'mute'
  })

  const { state: callAccept, toggle: acceptCall } = useToggle({
    componentName: 'HIDMeeting',
    controlName: 'spk.call.accept'
  })

  const { state: callEnd, toggle: endCall } = useToggle({
    componentName: 'HIDMeeting',
    controlName: 'spk.call.end'
  })

  const [isPressed, setIsPressed] = useState({ callAccept: false, callEnd: false })

  const handleMouseDown = (type: 'accept' | 'end' ) => {
    setIsPressed(prevState => ({ ...prevState, [type]: true }))
    if (type === 'accept'){
      acceptCall()
    }else if (type === 'end'){
      endCall()
    }
  }

  const handleMouseUp = (type: 'accept' | 'end') => {
    setIsPressed(prevState => ({ ...prevState, [type]: false }))
    //Triggers don't need to be sent on mouse up
  }

    return (
      <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Camera Preview</h1>
      </div>
      <div className="flex items-center gap-4">
        <span> This camera refreshes once per second</span>
      </div>
       <div className="flex items-center gap-4">
       {imageData ? (
        <img src={`data:image/jpeg;base64,${imageData}`} alt="Camera Preview" />
      ) : (
        <p>Loading...</p>
      )}
      <style jsx>{`
        .page-container img {
          width: 100%;
          height: auto;
          border: 2px solid #000;
        }
      `}</style>
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Meeting Controls</h1>
        </div>

        <div className="flex items-center gap-4">
        
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
            onMouseDown={() => handleMouseDown('accept')}
            onMouseUp={() => handleMouseUp('accept')}
            className={`p-2 rounded-full ${isPressed.callAccept ? 'bg-green-500' : 'bg-gray-700'}`}
          > <LuPhoneCall size={20} />
          </button>

          <button 
            onMouseDown={() => handleMouseDown('end')}
            onMouseUp={() => handleMouseUp('end')}
            className={`p-2 rounded-full ${isPressed.callEnd ? 'bg-red-600' : 'bg-gray-700'}`}
          > <LuPhoneOff size={20} />
          </button>

        </div>
        
      </div>
    );
  }