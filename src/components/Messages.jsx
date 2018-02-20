import React, {Component} from 'react';

import UserMessage from './UserMessage.jsx';
import SysMessage from './SysMessage.jsx';

const MessageComponents = {
  UserMessage,
  SysMessage
}

class Messages extends Component {

  render() {
    const messageArray = this.props.messages.map(message => {
      const MessageClass = MessageComponents[message.type] ||  UserMessage;
      return (<MessageClass key={message.id} message={message}/>);
    });

    return (<div className="messages">{messageArray}</div>);
  }
}
export default Messages;
