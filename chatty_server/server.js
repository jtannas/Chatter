/**
 * Chatty App Websocket 'Hub' for passing messages between clients
 */

// Imports
const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

const { pickRandom } = require('./utils');


// Constants
const PORT = 3001;
const STATIC_DIR = 'public'
const COLOR_LIST = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF']


// Server Setup
const server = express()
  .use(express.static(STATIC_DIR))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const webSocketServer = new SocketServer({ server });


// Conection Handler
webSocketServer.on('connection', clientSocket => {

  // New Connection Setup
  clientSocket.send(JSON.stringify({ type: 'sys-userColor', color: pickRandom(COLOR_LIST) }))
  broadcastUserCount();

  // Connection Behaviours
  clientSocket.on('message', data => {
    let message = JSON.parse(data);
    message.id = uuidv4();
    message = JSON.stringify(message);
    broadcastToAll(message);
  });
  clientSocket.on('error', error => console.error(error));
  clientSocket.on('close', () => broadcastUserCount());

  // Connection Helper Functions
  function broadcastUserCount() {
    const countMessage = JSON.stringify({ type: 'sys-userCount', userCount: webSocketServer.clients.size });
    broadcastToAll(countMessage);
  }

  function broadcastToAll(message) {
    webSocketServer.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
});
