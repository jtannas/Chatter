import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);

    this.messageKeyPress = this.messageKeyPress.bind(this);
    this.messageSubmit = this.messageSubmit.bind(this);

    this.nameKeyPress = this.nameKeyPress.bind(this);
    this.nameSubmit = this.nameSubmit.bind(this);
  }

  messageKeyPress(event) {
    if (event.key === 'Enter') { this.messageSubmit(event); }
  }

  messageSubmit(event) {
    if (event.target.value) {
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
    if (event.key === 'Enter') { this.nameSubmit(event); }
  }

  nameSubmit(event) {
    this.props.nameChange(event.target.value);
  }

  render() {
    return (
      <form className="chatbar">
        <input className="chatbar-username" onKeyPress={this.nameKeyPress} placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} />
        <input className="chatbar-message" onKeyPress={this.messageKeyPress} placeholder="Type a message and hit ENTER" required/>
      </form>
    );
  }
}
export default ChatBar;
