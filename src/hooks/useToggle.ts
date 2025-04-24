"use client"

import { useState, useEffect } from 'react'
import { useQsys } from '@/context/QsysProvider'

// Create the interface for the props of the useToggle hook
interface UseToggleProps {
  componentName: string //The name of the Q-Sys component to toggle
  controlName: string //The name of the Q-SYS control to toggle
}

export const useToggle = ({ componentName, controlName }: UseToggleProps) => {
  const { components } = useQsys() // Get the components from the Qsys context
  const [state, setState] = useState<boolean | null>(null) // State to hold the toggle state

  useEffect(() => {
    // Check if the component and control exist in the components object
    if (!components?.[componentName]) return
    setState(components[componentName].Controls[controlName].Value) // Set the initial state to the value of the control

    // Set up an interval to update the state every 100ms
    const interval = setInterval(() => {
      setState(components[componentName].Controls[controlName].Value)
    }, 100)

    return () => clearInterval(interval)
  }, [components, componentName, controlName])

  // Function to toggle the state of the control
  // It checks if the control exists and if the state is not null before toggling
  const toggle = () => {
    // Check if the component and control exist in the components object
    if (!components?.[componentName]?.Controls[controlName] || state === null) return
    
    // Toggle the state and update the control value in the components object
    const newState = !state
    components[componentName].Controls[controlName].String = newState.toString() //Use toString() to convert boolean to string. This prevents errors when sending the command to the Q-SYS Core.
    setState(newState) // Update the local state
  }

  return { state, toggle }
}