import React, {Component} from 'react';
import {AFrameRenderer, Marker} from 'react-web-ar';


class Renderer extends Component {
  componentDidMount() {
    const {category, scaleX, scaleY, scaleZ} = this.props;
    const id = document.getElementById(category);
    id.setAttribute('scale', {
      x: scaleX,
      y: scaleY,
      z: scaleZ
    });
  }

  render() {
    const {category} = this.props;

    return (<AFrameRenderer>
      <Marker parameters={{
          preset: 'hiro'
        }}>
        {category === 'desk' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/desk1/scene.gltf'} id={category}></a-gltf-model>}
        {category === 'chair' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/chair1/scene.gltf'} id={category}></a-gltf-model>}
        {category === 'bed' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/bed1/scene.gltf'} id={category}></a-gltf-model>}
        {category === 'closet' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/closet1/scene.gltf'} id={category}></a-gltf-model>}
      </Marker>
    </AFrameRenderer>);
  }
}

export default Renderer;
