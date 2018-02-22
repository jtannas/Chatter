/**
 * Message Display Component
 */

// Imports
import React, {Component} from 'react';

import UserMessage from './UserMessage.jsx';
import SysMessage from './SysMessage.jsx';

// Constants
const MESSAGE_COMPONENTS = {
  UserMessage,
  SysMessage
}

// Main
class Messages extends Component {
  render() {
    const messageArray = this.props.messages.map(message => {
      const MessageClass = MESSAGE_COMPONENTS[message.type];
      return (<MessageClass key={message.id} message={message}/>);
    });
    return (<div className="messages">{messageArray}</div>);
  }
}

export default Messages;
