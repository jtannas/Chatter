import React, {Component} from 'react';

import NavBar from './components/NavBar.jsx'
import Messages from './components/Messages.jsx'
import ChatBar from './components/ChatBar.jsx'

class App extends Component {
  constructor(props) {

    super(props);

    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = event => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case 'UserMessage':
        case 'SysMessage':
          const messages = this.state.messages.concat(message);
          this.setState({messages});
          break;
        case 'UserCount':
          this.setState({userCount: message.userCount});
          break;
        case 'UserColor':
          const currentUser = this.state.currentUser;
          currentUser.color = message.color;
          this.setState({currentUser});
          break;
        default:
          console.log(message);
      }
    };

    this.newMessage = this.newMessage.bind(this);
    this.nameChange = this.nameChange.bind(this);

    this.state = {
      userCount: 1,
      currentUser: {name: "Anonymous", color: "#FFFFFF"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

  newMessage(newMessage) {
    this.socket.send(JSON.stringify(newMessage));
  }

  nameChange(newName) {
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
      <ChatBar key='footer' currentUser={this.state.currentUser} newMessage={this.newMessage} nameChange={this.nameChange}/>
    ];
  }
}
export default App;
