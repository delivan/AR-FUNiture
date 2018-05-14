import React, { Component } from 'react';
import { Media } from 'mdbreact';
import YouTube from 'react-youtube';


const style = {}


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
      <div className="Introduction" >
        
        <div className="Introduction__Youtube col-s-12">
          {/* <YouTube
            videoId="gUwieWcISDU"
            opts={opts}
            onReady={this._onReady}
            onEnd={this._onEnd}
          />          */}
          <iframe width="854" height="480" src="https://www.youtube.com/embed/J_CFBjAyPWE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        
        <div className="Introduction__Colums">
          <h1>Use Funiture!!</h1>
          
          <Media>
            <Media body>
              <Media heading>STEP 1</Media>
              Place the Hiro mark in the desired position. Please select the design card below.
            </Media>
          </Media>
          <Media>
            <Media body>
              <Media heading>STEP 2</Media>
                Keep the camera screen on the Hiro mark after the camera is turned on.
            </Media>
          </Media>      
        </div>
      </div>
    );
  }
}

export default Introduction;