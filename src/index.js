import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from '@material-ui/core/styles'
import {theme} from './styles/Theme'
import Firebase, { FirebaseContext } from './components/firebase';
import { SnackbarProvider } from 'notistack';
require('dotenv').config()

ReactDOM.render(
  <MuiThemeProvider theme={theme} >
    <FirebaseContext.Provider value={new Firebase()}>
      <SnackbarProvider maxSnack={3}>
        <Router className={'Router'}>
          <App />
        </Router>
      </SnackbarProvider>
    </FirebaseContext.Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
