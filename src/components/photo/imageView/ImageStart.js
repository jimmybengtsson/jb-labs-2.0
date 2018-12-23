import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Plx from 'react-plx';

import DownArrow from '../../../static/photo/start/downArrow.svg'
import MLogo from '../../../static/photo/start/M.svg'
import yLogo from '../../../static/photo/start/y.svg'
import ZoomImg from '../ZoomImg'
import '../../../App.css';
import Typography from '@material-ui/core/es/Typography'
let imgUrl = 'https://firebasestorage.googleapis.com/v0/b/jb-labs-com.appspot.com/o/db%2Fimages%2Fmisc%2FBackground_image1545359989395.jpeg?alt=media'

const downArrow = [
  {
    start: '0vh',
    end: '15vh',
    properties: [
      {
        startValue: 1,
        endValue: 0,
        property: 'opacity',
      },
    ],
  },
];

const startImg = [
  {
    start: '15vh',
    end: '30vh',
    easing: [0.25, 0.1, 0.6, 1],
    properties: [
      {
        startValue: 0,
        endValue: 1,
        property: 'opacity',
      },
      {
        startValue: 0,
        endValue: 1,
        property: 'scale',
      },
    ],
  },
  {
    start: '155vh',
    end: '165vh',
    properties: [
      {
        startValue: 0,
        endValue: -10,
        unit: 'vh',
        property: 'translateY',
      },
    ],
  },
  {
    start: '242vh',
    duration: '3vh',
    properties: [
      {
        startValue: 1,
        endValue: 0,
        property: 'opacity',
      },
    ],
  },
];

const insidePhoto = [
  {
    start: '40vh',
    end: '60vh',
    properties: [
      {
        startValue: 0,
        endValue: 1,
        property: 'opacity',
      },
    ],
  },
];

const startTextOne = [
  {
    start: '50vh',
    end: '80vh',
    properties: [
      {
        startValue: 0.8,
        endValue: 1,
        property: 'opacity',
      },
      {
        startValue: 100,
        endValue: 0,
        unit: 'vw',
        property: 'translateX',
      },
    ],
  },
];

const startTextTwo = [
  {
    start: '70vh',
    end: '100vh',
    properties: [
      {
        startValue: 0.8,
        endValue: 1,
        property: 'opacity',
      },
      {
        startValue: -100,
        endValue: 0,
        unit: 'vw',
        property: 'translateX',
      },
    ],
  },
];

const startTextThree = [
  {
    start: '90vh',
    end: '120vh',
    properties: [
      {
        startValue: 0.8,
        endValue: 1,
        property: 'opacity',
      },
      {
        startValue: 100,
        endValue: 0,
        unit: 'vw',
        property: 'translateX',
      },
    ],
  },
];

const textDesc = [
  {
    start: '115vh',
    duration: '20vh',
    properties: [
      {
        startValue: 0.2,
        endValue: 1,
        property: 'opacity',
      },
    ],
  },
  {
    start: '115vh',
    duration: '50vh',
    properties: [
      {
        startValue: 50,
        endValue: 0,
        unit: 'vh',
        property: 'translateY',
      },
    ],
  },
  {
    start: '205vh',
    duration: '3vh',
    properties: [
      {
        startValue: 1,
        endValue: 0,
        property: 'opacity',
      },
    ],
  },
];

const fillDiv = [
  {
    start: '150vh',
    duration: '3vh',
    properties: [
      {
        startValue: 0,
        endValue: 1,
        property: 'opacity',
      },
    ],
  },
  {
    start: '150vh',
    duration: '100vh',
    properties: [
      {
        startValue: 100,
        endValue: -20,
        unit: 'vh',
        property: 'translateY',
      },
    ],
  },
  {
    start: '245vh',
    duration: '3vh',
    properties: [
      {
        startValue: 1,
        endValue: 0,
        property: 'opacity',
      },
    ],
  },
];

