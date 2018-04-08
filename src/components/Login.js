import React, { Component } from 'react'

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

    handleSubmit = (e) => {
        register(this.state.email, this.state.pw, this.state.phone);    
    }


    // input 창 value, name, onChange 설정하기

    render () {
        return (
            <div className="col-sm-6 col-sm-offset-3">
                <h1> Login </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}