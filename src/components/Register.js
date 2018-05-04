import React, { Component } from 'react';
import { register } from '../action/Auth';
import PropTypes from 'prop-types';

class Register extends Component{


  constructor(props){
    super(props);
    this.state = {
      email: '',
      pw: '',
      phone: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let user = {};
    user[e.target.name] = e.target.value;
    this.setState(user)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    register(this.state.email, this.state.pw, this.state.phone);
    this.setState({
      email: '',
      pw: '',
      phone: ''
    })      
    this.props.__setRoute('home');
  }


  render(){
    return(
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input className="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email"/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" name="pw" value={this.state.pw} onChange={this.handleChange} placeholder="Password" />
          </div>
          <div className="form-group">
            <input type="phone" className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="phone" />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
          <button onClick={() => this.props.__setRoute('home')}> Cancel </button>
        </form>
      </div>
    )
  }
}

Register.PropTypes = {  
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func,
}

export default Register;
