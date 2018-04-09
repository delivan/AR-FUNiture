import React, { Component } from 'react';
import {Router, Switch, Route, Link} from 'react-router-dom';
import Home from './Home';
import Design from './Design';
import Register from './Register';
import Introduction from './Introduction';
import Ar from './Ar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../css/App.css';

const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        fontFamily: "'Roboto', sans-serif",
    },
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>

      <div style={styles.container}>
        <header className="App-header">
          <span>
            <button><Link to="/">Home</Link></button>
            <button><Link to="/register">Register</Link></button>
            <button><Link to="/ar">Go to start AR</Link></button>
          </span>
        </header>
        <div className="body" style={{overflowY: 'scroll'}}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/ar" component={Ar} />
            <Route path="/introduction" component={Introduction}/>
          </Switch>
        </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
