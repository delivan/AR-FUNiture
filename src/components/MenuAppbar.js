import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from 'material-ui/Switch';
// import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { firebaseAuth } from '../config/firebase'


// 바꾸고 싶은 스타일로 만들고 컴포넌트에 props로 전달
const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: '#D32F2F',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class MenuAppBar extends Component {

  render() {
    // console.log('props currentRout',this.props.currentRoute)
    const { classes } = this.props;

    return (
        <div className={classes.root}>
        {console.log('menuAppbar currentUser: ',this.props.currentUser)}
        <AppBar position="static" className={classes.root}>
            <Toolbar>
              <Typography variant="title" onClick={() => this.props.__setRoute('home')} color="inherit" className={classes.flex} >
                ArFuniture
              </Typography>
              {this.props.currentUser ? 
                <BarMenu currentUser={this.props.currentUser} />
              : 
                <Button color="inherit" onClick={() => this.props.__setRoute('login')}>Login</Button>  
                
              }
            </Toolbar>
          </AppBar>
        </div>
    );
  }
}

class BarMenu extends Component {

  state = {
    anchorEl: null,
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

  render() {
    
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
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
    )
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func,
};

export default withStyles(styles)(MenuAppBar);
