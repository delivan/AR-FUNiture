import React, { Component } from 'react';
import { register } from '../action/Auth';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { firebaseAuth } from '../config/firebase'


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
    register(this.state.email, this.state.pw, this.state.phone).then(()=>{

      this.setState({
        email: '',
        pw: '',
        phone: ''
      });
      this.props.__setRoute('home');
      console.log('current user:', firebaseAuth().currentUser)
    }).catch((e)=>{
      alert(e);
    });
  }


  render(){
    return(
      <div className="Register">
        <Grid container spacing={24}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
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
              <button type="submit" className="btn btn-danger">Register</button>
              <button onClick={() => this.props.__setRoute('login')} className="btn btn-danger"> Cancel </button>
            </form>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Register.propTypes = {
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func,
}

export default Register;
