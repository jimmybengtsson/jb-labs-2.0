import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {withFirebase} from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageGallery from 'react-image-gallery';

import '../../App.css';
import "react-image-gallery/styles/css/image-gallery.css";
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/es/Typography'
import moment from 'moment'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

const slickSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  initialSlide: 0,

};

const styles = theme => ({
  root: {

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
  }
});

class ImageView extends Component {

  constructor (props) {
    super(props)

    this.state = {
      images: null,
    }
  }

  getImageUrls = () => {
    this.props.firebase.getImageUrls('db/images/photography').then((response) => {

      let tempArr = [

      ]
      for (let i = 0; i < response.length; i++) {
        if (response[i].publish === true) {

          let tempObj = {
            original: response[i].src,
            thumbnail: response[i].srcTN,
            originalTitle: response[i].title,
            thumbnailLabel: response[i].title,
            description: response[i].description,
          }
          tempArr.push(tempObj)
        }
      }
      this.setState({images: tempArr});
    })
  }

  componentDidMount() {
    if (this.state.images === null) {
      this.getImageUrls()
    }

  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.state.images !== nextState.images) {
      this.getImageUrls()
    }
  }

  render() {

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.images ? (
          <div>
            <ImageGallery ref={i => this._imageGallery = i}
                          lazyLoad={true}
                          items={this.state.images}
                          showNav={true}
                          showBullets
                          showPlayButton={false}
                          showIndex
                          infinite

            />
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

ImageView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirebase(withStyles(styles)(ImageView));