"use client";

import { Qrwc } from "@q-sys/qrwc";
import { IComponent } from "@q-sys/qrwc/dist/index.interface";

export const setupQrwc = (onControlsUpdated: (qrwc: Qrwc, updatedComponent: IComponent) => void, startComplete: (qrwc: Qrwc) => void, disconnect: (qrwc: Qrwc) => void) => {
  let socket: WebSocket | null = null
  
  const connectQrwc = async () => {
    socket = new WebSocket(`ws://${process.env.NEXT_PUBLIC_QSYS_IP}/qrc-public-api/v0`)

    const qrwc = new Qrwc()

    socket.onopen = async () => {
      await qrwc.attachWebSocket(socket!)
      await qrwc.start({
        // componentFilter,
        // pollingInterval
      })
      qrwc.on('controlsUpdated', (updatedComponent) =>
        onControlsUpdated(qrwc, updatedComponent as unknown as IComponent)
      )
  
      qrwc.on('disconnect', () => disconnect(qrwc))
  
      qrwc.on('startComplete', () => startComplete(qrwc))
    }

    socket.onerror = (error) => {
      setTimeout(connectQrwc, 1000) // Retry connection after 1 second
    }
  }

  connectQrwc()
  
}