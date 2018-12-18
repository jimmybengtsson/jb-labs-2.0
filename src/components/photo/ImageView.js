import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {withFirebase} from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageGallery from 'react-image-gallery';

import '../../App.css';
import "react-image-gallery/styles/css/image-gallery.css";
import Typography from '@material-ui/core/es/Typography'

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

      console.log(response)
      let tempArr = []
      for (let i = 0; i < response.length; i++) {
        if (response[i].publish === true) {

          let tempObj = {
            original: response[i].src,
            thumbnail: response[i].srcTN,
            originalTitle: response[i].title,
            thumbnailLabel: response[i].title,
            description: response[i].description,
            renderItem: this.renderImage.bind(this)
          }
          tempArr.push(tempObj)
        }
      }

      let saveObj = {
        date: Date.now(),
        links: tempArr,
      }

      let saveArr = []
      localStorage.setItem('photoImages', JSON.stringify(saveObj))

      for (let i = 0; i < tempArr.length; i++) {
        tempArr[i].renderItem = this.renderImage.bind(this)

        saveArr.push(tempArr[i])
      }
      this.setState({images: saveArr});

    }).catch((err) => {
      this.setState({
        images: null,
      })
    })
  }

  renderImage = (item) => {
    return (
      <div className={this.props.classes.photoDiv}>
        <img src={item.original} alt='Image'/>
        <div className={this.props.classes.photoDesc}>
          <Typography variant='headline' className={this.props.classes.photoText}>
            {item.description}
          </Typography>
        </div>
      </div>
    )
  }

  checkLocalStorage = () => {
    if (localStorage.getItem('photoImages')) {

      let links = JSON.parse(localStorage.getItem('photoImages'));
      let dateNow = new Date()
      let hourAgo = dateNow.setHours(dateNow.getHours() - 1);

      if (links.date < hourAgo) {
        this.getImageUrls()
      } else {
        let tempArr = []
        for (let i = 0; i < links.links.length; i++) {
          links.links[i].renderItem = this.renderImage.bind(this)

          tempArr.push(links.links[i])
        }
        this.setState({
          images: tempArr,
        }, () => {
          console.log(this.state)
        })
      }
    } else {
      this.getImageUrls()
    }
  }

  componentDidMount() {
    this.checkLocalStorage()
  }

  render() {

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.images ? (
          <div>
            <ImageGallery ref={i => this._imageGallery = i}
                          lazyLoad={false}
                          items={this.state.images}
                          showNav={true}
                          showBullets={false}
                          showPlayButton={false}
                          showIndex={false}
                          showFullscreenButton={false}
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