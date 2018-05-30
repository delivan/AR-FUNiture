import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarIcon from '@material-ui/icons/Star';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import {databaseRef, firebaseAuth} from '../config/firebase';

const styles = theme => ({
  list: {
    width: 'auto'
  },
  bookmarkList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  scaleInput: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  sizeField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginTop : theme.spacing.unit * 2,
    marginBottom : theme.spacing.unit * 2,
    width: 150
  },
  gridList: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    height: 'auto',
  },
  listBar: {
    background: 'rgba(255, 255, 255, 1)'
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
});

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

class TemporaryDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      sizeOpen: false,
      bookmarkOpen: false,
      bookmarks: [],
      defaultScale: this.props.scale.split(' ')
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.updateScale = this.updateScale.bind(this);
    this.handleSizeButton = this.handleSizeButton.bind(this);
    this.handleBookmarkButton = this.handleBookmarkButton.bind(this);
    this.selectBookmark = this.selectBookmark.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
  }

  componentDidMount = () => {    
    var bookmarkRef = databaseRef.child('users/' + firebaseAuth().currentUser.uid + '/bookmark');
    bookmarkRef.on('value', (snapshot) => {
      var value = snapshot.val();
      this.setState({
        bookmarks: value,
      });
    });
  }

  toggleDrawer = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  };

  updateScale = (e) => {
    this.props.onHandleScale(e);
  }

  handleSizeButton() {
    this.setState({
      sizeOpen: !this.state.sizeOpen
    });
  }

  handleBookmarkButton() {
    this.setState({
      bookmarkOpen: !this.state.bookmarkOpen
    });
  }

  selectBookmark(category, idx) {
    this.props.onSelectBookmark(category, idx);
    this.setState({
      defaultScale: category === 'modern' ? modern[idx].scale.split(' ') : colorful[idx].scale.split(' ')
    });
    console.log(this.state.defaultScale)
    this.toggleDrawer();
  } 

  deleteBookmark(key) {
    var bookmarkRef = databaseRef.child('users/' + firebaseAuth().currentUser.uid + '/bookmark')
    bookmarkRef.child(key).remove();
  }

  anotherUpdateScale = (e) => {
    this.props.onHandleScale(e);
  }

  render() {
    const {classes} = this.props;
    const {bookmarks, defaultScale} = this.state;

    return (<div>
      <Button onClick={this.toggleDrawer} variant="raised" color="secondary">메뉴</Button>
      <Drawer anchor="right" open={this.state.menuOpen} onClose={this.toggleDrawer}>
        <div className={classes.list}>
          <ListItem role="button" onClick={this.handleBookmarkButton}>
            <ListItemIcon>
              <StarIcon/>
            </ListItemIcon>
            <ListItemText primary="즐겨찾기"/> {
              this.state.bookmarkOpen
                ? <ExpandLess/>
                : <ExpandMore/>
            }
            </ListItem>
            <Collapse in={this.state.bookmarkOpen} timeout="auto" unmountOnExit>
              <div className={classes.bookmarkList}>
                <GridList cellHeight={130} className={classes.gridList}>
                  {bookmarks !== null ? Object.keys(bookmarks).map(key => (
                    <GridListTile onClick={() => this.selectBookmark(bookmarks[key].category, bookmarks[key].idx)} key={bookmarks[key].key}>
                      <img src={bookmarks[key].url} alt={'test'}/>
                      <GridListTileBar
                        actionIcon={
                          <IconButton className={classes.icon} onClick={() => this.deleteBookmark(bookmarks[key].key)}>
                            <DeleteIcon />
                          </IconButton>
                        }
                        className={classes.listBar}
                      />
                    </GridListTile>
                  )) : 'hi'}
                </GridList>
              </div>
            </Collapse>
            <ListItem role="button" onClick={this.handleSizeButton}>
              <ListItemIcon>
                <InboxIcon/>
              </ListItemIcon>
            <ListItemText primary="크기조정"/> {
              this.state.sizeOpen
                ? <ExpandLess/>
                : <ExpandMore/>
            }
            </ListItem>
            <Collapse in={this.state.sizeOpen} timeout="auto" unmountOnExit>
              <div className={classes.sizeField}>
                가로 :<input
                  name="x"
                  type="range"
                  onChange={this.updateScale}
                  min={defaultScale[0] / 2}
                  max={defaultScale[0] * 2}
                  step={defaultScale[0] / 10}
                  defaultValue={defaultScale[0]}
                  className={classes.sizeField}
                />
                세로 :<input
                  name="z"
                  type="range"
                  onChange={this.updateScale}
                  min={defaultScale[2] / 2}
                  max={defaultScale[2] * 2}
                  step={defaultScale[2]  / 10}
                  defaultValue={defaultScale[0]}
                  className={classes.sizeField}
                />
                높이 :<input
                  name="y"
                  type="range"
                  onChange={this.updateScale}
                  min={defaultScale[1] / 2}
                  max={defaultScale[1] * 2}
                  step={defaultScale[1] / 10}
                  defaultValue={defaultScale[1]}
                  className={classes.sizeField}
                />
              </div>
            </Collapse>
        </div>
      </Drawer>
    </div>);
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  scale: PropTypes.string,
  onHandleScale: PropTypes.func,
  onSelectBookmark: PropTypes.func
};

export default withStyles(styles)(TemporaryDrawer);
