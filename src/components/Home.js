import React, { Component } from 'react';
import Design from './Design';
import Introduction from './Introduction';
import PropTypes from 'prop-types';

export default class Home extends Component {
  render () {
    return (
      <div className="container">
        <Introduction />
        <Design
          __setRoute={this.props.__setRoute}
          currentRoute={this.props.currentRoute}
          currentUser={this.props.currentUser}
          __setCategory={this.props.__setCategory}
        />
      </div>
    )
  }
}

Home.propTypes = {
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func,
  currentUser: PropTypes.object,
  __setCategory: PropTypes.func,
}
