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
import TextField from 'material-ui/TextField';
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  },
  gridList: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    height: 'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class TemporaryDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      sizeOpen: false,
      bookmarkOpen: false,
      bookmarks: []
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleScale = this.handleScale.bind(this);
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
    this.props.onUpdateScale(e);
  }

  handleScale = (e) => {
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

  selectBookmark(idx) {
    this.props.onSelectBookmark(idx);
  } 

  deleteBookmark(key) {
    var bookmarkRef = databaseRef.child('users/' + firebaseAuth().currentUser.uid + '/bookmark')
    bookmarkRef.child(key).remove();
  }

  render() {
    const {classes} = this.props;
    const {bookmarks} = this.state;

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
                    <GridListTile onClick={() => this.selectBookmark(bookmarks[key].idx)} key={bookmarks[key].key}>
                      <img src={bookmarks[key].url} alt={'test'}/>
                      <GridListTileBar
                        title={<span>by: {'hyuk'}</span>}
                        actionIcon={
                          <IconButton className={classes.icon} onClick={() => this.deleteBookmark(bookmarks[key].key)}>
                            <DeleteIcon />
                          </IconButton>
                        }
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
              <form onSubmit={this.updateScale} className={classes.scaleInput}>
                <TextField name="x" label="가로" value={this.props.width} onChange={this.handleScale} margin="normal" className={classes.textField}/>
                <TextField name="z" label="세로" value={this.props.length} onChange={this.handleScale} margin="normal" className={classes.textField}/>
                <TextField name="y" label="높이" value={this.props.height} onChange={this.handleScale} margin="normal" className={classes.textField}/>
                <Button type="submit" variant="raised" color="secondary" onClick={this.toggleDrawer}>적용</Button>
              </form>
            </Collapse>
        </div>
      </Drawer>
    </div>);
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
