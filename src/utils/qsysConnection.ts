"use client";

import { Qrwc } from "@q-sys/qrwc";

export class QsysConnection {
  private qrwc: Qrwc;
  private socket: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private ip: string = '';

  constructor() {
    this.qrwc = new Qrwc();
  }

  connect(ip: string) {
    this.ip = ip;
    this.socket = new WebSocket(`ws://${ip}/qrc-public-api/v0`);

    this.socket.onopen = () => {
      this.qrwc.attachWebSocket(this.socket!);
    };

    this.socket.onclose = () => {
      this.attemptReconnect();
    };

    return this.qrwc;
  }

  private attemptReconnect() {
    if (this.reconnectTimer) return;
    
    this.reconnectTimer = setInterval(() => {
      if (this.ip) this.connect(this.ip);
    }, 5000);
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearInterval(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}