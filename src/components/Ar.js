import React, {Component} from 'react';
import {AFrameRenderer, Marker} from 'react-web-ar';
import Button from 'material-ui/Button';
import StarIcon from '@material-ui/icons/Star';
import Snackbar from 'material-ui/Snackbar';
import SnackbarContent from 'material-ui/Snackbar/SnackbarContent';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Drawer from './Drawer';
import {databaseRef, firebaseAuth} from '../config/firebase';

const styles = theme => ({
  progress: {
    position: 'fixed',
    top: '50%',
    left: '45%',
  },
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
  },
  snackbar: {
    left: '40%',
    right: '50%',
    bottom: '1rem',
    minWidth: '100px',
    height: theme.spacing.unit * 4,
  }
});

const modern = [
  {
    idx: 0,
    path: '#modern_chair',
    scale: '0.03 0.03 0.03',
    thumbnail: process.env.PUBLIC_URL + '/models/modern/chair1/thumbnail.png'
  },
  {
    idx: 1,
    path: '#modern_sofa',
    scale: '0.002 0.002 0.002',
    thumbnail: process.env.PUBLIC_URL + '/models/modern/sofa1/thumbnail.png'
  },
  {
    idx: 2,
    path: '#modern_bed',
    scale: '1.8 1.8 1.8',
    thumbnail: process.env.PUBLIC_URL + '/models/modern/bed1/thumbnail.png'

  },
  {
    idx: 3,
    path: '#modern_lamp',
    scale: '2 2 2',
    thumbnail: process.env.PUBLIC_URL + '/models/modern/lamp1/thumbnail.png'
  },
]

const wooden = [
  {
    idx: 0,
    path: '#wooden_closet',
    scale: '0.05 0.05 0.05',
    thumbnail: process.env.PUBLIC_URL + '/models/wooden/closet1/thumbnail.png'
  },
  {
    idx: 1,
    path: '#wooden_bed',
    scale: '0.3 0.3 0.3',
    thumbnail: process.env.PUBLIC_URL + '/models/wooden/bed1/thumbnail.png'

  },
  {
    idx: 2,
    path: '#wooden_cabinet',
    scale: '0.4 0.4 0.4',
    thumbnail: process.env.PUBLIC_URL + '/models/wooden/cabinet1/thumbnail.png'
  },
  {
    idx: 3,
    path: '#wooden_table',
    scale: '0.2 0.2 0.2',
    thumbnail: process.env.PUBLIC_URL + '/models/wooden/table1/thumbnail.png'
  }
]

class Ar extends Component {
  constructor(props) {
    super(props);
    var furnitures = [];
    this.props.category === 'modern' ? furnitures = modern: furnitures = wooden;
    this.state = {
      currentCategory: this.props.category,
      currentIdx: 0,
      currentPath : furnitures[0].path,
      defaultScale: furnitures[0].scale,
      open: false,
      gltfLoaded: false,
    };
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
    this.handleScale = this.handleScale.bind(this);
  }

