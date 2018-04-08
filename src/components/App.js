import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import Design from './Design';

import {Router, Switch, Route, Link} from 'react-router-dom';

import Register from './Register';
import Home from './Home';
import Introduction from './Introduction';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span>
            <Link to="/components/Home">Home</Link>
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
