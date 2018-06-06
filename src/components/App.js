import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import Ar from './Ar';
import Register from './Register'
import MenuAppbar from './MenuAppbar';
import { firebaseAuth } from '../config/firebase';
import "../css/App.css"

const styles = {
  app: {
    textAlign: 'center',
    backgroundColor: 'white',
    overflowY: 'scroll'
  },
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false,
      currentRoute: null,
      currentUser: null,
      category: null,
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.__setRoute = this.__setRoute.bind(this);
    this.__setCategory = this.__setCategory.bind(this);
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged(currentUser => {
      this.setState({currentUser});
    })
  }

  __setRoute = currentRoute => {
    this.setState({ currentRoute }, () => {});
  }

  __setCategory = category => {
    this.setState({ category }, () => {});
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
    switch ( currentRoute) {
      case 'home':
        return (
          <div>
            <MenuAppbar __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} currentUser={this.state.currentUser}/>
            <Home
              __setRoute={this.__setRoute}
              currentRoute={this.state.currentRoute}
              currentUser={this.state.currentUser}
              __setCategory={this.__setCategory}
            />
          </div>
      );
      case 'login':
        return ( 
          <div>
            <MenuAppbar __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} currentUser={this.state.currentUser}/>
            <Login __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} currentUser={this.state.currentUser} />
          </div>
        )
      case 'register':
        return (
          <div>
            <MenuAppbar __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} currentUser={this.state.currentUser}/>
            <Register __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} />
          </div>
        )
      case 'ar':
        return (
          <div>
            <Ar __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} __setCategory={this.__setCategory} category={this.state.category}/>
          </div>
          )
      default:
        return (
          <div>
            <MenuAppbar __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} currentUser={this.state.currentUser}/>
            <Home
              __setRoute={this.__setRoute}
              currentRoute={this.state.currentRoute}
              currentUser={this.state.currentUser}
              __setCategory={this.__setCategory}
            />
          </div>
      );
    }
  }

  render() {
    return (
      <div style={styles.app}>
          {this.currentComponent}
      </div>
    );
  }
}

export default App;
