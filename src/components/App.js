import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import Design from './Design';

import {Router, Switch, Route, Link} from 'react-router-dom';

import Register from './Register';
import Home from './Home';
import Introduction from './Introduction';
import Ar from './Ar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span>
            <button><Link to="/">Home</Link></button>
            <button><Link to="/register">Register</Link></button>
            <button><Link to="/ar">Go to start AR</Link></button>
          </span>
        </header>
        <div className="body">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/ar" component={Ar} />
            <Route path="/introduction" component={Introduction}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
