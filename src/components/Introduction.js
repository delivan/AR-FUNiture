import React, { Component } from 'react';
import { Media } from 'mdbreact';

class Introduction extends Component {
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  _onEnd(event) {
    event.target.playVideo();
  }

  render() {
    // const opts = {
    //   height: '390',
    //   width: '640',
    //   playerVars: {
    //     autoplay: 1
    //   }
    // }
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
          <iframe title="intro" width="854" height="480" src="https://www.youtube.com/embed/J_CFBjAyPWE" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>
        
        <div className="Introduction__Colums">
          <h1>Use Funiture!!</h1>
          
          <Media>
            <Media body>
              <Media heading>STEP 1</Media>
              하단에서 마음에 드는 인테리어 디자인 카드를 선택해주세요. 가구를 놓고 싶은 자리에 Hiro 마크를 놓아두세요.
            </Media>
          </Media>
          <Media>
            <Media body>
              <Media heading>STEP 2</Media>
                Hiro 마크를 둔 곳에 카메라를 올려두면 가구가 생성됩니다. 양 끝 화살표를 통해서 다양한 가구를 볼 수 있습니다.
            </Media>
          </Media>      
        </div>
      </div>
    );
  }
}

export default Introduction;