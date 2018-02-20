const express = require('express');
const SocketServer = require('ws').Server;

const PORT = 3001;
const STATIC_DIR = 'public'

const server = express()
  .use(express.static(STATIC_DIR))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


const webSocketServer = new SocketServer({ server });

webSocketServer.on('connection', (clientSocket) => {
  console.log('Client connected');
  clientSocket.on('close', () => console.log('Client disconnected'));
});
