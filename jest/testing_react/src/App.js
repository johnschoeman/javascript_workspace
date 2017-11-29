import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Link from './components/Link';
import CheckboxWithLabel from './components/CheckboxWithLabel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link>hi</Link>
        <Link page="http://www.facebook.com">instagram</Link>
        <CheckboxWithLabel labelOn="on" labelOff="off"/>
      </div>
    );
  }
}

export default App;
