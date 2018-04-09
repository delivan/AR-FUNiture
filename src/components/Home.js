import React, { Component } from 'react'
import Design from './Design';

export default class Home extends Component {
  render () {
    return (
      <div>
        HOME
        <div className="App-design">
          <Design />
        </div>
      </div>
    )
  }
}
