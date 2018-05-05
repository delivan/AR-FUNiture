import React, {Component} from 'react';
import {AFrameRenderer, Marker} from 'react-web-ar';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import Drawer from './Drawer';
import Furnitures from './Furnitures';

const styles = {
  leftButton: {
    position: 'fixed',
    left: '1rem',
    top: '50%'
  },
  rightButton: {
    position: 'fixed',
    right: '1rem',
    top: '50%'
  },
  backButton: {
    position: 'fixed',
    left: '1rem',
    top: '1rem'
  },
  drawer: {
    position: 'fixed',
    right: '1rem',
    top: '1rem'
  },
};

const moderns = [
  { idx: 0, path: process.env.PUBLIC_URL + '/models/desk1/scene.gltf'},
  { idx: 1, path: process.env.PUBLIC_URL + '/models/chair1/scene.gltf'}
]

const colorful = [
  { idx: 0, path: process.env.PUBLIC_URL + '/models/bed1/scene.gltf'},
  { idx: 1, path: process.env.PUBLIC_URL + '/models/closet1/scene.gltf'}
]

class Ar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0.01,
      y: 0.01,
      z: 0.01,
      currentIdx: 0,
    };
    this.handleScale = this.handleScale.bind(this);
    this.handleUpdateScale = this.handleUpdateScale.bind(this);
  }

  componentDidMount = () => {
    const {category} = this.props;
    const id = document.getElementById(category);
    id.setAttribute('scale', {
      x: this.state.x,
      y: this.state.y,
      z: this.state.z
    });
  }

  handleLeft = () => {
    if (this.state.currentIdx === 0) {
      this.setState({
        currentIdx: moderns.length - 1
      });
    }
    else {
      this.setState({
        currentIdx: this.state.currentIdx - 1
      });
    }
  }

  handleRight = () => {
    if (this.state.currentIdx === moderns.length - 1) {
      this.setState({
        currentIdx: 0
      });
    }
    else {
      this.setState({
        currentIdx: this.state.currentIdx + 1
      });
    }
  }

  handleBack = () => {
    window.location.reload();
  }

  handleScale = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUpdateScale = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();

    const {category} = this.props;
    const id = document.getElementById(category);
    id.setAttribute('scale', {
      x: this.state.x,
      y: this.state.y,
      z: this.state.z
    });
  }

  render() {
    const {category} = this.props;
    const {currentIdx} = this.state;
    return (<div style={styles.renderer}>
      <AFrameRenderer>
        <Marker parameters={{
            preset: 'hiro'
          }}>
          {category === 'modern' && <Furnitures category={category} currentIdx={currentIdx} furnitures={moderns}/>}
          {category === 'colorful' && <Furnitures category={category} currentIdx={currentIdx} furnitures={colorful}/>}
        </Marker>
        <div style={styles.leftButton}>
          <Button onClick={this.handleLeft} variant="fab">&lt;</Button>
        </div>
        <div style={styles.rightButton}>
          <Button onClick={this.handleRight} variant="fab">&gt;</Button>
        </div>
        <div style={styles.backButton}>
          <Button onClick={this.handleBack} variant="raised" color="secondary">뒤로가기</Button>
        </div>
        <div style={styles.drawer}>
          <Drawer
            width={this.state.x}
            length={this.state.z}
            height={this.state.y}
            onUpdateScale={this.handleUpdateScale}
            onHandleScale={this.handleScale}/>
        </div>
      </AFrameRenderer>
    </div>);
  }
}

Ar.propTypes = {
  category: PropTypes.string,
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func,
}

export default Ar;
