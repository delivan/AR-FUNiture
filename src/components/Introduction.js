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
          <h1>Hello Funiture</h1>
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
                가구를 놓을 자리에 Hiro 마크를 놓아주세요.
                아래의 원하는 디자인 카드를 선택해주세요.
            </Media>
          </Media>
          <Media>
            <Media body>
              <Media heading>STEP 2</Media>
                카메라가 켜진 이후에 카메라 화면을 Hiro 마크 위에 올려두세요.
            </Media>
          </Media>      
        </div>
      </div>
    );
  }
}

export default Introduction;