const styles = theme => ({
  root: {
    overflowX: 'hidden',
    height: '300vh',
    width: '100%'
  },
  image: {
    maxWidth: '50%'
  },
  stickyStartImg: {
    top: '10%',
    opacity: 0,
    left: 0,
    position: 'fixed',
    padding: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      width: 960,
      margin: 'auto',
      left: 'auto',
    },
    '& img': {
      margin: 'auto',
      width: '100%',
      maxHeight: '70%',
      boxShadow: '2px 2px 2px grey'
    }
  },
  insidePhoto: {
    top: '20%',
    left: '50%',
    opacity: 0,
    padding: theme.spacing.unit * 4,
    position: 'absolute',
    maxWidth: '45%',
    minWidth: '30%',
    maxHeight: '50%',
    backgroundColor: theme.palette.appBarColor,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    boxShadow: '2px 2px 2px grey'
  },
  downArrow: {
    top: '30%',
    left: 'calc(50% - 100px)',
    opacity: 0,
    padding: '0 2rem',
    position: 'fixed',
    width: 200,
    maxHeight: 200,
    '& img': {
      margin: 'auto',
      width: '100%',
      maxHeight: '100%',
      WebkitFilter: 'drop-shadow(2px 2px 2px grey)'
    }
  },
  startTextOne: {
    opacity: 0,
    position: 'relative',
    '& img': {
      margin: 'auto',
      width: '100%',
      maxHeight: '100%'
    }
  },
  text: {
    fontSize: '150%',
    color: 'white',
    fontWeight: '120%',
  },
  textDesc: {
    margin: 'auto',
    width: '100%',
    position: 'fixed',
    top: '37vh',
    opacity: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      top: '55vh'
    },
    [theme.breakpoints.up('md')]: {
      width: 960,
      margin: 'auto',
      top: '60vh'
    },

  },
  textDescDiv: {
    width: '80%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
    [theme.breakpoints.up('sm')]: {
      width: '60%',
    },

  },
  textDescP: {
    lineHeight: '200%',
  },
  photoDiv: {
    padding: theme.spacing.unit*2,
    backgroundColor: '#fff',
    border: '1px solid #D8D8D8'
  },
  photoDesc: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.unit*1.5,
  },
  photoText: {
    fontFamily: 'Permanent Marker, cursive',
    fontSize: '115%'
  },
  fillDiv: {
    top: 0,
    left: 0,
    position: 'fixed',
    width: '100vh',
    height: '100vh',
    backgroundColor: theme.palette.backgroundColor,
    opacity: 0,
  },
});

let ticking = false

class ImageStart extends Component {

  constructor (props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    document.addEventListener('scroll', function(e) {
      let scrollPosition = (window.pageYOffset / window.innerHeight) * 100;

      if (!ticking) {
        window.requestAnimationFrame(function () {
          console.log(scrollPosition);
          ticking = false;
        });

        ticking = true;
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => {
      console.log('Scroll event listener removed')
    })
  }

  render() {

    console.log(this.props)
    const { classes } = this.props;
    return (
        <div className={classes.root}>
          <Plx
            className={classes.downArrow}
            parallaxData={ downArrow }
          >
            <img src={DownArrow} />
          </Plx>
          <Plx
            className={classes.stickyStartImg}
            parallaxData={ startImg }
          >
            <img src={imgUrl}/>
            <Plx
              className={classes.insidePhoto}
              parallaxData={ insidePhoto }
            >
              <div>
                <Plx
                  className={classes.startTextOne}
                  parallaxData={ startTextOne }
                >
                  <Typography variant='headline' className={classes.text}>
                    My
                  </Typography>
                </Plx>
                <Plx
                  className={classes.startTextOne}
                  parallaxData={ startTextTwo }
                >
                  <Typography variant='headline' className={classes.text}>
                    Photo
                  </Typography>
                </Plx>
                <Plx
                  className={classes.startTextOne}
                  parallaxData={ startTextThree }
                >
                  <Typography variant='headline' className={classes.text}>
                    Collection
                  </Typography>
                </Plx>
              </div>
            </Plx>
          </Plx>
          <Plx
            className={classes.textDesc}
            parallaxData={ textDesc }
            animateWhenNotInViewport
          >
            <div className={classes.textDescDiv}>
              <Typography variant='headline' className={classes.textDescP}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </div>
          </Plx>
          <Plx
            className={classes.fillDiv}
            parallaxData={ fillDiv }
            animateWhenNotInViewport
          />
        </div>

    );
  }
}

ImageStart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageStart);