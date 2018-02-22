/**
 * This module ties the React App and Sass Styles together
 */

import React from 'react';
import ReactDOM from 'react-dom';


import './styles.sass';
import App from './App.jsx';


ReactDOM.render(<App />, document.getElementById('react-root'));
