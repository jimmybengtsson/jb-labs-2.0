import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Plx from 'react-plx';

import ZoomImg from '../ZoomImg'
import '../../../App.css';
import Typography from '@material-ui/core/es/Typography'
let imgUrl = 'https://firebasestorage.googleapis.com/v0/b/jb-labs-com.appspot.com/o/db%2Fimages%2Fmisc%2FBackground_image1545359989395.jpeg?alt=media'

const textData = [
  {
    start: '220vh',
    end: '510vh',
    properties: [
      {
        startValue: -90,
        endValue: 340,
        unit: 'vw',
        property: 'translateX',
      },
      {
        startValue: 1,
        endValue: 1,
        property: 'opacity',
      },
    ],
  },
];

const textDataTwo = [
  {
    start: '220vh',
    end: '510vh',
    properties: [
      {
        startValue: -210,
        endValue: 220,
        unit: 'vw',
        property: 'translateX',
      },
      {
        startValue: 1,
        endValue: 1,
        property: 'opacity',
      },
    ],
  },
];

const textDataThree = [
  {
    start: '220vh',
    end: '510vh',
    properties: [
      {
        startValue: -330,
        endValue: 100,
        unit: 'vw',
        property: 'translateX',
      },
      {
        startValue: 1,
        endValue: 1,
        property: 'opacity',
      },
    ],
  },
];

const styles = theme => ({
  root: {
    overflowX: 'hidden',
    height: '300vh'
  },
  image: {
    maxWidth: '50%'
  },
  stickyText: {
    top: '30%',
    left: 0,
    maxWidth: '54rem',
    opacity: 0,
    padding: '0 2rem',
    position: 'fixed',
    width: '100%',
    '& img': {
      margin: 'auto',
      maxWidth: '100%',
    }
  },
  photoDiv: {
    padding: theme.spacing.unit*2,
    backgroundColor: '#fff',
    border: '0.5px solid #D8D8D8',
    boxShadow: '2px 2px 2px grey',
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
  }
});

class ImageParallax extends Component {

  constructor (props) {
    super(props)

    this.state = {

    }
  }

  renderImage = (item) => {
    return (
      <div className={this.props.classes.photoDiv}>
        <ZoomImg src={item.original} alt='Image'/>
        <div className={this.props.classes.photoDesc}>
          <Typography variant='headline' className={this.props.classes.photoText}>
            {item.description}
          </Typography>
        </div>
      </div>
    )
  }

  render() {

    console.log(this.props)
    const { classes } = this.props;
    return (
        <div className={classes.root}>
          <Plx
            className={classes.stickyText}
            parallaxData={ textData }
          >
            {this.renderImage(this.props.parallax[0])}
          </Plx>
          <Plx
            className={classes.stickyText}
            parallaxData={ textDataTwo }
          >
            {this.renderImage(this.props.parallax[1])}
          </Plx>
          <Plx
            className={classes.stickyText}
            parallaxData={ textDataThree }
          >
            {this.renderImage(this.props.parallax[2])}
          </Plx>
        </div>
    );
  }
}

ImageParallax.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageParallax);