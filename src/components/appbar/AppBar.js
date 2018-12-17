import React, { Component } from 'react';
import {withRouter, Link, Redirect} from 'react-router-dom'
import {withFirebase} from '../firebase'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import CloseDrawerIcon from '@material-ui/icons/KeyboardArrowRight';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Drawer from '@material-ui/core/Drawer'
import Dialog from '@material-ui/core/Dialog';
import { withSnackbar } from 'notistack';

import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import PhotoIcon from '@material-ui/icons/PhotoCamera';
import VideoIcon from '@material-ui/icons/Videocam';
import DroneIcon from '@material-ui/icons/AirplanemodeActive';
import BlogIcon from '@material-ui/icons/FormatAlignCenter';
import ContactIcon from '@material-ui/icons/Textsms';
import DashboardIcon from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/Close';

import Login from '../auth/Login'
const Logo = require('../../static/startImg/logo.svg')

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: theme.palette.appBarColor,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 36,
    marginRight: 12,
    [theme.breakpoints.down('xs')]: {
      marginRight: -1
    },
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    backgroundColor: theme.palette.drawerColor,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: theme.palette.drawerColor,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 5 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    textDecoration: 'none',
    //textShadow: '-0.5px 0 #8c8c8c, 0 0.5px #8c8c8c, 0.5px 0 #8c8c8c, 0 -0.5px #8c8c8c;',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },
  lastIcon: {
    marginBottom: theme.spacing.unit *2,
  },
  listIcon: {
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      marginLeft: -theme.spacing.unit
    },
  },
  listIconLast: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: -theme.spacing.unit
    },
  },
  listItemText: {
    color: 'white',
  },
});

class Appbar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false,
      loginDialog: false,

    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleLoginOpen = () => {
    this.setState({ loginDialog: true });
  };

  handleLoginClose = () => {
    this.setState({ loginDialog: false });
  };

  handleLoginButton = () => {

    if (this.props.state.authUser === true) {
      return this.props.history.push('/dashboard')
    } else {
        return this.handleLoginOpen()
    }
  }

    handleLogoutButton = () => {

      this.props.firebase.doSignOut().then(() => {
        this.props.enqueueSnackbar('See you soon!', 'success');
      }).catch((err) => {
        this.props.enqueueSnackbar(err.message, 'error');
      })

  }

    renderLogoutButton = (classes) => {
      if (this.props.state.authUser === true) {
        return (
          <ListItem button key={'Logout'} onClick={this.handleLogoutButton} >
            <ListItemIcon className={classes.listIcon}>
              <LogoutIcon/>
            </ListItemIcon>
            <ListItemText classes={{primary: classes.listItemText}} primary={'Logout'} />
          </ListItem>
        )
      }
    }

  render() {

    const { classes, toggleDrawer } = this.props;

    console.log(this.props.state)
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <Typography className={classes.title} variant="h5" color='inherit' noWrap component={Link}
                        to='/'>
              JB-Labs
            </Typography>
            <div className={classes.grow} />
            <IconButton
              aria-label="Open drawer"
              color='inherit'
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor={'right'}
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose} >
              <CloseDrawerIcon />
            </IconButton>
          </div>
          <Divider />
          <List >
            <ListItem button key={'Start'} component={Link} to={'/'} onClick={this.handleDrawerClose} >
              <ListItemIcon className={classes.listIcon}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText classes={{primary: classes.listItemText}} primary={'Start'} />
              </ListItem>

            <ListItem button key={'Code'} component={Link} to={'/code'} onClick={this.handleDrawerClose}>
              <ListItemIcon className={classes.listIcon}>
                <CodeIcon/>
              </ListItemIcon>
              <ListItemText classes={{primary: classes.listItemText}} primary={'Code'} />
            </ListItem>

            <ListItem button key={'Photography'} component={Link} to={'/photo'} onClick={this.handleDrawerClose}>
              <ListItemIcon className={classes.listIcon}>
                <PhotoIcon/>
              </ListItemIcon>
              <ListItemText classes={{primary: classes.listItemText}} primary={'Photography'} />
            </ListItem>

            <ListItem button key={'Video'} component={Link} to={'/video'} onClick={this.handleDrawerClose}>
              <ListItemIcon className={classes.listIcon}>
                <VideoIcon/>
              </ListItemIcon>
              <ListItemText classes={{primary: classes.listItemText}} primary={'Video'} />
            </ListItem>

            <ListItem button key={'Drone'} component={Link} to={'/drone'} onClick={this.handleDrawerClose}>
              <ListItemIcon className={classes.listIcon}>
                <DroneIcon/>
              </ListItemIcon>
              <ListItemText classes={{primary: classes.listItemText}} primary={'Drone'} />
            </ListItem>

            <ListItem button key={'Blog'} component={Link} to={'/blog'} onClick={this.handleDrawerClose}>
              <ListItemIcon className={classes.listIcon}>
                <BlogIcon/>
              </ListItemIcon>
              <ListItemText classes={{primary: classes.listItemText}} primary={'Blog'} />
            </ListItem>

            <ListItem button key={'Contact'} component={Link} to={'/contact'} onClick={this.handleDrawerClose}>
              <ListItemIcon className={classes.listIcon}>
                <ContactIcon/>
              </ListItemIcon>
              <ListItemText classes={{primary: classes.listItemText}} primary={'Contact'} />
            </ListItem>

          </List>
          <Divider />
          <div className={classes.grow} />

          <List >
            {this.renderLogoutButton(classes)}
            <ListItem button key={'Dashboard'} onClick={this.handleLoginButton} className={classes.lastIcon}>
              <ListItemIcon className={classes.listIcon}>
                <DashboardIcon/>
              </ListItemIcon>
              <ListItemText classes={{primary: classes.listItemText}} primary={'Dashboard'} />
            </ListItem>
          </List>

        </Drawer>
        <Dialog
          open={this.state.loginDialog}
          onClose={this.handleLoginClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
         <Login state={this.props.state} handleLoginClose={this.handleLoginClose}/>
        </Dialog>
      </div>
    );
  }
}

Appbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withSnackbar(withFirebase(withRouter(withStyles(styles)(Appbar))));