import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from "react-slick";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/es/Typography/Typography'
import moment from 'moment'

import GithubReadMe from './GithubReadMe'
import {getLatestRepos} from '../misc/ApiRequests'
import '../../App.css';

const slickSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
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
  titleDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  header: {

  },
  subHeader: {

  },
  slider: {
    maxWidth: '100%',
    marginBottom: theme.spacing.unit * 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRepos: {
    alignSelf: 'center',
    color: theme.palette.textColor
  },
  card: {
    height: 160,
    display: 'flex !important',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.paperColor
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
  cardTitle: {
    width: '100%'
  },
  description: {
    maxHeight: '40%',
    overflow: 'hidden'
  },
  dialog: {
    WebkitOverflowScrolling: 'touch'
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class GithubRepos extends Component {

  constructor (props) {
    super(props)

    this.state = {
      dialog: false,
      loaded: false,
      repos: null,
    }
  }

  handleDialogOpen = (item) => {

    this.setState({ clickedRepo: item }, () => {
      this.setState({ dialog: true });
    });
  };

  handleDialogClose = () => {
    this.setState({ dialog: false,});
  };

  renderPapers = (classes) => {

    if (this.state.repos === null) {
      return <Typography className={classes.noRepos}>No repos available...</Typography>

    } else {
      if (this.state.repos.length <= 0) {
        return <Typography className={classes.noRepos}>No repos available...</Typography>

      } else {
        return (
          <Slider {...slickSettings} className={classes.slider}>
            {this.state.repos.map((item, index) => {
              return (
                <Paper className={classes.card} key={item.id}>
                  <div className={classes.cardTitle}>
                    <Typography noWrap className={classes.title} color='primary' gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography className={classes.pos} >
                      {'Updated ' + moment(item.pushed_at).fromNow()}
                    </Typography>
                    <Divider/>
                  </div>
                  <Typography className={classes.description} component="p">
                    {item.description}
                  </Typography>
                  <Button className={classes.button}
                          size="small"
                          variant='contained'
                          color='primary'
                  onClick={() => this.handleDialogOpen(item)}>See README</Button>
                </Paper>
              )
            })}
          </Slider>
        )
      }
    }
  }

  componentDidMount() {

    if (localStorage.getItem('githubRepos')) {

      let repos = JSON.parse(localStorage.getItem('githubRepos'));
      let dateNow = new Date()
      let hourAgo = dateNow.setHours(dateNow.getHours() - 1);

      if (repos.date < hourAgo) {
        getLatestRepos().then((response) => {
          let tempObj = {
            date: Date.now(),
            repos: response.data,
          }
          localStorage.setItem('githubRepos', JSON.stringify(tempObj))
          this.setState({
            loaded: true,
            repos: response.data,
          })
        }).catch((err) => {
          this.setState({
            loaded: true,
            repos: null,
          })
        })
      } else {
        this.setState({
          loaded: true,
          repos: repos.repos,
        })
      }
    } else {
      getLatestRepos().then((response) => {
        let tempObj = {
          date: Date.now(),
          repos: response.data,
        }
        localStorage.setItem('githubRepos', JSON.stringify(tempObj))
        this.setState({
          loaded: true,
          repos: response.data,
        })
      }).catch((err) => {
        this.setState({
          loaded: true,
          repos: null,
        })
      })
    }
  }

  render() {

    console.log(this.state)
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.loaded ? (
          <div className={classes.body}>
            <div className={classes.titleDiv}>
              <Typography variant='headline' color='primary' className={classes.header}>
                Public Github Repos
              </Typography>
              <Typography variant='subheading' color='secondary' className={classes.subHeader}>
                Click on each repo to see their README.md
              </Typography>
            </div>
            <div className={classes.gridDiv}>
              {this.renderPapers(classes)}
            </div>
            <Dialog
              className={classes.dialog}
              open={this.state.dialog}
              TransitionComponent={Transition}
              onClose={this.handleDialogClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <GithubReadMe state={this.state} handleDialogClose={this.handleDialogClose}/>
            </Dialog>
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

GithubRepos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GithubRepos);