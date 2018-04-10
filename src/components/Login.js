import React, { Component } from 'react'
import { login } from '../action/Auth';


export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            pw: '',
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
            this.props.history.push("/components/Home");
        } catch(e){
            alert(e.meesage);
        }
        
    }

    // input 창 value, name, onChange 설정하기

    render () {
        return (
            <div className="col-sm-6 col-sm-offset-3">
                <h1> Login </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input className="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="pw" value={this.state.pw} onChange={this.handleChange} placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}
