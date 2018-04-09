import React, { Component } from 'react';
import Sample from '../img/designSample.jpg';

const styles = {
  container: {
    position: 'relative',
    height: '100%',
    },

    gallery: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '0.5rem 0.5rem 2.5rem 0.5rem',
        position: 'relative',
        overflowY: 'scroll',
        height: '100%',
    }
}

const defaultImages = [
    require('../img/designSample.jpg'),
];

const Design = ({ images = defaultImages, onSelected }) => (
      <div style={styles.container}>
          <div style={styles.gallery}>
              {images.map(image => <GalleryItem key={image} image={image} onSelected={onSelected} />)}
          </div>
      </div>
)

class DesignImage extends Component {
  render() {
    return (
      // <img src={design} />
      // <img src={asset} alt="designSample.jpg" />
      <img src={Sample} className="Design-image" alt="sample" className="Design__Image"/>
    );
  }
}

export default Design;
