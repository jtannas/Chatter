import React, {Component} from 'react';

class SysMessage extends Component {
  render() {
    return (
      <div className="message system">
        <span className="message-content">{this.props.message.content}</span>
      </div>
    );
  }
}
export default SysMessage;
