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
import RenderTooltip from './RenderTooltip'

import KnowledgeLogo from '../../static/code/skills.svg'
import Typography from '@material-ui/core/es/Typography'

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
  },
  titleDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  titleDivInner: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  titleIcon: {
    width: '17%',
    [theme.breakpoints.up('sm')]: {
      width: '12%',
    },
    [theme.breakpoints.up('md')]: {
      width: '10%',
    },
  },
  header: {

  },
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

  /*openInNewTab = (url) => {
    window.open(url, '_blank');
  }*/

  renderTooltip = (data) => {
    return (
      <RenderTooltip itemData={data}/>
    )
  }

  renderChips = (response) => {
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
      chipObj[response[i].description].push(
        <Tooltip interactive key={response[i].title} title={this.renderTooltip(response[i])} aria-label="tool-tip" classes={{tooltip: this.props.classes.toolTip}}>
          <Chip
            color='primary'
            variant="outlined"
            key={response[i].id}
            label={response[i].title}
            className={this.props.classes.chip}
            clickable
          />
        </Tooltip>
      )
    }
    let tempArr = []

    tempArr.push(...chipObj.languages)
    tempArr.push(...chipObj.framework)
    tempArr.push(...chipObj.tools)
    tempArr.push(...chipObj.blockchain)
    return tempArr;
  }

  getKnowledgeLink = () => {
    if (localStorage.getItem('knowledgeLinks')) {

      let links = JSON.parse(localStorage.getItem('knowledgeLinks'));
      let dateNow = new Date()
      let hourAgo = dateNow.setHours(dateNow.getHours() - 1);

      if (links.date < hourAgo) {
        this.props.firebase.getLinksPublic('links/code/tag', 'title', 'asc').then((response) => {

          let tempObj = {
            date: Date.now(),
            links: response,
          }
          localStorage.setItem('knowledgeLinks', JSON.stringify(tempObj))

          let tempArr = this.renderChips(response)

          this.setState({links: tempArr})
        }).catch((err) => {
          this.setState({
            links: null,
          })
        })
      } else {

        let tempArr = this.renderChips(links.links)
        this.setState({
          links: tempArr,
        })
      }
    } else {
      this.props.firebase.getLinksPublic('links/code/tag', 'title', 'asc').then((response) => {

        let tempObj = {
          date: Date.now(),
          links: response,
        }
        localStorage.setItem('knowledgeLinks', JSON.stringify(tempObj))

        let tempArr = this.renderChips(response)

        this.setState({links: tempArr})
      }).catch((err) => {
        this.setState({
          links: null,
        })
      })
    }
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
            <div className={classes.titleDiv}>
              <img src={KnowledgeLogo} className={classes.titleIcon}/>
              <div className={classes.titleDivInner}>
                <Typography variant='headline' color='primary' className={classes.header}>
                  Knowledge
                </Typography>
              </div>
            </div>
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