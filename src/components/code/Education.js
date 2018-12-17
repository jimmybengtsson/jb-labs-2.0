import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {withFirebase} from '../firebase'
import Slider from "react-slick";

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

const slickSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  autoplay: true,
  speed: 4000,
  autoplaySpeed: 3000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0
      }
    },
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
    maxWidth: '100%',
    marginBottom: theme.spacing.unit * 5,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    bottom: 0
  },
  description: {
    maxHeight: '40%',
    overflow: 'hidden'
  },
  titleDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  header: {

  },
  subHeader: {

  },
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
      <Markdown sidebar='false'>
        {data.extra}
      </Markdown>
    )
  }

  getEducationLink = () => {
    this.props.firebase.getLinksPublic('links/code/education', 'date', 'asc').then((response) => {
      console.log(response)

      this.setState({links: response})
    })
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
                      <Typography className={classes.title} color='primary' gutterBottom>
                        {item.title}
                      </Typography>
                      <Divider/>
                    </div>
                    <Typography className={classes.description} component="p">
                      {item.description}
                    </Typography>
                    <Button className={classes.button}
                            size="small"
                            variant='outlined'
                            color='primary'
                            target="_blank"
                            href={item.url}
                    >Go to page</Button>
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
              <Typography variant='headline' color='primary' className={classes.header}>
                Education
              </Typography>
              <Typography variant='subheading' color='secondary' className={classes.subHeader}>
                Courses in computer science that I've been taken
              </Typography>
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