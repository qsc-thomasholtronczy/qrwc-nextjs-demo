"use client"

import { useState, useEffect } from 'react'
import { useQsys } from '@/context/QsysProvider'

interface UseToggleProps {
  componentName: string
  controlName: string
}

export const useToggle = ({ componentName, controlName }: UseToggleProps) => {
  const { components } = useQsys()
  const [state, setState] = useState<boolean | null>(null)

  useEffect(() => {
    if (!components?.[componentName]) return
    setState(components[componentName].Controls[controlName].Value)

    const interval = setInterval(() => {
      setState(components[componentName].Controls[controlName].Value)
    }, 100)

    return () => clearInterval(interval)
  }, [components, componentName, controlName])

  const toggle = () => {
    if (!components?.[componentName]?.Controls[controlName] || state === null) return
    
    const newState = !state
    components[componentName].Controls[controlName].String = newState.toString()
    setState(newState)
  }

  return { state, toggle }
}