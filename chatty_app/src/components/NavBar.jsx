import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="navbar-usercount">{this.props.userCount} user{this.props.userCount > 1 && 's'} online</div>
      </nav>
    );
  }
}
export default NavBar;
