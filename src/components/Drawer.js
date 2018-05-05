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
import TextField from 'material-ui/TextField';


const styles = theme => ({
  list: {
    width: 'auto',
  },
  scaleInput: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
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
              <form onSubmit={this.updateScale} className={classes.scaleInput}>
                  가로 세로 높이를 입력해주세요.
                  <TextField
                    name="x"
                    label="가로"
                    value={this.props.width}
                    onChange={this.handleScale}
                    margin="normal"
                    className={classes.textField}
                  />
                  <TextField
                    name="z"
                    label="세로"
                    value={this.props.length}
                    onChange={this.handleScale}
                    margin="normal"
                    className={classes.textField}
                  />
                  <TextField
                    id="y"
                    label="높이"
                    value={this.props.height}
                    onChange={this.handleScale}
                    margin="normal"
                    className={classes.textField}
                  />
                  <Button type="submit" variant="raised" color="secondary">적용</Button>
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
