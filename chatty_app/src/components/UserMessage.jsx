import React, {Component} from 'react';

class UserMessage extends Component {
  render() {
    let content = this.props.message.content;
    const images = content.trim().match(/\b\S+\.(?:gif|jpg|png)\b/gi);
    if (images) {
      content = (
        <React.Fragment>
          {this.props.message.content}
          <hr/>
          {images.map((image, index) => <img key={index} src={image}/>)}
        </React.Fragment>
      )
    }
    return (
      <div className="message">
        <span className="message-username" style={{color: this.props.message.color}}>{this.props.message.username}</span>
        <span className="message-content">{content}</span>
      </div>
    );
  }
}
export default UserMessage;
