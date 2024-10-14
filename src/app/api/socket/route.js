import { Server } from 'ws';

let wss; // Globalna instancja serwera WebSocket

export const broadcastUpdate = (data) => {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
};

export const initWebSocket = (server) => {
  wss = new Server({ server });

  wss.on('connection', (ws) => {
    console.log('Nowy klient połączony');
    ws.on('close', () => {
      console.log('Klient rozłączony');
    });
  });
};
