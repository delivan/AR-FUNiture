import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarIcon from '@material-ui/icons/Star';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';


const styles = theme => ({
  list: {
    width: 'auto'
  },
  scaleInput: {
    display: 'table',
    paddingLeft: theme.spacing.unit * 4,
  },
});

class TemporaryDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      right: false,
      open: false
    };
    this.handleScale = this.handleScale.bind(this);
    this.updateScale = this.updateScale.bind(this);
    this.handleSizeButton = this.handleSizeButton.bind(this);

  }

  toggleDrawer = (side, open) => () => {
    this.setState({[side]: open});
  };

  updateScale = (e) => {
    this.props.onUpdateScale(e);
  }

  handleScale = (e) => {
    this.props.onHandleScale(e);
  }

  handleSizeButton() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const {classes} = this.props;

    return (<div>
      <Button onClick={this.toggleDrawer('right', true)} variant="raised" color="secondary">메뉴</Button>
      <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
        <div className={classes.list}>
          <ListItem button="button">
            <ListItemIcon>
              <StarIcon/>
            </ListItemIcon>
            <ListItemText primary="즐겨찾기"/>
          </ListItem>
          <ListItem button onClick={this.handleSizeButton}>
            <ListItemIcon>
              <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="크기조정"/>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <div style={styles.scaleInput}>
              <form onSubmit={this.updateScale}>
                <p>가로 세로 높이를 입력해주세요.</p>
                <div>
                  <label for="fname">가로:</label>
                  <input onChange={this.handleScale} value={this.props.width} name="x"/>
                </div>
                <div>
                  <label for="lname">세로:</label>
                  <input onChange={this.handleScale} value={this.props.length} name="z"/>
                </div>
                <div>
                  <label for="age">높이:</label>
                  <input onChange={this.handleScale} value={this.props.height} name="y"/>
                </div>
                <div>
                  <Button type="submit" variant="raised" color="secondary">적용</Button>
                </div>
              </form>
            </div>
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
