import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {withFirebase} from '../../firebase'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import CircularProgress from '@material-ui/core/CircularProgress';
import CopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Fab from '@material-ui/core/Fab';
import Switch from '@material-ui/core/Switch';

import '../../../App.css';
import FormControlLabel from '@material-ui/core/FormControlLabel'


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.backgroundColor,
    alignItems: 'center',
  },
  gridList: {
    width: '100%',
    height: '60%',

  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
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
  fab: {
    margin: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 3
  },
  imageButtons: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageTile: {

    maxWidth: '100%'
  },
  image: {
    maxWidth: '100%'
  }
});

class Gallery extends Component {

  constructor (props) {
    super(props)

    this.state = {
      images: null,
      deleted: false,
      copied: false,
      width: 0,
      height: 0
    }
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  getImageUrls = (props) => {
    this.props.firebase.getImageUrls(props.dbUrl).then((response) => {

      let tempArr = [];
      if(response) {
        for (let i = 0; i < response.length; i++) {

          tempArr.push(
            <GridListTile key={response[i].id} className={this.props.classes.imageTile}>
              <img src={response[i].srcTN} className={this.props.classes.image} alt='Image'/>
              <GridListTileBar
                title={response[i].title}
                subtitle={<span>{response[i].description}</span>}
                actionIcon={
                  <div className={this.props.classes.imageButtons}>
                    <FormControlLabel className={this.props.classes.form}
                                      control={
                                        <Switch
                                          checked={response[i].publish}
                                          onChange={this.handleSwitchChange(response[i])}
                                          value="Publish"
                                          color="primary"
                                        />
                                      }
                                      label="Publish"
                    />
                    <CopyToClipboard text={response[i].src}
                                     onCopy={() => this.setState({copied: true}, () => {
                                       setTimeout(() => {
                                         this.setState({copied: false})
                                       }, 2000)
                                     })}>
                      {this.state.copied ? (
                        <Fab disabled size="small" aria-label="Copy" className={this.props.classes.fab}>
                          <CopyIcon />
                        </Fab>
                      ) : (
                        <Fab size="small" aria-label="Copy" className={this.props.classes.fab}>
                          <CopyIcon />
                        </Fab>
                      )}
                    </CopyToClipboard>
                    {this.state.deleted ? (
                      <Fab disabled size="small" aria-label="Delete" className={this.props.classes.fab}>
                        <DeleteIcon />
                      </Fab>
                    ) : (
                      <Fab
                           aria-label="Delete"
                           className={this.props.classes.fab}
                           onClick={() => this.deleteImage(response[i])}
                           size="small"
                      >
                        <DeleteIcon />
                      </Fab>
                    )}
                  </div>
                }
              />
            </GridListTile>
          )
        }
      }
      this.setState({images: tempArr});
    })
  }

  deleteImage = (image) => {

    this.props.firebase.deleteImageFromStorage(image, this.props.state.dbUrl).then(() => {
      this.setState({deleted: true}, () => {
        setTimeout(() => {
          this.setState({deleted: false})
        }, 2000)
      })
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  handleSwitchChange = name => event => {
    let tempObj = {

      src: name.src,
      srcTN: name.srcTN,
      date: name.date,
      title: name.title,
      description: name.description,
      publish : event.target.checked
    }
    this.props.firebase.updateImageUrlToDB(tempObj, this.props.state.dbUrl, name.id).then((response) => {
      this.setState({images: null})
    })
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentWillMount() {
    this.getImageUrls(this.props.state)
  }

  componentWillUpdate(nextProps, nextState) {

    if (nextState.images === null) {
      console.log('Update')
      this.getImageUrls(this.props.state)
    }

    if (this.props.state.dbUrl !== nextProps.state.dbUrl) {
      console.log('New image src')
      this.getImageUrls(nextProps.state)
    }

    if (this.state.deleted === true && nextState.deleted === false) {
      console.log('Image deleted')
      this.getImageUrls(nextProps.state)
    }

    if (this.props.state.loaded === false && nextProps.state.loaded === true) {
      this.getImageUrls(nextProps.state)
    }
  }

  render() {
    const { classes } = this.props;
    let columns;

    if (this.state.width < 400) {
      columns = 1
    } else if (this.state.width > 700) {
      columns = 3
    } else {
      columns = 2
    }

    return (
      <div>
        {this.state.images ? (
          <div className={classes.root}>
            <GridList cols={columns} className={classes.gridList}>
              <GridListTile key="Subheader" cols={columns} style={{ height: 'auto' }}>
                <ListSubheader component="div">Photos</ListSubheader>
              </GridListTile>
              {this.state.images}
            </GridList>
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

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirebase(withStyles(styles)(Gallery));