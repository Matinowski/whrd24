import { NextResponse } from 'next/server';
import { initWebSocket } from './app/api/socket';

export function middleware(request) {
  const server = request.socket.server;

  // Inicjalizacja WebSocket, jeśli jeszcze nie został zainicjowany
  if (!server.wss) {
    initWebSocket(server);
  }

  return NextResponse.next();
}
