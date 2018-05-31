import React, {Component} from 'react';
import {AFrameRenderer, Marker} from 'react-web-ar';
import Button from 'material-ui/Button';
import StarIcon from '@material-ui/icons/Star';
import PropTypes from 'prop-types';
import Drawer from './Drawer';
import Furnitures from './Furnitures';
import {databaseRef, firebaseAuth} from '../config/firebase';

const styles = {
  renderer: {
    overflow: 'hidden'
  },
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
  bookmarkButton: {
    position: 'fixed',
    left: '1rem',
    bottom: '1rem'
  },
  drawer: {
    position: 'fixed',
    right: '1rem',
    top: '1rem'
  }
};

const modern = [
  {
    idx: 0,
    path: process.env.PUBLIC_URL + '/models/modern/pillow/scene.gltf',
    scale: '0.02 0.02 0.02'
  },
  {
    idx: 1,
    path: process.env.PUBLIC_URL + '/models/modern/chair/scene.gltf',
    scale: '0.02 0.02 0.02'
  }
]

const colorful = [
  {
    idx: 0,
    path: process.env.PUBLIC_URL + '/models/colorful/desk/scene.gltf',
    scale: '0.03 0.03 0.03'
  },
  {
    idx: 1,
    path: process.env.PUBLIC_URL + '/models/colorful/closet/scene.gltf',
    scale: '0.03 0.03 0.03'
  }
]

class Ar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCategory: this.props.category,
      currentIdx: 0,
      defaultScale: this.props.category === 'modern' ? modern[0].scale : colorful[0].scale,
    };
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
    this.handleScale = this.handleScale.bind(this);
  }

  handleLeft = () => {
    const { currentCategory, currentIdx, defaultScale } = this.state;
    if (this.state.currentIdx === 0) {
      this.setState({
        currentIdx: modern.length - 1
      });
    } 
    else {
      this.setState({
        currentIdx: this.state.currentIdx - 1
      });
    }
    this.setState({
      defaultScale: currentCategory === 'modern' ? modern[currentIdx].scale : colorful[currentIdx].scale,
    });
    const id = document.getElementById(currentCategory);
    var scale_arr = defaultScale.split(' ');
    id.object3D.scale.x = scale_arr[0];
    id.object3D.scale.y = scale_arr[1];
    id.object3D.scale.z = scale_arr[2];
  }

  handleRight = () => {
    const { currentCategory, currentIdx, defaultScale } = this.state;
    if (this.state.currentIdx === modern.length - 1) {
      this.setState({
        currentIdx: 0,
      });
    } 
    else {
      this.setState({
        currentIdx: this.state.currentIdx + 1,
      });
    }
    this.setState({
      defaultScale: currentCategory === 'modern' ? modern[currentIdx].scale : colorful[currentIdx].scale,
    });
    const id = document.getElementById(currentCategory);
    var scale_arr = defaultScale.split(' ');
    id.object3D.scale.x = scale_arr[0];
    id.object3D.scale.y = scale_arr[1];
    id.object3D.scale.z = scale_arr[2];
  }

  handleBack = () => {
    window.location.reload();
  }

  handleBookmark = (idx, url, scale) => {
    const {currentCategory} = this.state;

    var screenshot = document.querySelector('a-scene').components.screenshot;
    screenshot.resize(256, 256);
    var canvas = screenshot.getCanvas('perspective');

    var bookmarkRef = databaseRef.child('users/' + firebaseAuth().currentUser.uid + '/bookmark')
    var bookmarkKey = bookmarkRef.push().key;
    var bookmarkData = {
      key: bookmarkKey,
      category: currentCategory,
      idx: idx,
      scale: scale,
      url: canvas.toDataURL("image/png")
    };
    var updates = {};
    updates[bookmarkKey] = bookmarkData;
    bookmarkRef.update(updates);
  }

  showBookmark = (category, idx, scale) => {
    this.setState({currentCategory: category}, () => { 
      this.setState({
        currentIdx: idx,
        defaultScale: scale
      });
    });
    const id = document.getElementById(this.state.currentCategory);
    var scale_arr = this.state.defaultScale.split(' ');
    id.object3D.scale.x = scale_arr[0];
    id.object3D.scale.y = scale_arr[1];
    id.object3D.scale.z = scale_arr[2];
  }

  handleScale = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    
    const {currentCategory} = this.state;
    const id = document.getElementById(currentCategory);
    switch ([e.target.name][0]) {
      case 'x':
        id.object3D.scale.x = e.target.value;
        break;
      case 'y':
        id.object3D.scale.y = e.target.value;
        break;
      case 'z':
        id.object3D.scale.z = e.target.value;
        break;
      default:
        break;
    }
  }

  render() {
    const {currentIdx, currentCategory, defaultScale} = this.state;
    return (<div style={styles.renderer}>
      <AFrameRenderer>
        <Marker parameters={{
            preset: 'hiro',
          }}>
          {currentCategory === 'modern' && <a-gltf-model src={modern[currentIdx].path} id={currentCategory} scale={defaultScale}/>}
          {currentCategory === 'colorful' && <a-gltf-model src={colorful[currentIdx].path} id={currentCategory} scale={defaultScale}/>}
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
        <div style={styles.bookmarkButton}>
          <Button onClick={() => this.handleBookmark(currentIdx, modern[currentIdx].path, defaultScale)} variant="fab" color="secondary"><StarIcon/></Button>
        </div>
        <div style={styles.drawer}>
          <Drawer 
            scale={defaultScale}
            onHandleScale={this.handleScale} 
            onSelectBookmark={this.showBookmark}
          />
        </div>
      </AFrameRenderer>
    </div>);
  }
}

Ar.propTypes = {
  category: PropTypes.string,
  __setCategory: PropTypes.func,
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func
}

export default Ar;
