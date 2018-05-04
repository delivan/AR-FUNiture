import React, {Component} from 'react';
import {AFrameRenderer, Marker} from 'react-web-ar';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import Drawer from './Drawer'

const styles = {
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
  tips: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 300,
    position: 'fixed',
    bottom: '5rem',
    left: '1rem',
    right: '1rem',
    padding: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  }
};

class Ar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0.01,
      y: 0.01,
      z: 0.01
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
    return (<div style={styles.renderer}>
      <AFrameRenderer>
        <Marker parameters={{
            preset: 'hiro'
          }}>
          {category === 'Colorfull' && <Colorfull category={category}/>}
          {category === 'Modern' && <Modern category={category}/>}
          {category === 'bed' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/bed1/scene.gltf'} id={category}></a-gltf-model>}
          {category === 'closet' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/closet1/scene.gltf'} id={category}></a-gltf-model>}
        </Marker>
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

const Modern = ({category}) => {
  return (
    <a-gltf-model src={process.env.PUBLIC_URL + '/models/desk1/scene.gltf'} id={category}></a-gltf-model>
  );
}

const Colorfull = ({category}) => {
  return (
    <a-gltf-model src={process.env.PUBLIC_URL + '/models/chair1/scene.gltf'} id={category}></a-gltf-model>
  );
}

Ar.PropTypes = {
  category: PropTypes.string,
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func,
}

export default Ar;
