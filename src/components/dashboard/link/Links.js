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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';

import {LinkEnum, codeKnowledge} from '../../misc/Enums'
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
    color: theme.palette.drawerColor,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '48%',
    },
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
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
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '48%',
    },
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
      knowledge: false,
      update: false
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

  handleSelectChange = event => {
    this.setState({
      extra: event.target.value
    });
  };

  cancelInput = () => {
    this.setState({
      extra: '',
      title: '',
      description: '',
      url: '',
    });
  }

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

  handleUpdate = () => {

    this.setState({
      loaded: false
    })

    let tempObj = {
      url: this.state.url,
      title: this.state.title,
      date: this.state.date,
      extra: this.state.extra,
      description: this.state.description,
    }

    this.props.firebase.updateLinkToDB(tempObj, this.state.dbUrl, this.state.id).then((imageResponse) => {
      this.setState({
        url: '',
        title: '',
        extra: '',
        description : '',
        loaded: true,
        update: false
      })
    })
  };

  updateLinkState = (data) => {
    this.setState({
      url: data.url,
      title: data.title,
      extra: data.extra,
      description : data.description,
      date: data.date,
      id: data.id,
      update: true
    })
  }

  componentDidMount() {
    if (this.state.dbUrl === 'links/code/tag' && this.state.knowledge === false) {
      this.setState({knowledge: true})
    }
    if (this.state.dbUrl !== 'links/code/tag' && this.state.knowledge === true) {
      this.setState({knowledge: false})
    }
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextState.dbUrl === 'links/code/tag' && this.state.knowledge === false) {
      this.setState({knowledge: true})
    }
    if (nextState.dbUrl !== 'links/code/tag' && this.state.knowledge === true) {
      this.setState({knowledge: false})
    }
  }

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
              {this.state.knowledge ? (
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-simple">Category</InputLabel>
                  <Select
                    variant="outlined"
                    value={this.state.extra}
                    onChange={this.handleSelectChange}
                    inputProps={{
                      name: 'category',
                      id: 'category-form',
                    }}
                  >
                    <MenuItem value="" disabled>
                      <em>Select category</em>
                    </MenuItem>
                    {codeKnowledge.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.name} >{item.display}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                ) : (
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
              )}
            </div>
            <div>
              <Button type="submit"
                      variant='contained'
                      color="primary"
                      autoFocus
                      className={classes.button}
                      onClick={this.cancelInput}
              >
                Cancel
              </Button>
              {this.state.update ? (
                <Button type="submit"
                        variant='contained'
                        color="primary"
                        autoFocus
                        className={classes.button}
                        onClick={this.handleUpdate}
                >
                  Update Link
                </Button>
                ) : (
                <Button type="submit"
                        variant='contained'
                        color="primary"
                        autoFocus
                        className={classes.button}
                        onClick={this.handleUpload}
                >
                  Add Link
                </Button>
              )}
            </div>
            <Divider />
            <LinkGallery state={this.state} updateLinkState={this.updateLinkState}/>
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