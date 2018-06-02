import React, {Component} from 'react';
import {AFrameRenderer, Marker} from 'react-web-ar';
import Button from 'material-ui/Button';
import StarIcon from '@material-ui/icons/Star';
import PropTypes from 'prop-types';
import Drawer from './Drawer';
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
    path: process.env.PUBLIC_URL + '/models/modern/chair1/scene.gltf',
    scale: '0.03 0.03 0.03'
  },
  {
    idx: 1,
    path: process.env.PUBLIC_URL + '/models/modern/desk1/scene.gltf',
    scale: '0.002 0.002 0.002'
  },
  {
    idx: 2,
    path: process.env.PUBLIC_URL + '/models/modern/sofa1/scene.gltf',
    scale: '0.002 0.002 0.002'
  },
  {
    idx: 3,
    path: process.env.PUBLIC_URL + '/models/modern/bed1/scene.gltf',
    scale: '2 2 2'
  },
  {
    idx: 4,
    path: process.env.PUBLIC_URL + '/models/modern/lamp1/scene.gltf',
    scale: '2.5 2.5 2.5'
  },
  {
    idx: 5,
    path: process.env.PUBLIC_URL + '/models/modern/table1/scene.gltf',
    scale: '0.03 0.03 0.03'
  },
]

const wooden = [
  {
    idx: 0,
    path: process.env.PUBLIC_URL + '/models/wooden/desk1/scene.gltf',
    scale: '0.02 0.02 0.02'
  },
  {
    idx: 1,
    path: process.env.PUBLIC_URL + '/models/wooden/closet1/scene.gltf',
    scale: '0.05 0.05 0.05'
  },
  {
    idx: 2,
    path: process.env.PUBLIC_URL + '/models/wooden/bed1/scene.gltf',
    scale: '0.5 0.5 0.5'
  },
  {
    idx: 3,
    path: process.env.PUBLIC_URL + '/models/wooden/cabinet1/scene.gltf',
    scale: '0.5 0.5 0.5'
  },
  {
    idx: 4,
    path: process.env.PUBLIC_URL + '/models/wooden/chair1/scene.gltf',
    scale: '0.01 0.01 0.01'
  },
  {
    idx: 5,
    path: process.env.PUBLIC_URL + '/models/wooden/table1/scene.gltf',
    scale: '0.2 0.2 0.2'
  }
]

class Ar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: this.props.category,
      currentIdx: 0,
      currentPath : this.props.category === 'modern' ? modern[0].path : wooden[0].path,
      defaultScale: this.props.category === 'modern' ? modern[0].scale : wooden[0].scale,
    };
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
    this.handleScale = this.handleScale.bind(this);
  }

  componentDidMount = () => {
    const element = document.getElementById(this.props.category);
    if (this.props.category === 'modern') {
      element.src = modern[0].path 
      element.scale = modern[0].scale
    }
    else {
      element.src = wooden[0].path 
      element.scale = wooden[0].scale
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const { currentCategory, currentPath, defaultScale } = this.state;
    if (prevState.currentIdx !== undefined || prevState.currentCategory !== undefined) {
      const element = document.getElementById(currentCategory);
      var scale_arr = defaultScale.split(' ');
      if (prevState.currentCategory !== currentCategory) {
        element.object3D.src = currentPath;
      }
      element.object3D.scale.x = scale_arr[0];
      element.object3D.scale.y = scale_arr[1];
      element.object3D.scale.z = scale_arr[2];
    }
  }

  handleBack = () => {
    window.location.reload();
  }

  handleLeft() {
    const { currentCategory, currentIdx } = this.state;
    var numOfFurniture;
    currentCategory === 'modern' ? numOfFurniture = modern.length-1 : numOfFurniture = wooden.length-1
    if (currentIdx === 0) {
      this.setState({
        currentIdx: numOfFurniture,
        currentPath: currentCategory === 'modern' ? modern[numOfFurniture].path : wooden[numOfFurniture].path,
        defaultScale: currentCategory === 'modern' ? modern[numOfFurniture].scale : wooden[numOfFurniture].scale,
      });
    } 
    else {
      this.setState({
        currentIdx: currentIdx - 1,
        currentPath: currentCategory === 'modern' ? modern[currentIdx-1].path : wooden[currentIdx-1].path,
        defaultScale: currentCategory === 'modern' ? modern[currentIdx-1].scale : wooden[currentIdx-1].scale,
      });
    }
  }

  handleRight() {
    const { currentCategory, currentIdx } = this.state;
    var numOfFurniture;
    currentCategory === 'modern' ? numOfFurniture = modern.length-1 : numOfFurniture = wooden.length-1
    if (currentIdx === numOfFurniture) {
      this.setState({
        currentIdx: 0,
        currentPath: currentCategory === 'modern' ? modern[0].path : wooden[0].path,
        defaultScale: currentCategory === 'modern' ? modern[0].scale : wooden[0].scale,
      });
    } 
    else {
      this.setState({
        currentIdx: currentIdx + 1,
        currentPath: currentCategory === 'modern' ? modern[currentIdx+1].path : wooden[currentIdx+1].path,
        defaultScale: currentCategory === 'modern' ? modern[currentIdx+1].scale : wooden[currentIdx+1].scale,
      });
    }
  }

  handleScale = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    
    const {currentCategory} = this.state;
    const element = document.getElementById(currentCategory);
    switch ([e.target.name][0]) {
      case 'x':
        element.object3D.scale.x = e.target.value;
        break;
      case 'y':
        element.object3D.scale.y = e.target.value;
        break;
      case 'z':
        element.object3D.scale.z = e.target.value;
        break;
      default:
        break;
    }
  }

  handleBookmark = (idx, scale) => {
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
        currentPath: category === 'modern' ? modern[idx].path : wooden[idx].path,
        defaultScale: scale
      });
    });
  }

  render() {
    const {currentCategory, currentIdx, currentPath, defaultScale} = this.state;
    return (<div style={styles.renderer}>
      <AFrameRenderer>
        <Marker parameters={{
            preset: 'hiro',
          }}>
          <a-gltf-model id={currentCategory} src={currentPath} scale={defaultScale}/>
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
          <Button onClick={() => this.handleBookmark(currentIdx, defaultScale)} variant="fab" color="secondary"><StarIcon/></Button>
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
