import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withFirebase} from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

import '../../App.css';
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'


const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  progress: {
    margin: theme.spacing.unit * 5,
  },
  progressDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  toolTip: {
    fontSize: '70%',
    backgroundColor: 'white',
    color: theme.palette.secondary.dark
  }
});

class Knowledge extends Component {

  constructor (props) {
    super(props)

    this.state = {
      links: null
    }
  }

  renderTitleChip = (title) => {

    return (
      <Chip
        color={'primary'}
        key={title}
        label={title}
        className={this.props.classes.chip}
      />
    )
  }

  openInNewTab = (url) => {
    window.open(url, '_blank');
  }

  getKnowledgeLink = () => {
    this.props.firebase.getLinksPublic('links/code/tag', 'title', 'asc').then((response) => {
      console.log(response)
      let chipObj = {
        languages: [
          this.renderTitleChip('Languages & Environments')
        ],
        framework: [
          this.renderTitleChip('Frameworks & Libraries')
        ],
        tools: [
          this.renderTitleChip('Tools & Services')
        ],
        blockchain: [
          this.renderTitleChip('Blockchain')
        ],
      }

      for (let i = 0; i < response.length; i++) {
        chipObj[response[i].extra].push(
          <Tooltip key={response[i].title} title={response[i].description} aria-label="tool-tip" classes={{tooltip: this.props.classes.toolTip}}>
            <Chip
              color='primary'
              variant="outlined"
              key={response[i].id}
              label={response[i].title}
              className={this.props.classes.chip}
              clickable
              onClick={() => this.openInNewTab(response[i].url)}
            />
          </Tooltip>
        )
      }
      let tempArr = []

      tempArr.push(...chipObj.languages)
      tempArr.push(...chipObj.framework)
      tempArr.push(...chipObj.tools)
      tempArr.push(...chipObj.blockchain)

      this.setState({links: tempArr})
    })
  }

  componentDidMount() {
    if (this.state.links === null) {
      this.getKnowledgeLink()
    }
  }

  render() {

    const { classes } = this.props;
    return (
      <div >
        {this.state.links ? (
          <div className={classes.root}>
            {this.state.links}
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

Knowledge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirebase(withStyles(styles)(Knowledge));