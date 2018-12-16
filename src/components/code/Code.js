import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import '../../App.css';
import GithubRepos from './GihubRepos'


const styles = theme => ({
  root: {
  },
});

class Code extends Component {

  constructor (props) {
    super(props)

    this.state = {

    }
  }

  render() {

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GithubRepos state={this.props.state}/>
        <Divider />
      </div>
    );
  }
}

Code.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Code);