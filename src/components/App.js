import React, { Component } from 'react';
import '../css/App.css';


import Home from './Home';
import Login from './Login';
import Ar from './Ar';
import Register from './Register'
import { Container } from 'mdbreact';
import MenuAppbar from './MenuAppbar';
import { firebaseAuth } from '../config/firebase';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false,
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  state = {
    currentRoute: null,
    currentUser: null,
  }

  __setRoute = currentRoute => {
    this.setState({ currentRoute }, () => {
      console.log('current route', this.state.currentRoute);
    });
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
    console.log('get currentcomponent', currentRoute);
    
    switch ( currentRoute) {
      case 'home':
        return <Home __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} currentUser={this.state.currentUser} />;
      case 'login':
        return <Login __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} currentUser={this.state.currentUser} />
      case 'register':
        return <Register __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} />
      case 'ar':
        return <Ar __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} />
      default:
        return <Home __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} currentUser={this.state.currentUser} />;
    }
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged(currentUser => {
      this.setState({currentUser});
    })
  }

  render() {
    return (
      <div className="App">
        
        {/* Main */}
        <Container>
          <MenuAppbar __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} currentUser={this.state.currentUser}/>
          {this.currentComponent}
        </Container>
        
        <div className="body" style={{overflowY: 'scroll'}}>
        
        </div>
      </div>
    );
  }
}

export default App;
