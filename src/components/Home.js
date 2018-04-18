import React, { Component } from 'react';
import Design from './Design';
import Introduction from './Introduction';

export default class Home extends Component {
  render () {
    return (
      <div className="container">
        <Introduction />
        <Design />
      </div>
    )
  }
}
