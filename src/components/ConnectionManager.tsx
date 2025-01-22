"use client"

import { useEffect } from 'react'
import { useQsys } from '@/context/QsysProvider'

export default function ConnectionManager() {
    const { connect, isConnected } = useQsys()

    useEffect(() => {
        if (!isConnected) {
            connect(process.env.NEXT_PUBLIC_QSYS_IP || '127.0.0.1')
        }
    }, [connect, isConnected])

    return null
}