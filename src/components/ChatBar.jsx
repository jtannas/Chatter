import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <div className="chatbar">
        <input className="chatbar-username" value={this.props.currentUser.name || "Your Name (Optional)"} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </div>
    );
  }
}
export default ChatBar;
