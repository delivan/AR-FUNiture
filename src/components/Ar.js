import React, { Component } from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';
import { Link } from 'react-router-dom';
import WoodTexture from '../img/texture/wood_128x128.jpg';
import '../css/Ar.css';

class Ar extends Component {
  componentWillUnmount() {
    this.renderer && this.renderer.dispose();
  }
  render() {
      return (
        <AFrameRenderer>
          <Marker parameters={{ preset: 'hiro' }}>
            <a-box src={WoodTexture} position="0.0 1.0 0.0" scale='2.0 0.1 2.0'/>
            <a-box src={WoodTexture} position="-0.9 0.5 -0.9" scale='0.1 1.0 0.1'/>
            <a-box src={WoodTexture} position="-0.9 0.5 0.9" scale='0.1 1.0 0.1'/>
            <a-box src={WoodTexture} position="0.9 0.5 -0.9" scale='0.1 1.0 0.1'/>
            <a-box src={WoodTexture} position="0.9 0.5 0.9" scale='0.1 1.0 0.1'/>
          </Marker>
          <div className="AR-tip">
            <p>카테고리를 선택하세요</p>
            <div>
              <Link to="/">사용법</Link>
            </div>
          </div>
        </AFrameRenderer>
      );
    }
  }

export default Ar;
