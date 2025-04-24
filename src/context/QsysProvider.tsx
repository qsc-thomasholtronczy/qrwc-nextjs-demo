"use client"; // This file is a client-side compponent

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Qrwc } from '@q-sys/qrwc';
import { setupQrwc } from '@/utils/qsysConnection';

// Define the type for q-sys context
type QsysContextType = {
  components: any;
  isConnected: boolean;
};

// Create the react context for q-sys
// This context will be used to provide the q-sys data to the components that need it
const QsysContext = createContext<QsysContextType | undefined>(undefined);

// Create a provider component for the q-sys context
// This component will be used to wrap the components that need access to the q-sys data
function QsysProvider({ children }: { children: React.ReactNode }) {
  const qrwcRef = useRef<Qrwc | null>(null); // Reference to the Qrwc instance
  const [components, setComponents] = useState<any>(null); // State to hold the components data
  const [isConnected, setIsConnected] = useState(false); // State to hold the connection status
  const socketRef = useRef<WebSocket | null>(null); // Reference to the WebSocket instance
  const ipRef = useRef<string>(''); // Reference to the IP address of the Q-SYS Core

  // React hook to set up the Qrwc instance and connect to the Q-SYS Core
  useEffect(() => {
    setupQrwc(
      (Qrwc: Qrwc, updatedComponent: any) => { // Function to handle control updates
        setComponents(Qrwc.components);
      }
    , (Qrwc: Qrwc) => { // Function to handle start complete event
        setComponents(Qrwc.components);
        setIsConnected(true);
      },
      (Qrwc: Qrwc) => { // Function to handle disconnect event
        setIsConnected(false);
      })
  },
  []) // Empty dependency array means this effect runs only once after the initial render

  return (
    <QsysContext.Provider value={{ 
      components, // provides the components state
      isConnected, // provides the isConnected state
    }}>
      {children}
    </QsysContext.Provider>
  );
}

// This hook is used to access the QsysContext
// It throws an error if the context is undefined, which means it must be used within a QsysProvider
function useQsys() {
  const context = useContext(QsysContext);
  if (context === undefined) {
    throw new Error('useQsys must be used within a QsysProvider');
  }
  return context;
}

export { QsysProvider as default, useQsys };