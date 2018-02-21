const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

const { pickRandom } = require('./utils');

const PORT = 3001;
const STATIC_DIR = 'public'
const userColors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF']

const server = express()
  .use(express.static(STATIC_DIR))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


const webSocketServer = new SocketServer({ server });

webSocketServer.on('connection', (clientSocket) => {

  function sendAll(message) {
    webSocketServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  function userCountSendAll() {
    const countMessage = JSON.stringify({type: 'UserCount', userCount: webSocketServer.clients.size});
    sendAll(countMessage);
  }

  console.log('Client connected');
  userCountSendAll();
  clientSocket.send(JSON.stringify({type: 'UserColor', color: pickRandom(userColors)}))

  clientSocket.on('close', () => {
    userCountSendAll();
    console.log('Client disconnected');
  });

  clientSocket.on('error', () => console.log('Socket Error'));

  clientSocket.on('message', function incoming(data) {
    let message = JSON.parse(data);
    message.id = uuidv4();
    message = JSON.stringify(message);
    sendAll(message);
  });
});
