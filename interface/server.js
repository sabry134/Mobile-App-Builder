const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
const clients = new Map();

server.on('connection', (ws) => {
  console.log('New client connected');
  
  clients.set(ws, true);

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });

  ws.on('error', (err) => {
    console.error(`Client connection error: ${err}`);
    clients.delete(ws);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, closing server...');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  server.close(() => {
    process.exit(0);
  });
});

console.log('Server started on ws://localhost:8080');
