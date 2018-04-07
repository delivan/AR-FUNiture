import React, { Component } from 'react'


export default class Register extends Component{

    handleSubmit = (e) => {
        console.log(e);
    }


    render(){
        return(
            <div className="col-sm-6 col-sm-offset-3">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input className="form-control" onClick={this.handleSubmit} placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                    <button className="">Cancel</button>
                </form>
            </div>
        )
    }
}