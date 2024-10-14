import { createServer } from 'http';
import { initWebSocket } from './app/api/socket/route';
import { NextResponse } from 'next/server';

// Inicjalizacja serwera HTTP
const server = createServer((req, res) => {
  // Umożliwia obsługę Next.js
});

// Inicjalizacja WebSocketów
initWebSocket(server);

// Start serwera
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
