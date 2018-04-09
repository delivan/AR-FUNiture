import React, { Component } from 'react';
import { Media } from 'mdbreact';


class Introduction extends Component {
  render() {
    return (
      <div className="Introduction">
        <div className="Introduction__Colums">
          <h1>Hello Funiture</h1>
          <Media>
            <Media left className="mr-3" href="#">
              <Media object src="https://placehold.it/64x64" alt="Generic placeholder image" />
            </Media>
            <Media body>
              <Media heading>STEP 1</Media>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </Media>
          </Media>
        </div>
      </div>
    );
  }
}

export default Introduction;