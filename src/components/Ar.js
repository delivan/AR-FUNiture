import React, { Component } from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

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
                {category === 'desk' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/desk1/scene.gltf'} scale="0.03 0.03 0.03"></a-gltf-model>}
                {category === 'chair' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/chair1/scene.gltf'} scale="0.02 0.02 0.02"></a-gltf-model>}
                {category === 'bed' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/bed1/scene.gltf'}></a-gltf-model>}
                {category === 'closet' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/closet1/scene.gltf'} scale="0.03 0.03 0.03"></a-gltf-model>}
              </Marker>
              <div style={styles.backButton}>
                <Button onClick={this.handleBack} variant="raised" color="secondary">뒤로가기</Button>
              </div>
          </AFrameRenderer>
        </div>
      </div>
    );
  }
}

Ar.PropTypes = {
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func,
}

export default Ar;
