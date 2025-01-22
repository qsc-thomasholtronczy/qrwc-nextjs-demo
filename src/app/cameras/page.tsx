"use client";

import { LuArrowDown, LuArrowUp, LuArrowLeft, LuArrowRight, LuZoomIn, LuZoomOut, LuHouse, LuVideo, LuVideoOff } from "react-icons/lu";
import { useState } from "react";
import { useToggle } from '@/hooks/useToggle';
import { useImagePreview } from '@/hooks/useImagePreview';

export default function CamerasPage() {
  const { imageData } = useImagePreview({
    componentName: 'Camera-Bridge',
    controlName: 'jpeg.data'
  });

  const {state: isCameraPrivate, toggle: togglePrivacy} = useToggle({
    componentName: 'Camera-Bridge',
    controlName: 'toggle.privacy'
  })

  const { state: cameraHomePreset, toggle: moveHome } = useToggle({
    componentName: 'Camera-Bridge',
    controlName: 'preset.home.load'
  })

  const { state: cameraUp, toggle: moveUp } = useToggle({
    componentName: 'Camera-Bridge',
    controlName: 'tilt.up'
  })

  const { state: cameraDown, toggle: moveDown } = useToggle({
    componentName: 'Camera-Bridge',
    controlName: 'tilt.down'
  })

  const { state: cameraLeft, toggle: moveLeft } = useToggle({
    componentName: 'Camera-Bridge',
    controlName: 'pan.left'
  })

  const { state: cameraRight, toggle: moveRight } = useToggle({
    componentName: 'Camera-Bridge',
    controlName: 'pan.right'
  })

  const { state: cameraZoomIn, toggle: zoomIn } = useToggle({
    componentName: 'Camera-Bridge',
    controlName: 'zoom.in'
  })

  const { state: cameraZoomOut, toggle: zoomOut } = useToggle({
    componentName: 'Camera-Bridge',
    controlName: 'zoom.out'
  })

  const [isPressed, setIsPressed] = useState({ cameraHome: false , cameraUp: false, cameraDown: false, cameraLeft: false, cameraRight: false, cameraZoomIn: false, cameraZoomOut: false })  

  const handleMouseDown = (type: 'home' | 'up' | 'down' | 'left' | 'right' | 'zoomIn' | 'zoomOut') => {
    setIsPressed(prevState => ({ ...prevState, [type]: true }))
    if (type === 'home'){
      moveHome()
    } else if (type === 'up'){
      moveUp()
    } else if (type === 'down'){  
      moveDown()
    } else if (type === 'left'){
      moveLeft()
    } else if (type === 'right'){
      moveRight()
    } else if (type === 'zoomIn'){
      zoomIn()
    } else if (type === 'zoomOut'){
      zoomOut()
    }
  }

  const handleMouseUp = (type: 'home' | 'up' | 'down' | 'left' | 'right' | 'zoomIn' | 'zoomOut') => {
    setIsPressed(prevState => ({ ...prevState, [type]: false }))
    if (type === 'home'){
      moveHome()
    } else if (type === 'up'){
      moveUp()
    } else if (type === 'down'){  
      moveDown()
    } else if (type === 'left'){
      moveLeft()
    } else if (type === 'right'){
      moveRight()
    } else if (type === 'zoomIn'){
      zoomIn()
    } else if (type === 'zoomOut'){
      zoomOut()
    }
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
          <div className = "flex-row items-center gap-4">
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
          <div className = "flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onMouseDown={() => handleMouseDown('up')}
                onMouseUp={() => handleMouseUp('up')}
                className={`p-2 rounded-full ${isPressed.cameraUp ? 'bg-blue-500' : 'bg-gray-700'}`}
              >
                <LuArrowUp size={30} />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                onMouseDown={() => handleMouseDown('left')}
                onMouseUp={() => handleMouseUp('left')}
                className={`p-2 rounded-full ${isPressed.cameraLeft ? 'bg-blue-500' : 'bg-gray-700'}`}
              >
                <LuArrowLeft size={30} />
              </button>
              <button 
                onMouseDown={() => handleMouseDown('home')}
                onMouseUp={() => handleMouseUp('home')}
                className={`p-2 rounded-full ${isPressed.cameraHome ? 'bg-green-500' : 'bg-gray-700'}`}
              > <LuHouse size={30} />
              </button>
              <button
                onMouseDown={() => handleMouseDown('right')}
                onMouseUp={() => handleMouseUp('right')}
                className={`p-2 rounded-full ${isPressed.cameraRight ? 'bg-blue-500' : 'bg-gray-700'}`}
              >
                <LuArrowRight size={30} />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                onMouseDown={() => handleMouseDown('down')}
                onMouseUp={() => handleMouseUp('down')}
                className={`p-2 rounded-full ${isPressed.cameraDown ? 'bg-blue-500' : 'bg-gray-700'}`}
              >
                <LuArrowDown size={30} />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
              <button
                onMouseDown={() => handleMouseDown('zoomIn')}
                onMouseUp={() => handleMouseUp('zoomIn')}
                className={`p-2 rounded-full ${isPressed.cameraZoomIn ? 'bg-blue-500' : 'bg-gray-700'}`}
              >
                <LuZoomIn size={30} />
              </button>
              <button
                onMouseDown={() => handleMouseDown('zoomOut')}
                onMouseUp={() => handleMouseUp('zoomOut')}
                className={`p-2 rounded-full ${isPressed.cameraZoomOut ? 'bg-blue-500' : 'bg-gray-700'}`}
              >
                <LuZoomOut size={30} />
              </button>

              <button 
                onClick={togglePrivacy}
                className={`p-2 rounded-full ${isCameraPrivate ? 'bg-blue-500' : 'bg-gray-700'}`}
              >
                {isCameraPrivate ? <LuVideoOff size={30} /> : <LuVideo size={30} />}
              </button>
          </div>
        </div>
    </div>
  );
}