import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {withFirebase} from '../firebase'
import Slider from "react-slick";
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

import '../../App.css';
import Tooltip from '@material-ui/core/Tooltip'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/es/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Markdown from '../misc/Markdown'

import RenderTooltip from './RenderTooltip'

import EducationLogo from '../../static/code/education.svg'
import TouchIcon from '@material-ui/icons/TouchApp';
import LaunchIcon from '@material-ui/core/SvgIcon/SvgIcon'
import {getLatestRepos} from '../misc/ApiRequests'

const slickSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 2,
  initialSlide: 0,
  autoplay: true,
  speed: 800,
  autoplaySpeed: 5000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 600,
      settings: {
        mobileFirst: true,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
      }
    },
    {
      breakpoint: 350,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        dots: false,
        mobileFirst: true,
        arrows: false,
      }
    },
  ]
};

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit*2,
  },
  toolTip: {
    fontSize: '70%',
    backgroundColor: 'white',
    color: theme.palette.secondary.dark
  },
  progress: {
    margin: theme.spacing.unit * 5,
  },
  progressDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  gridDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      width: '85%',
    },
  },
  slider: {
    width: '100%',
    marginBottom: theme.spacing.unit * 5,
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      maxWidth: '78%'
    },
  },
  card: {
    height: 160,
    display: 'flex !important',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: theme.spacing.unit,
    backgroundColor: 'white',
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  cardTitle: {
    width: '100%'
  },
  title: {
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    bottom: 0
  },
  description: {
    maxHeight: '50%',
    overflow: 'hidden',
    marginBottom: theme.spacing.unit*2
  },
  titleDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      width: '20%',
      alignItems: 'flex-start',
    },
  },
  titleDivInner: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
    },
  },
  titleIcon: {
    width: '20%',
    [theme.breakpoints.up('sm')]: {
      width: '14%',
    },
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
  },
  header: {

  },
  subHeader: {

  },
  click: {
    alignSelf: 'flex-end'
  }
});

class Education extends Component {

  constructor (props) {
    super(props)

    this.state = {
      links: null
    }
  }

  renderTooltip = (data) => {
    return (
      <RenderTooltip itemData={data}/>
    )
  }

  getEducationLink = () => {

    if (localStorage.getItem('educationLinks')) {

      let links = JSON.parse(localStorage.getItem('educationLinks'));
      let dateNow = new Date()
      let hourAgo = dateNow.setHours(dateNow.getHours() - 1);

      if (links.date < hourAgo) {
        this.props.firebase.getLinksPublic('links/code/education', 'date', 'asc').then((response) => {
          let tempObj = {
            date: Date.now(),
            links: response,
          }
          localStorage.setItem('educationLinks', JSON.stringify(tempObj))

          this.setState({links: response})
        }).catch((err) => {
          this.setState({
            links: null,
          })
        })
      } else {
        this.setState({
          links: links.links,
        })
      }
    } else {
      this.props.firebase.getLinksPublic('links/code/education', 'date', 'asc').then((response) => {
        let tempObj = {
          date: Date.now(),
          links: response,
        }
        localStorage.setItem('educationLinks', JSON.stringify(tempObj))

        this.setState({links: response})
      }).catch((err) => {
        this.setState({
          links: null,
        })
      })
    }
  }

  renderPapers = (classes) => {

    if (this.state.links === null) {
      return <Typography className={classes.noRepos}>No education available...</Typography>

    } else {
      if (this.state.links.length <= 0) {
        return <Typography className={classes.noRepos}>No education available...</Typography>

      } else {
        return (
          <Slider {...slickSettings} className={classes.slider}>
            {this.state.links.map((item, index) => {
              return (
                <Tooltip interactive key={item.id} title={this.renderTooltip(item)} aria-label="tool-tip" placement="top" classes={{tooltip: this.props.classes.toolTip}}>
                  <Paper className={classes.card} key={item.title}>
                    <div className={classes.cardTitle}>
                      <Typography className={classes.title} color='primary' variant='title' gutterBottom>
                        {item.title}
                      </Typography>
                      <Divider/>
                    </div>
                    <Typography className={classes.description} variant='subheading'>
                      {item.description}
                    </Typography>
                    <TouchIcon className={classes.click} color='primary'/>
                  </Paper>
                </Tooltip>
              )
            })}
          </Slider>
        )
      }
    }
  }

  componentDidMount() {
    if (this.state.links === null) {
      this.getEducationLink()
    }
  }

  componentWillUpdate(nextProps, nextState) {

    if (nextState.links === null) {
      console.log('Update')
      this.getEducationLink()
    }
  }

  render() {

    const { classes } = this.props;
    return (
      <div >
        {this.state.links ? (
          <div className={classes.body}>
            <div className={classes.titleDiv}>
              <img src={EducationLogo} className={classes.titleIcon}/>
              <div className={classes.titleDivInner}>
                <Typography variant='headline' color='primary' className={classes.header}>
                  Education
                </Typography>
                <Typography variant='subheading' color='secondary' className={classes.subHeader}>
                  Courses in computer science that I've been taken
                </Typography>
              </div>
            </div>
            <div className={classes.gridDiv}>
              {this.renderPapers(classes)}
             </div>
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

Education.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirebase(withStyles(styles)(Education));