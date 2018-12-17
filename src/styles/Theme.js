import { createMuiTheme } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import blueGrey from '@material-ui/core/colors/blueGrey'

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: blueGrey[400],
      main: blueGrey[600],
      dark: blueGrey[800],
      button: blueGrey[600],
      contrastText: grey[100],
    },

    secondary: {
      light: grey[400],
      main: grey[600],
      dark: grey[800]
    },
    textColor: grey[200],
    greyTextColor: grey[500],
    alternateTextColor: grey[400],
    backgroundColor: grey[100],
    appBarColor: blueGrey[800],
    drawerColor: blueGrey[600],
    paperColor: blueGrey[100],
    dialogColor: blueGrey[100],
  },

  typography: {
    fontFamily: [
      'Nunito',
      'sans-serif',
    ].join(','),

    htmlFontSize: 22,
  },

  zDepthShadows: 'none',
})