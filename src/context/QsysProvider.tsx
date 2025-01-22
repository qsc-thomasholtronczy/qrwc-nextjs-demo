"use client";

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { Qrwc } from '@q-sys/qrwc';

type QsysContextType = {
  components: any;
  isConnected: boolean;
  connect: (ip: string) => void;
  disconnect: () => void;
  reconnect: () => void;
};

const QsysContext = createContext<QsysContextType | undefined>(undefined);

function QsysProvider({ children }: { children: React.ReactNode }) {
  const qrwcRef = useRef<Qrwc | null>(null);
  const [components, setComponents] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const ipRef = useRef<string>('');

  const initializeQrwc = useCallback(() => {
    if (!qrwcRef.current) {
      qrwcRef.current = new Qrwc();
      
      qrwcRef.current.on("webSocketAttached", () => {
        qrwcRef.current?.start();
      });

      qrwcRef.current.on("startComplete", () => {
        setComponents(qrwcRef.current?.components);
        setIsConnected(true);
      });

      qrwcRef.current.on("controlsUpdated", () => {
        setComponents(qrwcRef.current?.components);
      });

      qrwcRef.current.on("disconnected", () => {
        setIsConnected(false);
      });
    }
  }, []);

  const connect = useCallback((ip: string) => {
    try {
      initializeQrwc();
      ipRef.current = ip;
      socketRef.current = new WebSocket(`ws://${ip}/qrc-public-api/v0`);

      socketRef.current.onopen = () => {
        if (socketRef.current) {
          qrwcRef.current?.attachWebSocket(socketRef.current);
        }
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };
    } catch (error) {
      console.error('Connection error:', error);
      setIsConnected(false);
    }
  }, [initializeQrwc]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    qrwcRef.current = null;
    setIsConnected(false);
    setComponents(null);
  }, []);

  const reconnect = useCallback(() => {
    if (ipRef.current) {
      disconnect();
      connect(ipRef.current);
    }
  }, [connect, disconnect]);

  return (
    <QsysContext.Provider value={{ 
      components, 
      isConnected, 
      connect, 
      disconnect,
      reconnect 
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