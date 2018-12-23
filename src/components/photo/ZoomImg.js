import React from 'react';
import posed from 'react-pose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {withSnackbar} from 'notistack'
import {withFirebase} from '../firebase'
import {withRouter} from 'react-router-dom'

const FrameDiv = posed.div({
  init: {
    applyAtEnd: { display: 'none' },
    opacity: 0
  },
  zoom: {
    applyAtStart: { display: 'block' },
    opacity: 1
  }
});

const transition = {
  duration: 400,
  ease: [0.08, 0.69, 0.2, 0.99]
};

const Image = posed.img({
  init: {
    position: 'static',
    width: 'auto',
    height: 'auto',
    transition,
    flip: true
  },
  zoom: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition,
    flip: true
  }
});

const styles = theme => ({

  frame: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'none',
    background: 'white',
    transform: 'translateZ(0)'
  },
  image: {
    cursor: 'zoom-in',
    display: 'block',
    maxWidth: '80%',
    margin: 'auto',
    maxHeight: '50%'
  }
});

class ZoomImg extends React.Component {
  state = { isZoomed: false };

  zoomIn() {
    window.addEventListener('scroll', this.zoomOut);
    this.setState({ isZoomed: true });
  }

  zoomOut = () => {
    window.removeEventListener('scroll', this.zoomOut);
    this.setState({ isZoomed: false });
  };

  toggleZoom = () => (this.state.isZoomed ? this.zoomOut() : this.zoomIn());

  render() {
    const { isZoomed } = this.state;
    const { classes, imageWidth, imageHeight, ...props } = this.props;
    const pose = isZoomed ? 'zoom' : 'init';

    return (
      <div
        style={{ width: imageWidth, height: imageHeight }}
        onClick={this.toggleZoom}
      >
        <FrameDiv pose={pose} className={classes.frame} />
        <Image pose={pose} {...props} />
      </div>
    );
  }
}

ZoomImg.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ZoomImg);