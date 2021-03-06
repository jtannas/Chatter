# Chatty

## Example
![Example](./docs/example.gif)

## Description
Chatty is a single page application build to familiarize myself with React and with websockets.
Without having to log in or select a name, you can connect and istantly start chatting with all other users.

## Possible Future Work
- Add in support for multiple chat rooms
  - Chat rooms could user UUIDs for URLs to make them secret without making them private
- Add in support for conversation history

## Known Bugs / Issues
- It is very insecure right now - There's no validation or escaping of client messages

## Installation Instructions
From your terminal of choice...
```
$ git clone https://github.com/jtannas/Chatter.git
$ cd Chatter
$ cd chatty_server
$ npm i
$ cd ../chatty_app
$ npm i
```

## Dev Server Start-up instructions
You will need two terminals to run this
Terminal 1 - The Express Websocket Server:
```
$ cd Chatter
$ cd chatty_server
$ npm start
```
Terminal 2 - The Webpack Dev Server:
```
$ cd Chatter
$ cd chatty_app
$ npm start
```
You should now be able to access the app using a web browser at localhost:8080 (by default);

## Server Config
The chatty_app uses `webpack-dev-server` which is pretty much 'batteries-included'. It serves the `index.html` based on the settings in `chatty_app/webpack.config.js`. Though not suitable for a production environment, it's very convenient for development. Dig around in the webpack-dev-server documentation for how to configure it, likely by modifying the npm start command in`chatty_app/package.json`.

The chatty_server uses express and websockets. Everything you really need is baked into `chatty_server/server.js`. There are some settings (e.g. PORT) set via constants near the top of the file. Feel free to modify those to your needs.

## Lighthouse Requirements
### Goal
Many of the web applications that you use today have real-time functionality where the user does not have to reload the page in order to see updates. Major examples of these include Slack, Twitter and Facebook.

Your app, Chatty will allow users to communicate with each other without having to register accounts. It will use React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

### Functional Requirements
- Primarily a client-side SPA (single-page app) built with ReactJS
  - Based on the HTML and CSS provided
  - Contains a chat log displaying messages and notifications
  - Contains an input field to change your name and an input field to send a message
- The client-side app communicates with a server via WebSockets for multi-user real-time updates
- No persistent database is involved; the focus is on the client-side experience

### Behaviour Requirements
- When any connected user sends a chat message, all connected users receive and display the message
- When any connected user changes their name, all connected users are notified of the name change
  - Notifications are styled differently from chat messages
- Header will display the count of connected users
- When the number of connected users changes, this count will be updated for all connected users
- (STRETCH) Different users' names will each be coloured differently
  - Bonus: the colouring is consistent between connected user instances or is calculated algorithmically based on their name, or is manually selectable by users, or any other interesting approach!

### Technical Specifications
#### Stack:
- Webpack with Babel, JSX, ES6, webpack dev server
- WebSockets using Node package ws on the server-side, and native WebSocket on client side
- ReactJS

#### React component guidelines

- A single root component (e.g. App) should be responsible for the main application state, as well as communication with the WebSocket server
  - A message list component renders the chat log (chat messages and system notifications)
  - A chat bar component provides an input field for changing your username and an input field for sending messages. These input fields do not need to be React-style "controlled inputs", although they can be.

#### Client websocket behaviour
- opens a websocket connection as soon as the App component is mounted
  - the connection stays open until the client closes the page (or otherwise disconnects)
- sends chat messages and (name change) notifications initiated by the current user
- handles broadcast messages (chat, notifications, user count) from the server and may alter state accordingly

#### Websocket server specs:

- The Chatty client app and Chatty websocket server are separate Node apps each with their own package.json
- It's a simple server using express and ws
- The server should send and receive JSON-encoded messages
  - the server should determine what to do based on the message's type property
  - it should construct a message to send back in response with a corresponding type and a generated unique id (e.g. a UUID)
- When a client connects or disconnects, the server should broadcast the current user count to all connected clients
- (STRETCH) the server may assign and/or keep track of user colours (there are several ways of solving this)

## Boilerplate
The boilerplate was inspired by https://github.com/nolotz/react-simple-boilerplate, so their license has been included for the sake of attribution.
