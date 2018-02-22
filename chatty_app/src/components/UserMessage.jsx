/**
 * User message display component
 */

// Imports
import React, {Component} from 'react';

// Main
class UserMessage extends Component {
  imageHandler(messageContent) {
    const imgRegex = /\b\S+\.(?:gif|jpg|png)\b/gi;
    const images = messageContent.trim().match(imgRegex);
    return images && (
      <React.Fragment>
        <hr/>
        {images.map((image, index) => <img key={index} src={image}/>)}
      </React.Fragment>
    );

  }

  render() {
    const message = this.props.message;
    return (
      <div className="message">
        <span className="message-username" style={{color: message.color}}>
          {message.username}
        </span>
        <span className="message-content">
          {message.content}
          {this.imageHandler(message.content)}
        </span>
      </div>
    );
  }
}

export default UserMessage;
