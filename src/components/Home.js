import React, { Component } from 'react'
import Design from './Design';

export default class Home extends Component {
  render () {
    return (
      <div>
        Home
        {/* <Introduction /> */}
        <div className="App-design">
          <Design />
          <Design />
          <Design />
          <Design />
        </div>
      </div>
    )
  }
}
