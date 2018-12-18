import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import '../../App.css';
import GithubRepos from './GihubRepos'
import Knowledge from './Knowledge'
import Education from './Education'


const styles = theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing.unit*5
    },
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
        <Education state={this.props.state}/>
        <Divider />
        <GithubRepos state={this.props.state}/>
        <Divider />
        <Knowledge state={this.props.state}/>
      </div>
    );
  }
}

Code.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Code);