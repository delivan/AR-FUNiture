import React, { Component } from 'react';
import '../css/App.css';

import {Router, Switch, Route, Link} from 'react-router-dom';

import Register from './Register';
import Home from './Home';
import Introduction from './Introduction';
import Login from './Login';
import Ar from './Ar';

import { Input, Button, Container } from 'mdbreact';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { BrowserRouter } from 'react-router-dom';

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

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <span>
            <button><Link to="/components/Home">Home</Link></button>
            <button><Link to="/components/Register">Register</Link></button>
            <button><Link to="/components/Login">Login</Link></button>
          </span>
          
        </header> */}

        {/* Main navigation */}
        <Container>
          <Navbar color="indigo" dark expand="lg">
            <NavbarBrand href="/">
              <strong>Navbar</strong>
            </NavbarBrand>
            {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
            <Collapse isOpen={this.state.collapse} navbar>
              <NavbarNav>
                <NavItem active>
                  <NavLink className="nav-link" to="/components/Home">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/components/Register">Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/components/Login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/components/Ar">Go to start AR</NavLink>
                </NavItem>
              </NavbarNav>
            </Collapse>
          </Navbar>
        </Container>
            
        <div className="body" style={{overflowY: 'scroll'}}>
          <Button variant="raised" color="primary">
            Hello World
          </Button>
          <Switch>
            <Route path="/components/Home" exact component={Home} />
            <Route path="/components/Register" component={Register} />
            <Route path="/Introduction" component={Introduction}/>
            <Route path="/components/Login" component={Login} />
            <Route path="/components/Ar" component={Ar} />
          </Switch>
            {/* <Introduction /> */}      
        </div>
      </div>
    );
  }
}

export default App;
