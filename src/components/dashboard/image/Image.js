import React, { Component } from 'react';
import { BrowserRouter as Router, } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import ArrowIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withFirebase} from '../../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';

import Gallery from './Gallery'
import { imageMenu } from '../../misc/Enums'
import '../../../App.css';
import {scale, thumbnail} from '../../misc/ImageProcessing'


const styles = theme => ({
  root: {
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
  menuDiv: {
    alignSelf: 'flex-start',
    marginLeft: theme.spacing.unit * 3,
  },
  arrow: {
    marginBottom: -theme.spacing.unit * 1.8,
    fontSize: '200%'
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
  imageUpload: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%',
  },
  upload: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
    maxWidth: '30%'
  },
  formDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  inputDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      width: '70%',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
  },
  inputButtonDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  button: {
    marginTop: theme.spacing.unit * 2,
  },
  imageMain: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  form: {
    margin: theme.spacing.unit,
    color: theme.palette.drawerColor
  },
  input: {
    display: 'none',
  },
});

class Image extends Component {

  constructor (props) {
    super(props)

    this.state = {
      loaded: true,
      image: "",
      isUploading: false,
      progress: 0,
      src: "",
      imageUrls: false,
      deleted: false,
      buttonValue: imageMenu[0].display,
      dbUrl: imageMenu[0].url,
      anchorEl: null,
      imageType: 'image',
      imageTitle: '',
      imageDescription: '',
      imagePublish: false,

    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClick = (value )=> {
    console.log(value)
    this.setState({ anchorEl: null, buttonValue: value.display, dbUrl: value.url, });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    }, () => {
      console.log(this.state)
    })
  };

  handleSwitchChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleUploadStart = () => {
    this.setState({ loaded: false, progress: 0 }, () => {
      if (this.state.image) {

        let fileName = this.state.imageTitle.split(' ').join('_') + Date.now()
        let tnFile = fileName + '_tn'

        scale(this.state.image).then((scaledImage) => {
          this.props.firebase.handleImageUpload(fileName + '.jpeg', this.state.dbUrl, scaledImage).then((response) => {
            thumbnail(scaledImage).then((tnImage) => {
              this.props.firebase.handleImageUpload(tnFile + '.jpeg', this.state.dbUrl, tnImage).then((tnResponse) => {
                let tempObj = {
                  url: response,
                  tnUrl: tnResponse,
                }

                this.handleUploadSuccess(tempObj)
              })
            })
          })
        })

      } else {
        this.handleUploadError('No image selected!')
      }
    });
  }

  handleUploadError = error => {
    this.setState({ loaded: true });
    console.error(error);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleUploadStart()
  }

  handleChangeImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        image: URL.createObjectURL(event.target.files[0])
      });
    }
  };

  handleUploadSuccess = filename => {

      let dateNow = Date.now()
      let tempObj = {
        src: filename.url,
        srcTN: filename.tnUrl,
        date: dateNow,
        title: this.state.imageTitle,
        description: this.state.imageDescription,
        publish : this.state.imagePublish
      }

      this.props.firebase.addImageUrlToDB(tempObj, this.state.dbUrl).then((imageResponse) => {
        this.setState({
          src: filename.url,
          imageTitle: '',
          imageDescription: '',
          publish : '',
          loaded: true
        })
      })


  };

  render() {

    console.log(this.state)
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.loaded ? (
          <div className={classes.imageMain}>
            <div className={classes.menuDiv}>
              <Typography className={classes.title}
                          variant="title"
                          color="primary"
                          aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                          aria-haspopup="true"
                          onClick={this.handleClick}
              >
                {this.state.buttonValue}
                <ArrowIcon className={classes.arrow}/>
              </Typography>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                {imageMenu.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item} onClick={() => this.handleMenuClick(item)}>{item.display}</MenuItem>
                  );
                })}
              </Menu>
            </div>
            <div className={classes.imageUpload}>
              <Typography className={classes.title}
                          variant="title"
                          color="secondary"
              >
                Pick image to upload:
              </Typography>
              <form className={classes.formDiv} onSubmit={this.handleSubmit}>
                <div className={classes.inputDiv}>
                  <TextField
                    className={classes.form}
                    fullWidth
                    id='title'
                    label='Title'
                    required
                    variant="outlined"
                    onChange={this.handleChange('imageTitle')}
                    value={this.state.imageTitle}
                    helperText="To be shown as image title"
                  />
                  <TextField
                    multiline
                    fullWidth
                    id='description'
                    label='Description'
                    required
                    onChange={this.handleChange('imageDescription')}
                    className={classes.form}
                    value={this.state.imageDescription}
                    helperText="To be shown as image description"
                    variant="outlined"
                    rows={1}
                    rowsMax={4}
                  />
                </div>
                <div className={classes.inputDiv}>
                  <div className={classes.inputButtonDiv} >
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={this.handleChangeImage}
                    />
                    <label htmlFor="contained-button-file">
                      <Button color="primary" component="span" className={classes.button}>
                        Pick image
                      </Button>
                    </label>
                    <FormControlLabel className={classes.form}
                      control={
                        <Switch
                          checked={this.state.imagePublish}
                          onChange={this.handleSwitchChange('imagePublish')}
                          value="Publish"
                          color="primary"
                        />
                      }
                      label="Publish"
                    />
                  </div>
                  <Button type="submit"
                          variant='contained'
                          color="primary"
                          autoFocus
                          className={classes.button}
                  >
                    Upload Image
                  </Button>
                </div>
              </form>
            </div>
            <Divider />
            <Gallery state={this.state}/>
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

Image.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirebase(withStyles(styles)(Image));