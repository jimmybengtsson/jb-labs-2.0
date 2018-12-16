import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import {withFirebase} from '../firebase'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  progress: {
    margin: theme.spacing.unit * 5,
  },
  progressDiv: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const initState = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  secret: '',
  loading: false,
};

class Register extends Component {
  constructor (props) {
    super(props)

    this.state = {...initState}
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  handleSubmit = () => {
    this.setState({loading: true})

    this.props.firebase
      .doCreateUserWithEmailAndPassword(this.state.email, this.state.passwordOne)
      .then((response) => {
        console.log(response)
        //localStorage.setItem('token', JSON.stringify(response.data.token))
        //this.props.userLogin(response.data.token)
        this.setState({navigate: true})
        console.log(this.state.email + ' är nu registrerad!')
      }).catch((err) => {
      console.log(err)

      console.log(err.message)
    })
  }

  render() {

    const { classes } = this.props;
    const {
      navigate,
      email,
      passwordOne,
      passwordTwo,
      secret,

    } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      secret !== process.env.REACT_APP_REGISTER_SECRET;

    if (navigate) {
      return <Redirect to='/dashboard' push />
    }

    /*if (this.props.state.isSignedIn === true) {
      return <Redirect to='/dashboard' />
    }*/

    return (
      <div>
        {this.state.loading ? (
          <div className={classes.progressDiv}>
            <CircularProgress className={classes.progress} />
          </div>
        ) : (
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h5">
                Registrera
              </Typography>
              <TextField
                className={classes.form}
                id='email'
                label='Email'
                required
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin='normal'
                type='email'
              />
              <TextField
                id='passwordOne'
                label='Lösenord'
                required
                type='password'
                onChange={this.handleChange('passwordOne')}
                margin='normal'
                className={classes.form}
              />
              <TextField
                id='passwordTwo'
                label='Upprepa lösenord'
                required
                type='password'
                onChange={this.handleChange('passwordTwo')}
                margin='normal'
                className={classes.form}
              />
              <TextField
                id='secret'
                label='Hemlighet'
                required
                type='password'
                onChange={this.handleChange('secret')}
                margin='normal'
                className={classes.form}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmit}
                disabled={isInvalid}
              >
                Registrera
              </Button>
            </Paper>
          </main>
        )}
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirebase(withStyles(styles)(Register));