import React, { Component } from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';
import WoodTexture from '../img/texture/wood_128x128.jpg';
import Button from 'material-ui/Button';

const styles = {
  container: {
    overflow: 'hidden',
  },
  renderer: {
    position: 'relative',
  },
  tips: {
    marginLeft : 'auto',
    marginRight : 'auto',
    maxWidth: 300,
    position: 'fixed',
    bottom: '5rem',
    left: '1rem',
    right: '1rem',
    padding: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  backButton: {
    position: 'fixed',
    left: '1rem',
    top: '1rem',
  },
};

class Ar extends Component {
  componentWillUnmount = () => {
    window.location.reload();
  }

  handleBack = () => {
    window.location.reload();
  }

  render() {
    const { category } = this.props;
    const { handleBack } = this;
    return (
      <div style={styles.container}>
        <div style={styles.renderer}>
          <AFrameRenderer inherit={true} embedded>
              <Marker parameters={{ preset: 'hiro' }}>
                <a-box src={WoodTexture} position="0.0 1.0 0.0" scale='2.0 0.1 2.0'/>
                <a-box src={WoodTexture} position="-0.9 0.5 -0.9" scale='0.1 1.0 0.1'/>
                <a-box src={WoodTexture} position="-0.9 0.5 0.9" scale='0.1 1.0 0.1'/>
                <a-box src={WoodTexture} position="0.9 0.5 -0.9" scale='0.1 1.0 0.1'/>
                <a-box src={WoodTexture} position="0.9 0.5 0.9" scale='0.1 1.0 0.1'/>
              </Marker>
              <div style={styles.backButton}>
                <Button onClick={this.handleBack} variant="raised" color="secondary">뒤로가기</Button>
              </div>
              <div style={styles.tips}>
                <p>{category}</p>
              </div>
          </AFrameRenderer>
        </div>
      </div>
      );
    }
  }

export default Ar;
