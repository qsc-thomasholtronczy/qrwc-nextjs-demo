"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Qrwc } from '@q-sys/qrwc';
import { setupQrwc } from '@/utils/qsysConnection';

type QsysContextType = {
  components: any;
  isConnected: boolean;
};

const QsysContext = createContext<QsysContextType | undefined>(undefined);

function QsysProvider({ children }: { children: React.ReactNode }) {
  const qrwcRef = useRef<Qrwc | null>(null);
  const [components, setComponents] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const ipRef = useRef<string>('');

  useEffect(() => {
    setupQrwc(
      (Qrwc: Qrwc, updatedComponent: any) => {
        setComponents(Qrwc.components);
      }
    , (Qrwc: Qrwc) => {
        setComponents(Qrwc.components);
        setIsConnected(true);
      },
      (Qrwc: Qrwc) => {
        setIsConnected(false);
      })
  },
  [])

  return (
    <QsysContext.Provider value={{ 
      components, 
      isConnected, 
    }}>
      {children}
    </QsysContext.Provider>
  );
}

function useQsys() {
  const context = useContext(QsysContext);
  if (context === undefined) {
    throw new Error('useQsys must be used within a QsysProvider');
  }
  return context;
}

export { QsysProvider as default, useQsys };