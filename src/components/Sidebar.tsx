"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { LuHouse, LuMusic, LuVideo, LuDoorOpen, LuMenu  } from "react-icons/lu"
import Link from "next/link"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { id: 1, title: "Home", icon: <LuHouse size={30} />, path: "/" },
    { id: 2, title: "Audio", icon: <LuMusic size={30} />, path: "/audio" },
    { id: 3, title: "Cameras", icon: <LuVideo size={30} />, path: "/cameras" },
    { id: 4, title: "Meetings", icon: <LuDoorOpen size={30} />, path: "/meetings" },
  ]

  return (
    <motion.div
      animate={{ width: isOpen ? "240px" : "60px" }}
      className="bg-gray-900 text-white min-h-screen p-4 relative"
    >
      <div className="flex justify-end">
        <LuMenu
          size={30}
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {menuItems.map(({ id, title, icon, path }) => (
          <Link
            href={path}
            key={id}
            className={`flex items-center gap-4 px-2 ${isOpen ? 'justify-start w-full' : 'justify-center w-8'}  p-1 rounded-md transition-colors
              ${pathname === path 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-800'
              }`}
          >
            {icon}
            <motion.span
              animate={{ opacity: isOpen ? 1 : 0 }}
              className={`whitespace-nowrap ${!isOpen && "hidden"}`}
            >
              {title}
            </motion.span>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

export default Sidebar