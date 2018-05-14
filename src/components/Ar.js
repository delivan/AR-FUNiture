import React, {Component} from 'react';
import {AFrameRenderer, Marker} from 'react-web-ar';
import Button from 'material-ui/Button';
import StarIcon from '@material-ui/icons/Star';
import PropTypes from 'prop-types';
import Drawer from './Drawer';
import Furnitures from './Furnitures';
import {databaseRef, firebaseAuth} from '../config/firebase';

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
    scale: '0.01 0.01 0.01'
  },
  {
    idx: 1,
    path: process.env.PUBLIC_URL + '/models/modern/chair/scene.gltf',
    scale: '0.01 0.01 0.01'
  }
]

const colorful = [
  {
    idx: 0,
    path: process.env.PUBLIC_URL + '/models/colorful/desk/scene.gltf',
    scale: '0.02 0.02 0.02'
  },
  {
    idx: 1,
    path: process.env.PUBLIC_URL + '/models/colorful/closet/scene.gltf',
    scale: '0.02 0.02 0.02'
  }
]

class Ar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 1,
      y: 1,
      z: 1,
      currentIdx: 0
    };
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
    this.handleScale = this.handleScale.bind(this);
    this.handleUpdateScale = this.handleUpdateScale.bind(this);
  }

  componentDidMount = () => {
    // const {category} = this.props;
    // const id = document.getElementById(category);
    // id.setAttribute('scale', {
    //   x: this.state.x,
    //   y: this.state.y,
    //   z: this.state.z
    // });
  }

  handleLeft = () => {
    if (this.state.currentIdx === 0) {
      this.setState({
        currentIdx: modern.length - 1
      });
    } else {
      this.setState({
        currentIdx: this.state.currentIdx - 1
      });
    }
  }

  handleRight = () => {
    if (this.state.currentIdx === modern.length - 1) {
      this.setState({currentIdx: 0});
    } else {
      this.setState({
        currentIdx: this.state.currentIdx + 1
      });
    }
  }

  handleBack = () => {
    window.location.reload();
  }

  handleBookmark = (url) => {
    var canvas = document.querySelector('a-scene').components.screenshot.getCanvas('perspective');

    var bookmarkRef = databaseRef.child('users/' + firebaseAuth().currentUser.uid + '/bookmark')
    var bookmarkKey = bookmarkRef.push().key;
    var bookmarkData = {
      key: bookmarkKey,
      url: canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    };
    var updates = {};
    updates[bookmarkKey] = bookmarkData;
    bookmarkRef.update(updates);
  }

  handleScale = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUpdateScale = (e) => {
    // // 페이지 리로딩 방지
    // e.preventDefault();
    //
    // const {category} = this.props;
    // const id = document.getElementById(category);
    // id.setAttribute('scale', {
    //   x: this.state.x,
    //   y: this.state.y,
    //   z: this.state.z
    // });

  }

  render() {
    const {category} = this.props;
    const {currentIdx} = this.state;
    return (<div style={styles.renderer}>
      <AFrameRenderer>
        <Marker parameters={{
            preset: 'hiro',
          }}>
          {category === 'modern' && <Furnitures category={category} currentIdx={currentIdx} furnitures={modern}/>}
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
        <div style={styles.bookmarkButton}>
          <Button onClick={() => this.handleBookmark(modern[currentIdx].path)} variant="fab" color="secondary"><StarIcon/></Button>
        </div>
        <div style={styles.drawer}>
          <Drawer width={this.state.x} length={this.state.z} height={this.state.y} onUpdateScale={this.handleUpdateScale} onHandleScale={this.handleScale}/>
        </div>
      </AFrameRenderer>
    </div>);
  }
}

Ar.propTypes = {
  category: PropTypes.string,
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func
}

export default Ar;
