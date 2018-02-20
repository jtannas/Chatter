import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onKeyPress(event) {
    if (event.key === 'Enter') { this.onSubmit(event); }
  }

  onInput(event) {
    this.setState({ messageContent: event.target.value });
  }

  onSubmit(event) {
    if (this.state.messageContent) {
      this.props.newMessage({
        id: 'placeholder' + Math.floor(Math.random() * 100000),
        username: this.props.currentUser.name,
        content: this.state.messageContent,
        type: 'UserMessage'
      })
      this.setState({messageContent: ''});
    }
  }

  render() {
    return (
      <form className="chatbar" onSubmit={this.onSubmit}>
        <input className="chatbar-username" value={this.props.currentUser.name || "Your Name (Optional)"} />
        <input className="chatbar-message" onInput={this.onInput.bind(this)} onKeyPress={this.onKeyPress.bind(this)} placeholder="Type a message and hit ENTER" value={this.state.messageContent || ''} required/>
      </form>
    );
  }
}
export default ChatBar;
