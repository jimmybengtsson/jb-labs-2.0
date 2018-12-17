import React, {Component} from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField'
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from 'notistack';

import { withFirebase } from '../firebase/';

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
  password: '',
  loading: false,
};

class Login extends Component {
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

    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((response) => {
        //localStorage.setItem('token', JSON.stringify(response.data.token))
        //this.props.userLogin(response.data.token)
        //this.props.handleLoginClose()
        this.props.enqueueSnackbar('Welcome ' + this.state.email, {variant: 'success'});
        console.log(response)
        return this.props.handleLoginClose()
      }).catch((err) => {

      this.props.enqueueSnackbar(err.message, {variant: 'error'});
      return this.props.handleLoginClose()
    })
  }

  render() {

    const { classes } = this.props;
    const { navigate, email, password, } = this.state

    const isInvalid = password === '' || email === '';

    if (navigate) {
      return <Redirect to='/dashboard' push />
    }

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
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Logga in
              </Typography>
              <TextField
                className={classes.form}
                id='email'
                label='Email'
                required
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin='normal'
                type="email"
              />
              <TextField
                id='password'
                label='Lösenord'
                required
                type='password'
                autoComplete='current-password'
                onChange={this.handleChange('password')}
                margin='normal'
                className={classes.form}
              />
              <Button
                fullWidth
                disabled={isInvalid}
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmit}
              >
                Logga in
              </Button>
            </Paper>
          </main>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withSnackbar(withFirebase(withRouter(withStyles(styles)(Login))));