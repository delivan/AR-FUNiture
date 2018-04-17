import React, { Component } from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';
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
  state = {
    texture: null,
  };
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
                {category == 'desk' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/dark_cherry_desk/scene.gltf'} scale="0.01 0.01 0.01"></a-gltf-model>}
                {category == 'chair' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/chair/scene.gltf'} scale="0.05 0.05 0.05"></a-gltf-model>}
                {category == 'bed' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/bed/scene.gltf'} scale="0.03 0.03 0.03"></a-gltf-model>}
                {category == 'closet' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/closet/scene.gltf'} scale="0.1 0.1 0.1"></a-gltf-model>}
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
