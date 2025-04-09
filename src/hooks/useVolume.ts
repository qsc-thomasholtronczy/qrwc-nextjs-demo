"use client"

import { useState, useEffect } from 'react'
import { useQsys } from '@/context/QsysProvider'

interface UseVolumeProps {
    componentName: string
    controlName?: string
    min?: number
    max?: number
    step?: number
}

export const useVolume = ({ 
    componentName, 
    controlName = 'gain', 
    min = -100, 
    max = 20, 
    step = 1 
}: UseVolumeProps) => {
    const { components } = useQsys()
    const [volume, setVolume] = useState<number | null>(null)

    useEffect(() => {
        if (!components?.[componentName]) return

        setVolume(components[componentName].Controls[controlName].Value)

        const interval = setInterval(() => {
            setVolume(components[componentName].Controls[controlName].Value)
        }, 100)

        return () => clearInterval(interval)
    }, [components, componentName, controlName])

    const adjustVolume = (amount: number) => {
        if (!components?.[componentName]?.Controls[controlName] || volume === null) return

        const newVolume = Math.min(Math.max(volume + amount, min), max)
        components[componentName].Controls[controlName].String = newVolume.toString()
        setVolume(newVolume)
    }

    const dbToPercent = (db: number) => {
        return Math.round(((db - min) / (max - min)) * 100)
    }
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