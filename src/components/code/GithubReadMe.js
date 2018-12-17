import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Markdown from '../misc/Markdown'

import '../../App.css';
import {getGithubReadme} from '../misc/ApiRequests'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'


const styles = theme => ({
  root: {
  },
  progress: {
    margin: theme.spacing.unit * 5,
  },
  progressDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
  },
  markdown: {
    padding: theme.spacing.unit,
    '& img': {
      maxWidth: '90%'
    }
  }
});

class GithubReadMe extends Component {

  constructor (props) {
    super(props)

    this.state = {
      markdown: null,
      loaded: false,
    }
  }

  componentDidMount() {
    if (this.props.state.clickedRepo) {
      getGithubReadme(this.props.state.clickedRepo).then((response) => {
        console.log(response)
        this.setState({
          markdown: response.data,
          loaded: true
        })
      }).catch((err) => {
        this.setState({
          markdown: null,
          loaded: true
        })
      })
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.state.clickedRepo !== this.props.state.clickedRepo) {
      if (nextProps.state.clickedRepo) {
        getGithubReadme(nextProps.state.clickedRepo).then((response) => {
          console.log(response)
          this.setState({
            markdown: response.data,
            loaded: true
          })
        }).catch((err) => {
          this.setState({
            markdown: null,
            loaded: true
          })
        })
      }
    }
  }

  render() {

    console.log(this.state)
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.loaded ? (
          <div>
            {!this.state.markdown ? (
              <DialogTitle color='inherit' id="alert-dialog-slide-title">
                {'No Readme found for this repo'}
              </DialogTitle>
            ) : (
              <div className={classes.dialog}>
                <DialogTitle color='inherit' id="alert-dialog-slide-title">
                  {'README.md from ' + this.props.state.clickedRepo.name}
                </DialogTitle>
                <DialogContent>
                  <Markdown sidebar='false' className={classes.markdown}>
                    {this.state.markdown}
                  </Markdown>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.props.handleDialogClose} target="_blank" href={this.props.state.clickedRepo.html_url} color="inherit">
                    Go to repo
                  </Button>
                  <Button onClick={this.props.handleDialogClose} color="inherit">
                    Close
                  </Button>
                </DialogActions>
              </div>
            )}
          </div>
        ) : (
          <div className={classes.progressDiv}>
            <CircularProgress className={classes.progress} />
          </div>
        )}
      </div>
    );
  }
}

GithubReadMe.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GithubReadMe);