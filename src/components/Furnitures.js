import React, { Component } from 'react';

class Furnitures extends Component {
  render() {
    const { category, currentIdx, furnitures } = this.props;

    return (
      <a-gltf-model src={furnitures[currentIdx].path} id={category} scale={furnitures[currentIdx].scale}></a-gltf-model>
    );
  }
}

export default Furnitures;
