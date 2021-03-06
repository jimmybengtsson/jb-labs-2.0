import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {withFirebase} from '../../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

import '../../../App.css';
import Typography from '@material-ui/core/es/Typography/Typography'


const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit * 4
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  progressDiv: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 5,
  },
  toolTip: {
    fontSize: '70%',
    backgroundColor: 'white',
    color: theme.palette.secondary.dark
  }
});

class LinkGallery extends Component {

  constructor (props) {
    super(props)

    this.state = {
      links: null,
      deleted: false
    }
  }

  handleDelete = data => () => {
    console.log(data)
    this.setState({deleted: true})
    this.props.firebase.deleteLink(this.props.state.dbUrl, data.id).then(() => {
      this.setState({deleted: false})
    })
  };

  getLinks = (props) => {
    this.props.firebase.getLinks(props.dbUrl).then((response) => {
      this.setState({links: response})
    })
  }

  renderTooltip = (data) => {
    return (
      <div>
        <Typography>Title: {data.title}</Typography>
        <Typography>Description: {data.description}</Typography>
        <Typography>Url: {data.url}</Typography>
        <Typography>Extra: {data.extra}</Typography>
      </div>
    )
  }

  componentWillMount() {
    this.getLinks(this.props.state)
  }

  componentWillUpdate(nextProps, nextState) {

    if (nextState.links === null) {
      console.log('Update')
      this.getLinks(this.props.state)
    }

    if (this.props.state.dbUrl !== nextProps.state.dbUrl) {
      console.log('New image src')
      this.getLinks(nextProps.state)
    }

    if (this.state.deleted === true && nextState.deleted === false) {
      console.log('Image deleted')
      this.getLinks(nextProps.state)
    }

    if (this.props.state.loaded === false && nextProps.state.loaded === true) {
      this.getLinks(nextProps.state)
    }
  }

  render() {

    const { classes } = this.props;
    return (
      <div>
        {this.state.links ? (
          <div>
            {this.state.links.length <= 0 ? (
              <div className={classes.progressDiv}>
                <Typography className={classes.progress} >
                  No links to show..
                </Typography>
              </div>
              ) : (
                <div>
                  {this.state.deleted ? (
                    <div className={classes.progressDiv}>
                      <CircularProgress className={classes.progress} />
                    </div>
                    ) : (
                    <div className={classes.root}>
                      {this.state.links.map(data => {

                        return (
                          <Tooltip key={data.url} title={this.renderTooltip(data)} aria-label="tool-tip" classes={{tooltip: this.props.classes.toolTip}}>
                            <Chip
                              color='primary'
                              variant="outlined"
                              key={data.id}
                              label={data.title}
                              onDelete={this.handleDelete(data)}
                              className={classes.chip}
                              clickable
                              onClick={() => this.props.updateLinkState(data)}
                            />
                          </Tooltip>
                        );
                      })}
                    </div>
                  )}
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

LinkGallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirebase(withStyles(styles)(LinkGallery));