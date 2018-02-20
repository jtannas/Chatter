import React, {Component} from 'react';

import NavBar from './components/NavBar.jsx'
import Messages from './components/Messages.jsx'
import ChatBar from './components/ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [{
          id: '000001',
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
          type: 'UserMessage'
        }, {
          id: '000002',
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
          type: 'UserMessage'
      }]
    }
  }

  render() {
    return [
      <NavBar key='navbar'/>,
      <Messages key='main' messages={this.state.messages}/>,
      <ChatBar key='footer' currentUser={this.state.currentUser}/>
    ];
  }
}
export default App;
