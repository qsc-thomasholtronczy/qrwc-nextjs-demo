"use client"

import { useState, useEffect } from 'react'
import { useQsys } from '@/context/QsysProvider'

// create the interface for the props of the useTrigger hook
interface useTriggerProps {
    componentName: string // The name of the Q-Sys component to trigger
    controlName: string // The name of the Q-SYS control to trigger
}

export const useTrigger = ({ componentName, controlName }: useTriggerProps) => {
    const { components } = useQsys()
    const [state, setState] = useState<boolean | null>(null)

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

    // Function to trigger the control
    // It checks if the control exists and if the state is not null before triggering
    const trigger = () => {
        if (!components?.[componentName]?.Controls[controlName] || state === null) return
        components[componentName].Controls[controlName].Value = '1' // Passing 1 to the value of the trigger control in Q-SYS will activate the trigger. This is a novel way of triggering a control in Q-SYS. This will not work on boolean controls, only on trigger controls.
    }

    return { state, trigger }
}