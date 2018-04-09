import React, { Component } from 'react';
import { Input, Button } from 'mdbreact';

class Login extends Component {

    render() {
        return (
            
            <div>
              {/* 로그인 */}
              <h2 className="mb-5">Form login</h2>
              <form>
                  <p className="h5 text-center mb-4">Sign in</p>
                  <Input label="Type your email" icon="envelope" group type="email" validate error="wrong" success="right" />
                  <Input label="Type your password" icon="lock" group type="password" validate />
                  <div className="text-center">
                      <Button>Login</Button>
                  </div>
              </form>
            </div>

        );
    }
}

export default Login;