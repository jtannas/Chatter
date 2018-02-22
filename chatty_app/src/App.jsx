/**
 * Top-Level React Component
 */

// Imports
import React, {Component} from 'react';

import NavBar from './components/NavBar.jsx'
import Messages from './components/Messages.jsx'
import ChatBar from './components/ChatBar.jsx'

// Constants
const SERVER_SOCKET_ADDRESS = 'ws://localhost:3001'

// Main
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: 1,
      currentUser: {name: 'Anonymous', color: '#FFFFFF'},
      messages: []
    }
    this.socket = new WebSocket(SERVER_SOCKET_ADDRESS);
    this.socket.onmessage = event => this.incomingMessageHandler(event);
  }

  incomingMessageHandler(event) {
    const message = JSON.parse(event.data);
    switch (message.type) {
    case 'UserMessage':
    case 'SysMessage':
      const messages = this.state.messages.concat(message);
      this.setState({messages});
      break;
    case 'sys-userCount':
      this.setState({userCount: message.userCount});
      break;
    case 'sys-userColor':
      const currentUser = this.state.currentUser;
      currentUser.color = message.color;
      this.setState({currentUser});
      break;
    default:
      console.log(message);
    }
  }

  newMessage(newMessage) {
    newMessage.type = 'UserMessage';
    this.socket.send(JSON.stringify(newMessage));
  }

  nameChange(chosenName) {
    const newName = chosenName.trim() || 'Anonymous';
    const currentUser = this.state.currentUser;
    const sysMessage = {
      type: 'SysMessage',
      content: `${currentUser.name} has changed their name to ${newName}`
    }
    currentUser.name = newName;
    this.setState({ currentUser });
    this.socket.send(JSON.stringify(sysMessage));
  }

  render() {
    return [
      <NavBar key='navbar' userCount={this.state.userCount}/>,
      <Messages key='main' messages={this.state.messages}/>,
      <ChatBar
        key='footer'
        currentUser={this.state.currentUser}
        newMessage={this.newMessage.bind(this)}
        nameChange={this.nameChange.bind(this)}
      />
    ];
  }
}

export default App;
