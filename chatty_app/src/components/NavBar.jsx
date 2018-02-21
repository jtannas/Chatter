import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="navbar-usercount">{this.props.userCount} users online</div>
      </nav>
    );
  }
}
export default NavBar;
