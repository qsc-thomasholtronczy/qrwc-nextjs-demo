"use client"

import { useState, useEffect } from 'react'
import { useQsys } from '@/context/QsysProvider'

// Create interface for the props of the useVolume hook
interface UseVolumeProps {
    componentName: string // The name of the Q-Sys component to control
    controlName?: string // The name of the Q-SYS control to adjust volume
    max?: number // Manually define the maximum volume level
    min?: number // Manually define the minimum volume level
    step?: number // Manually define the step size for volume adjustment
}

export const useVolume = ({ 
    componentName, 
    controlName = 'gain', // Default control name is 'gain'
    min = -100, // Default minimum volume level
    max = 20, // Default maximum volume level
    step = 1  // Default step size for volume adjustment
}: UseVolumeProps) => {
    const { components } = useQsys()
    const [volume, setVolume] = useState<number | null>(null)

    useEffect(() => {
        // Check if the component and control exist in the components object
        if (!components?.[componentName]) return

        setVolume(components[componentName].Controls[controlName].Value) // Set the initial volume to the value of the control

        // Set up an interval to update the volume every 100ms
        const interval = setInterval(() => {
            setVolume(components[componentName].Controls[controlName].Value)
        }, 100)

        return () => clearInterval(interval)
    }, [components, componentName, controlName])

    // Function to adjust the volume
    // It checks if the control exists and if the volume is not null before adjusting
    const adjustVolume = (amount: number) => {
        if (!components?.[componentName]?.Controls[controlName] || volume === null) return

        const newVolume = Math.min(Math.max(volume + amount, min), max) // Ensure the new volume is within the defined range
        components[componentName].Controls[controlName].String = newVolume.toString() // Convert the volume to a string before sending it to Q-SYS 
        setVolume(newVolume) // Update the local volume state
    }

    // Function to convert dB to percentage
    // This function takes a dB value and returns a percentage based on the min and max values
    const dbToPercent = (db: number) => {
        return Math.round(((db - min) / (max - min)) * 100)
    }
    
    // Function to format the volume value for display
    // This function takes a volume value and returns a formatted string
    const formatVolume = (value: number | null): string => {
        if (value === null) return '-- dB'
        return `${value  > 0 ? '+' : ''}${value} dB`
    }

    return { 
        volume, 
        adjustVolume, 
        dbToPercent,
        isLoading: volume === null,
        formattedVolume: formatVolume(volume)
    }
}