import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import '../../App.css';


const styles = theme => ({
  root: {
  },
});

class Blog extends Component {

  constructor (props) {
    super(props)

    this.state = {

    }
  }

  render() {

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <p>Blog</p>
      </div>
    );
  }
}

Blog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Blog);