import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import Ar from './Ar';
import Register from './Register'
import { Container } from 'mdbreact';
import MenuAppbar from './MenuAppbar';
import { register } from '../action/Auth';
import { firebaseAuth } from '../config/firebase';

const styles = {
  app: {
    textAlign: 'center',
    backgroundColor: 'white',
  }
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
    this.setState({ currentRoute }, () => {
      console.log('current route', this.state.currentRoute);
    });
  }

  __setCategory = category => {
    this.setState({ category }, () => {
      console.log('current category', this.state.category);
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

    switch ('in app', currentRoute) {
      case 'home':
        return (
          <Home
            __setRoute={this.__setRoute}
            currentRoute={this.state.currentRoute}
            currentUser={this.state.currentUser}
            __setCategory={this.__setCategory}
          />
      );
      case 'login':
        return <Login __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} currentUser={this.state.currentUser} />
      case 'register':
        return <Register __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} />
      case 'ar':
        return <Ar __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} category={this.state.category}/>
      default:
        return (
          <Home
            __setRoute={this.__setRoute}
            currentRoute={this.state.currentRoute}
            currentUser={this.state.currentUser}
            __setCategory={this.__setCategory}
          />
      );
    }
  }

  render() {
    return (
      <div style={styles.app}>
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
