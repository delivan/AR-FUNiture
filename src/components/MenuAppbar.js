import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from 'material-ui/Switch';
// import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { ref, firebaseAuth } from '../config/firebase'

import Home from './Home';
// import Register from './Register';
import Login from './Login';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  
  state = {
    auth: false,
    anchorEl: null,
    // currentRoute: this.props.currentRoute
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  __logout = () => {
    firebaseAuth().signOut();
    this.handleClose();
  }

  componentWillMount() {
    currentRoute: this.props.currentRoute
  }

  render() {
    // console.log('props currentRout',this.props.currentRoute)
    const { classes } = this.props;
    const { auth, anchorEl, loginComponent } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="title" color="inherit" className={classes.flex}>
              ArFuniture
            </Typography>
            {console.log('in menu user',this.props.currentUser)}
            {console.log('in menu route', this.state.currentRoute)}
            {this.props.currentUser ? 
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={this.__logout}>Logout</MenuItem>
                </Menu>
              </div>
            : 
              <Button color="inherit" onClick={() => this.props.__setRoute('login')}>Login</Button>  
              
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  // classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func,
};

export default withStyles(styles)(MenuAppBar);