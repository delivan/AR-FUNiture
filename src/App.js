import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Design from './Design';
import Introduction from './Introduction';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to AR FUNiture</h1>
        </header>
        <Introduction />
        <div className="App-design">      
          <Design />
          <Design />
          <Design />
          <Design />
        </div>
      </div>
    );
  }
}

export default App;
