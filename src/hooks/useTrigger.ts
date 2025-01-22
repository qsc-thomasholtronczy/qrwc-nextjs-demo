"use client"

import { useState, useEffect } from 'react'
import { useQsys } from '@/context/QsysProvider'

interface useTriggerProps {
    componentName: string
    controlName: string
}

export const useTrigger = ({ componentName, controlName }: useTriggerProps) => {
    const { components } = useQsys()
    const [state, setState] = useState<boolean | null>(null)

    useEffect(() => {
        if (!components?.[componentName]) return

        setState(components[componentName][controlName].Value)

        const interval = setInterval(() => {
            setState(components[componentName][controlName].Value)
        }, 100)

        return () => clearInterval(interval)
    }, [components, componentName, controlName])

    const trigger = () => {
        if (!components?.[componentName]?.[controlName] || state === null) return

        components[componentName][controlName].Value = '1'
    }

    return { state, trigger }
}