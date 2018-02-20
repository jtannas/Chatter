import React, {Component} from 'react';

import NavBar from './components/NavBar.jsx'
import Messages from './components/Messages.jsx'
import ChatBar from './components/ChatBar.jsx'

class App extends Component {
  render() {
    return [
      <NavBar key="navbar"/>,
      <Messages key="main"/>,
      <ChatBar key="footer"/>
    ];
  }
}
export default App;
