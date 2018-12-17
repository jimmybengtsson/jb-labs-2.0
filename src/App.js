import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import {withFirebase } from './components/firebase'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import AppBar from './components/appbar/AppBar'
import Start from './components/Start'
import Code from './components/code/Code'
import Photo from './components/photo/Photo'
import Video from './components/video/Video'
import Drone from './components/drone/Drone'
import Blog from './components/blog/Blog'
import Contact from './components/contact/Contact'
import Dashboard from './components/dashboard/Dashboard'
import Register from './components/auth/Register'

import './App.css';

const styles = theme => ({
  root: {
    minHeight: '100%',
    backgroundColor: theme.palette.backgroundColor,
  },
  appBody: {
    paddingTop: theme.spacing.unit * 7.5,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 6,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 9,
      paddingRight: theme.spacing.unit * 10,
    },
    [theme.breakpoints.up('md')]: {
      width: 960,
      margin: 'auto',
      paddingRight: theme.spacing.unit * 5,
    },

  },
  routeWrapper: {
    position: 'relative',
    '& div': {
      position: 'absolute',
    }
  },
});

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      snackBar: false,
      snackBarMessage: '',
      isSignedIn: false,
      drawer: false

    }

  }

  toggleDrawer = (open) => () => {
    this.setState({
      drawer: open,
    });
  };

  componentWillMount () {
    //ReactGA.initialize('UA-130098107-1');
    //ReactGA.pageview(window.location.pathname + window.location.search);
    /*if (localStorage.getItem('token')) {
      let token = JSON.parse(localStorage.getItem('token'))
      this.verifyToken(token)
    } else {
      this.setState({
        isSignedIn: false,
        loaded: true
      })
    }*/
  }

  /*componentWillUpdate () {
    ReactGA.pageview(window.location.pathname + window.location.search);
    if (localStorage.getItem('token')) {
      let token = JSON.parse(localStorage.getItem('token'))

      if (this.state.token) {
        if (token !== this.state.token) {
          this.verifyToken(token)
        }
      }
    }
  }*/

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser: true })
          : this.setState({ authUser: null });
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {

    console.log(this.state)
    const { classes, location } = this.props;
    return (
      <div className={classes.root}>
        {location.pathname === '/' ? (
          <Route path='/' exact component={() => <Start state={this.state}/>}/>
        ) : (
          <div>
            <AppBar state={this.state} toggleDrawer={this.toggleDrawer} />
            <div className={classes.appBody}>
              <Route path='/code' exact component={() => <Code state={this.state}/>}/>
              <Route path='/photo' exact component={() => <Photo state={this.state}/>}/>
              <Route path='/video' exact component={() => <Video state={this.state}/>}/>
              <Route path='/drone' exact component={() => <Drone state={this.state}/>}/>
              <Route path='/blog' exact component={() => <Blog state={this.state}/>}/>
              <Route path='/contact' exact component={() => <Contact state={this.state}/>}/>
              <Route path='/dashboard' exact component={() => <Dashboard state={this.state}/>}/>
              <Route path='/secret/register' exact component={() => <Register state={this.state} />}/>
            </div>
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirebase(withRouter(withStyles(styles)(App)));
