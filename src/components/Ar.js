import React, { Component } from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';
import WoodTexture from '../img/texture/wood_128x128.jpg';
import Button from 'material-ui/Button';
import '../css/Ar.css';

class Ar extends Component {
  componentWillUnmount = () => {
    window.location.reload();
  }

  back = () => {
    window.location.reload();
  }

  render() {
    const { category } = this.props;
    const { back } = this;
      return (
        <div className="AR">
        <AFrameRenderer getSceneRef={(ref) => this.scene = ref} embedded>
          <Marker parameters={{ preset: 'hiro' }}>
            <a-box src={WoodTexture} position="0.0 1.0 0.0" scale='2.0 0.1 2.0'/>
            <a-box src={WoodTexture} position="-0.9 0.5 -0.9" scale='0.1 1.0 0.1'/>
            <a-box src={WoodTexture} position="-0.9 0.5 0.9" scale='0.1 1.0 0.1'/>
            <a-box src={WoodTexture} position="0.9 0.5 -0.9" scale='0.1 1.0 0.1'/>
            <a-box src={WoodTexture} position="0.9 0.5 0.9" scale='0.1 1.0 0.1'/>
          </Marker>
          <div className="AR-tip">
            <p>{category}</p>
            <div>
            <Button onClick={this.back} variant="raised" color="secondary">뒤로가기</Button>
            </div>
          </div>
        </AFrameRenderer>
      </div>
      );
    }
  }

export default Ar;
