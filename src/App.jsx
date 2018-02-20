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
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
          type: 'UserMessage'
        }, {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
          type: 'UserMessage'
      }]
    }
  }

  newMessage(newMessage) {
    const messages = this.state.messages.concat(newMessage)
    this.setState(prevState => {
      return {
        currentUser: prevState.currentUser,
        messages: messages
      };
    })
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!", type: 'UserMessage'};
      this.newMessage(newMessage);
    }, 3000);
  }

  render() {
    return [
      <NavBar key='navbar'/>,
      <Messages key='main' messages={this.state.messages}/>,
      <ChatBar key='footer' currentUser={this.state.currentUser} newMessage={this.newMessage.bind(this)}/>
    ];
  }
}
export default App;
