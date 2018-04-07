import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Design from './Design';

import {Router, Switch, Route, Link} from 'react-router-dom';

import Register from './components/Register';
import Home from './components/Home';
import Introduction from './Introduction';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span>
            <button><Link to="/components/Register">Register</Link></button>
          </span>
          
        </header>


        <div className="body">
          <Switch>
            <Route path="/components/Home" exact component={Home} />
            <Route path="/components/Register" component={Register} />
            <Route path="/Introduction" component={Introduction}/>
          </Switch>
            {/* <Introduction /> */}
            <div className="App-design">      
              <Design />
              <Design />
              <Design />
              <Design />
            </div>
        </div>
      </div>
    );
  }
}

export default App;
