"use client"
import { LuLaptop, LuHouse, LuLampDesk, LuGrid3X3 } from "react-icons/lu";
import { useToggle } from '@/hooks/useToggle';

export default function Home() {
  const { state: workSelected, toggle: toggleWork } = useToggle({
    componentName: 'KVMControl',
    controlName: 'selector.0'
  });
  
  const { state: personalSelected, toggle: togglePersonal } = useToggle({
    componentName: 'KVMControl',
    controlName: 'selector.1'
  });
  
  const { state: isLightOn, toggle: toggleLight } = useToggle({
    componentName: 'Light Control',
    controlName: 'toggle.1'
  });

  const { state: pixelPower, toggle: togglePixelPower } = useToggle({
    componentName: 'Pixoo64',
    controlName: 'Screen Switch'
  });

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-8">      
      <main className="w-full max-w-7xl min-w-fit px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <section className="flex flex-col gap-4 p-6 items-center w-full max-w-sm ">
            <h2 className="text-2xl font-bold mb-4 ">KVM Source Selection</h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={toggleWork}
                className={`w-[150px] min-h-[72px] px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  workSelected 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                <LuLaptop size={24}/>
                <span>Work PC</span>
              </button>
              <button
                onClick={togglePersonal}
                className={`w-[150px] min-h-[72px] px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  personalSelected 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                <LuHouse size={24}/>
                <span>Personal PC</span>
              </button>
            </div> 
          </section>
          <section className="flex flex-col gap-4 p-6 items-center w-full max-w-sm ">
            <h2 className="text-2xl font-bold mb-4">Lighting Controls</h2>
            <div className="flex justify-center w-full">
              <button
                onClick={toggleLight}
                className={`w-[150px] min-h-[72px] px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  isLightOn 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                <LuLampDesk size={24}/>
                <span>Studio Lights</span>
              </button>
            </div>
          </section>
          <section className="flex flex-col gap-4 p-6 items-center w-full max-w-sm ">
            <h2 className="text-2xl font-bold mb-4">Pixel Display Controls</h2>
            <div className="flex justify-center w-full">
              <button
                onClick={togglePixelPower}
                className={`w-[150px] min-h-[72px] px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  pixelPower 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                <LuGrid3X3 size={24}/>
                <span>Pixel Display</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}