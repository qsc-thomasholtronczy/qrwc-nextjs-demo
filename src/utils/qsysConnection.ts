"use client"; // This file is a client component, so it can use the WebSocket API directly

// This file is responsible for connecting to the Q-SYS Core and setting up the Qrwc instance
// It uses the Qrwc library to handle the WebSocket connection and the Q-SYS API
import { Qrwc } from "@q-sys/qrwc"; 
import { IComponent } from "@q-sys/qrwc/dist/index.interface";

// This function sets up the Qrwc instance and connects to the Q-SYS Core
// It takes three parameters: onControlsUpdated, startComplete, and disconnect
// onControlsUpdated is a callback function that is called when the controls are updated
// startComplete is a callback function that is called when the Qrwc instance has finished starting
// disconnect is a callback function that is called when the Qrwc instance is disconnected
// It returns a WebSocket instance that is used to connect to the Q-SYS Core
export const setupQrwc = (onControlsUpdated: (qrwc: Qrwc, updatedComponent: IComponent) => void, startComplete: (qrwc: Qrwc) => void, disconnect: (qrwc: Qrwc) => void) => {
  let socket: WebSocket | null = null
  
  const connectQrwc = async () => {
    // Create a new WebSocket instance  
    socket = new WebSocket(`ws://${process.env.NEXT_PUBLIC_QSYS_IP}/qrc-public-api/v0`)
    // Create a new Qrwc instance
    const qrwc = new Qrwc() 

    // New async method for version 0.3.0 and above
    socket.onopen = async () => { 
      // Attach the WebSocket to the Qrwc instance
      await qrwc.attachWebSocket(socket!)
      // start the Qrwc instance, passing in the optional componentFilter and pollingInterval
      await qrwc.start({
        // componentFilter, //comment out if you want to receive all components
        // pollingInterval // comment out if you want to use the default polling interval of 350
      })

      // Listen for new control updates
      qrwc.on('controlsUpdated', (updatedComponent) =>
        onControlsUpdated(qrwc, updatedComponent as unknown as IComponent)
      )
      
      // Listen for disconnect events
      qrwc.on('disconnect', () => disconnect(qrwc))
      
      // listen for startComplete event, and call the startComplete function
      // This event is fired when the Qrwc instance has finished starting and is ready to receive commands  
      qrwc.on('startComplete', () => startComplete(qrwc))
    }

    // Listen for errors
    socket.onerror = (error) => {
      setTimeout(connectQrwc, 1000) // Retry connection after 1 second
    }
  }

  // Connect to the Q-SYS Core
  connectQrwc()
  
}