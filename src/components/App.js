import React, { Component } from 'react';
import '../css/App.css';


import Register from './Register';
import Home from './Home';
// import Introduction from './Introduction';
import Login from './Login';
// import Ar from './Ar';

import { Container } from 'mdbreact';
import MenuAppbar from './MenuAppbar';
import { register } from '../action/Auth';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  state = {
    currentUser: null,
    currentRoute: null
  }

  __setRoute = currentRoute => {
    this.setState({ currentRoute }, () => {
      console.log('current route', this.state.currentRoute);
    });
  }

  __setUser = currentUser => {
    this.setState({ currentUser})
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  get currentComponent() {
    const { currentRoute } = this.state;

    switch (currentRoute) {
      case 'home':
        return <Home />;
      case 'login':
        return <Login __setUser={this.__setUser} __setRoute={this.__setRoute} currentUser={this.state.currentUser} currentRoute={this.state.currentRoute} />
      case 'register':
        return <Register />
      default:
        return <Home />;
    }
  }

  render() {
    return (
      <div className="App">
        
        {/* Main */}
        <Container>
          <MenuAppbar __setRoute={this.__setRoute} __setUser={this.__setUser} currentUser={this.state.currentUser} currentRoute={this.state.currentRoute}/>
          {this.currentComponent}
        </Container>
        
        <div className="body" style={{overflowY: 'scroll'}}>
        
        </div>
      </div>
    );
  }
}

export default App;
