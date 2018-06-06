import React, { Component } from 'react';
import { Media } from 'mdbreact';
import homepage from '../img/homepage.png';
import hiromark from '../img/hiromark.png';
import rendering1 from '../img/rendering1.png';
import rendering2 from '../img/rendering2.png';

class Introduction extends Component {
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  _onEnd(event) {
    event.target.playVideo();
  }

  render() {
    const divStyle = {
      margin: 30,
    };
    return (
      <div className="Introduction" >
        <div className="Introduction__Colums">
          <h1>FUNiture 체험</h1>
          <Media>
            <Media body>
              <Media heading>STEP 1</Media>
              <img src={homepage} alt="" width="300" style={divStyle}/>
              <img src={hiromark} alt="" width="300"/>
              <p>하단에서 마음에 드는 인테리어 디자인 카드를 선택해주세요. 가구를 놓고 싶은 자리에 Hiro 마크를 놓아두세요.</p>
            </Media>
          </Media>
          <Media>
            <Media body>
              <Media heading>STEP 2</Media>
              <img src={rendering1} alt="" width="300" style={divStyle}/>
              <img src={rendering2} alt="" width="300"/>
              <p>Hiro 마크를 둔 곳에 카메라를 올려두면 가구가 생성됩니다. 양 끝 화살표를 통해서 다양한 가구를 볼 수 있습니다.</p>
            </Media>
          </Media>      
        </div>
      </div>
    );
  }
}

export default Introduction;