  componentDidMount = () => {
    var furnitures = [];
    this.props.category === 'modern' ? furnitures = modern: furnitures = wooden;
    var element = document.getElementById(this.props.category);
    element.src = furnitures[0].path 
    element.scale = furnitures[0].scale
    document.querySelector('.furniture').addEventListener('model-loaded', () => {
      this.setState({
        gltfLoaded: true,
      });
    });
  }
    
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    var { currentCategory, currentIdx, currentPath, defaultScale } = this.state;
    if (prevState.currentIdx !== undefined || prevState.currentCategory !== undefined) {
      var element = document.getElementById(currentCategory);
      var scale_arr = defaultScale.split(' ');
      if (prevState.currentCategory !== currentCategory) {
        element.object3D.src = currentPath;
        element.object3D.scale.x = scale_arr[0];
        element.object3D.scale.y = scale_arr[1];
        element.object3D.scale.z = scale_arr[2];
      } 
      else if (prevState.currentIdx !== currentIdx) {
        element.object3D.scale.x = scale_arr[0];
        element.object3D.scale.y = scale_arr[1];
        element.object3D.scale.z = scale_arr[2];
      }
    }
  }

  handleBack = () => {
    window.location.reload();
  }

  handleLeft() {
    var { currentCategory, currentIdx } = this.state;
    var furnitures = [];
    currentCategory === 'modern' ? furnitures = modern : furnitures = wooden;
    if (currentIdx === 0) {
      this.setState({
        currentIdx: furnitures.length-1,
        currentPath: furnitures[furnitures.length-1].path,
        defaultScale: furnitures[furnitures.length-1].scale,
        gltfLoaded: false,
      });
    } 
    else {
      this.setState({
        currentIdx: currentIdx - 1,
        currentPath: furnitures[currentIdx-1].path,
        defaultScale: furnitures[currentIdx-1].scale,
        gltfLoaded: false,
      });
    }
  }

  handleRight() {
    var { currentCategory, currentIdx } = this.state;
    var furnitures = [];
    currentCategory === 'modern' ? furnitures = modern : furnitures = wooden;
    if (currentIdx === furnitures.length-1) {
      this.setState({
        currentIdx: 0,
        currentPath: furnitures[0].path,
        defaultScale: furnitures[0].scale,
        gltfLoaded: false,
      });
    } 
    else {
      this.setState({
        currentIdx: currentIdx + 1,
        currentPath: furnitures[currentIdx+1].path,
        defaultScale: furnitures[currentIdx+1].scale,
        gltfLoaded: false,
      });
    }
  }

  handleScale = (e) => {
    e.preventDefault();    
    var {currentCategory} = this.state;
    var element = document.getElementById(currentCategory);
    switch (e.target.name) {
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

  handleBookmark = (category, idx, scale) => {
    var furnitures = [];
    category === 'modern' ? furnitures = modern: furnitures = wooden;

    var bookmarkRef = databaseRef.child('users/' + firebaseAuth().currentUser.uid + '/bookmark')
    var bookmarkKey = bookmarkRef.push().key;
    var bookmarkData = {
      key: bookmarkKey,
      category: category,
      idx: idx,
      scale: scale,
      thumbnail: furnitures[idx].thumbnail
    };
    var updates = {};
    updates[bookmarkKey] = bookmarkData;
    bookmarkRef.update(updates);
    this.handleBookmarkClick();
  }

  showBookmark = (category, idx, scale) => {
    this.setState({currentCategory: category}, () => { 
      this.setState({
        currentIdx: idx,
        currentPath: category === 'modern' ? modern[idx].path : wooden[idx].path,
        defaultScale: scale,
      });
      if (this.state.currentCategory !== category || this.state.currentIdx !== idx) {
        this.setState({
          gltfLoaded: false,
        });
      }
    });
  }

  handleBookmarkClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { currentCategory, currentIdx, currentPath, defaultScale, gltfLoaded } = this.state;
    return (<div className={classes.renderer}>
      <AFrameRenderer>
        <a-assets>
          <a-asset-item id="modern_chair" src={process.env.PUBLIC_URL + '/models/modern/chair1/scene.gltf'}></a-asset-item>
          <a-asset-item id="modern_sofa" src={process.env.PUBLIC_URL + '/models/modern/sofa1/scene.gltf'}></a-asset-item>
          <a-asset-item id="modern_bed" src={process.env.PUBLIC_URL + '/models/modern/bed1/scene.gltf'}></a-asset-item>
          <a-asset-item id="modern_lamp" src={process.env.PUBLIC_URL + '/models/modern/lamp1/scene.gltf'}></a-asset-item>
          <a-asset-item id="wooden_closet" src={process.env.PUBLIC_URL + '/models/wooden/closet1/scene.gltf'}></a-asset-item>
          <a-asset-item id="wooden_bed" src={process.env.PUBLIC_URL + '/models/wooden/bed1/scene.gltf'}></a-asset-item>
          <a-asset-item id="wooden_cabinet" src={process.env.PUBLIC_URL + '/models/wooden/cabinet1/scene.gltf'}></a-asset-item>
          <a-asset-item id="wooden_table" src={process.env.PUBLIC_URL + '/models/wooden/table1/scene.gltf'}></a-asset-item>
        </a-assets>
        <Marker parameters={{
            preset: 'hiro',
          }}>
          <a-gltf-model id={currentCategory} src={currentPath} scale={defaultScale} class='furniture'/>
        </Marker>
        {!gltfLoaded && <CircularProgress className={classes.progress} color="secondary"/>}
        <div className={classes.leftButton}>
          <Button onClick={this.handleLeft} variant="fab">&lt;</Button>
        </div>
        <div className={classes.rightButton}>
          <Button onClick={this.handleRight} variant="fab">&gt;</Button>
        </div>
        <div className={classes.backButton}>
          <Button onClick={this.handleBack} variant="raised" color="secondary">뒤로가기</Button>
        </div>
        <div className={classes.bookmarkButton}>
          <Button onClick={() => this.handleBookmark(currentCategory, currentIdx, defaultScale)} variant="fab" color="secondary"><StarIcon/></Button>
        </div>
        <div className={classes.drawer}>
          <Drawer 
            scale={defaultScale}
            onHandleScale={this.handleScale} 
            onSelectBookmark={this.showBookmark}
          />
        </div>
          <Snackbar
            className={classes.snackbar}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={this.state.open}
            autoHideDuration={2000}
            onClose={this.handleClose}
          >
            <SnackbarContent
              className={classes.snackbar}
              message={<span>추가 완료</span>}
            />
          </Snackbar>
      </AFrameRenderer>
    </div>);
  }
}

Ar.propTypes = {
  classes: PropTypes.object.isRequired,
  category: PropTypes.string,
  __setCategory: PropTypes.func,
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func,
}

export default withStyles(styles)(Ar);
