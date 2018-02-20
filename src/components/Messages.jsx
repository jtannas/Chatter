import React, {Component} from 'react';

import Message from './Message.jsx';
import SysMessage from './SysMessage.jsx';

class Messages extends Component {
  render() {
    return (
      <div className="messages">
        <Message />
        <SysMessage />
      </div>
    );
  }
}
export default Messages;
