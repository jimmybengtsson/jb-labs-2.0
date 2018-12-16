import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowIcon from '@material-ui/icons/KeyboardArrowDown';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withFirebase} from '../../firebase'

import {LinkEnum} from '../../misc/Enums'
import LinkGallery from './LinkGallery'

import '../../../App.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const styles = theme => ({
  root: {

  },
  title: {
    margin: theme.spacing.unit * 3,
  },
  arrow: {
    marginBottom: -theme.spacing.unit,
  },
  inputMain: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'center'
  },
  inputTop: {

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
  inputBottom: {

  },
  form: {
    margin: theme.spacing.unit,
    color: theme.palette.drawerColor
  },
  button: {
    marginTop: theme.spacing.unit * 2,
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
});

class Links extends Component {

  constructor (props) {
    super(props)

    this.state = {
      buttonValue: LinkEnum[0].display,
      anchorEl: null,
      dbUrl: LinkEnum[0].url,
      title: '',
      description: '',
      url: '',
      extra: '',
      loaded: true,
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClick = (value )=> {
    console.log(value)
    this.setState({ anchorEl: null, buttonValue: value.display, dbUrl: value.url, });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    }, () => {
      console.log(this.state)
    })
  };

  handleUpload = () => {

    this.setState({
      loaded: false
    })

    let dateNow = Date.now()
    let tempObj = {
      url: this.state.url,
      title: this.state.title,
      date: dateNow,
      extra: this.state.extra,
      description: this.state.description,
    }

    this.props.firebase.addLinkToDB(tempObj, this.state.dbUrl).then((imageResponse) => {
      this.setState({
        url: '',
        title: '',
        extra: '',
        description : '',
        loaded: true
      })
    })


  };

  render() {

    const { classes } = this.props;
    return (
      <div className={classes.root}>
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
          {LinkEnum.map((item, index) => {
            return (
              <MenuItem key={index} value={item} onClick={() => this.handleMenuClick(item)}>{item.display}</MenuItem>
            );
          })}
        </Menu>
        {this.state.loaded ? (
          <div className={classes.inputMain}>
            <div className={classes.inputTop}>
              <TextField
                className={classes.form}
                fullWidth
                id='title'
                label='Title'
                required
                variant="outlined"
                onChange={this.handleChange('title')}
                value={this.state.title}
              />
              <TextField
                multiline
                fullWidth
                id='description'
                label='Description'
                required
                onChange={this.handleChange('description')}
                className={classes.form}
                value={this.state.description}
                variant="outlined"
                rows={1}
                rowsMax={4}
              />
            </div>
            <div className={classes.inputTop}>
              <TextField
                className={classes.form}
                fullWidth
                id='url'
                label='URL'
                required
                variant="outlined"
                onChange={this.handleChange('url')}
                value={this.state.url}
              />
              <TextField
                multiline
                fullWidth
                id='extra'
                label='Extra'
                required
                onChange={this.handleChange('extra')}
                className={classes.form}
                value={this.state.extra}
                variant="outlined"
                rows={1}
                rowsMax={4}
              />
            </div>
            <Button type="submit"
                    variant='contained'
                    color="primary"
                    autoFocus
                    className={classes.button}
                    onClick={this.handleUpload}
            >
              Add Link
            </Button>
            <LinkGallery state={this.state}/>
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

Links.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirebase(withStyles(styles)(Links));