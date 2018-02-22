/**
 * Chat input component
 */

// Imports
import React, {Component} from 'react';

// Main
class ChatBar extends Component {
  messageKeyPress(event) {
    if (event.key === 'Enter' && event.target.value) {
      this.props.newMessage({
        username: this.props.currentUser.name,
        color: this.props.currentUser.color,
        content: event.target.value,
        type: 'UserMessage'
      })
      event.target.value = '';
    }
  }

  nameKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.nameChange(event.target.value);
    }
  }

  render() {
    return (
      <form className='chatbar'>
        <input
          className='chatbar-username'
          onKeyPress={this.nameKeyPress.bind(this)}
          placeholder='Your Name (Optional)'
          defaultValue={this.props.currentUser.name}
        />
        <input
          className='chatbar-message'
          onKeyPress={this.messageKeyPress.bind(this)}
          placeholder='Type a message and hit ENTER'
        />
      </form>
    );
  }
}

export default ChatBar;
