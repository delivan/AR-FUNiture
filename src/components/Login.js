import React, { Component } from 'react';
import { login } from '../action/Auth';
import PropTypes from 'prop-types';
import { firebaseAuth } from '../config/firebase'
import Grid from 'material-ui/Grid'


export default class Login extends Component {
  constructor(props){
      super(props);
      this.state = {
          email: '',
          pw: '',
          user: null,
          currentRoute: this.props.currentRoute
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
      let user = {};
      user[e.target.name] = e.target.value;
      this.setState(user)
  }

  handleSubmit = async(e) => {
      e.preventDefault();
      try {
        await login(this.state.email, this.state.pw);   
        console.log('current user:', firebaseAuth().currentUser)
        this.props.__setRoute('home')
      } catch(e){
          alert(e.meesage);
      }
  }
  // input 창 value, name, onChange 설정하기
  render () {
    return (
      <div className='Login'>
        <Grid container spacing={24}> 
          <Grid item xs></Grid>
            <Grid item xs>
              <h1> Login </h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input className="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" name="pw" value={this.state.pw} onChange={this.handleChange} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-danger">Login</button>
                <button onClick={() => this.props.__setRoute('register')} className="btn btn-danger"> Register </button>
              </form>
            </Grid>
          <Grid item xs></Grid>
        </Grid>
      </div>
    )
  }  
}

Login.propTypes = {
  currentUser: PropTypes.object,
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func,
}

