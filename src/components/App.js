import React, { Component } from 'react';
<<<<<<< HEAD
import '../css/App.css';

=======
import {Router, Switch, Route, Link} from 'react-router-dom';
>>>>>>> 4350b1527f10aafa70fef357d91957c6f15350d6

import Register from './Register';
import Home from './Home';
// import Introduction from './Introduction';
import Login from './Login';
import Ar from './Ar';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { Container } from 'mdbreact';
import MenuAppbar from './MenuAppbar';
import { register } from '../action/Auth';
import { firebaseAuth } from '../config/firebase';

import { firebaseAuth } from '../config/firebase'
import { logout } from '../action/Auth';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false,
<<<<<<< HEAD
=======
      isLogin: false
>>>>>>> 4350b1527f10aafa70fef357d91957c6f15350d6
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount () {
    this.confirmLogin = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLogin: true,
        })
      } else {
        this.setState({
          isLogin: false,
        })
      }
    })
  }

  componentWillUnmount () {
    this.confirmLogin()
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

<<<<<<< HEAD
  get currentComponent() {
    const { currentRoute } = this.state;
    {console.log('get currentcomponent',this.state.currentUser)}
    switch ('in app ',currentRoute) {
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
      console.log('app',currentUser)
      this.setState({currentUser});
    })
  }

  render() {
    return (
      <div className="App">
        
        {/* Main */}
        {console.log('CCC',this.state.currentUser)}
        <Container>
          <MenuAppbar __setRoute={this.__setRoute} currentRoute={this.state.currentRoute} currentUser={this.state.currentUser}/>
          {this.currentComponent}
        </Container>
        
        <div className="body" style={{overflowY: 'scroll'}}>
        
=======
  async handleLogout() {
    await logout();

  }


  render() {
    return (
      <div className="App">

        {/* Main navigation */}
        <Container>
          <Navbar color="indigo" dark expand="lg">
            <NavbarBrand href="/">
              <strong>ARFuniture</strong>
            </NavbarBrand>
            {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
            <Collapse isOpen={this.state.collapse} navbar>
              <NavbarNav>
                <span>
                  <NavItem active>
                    <NavLink className="nav-link" to="/components/Home">Home</NavLink>
                  </NavItem>
                </span>

                { this.state.isLogin ?
                <button onClick={this.handleLogout}>Logout</button>
                :
                <span>
                  <NavItem>
                    <NavLink className="nav-link" to="/components/Register">Register</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/components/Login">Login</NavLink>
                  </NavItem>
                </span>
                }

                <NavItem>
                  <NavLink className="nav-link" to="/components/Ar">Go to start AR</NavLink>
                </NavItem>
              </NavbarNav>
            </Collapse>
          </Navbar>
        </Container>

        <div className="body" style={{overflowY: 'scroll'}}>

          <Switch>
            <Route path="/components/Home" exact component={Home} />
            <Route path="/components/Register" component={Register} />
            <Route path="/Introduction" component={Introduction}/>
            <Route path="/components/Login" component={Login} />
            <Route path="/components/Ar" component={Ar} />
          </Switch>
            {/* <Introduction /> */}
>>>>>>> 4350b1527f10aafa70fef357d91957c6f15350d6
        </div>
      </div>);
  }
}

export default App;
