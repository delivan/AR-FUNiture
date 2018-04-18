import React, { Component } from 'react';
import {Router, Switch, Route, Link} from 'react-router-dom';

import Register from './Register';
import Home from './Home';
import Introduction from './Introduction';
import Login from './Login';
import Ar from './Ar';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { Input, Button, Container } from 'mdbreact';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { BrowserRouter } from 'react-router-dom';

import { firebaseAuth } from '../config/firebase'
import { logout } from '../action/Auth';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false,
      isLogin: false
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
        </div>
      </div>);
  }
}

export default App;
