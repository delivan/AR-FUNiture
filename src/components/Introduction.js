import React, { Component } from 'react';
import { Media } from 'mdbreact';
import YouTube from 'react-youtube';


class Introduction extends Component {
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  _onEnd(event) {
    event.target.playVideo();
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    }
    //gUwieWcISDU
    return (
      <div className="Introduction">
        <div className="Introduction__Youtube">
          <h1>Hello Funiture</h1>
          <YouTube
            videoId="gUwieWcISDU"
            opts={opts}
            onReady={this._onReady}
            onEnd={this._onEnd}
          />         
        </div>
        <div className="Introduction__Colums">
          <h1>Use Funiture!!</h1>
          
          <Media>
            <Media body>
              <Media heading>STEP 1</Media>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </Media>
          </Media>
          <Media>
            <Media body>
              <Media heading>STEP 2</Media>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </Media>
          </Media>      
        </div>
      </div>
    );
  }
}

export default Introduction;
